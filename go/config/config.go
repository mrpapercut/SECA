package config

import (
	"sync"

	"github.com/spf13/viper"
)

type Config struct {
	JournalFolder string `mapstructure:"journal_folder"`
	DBName        string `mapstructure:"db_name"`
}

var configLock = &sync.Mutex{}
var configInstance *Config

func GetConfig() (*Config, error) {
	var err error

	if configInstance == nil {
		configLock.Lock()
		defer configLock.Unlock()

		if configInstance == nil {
			configInstance, err = loadConfig()
			if err != nil {
				return nil, err
			}
		}
	}

	return configInstance, nil
}

func loadConfig() (*Config, error) {
	viper.SetDefault("logging.level", "info")

	viper.AddConfigPath("./")
	viper.AddConfigPath("../")
	viper.AddConfigPath("../../")

	viper.SetConfigName("config")
	viper.SetConfigType("json")

	if err := viper.ReadInConfig(); err != nil {
		return nil, err
	}

	var conf Config
	err := viper.Unmarshal(&conf)
	if err != nil {
		return nil, err
	}

	return &conf, nil
}
