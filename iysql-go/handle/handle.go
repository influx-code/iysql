package handle

import (
	"log"

	"github.com/googollee/go-socket.io"
	"github.com/iysql/iysql-go/plugin"
)

type dbConnParam struct {
	host     string
	port     int
	user     string
	password string
	database string
}

type fetchDatabasesParams struct {
	datas dbConnParam
}

func SocketIoOnConnect(so socketio.Socket) {
	log.Println("socket io connecting...")

	so.On("get_types", getTypes)
	so.On("sqladvisor", getSQLAdvisor)
	so.On("fetch_database", fetchDatabases)
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

func fetchDatabases(so socketio.Socket, data dbConnParam) {
	// var dsn = fmt.Sprintf("%s:%s@tcp(%s:%d)/information_schema",
	// 	datas.user, datas.password, datas.host, datas.port)
	log.Printf("hello %v %v", data, so.Request())
	so.Emit("fetch_database.result", "hello")
}
