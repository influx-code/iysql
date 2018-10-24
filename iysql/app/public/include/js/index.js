/*
 * @Author: Jeffery
 * @Date:   2018-10-24 10:58:02
 * @Last Modified by:   Jeffery
 * @Last Modified time: 2018-10-24 15:43:45
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
        	const self = this;
            this.socket.on('sqladvisor.result', function(data) {
               for(let type in data){
               		self.logs.push(data[type].replace(/\n/g,'<br/>'))
               }
            });
            this.socket.on('fetch_database.result', function(data) {
               console.log(data)
            });
        },
        /**
         * 绑定建立连接按钮事件
         * @return {[type]} [description]
         */
        onSendConnectDb() {
            let param = this.configs;
            this.socket.emit('fetch_database',{data:param}, (ack) => {
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
            this.notifyMsg('正在分析...')
            this.socket.emit('sqladvisor', {data:param}, (ack) => {
                console.log(ack)
            });
        },
        notifyMsg(msg="执行失败",type="info"){
        	this.$notify({
	          title: '提示',
	          message: msg,
	          type: type
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