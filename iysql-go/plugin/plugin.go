package plugin

type PluginType struct {
	Ret   int      `json:"ret"`
	Types []string `json:"types"`
}

func (pluginType *PluginType) addType(newType string) []string {
	pluginType.Types = append(pluginType.Types, newType)
	return pluginType.Types
}
