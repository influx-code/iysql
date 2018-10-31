package handle

import (
	"log"

	"github.com/googollee/go-socket.io"
	"github.com/iysql/iysql-go/plugin"
)

func SocketIoOnConnect(so socketio.Socket) {
	log.Println("socket io connecting...")

	so.On("get_types", getTypes)
	so.On("sqladvisor", getSQLAdvisor)
	so.On("disconnection", func() {
		log.Println("on disconnect")
	})
}

func getTypes(so socketio.Socket) {
	log.Println("socket.io get types")
	var types = plugin.PluginType{
		Ret:   1,
		Types: []string{"soar", "SQLAdvisor"},
	}

	log.Println(types)
	so.Emit("get_types.result", types)
}

func getSQLAdvisor(so socketio.Socket) {
	log.Println("socket.io get sqladvisor")
	var pluginResultMap = make(map[string]string)
	pluginResultMap["soar"] = "this is a test sql"
	pluginResultMap["SQLAdvisor"] = "this is a test sql"

	so.Emit("sqladvisor.result", pluginResultMap)
}

func fetchDatabases(so socketio.Socket) {

}
