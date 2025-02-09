package server

import (
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

type Webserver struct {
	clients   map[*websocket.Conn]bool
	broadcast chan []byte
	mutex     *sync.Mutex
	upgrader  websocket.Upgrader
}

var webserverInstance *Webserver
var webserverLock = &sync.Mutex{}

func GetWebserverInstance() *Webserver {
	if webserverInstance == nil {
		webserverLock.Lock()
		defer webserverLock.Unlock()

		if webserverInstance == nil {
			webserverInstance = &Webserver{
				clients:   make(map[*websocket.Conn]bool),
				broadcast: make(chan []byte),
				mutex:     &sync.Mutex{},
				upgrader: websocket.Upgrader{
					CheckOrigin: func(r *http.Request) bool {
						return true // origin == "<http://yourdomain.com>"
					},
				},
			}
		}
	}

	return webserverInstance
}

func SendMessage(message []byte) {
	ws := GetWebserverInstance()
	ws.sendMessage(message)
}

func (s *Webserver) wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := s.upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Printf("error upgrading connection: %v\n", err)
		return
	}
	defer conn.Close()

	s.mutex.Lock()
	s.clients[conn] = true
	s.mutex.Unlock()

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			s.mutex.Lock()
			delete(s.clients, conn)
			s.mutex.Unlock()
			break
		}

		s.broadcast <- message
	}
}

func (s *Webserver) handleIncoming() {
	for {
		message := <-s.broadcast

		messageToSend := make([]byte, 0)
		var err error

		switch string(message) {
		case "getStatus":
			messageToSend, err = handleGetStatusRequest()
		case "getRoute":
			messageToSend, err = handleGetRouteRequest()
		case "getCurrentSystem":
			messageToSend, err = handleGetCurrentSystemRequest()

		case "getFlightlog":
			messageToSend, err = handleGetFlightlogRequest()

		case "getStatusCommanderInfo":
			messageToSend, err = handleGetStatusCommanderInfoRequest()
		case "getStatusCredits":
			messageToSend, err = handleGetStatusCreditsRequest()
		}

		if err != nil {
			slog.Warn(fmt.Sprintf("%v", err))
		}

		if len(messageToSend) > 0 {
			s.sendMessage(messageToSend)
		}
	}
}

func (s *Webserver) sendMessage(message []byte) {
	s.mutex.Lock()
	for client := range s.clients {
		err := client.WriteMessage(websocket.TextMessage, message)
		if err != nil {
			client.Close()
			delete(s.clients, client)
		}
	}
	s.mutex.Unlock()
}

func (s *Webserver) Start() {
	http.HandleFunc("/", s.wsHandler)
	go s.handleIncoming()

	slog.Info("Webserver starts listening on port :8080...")
	log.Fatal(http.ListenAndServe("0.0.0.0:8080", nil))
}
