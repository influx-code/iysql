/*
 * @Author: Jeffery
 * @Date:   2018-10-24 10:58:02
 * @Last Modified by:   Jeffery
 * @Last Modified time: 2018-10-24 13:04:06
 */

new Vue({
	el: "#app",
	data: {
		querystring:'SELECT * FROM tables WHERE id=1',
		configs:{
			host:"192.168.10.10",
			port:3306,
			user:"root",
			password:"123456",
			database:"mysql",
			databases:['puzzle','open001','wms001']
		}
	},
	methods: {
		initSocket(){
			var host = location['protocol'] + '//' + location['host'];
			this.socket = io(host);
		},
		bindSocketEvent(){
			this.socket.on('result', function(data) {
				var $result = $(".analysis-result");
				var datas = data['message'].match(/.*(` )/)
				$result.append('<p>' + data['message'] + '</p>');
			});
		},
		onSendData(){
			var data = {
					sql: sql.replace(/\`/ig, '').replace(/\n/g, " "),
					// database:database
				}
				socket.emit('sqladvisor', {
					data: data
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