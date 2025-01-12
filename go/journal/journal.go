package journal

import "sync"

type Journal struct {
}

var journalInstance *Journal
var journalLock = &sync.Mutex{}

func GetInstance() *Journal {
	if journalInstance == nil {
		journalLock.Lock()
		defer journalLock.Unlock()

		if journalInstance == nil {
			journalInstance = &Journal{}
		}
	}

	return journalInstance
}
