package plugin

import (
	"fmt"
)

/*
Soar
*/
type Soar struct {
	path         string
	user         string
	password     string
	host         string
	port         int
	database     string
	valueOptions map[string]string
	flagOptions  []string
}

func (soar *Soar) readConfig(config PluginConfig) {
	soar.path = config.connParams.path
	soar.user = config.connParams.user
	soar.password = config.connParams.password
	soar.host = config.connParams.host
	soar.port = config.connParams.port
	soar.database = config.connParams.database
	soar.valueOptions = config.valueOptions
	soar.flagOptions = config.flagOptions
}

func (soar *Soar) generateQueryCommond(args PluginArgs) string {
	var commond = soar.path + " -test-dsn=" + generateConnStr(*soar, args)
	commond += " -query=" + args.sql

	var tmpValueOptions = soar.valueOptions
	for k := range args.valueOptions {
		if val, ok := tmpValueOptions[k]; ok {
			tmpValueOptions[k] = val
		}
	}

	var flagOptionsSet = make(map[string]bool, 0)
	var tmpFlagOptions = soar.flagOptions
	for _, v := range tmpFlagOptions {
		flagOptionsSet[v] = true
	}
	for _, v := range args.flagOptions {
		if _, ok := flagOptionsSet[v]; !ok {
			tmpFlagOptions = append(tmpFlagOptions, v)
		}
	}

	for k, v := range tmpValueOptions {
		commond += fmt.Sprintf(" %s=%s ", k, v)
	}

	for _, v := range tmpFlagOptions {
		commond += fmt.Sprintf(" %s ", v)
	}

	return commond
}

func generateConnStr(soar Soar, args PluginArgs) string {
	var (
		user     string
		password string
		host     string
		port     int
		database string
	)

	if args.connParams.user != "" {
		user = args.connParams.user
	} else {
		user = soar.user
	}

	if args.connParams.password != "" {
		password = args.connParams.password
	} else {
		password = soar.password
	}

	if args.connParams.host != "" {
		host = args.connParams.host
	} else {
		host = soar.host
	}

	if args.connParams.port != 0 {
		port = args.connParams.port
	} else {
		port = soar.port
	}

	if args.connParams.database != "" {
		database = args.connParams.database
	} else {
		database = soar.database
	}

	return fmt.Sprintf("%s:%s@%s:%d/%s", user, password, host, port, database)
}
