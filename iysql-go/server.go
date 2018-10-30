package main

import (
	"log"
	"net/http"

	"github.com/googollee/go-socket.io"

	"github.com/iysql/iysql-go/handle"
)

func main() {
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}
	server.On("connection", handle.SocketIoOnConnect)

	http.Handle("/socket.io/", server)
	http.Handle("/", http.FileServer(http.Dir("./public")))
	log.Println("Serving at localhost:5000...")
	log.Fatal(http.ListenAndServe(":5000", nil))
}
