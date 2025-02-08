package models

import (
	"fmt"
	"log/slog"
	"time"

	"github.com/mrpapercut/seca/config"
	"gopkg.in/check.v1"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	db *gorm.DB
)

func Setup() error {
	var err error

	conf, _ := config.GetConfig()
	dbName := conf.DBName

	if dbName == "" {
		dbName = "seca.db"
	}

	maxRetries := 5
	retryInterval := 3 * time.Second

	for i := 0; i < maxRetries; i++ {
		db, err = gorm.Open(sqlite.Open(dbName), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Silent),
		})

		if err == nil {
			break
		}

		time.Sleep(retryInterval)
	}

	if err != nil {
		slog.Error(fmt.Sprintf("connecting to database... failed to connect to database: %v", err))
		return err
	} else {
		slog.Info("connecting to database... ok")
	}

	err = migrateModels()
	if err != nil {
		slog.Error(fmt.Sprintf("error migrating models: %v", err))
		return err
	}

	return nil
}

func Shutdown() {
	conn, err := db.DB()
	if err != nil {
		slog.Warn(fmt.Sprintf("error closing database connection: %v", err))
	} else {
		conn.Close()
	}
}

func Cleanup(c *check.C) {
	var err error

	ClearStatus()

	err = db.Where("1 = 1").Delete(&System{}).Error
	if err != nil {
		c.Fatalf("Failed to tear down test: %v", err)
	}

	err = db.Where("1 = 1").Delete(&Body{}).Error
	if err != nil {
		c.Fatalf("Failed to tear down test: %v", err)
	}

	err = db.Where("1 = 1").Delete(&ExplorationScan{}).Error
	if err != nil {
		c.Fatalf("Failed to tear down test: %v", err)
	}

	err = db.Where("1 = 1").Delete(&BiologicalScan{}).Error
	if err != nil {
		c.Fatalf("Failed to tear down test: %v", err)
	}

	err = db.Where("1 = 1").Delete(&BodySignal{}).Error
	if err != nil {
		c.Fatalf("Failed to tear down test: %v", err)
	}

	err = db.Where("1 = 1").Delete(&FSSSignal{}).Error
	if err != nil {
		c.Fatalf("Failed to tear down test: %v", err)
	}
}

func migrateModels() error {
	return db.AutoMigrate(
		// &Status{},
		&Route{},
		&System{},
		&Body{},
		&ExplorationScan{},
		&BiologicalScan{},
		&BodySignal{},
		&FSSSignal{},
	)
}

func IsFirstRun() bool {
	var count int64
	err := db.Model(&System{}).Count(&count).Error
	if err != nil {
		slog.Error(fmt.Sprintf("error determining if this is first run: %v", err))
	}

	return count == 0
}
