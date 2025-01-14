package server

import (
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		origin := r.Header.Get("Origin")
		fmt.Printf("origin: %s\n", origin)
		return true // origin == "<http://yourdomain.com>"
	},
}

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan []byte)
var mutex = &sync.Mutex{}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Printf("error upgrading connection: %v\n", err)
		return
	}
	defer conn.Close()

	mutex.Lock()
	clients[conn] = true
	mutex.Unlock()

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			mutex.Lock()
			delete(clients, conn)
			mutex.Unlock()
			break
		}

		broadcast <- message
	}
}

func handleIncoming() {
	for {
		message := <-broadcast

		fmt.Printf("Received message: %s\n", message)
	}
}

func SendMessage(message []byte) {
	mutex.Lock()
	for client := range clients {
		err := client.WriteMessage(websocket.TextMessage, message)
		if err != nil {
			client.Close()
			delete(clients, client)
		}
	}
	mutex.Unlock()
}

func StartWebserver() {
	http.HandleFunc("/", wsHandler)
	go handleIncoming()

	// http.Handle("/", http.FileServer(http.Dir("./frontend/dist")))

	fmt.Println("Webserver starts listening...")
	log.Fatal(http.ListenAndServe("127.0.0.1:8080", nil))
}
