package plugin

type PluginType struct {
	Ret   int      `json:"ret"`
	Types []string `json:"types"`
}

func (pluginType *PluginType) addType(newType string) []string {
	pluginType.Types = append(pluginType.Types, newType)
	return pluginType.Types
}

type Plugin interface {
	readConfig(config PluginConfig)
	generateQueryCommond(args PluginArgs) string
	executeCommond(commond string) string
}

type ConnParams struct {
	path     string
	user     string
	password string
	host     string
	port     int
	database string
}

type PluginConfig struct {
	connParams   ConnParams
	valueOptions map[string]string
	flagOptions  []string
}

type PluginArgs struct {
	connParams   ConnParams
	sql          string
	valueOptions map[string]string
	flagOptions  []string
}
