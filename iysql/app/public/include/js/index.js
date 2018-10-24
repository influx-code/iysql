/*
 * @Author: Jeffery
 * @Date:   2018-10-24 10:58:02
 * @Last Modified by:   Jeffery
 * @Last Modified time: 2018-10-24 14:46:57
 */

new Vue({
    el: "#app",
    data: {
        querystring: 'SELECT * FROM tables WHERE id=1',
        configs: {
            host: "192.168.10.10",
            port: 3306,
            user: "root",
            password: "123456",
            database: "mysql"
        },
        logs:[],
    },
    methods: {
        initSocket() {
            var host = location['protocol'] + '//' + location['host'];
            this.socket = io(host);
        },
        bindSocketEvent() {
            this.socket.on('sqladvisor.result', function(data) {
                console.log(data)
                var datas = data['message'].match(/.*(` )/)

            });
        },
        /**
         * 绑定建立连接按钮事件
         * @return {[type]} [description]
         */
        onSendConnectDb() {
            let param = this.configs;
            this.socket.emit('sqladvisor.connect', param, (ack) => {
                console.log(ack)
            });
        },
        /**
         * 绑定开始分析按钮事件
         * @return {[type]} [description]
         */
        onSendAnalyze() {
            var default_param = {
                sql: this.querystring.replace(/\`/ig, '').replace(/\n/g, " "),
            };
            var param = Object.assign({},default_param,this.configs);
            this.socket.emit('sqladvisor', param, (ack) => {
                console.log(ack)
            });
        },
        initApp() {
            this.initSocket()
            this.bindSocketEvent();




        }
    },
    mounted() {
        this.initApp()
    }
})