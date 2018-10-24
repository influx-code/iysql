/*
 * @Author: Jeffery
 * @Date:   2018-10-24 10:58:02
 * @Last Modified by:   Jeffery
 * @Last Modified time: 2018-10-24 17:08:20
 */

new Vue({
	el: "#app",
	data: {
		querystring: 'SELECT * FROM tables WHERE id=1',
		is_connect:false,//是否已经连接DB
		configs: {
			host: "192.168.10.10",
			port: 3306,
			user: "root",
			password: "123456",
			database: "mysql"
		},
		logs: [],
		databases:[],
		check_all_plugin:true,
		plugins:[],
		checked_plugin:[],
		isIndeterminate: false,
	},
	methods: {
		initSocket() {
			var host = location['protocol'] + '//' + location['host'];
			this.socket = io(host);
		},
		bindSocketEvent() {
			const self = this;
			this.socket.on('sqladvisor.result', function(data) {
				for (let type in data) {
					self.logs.push(data[type].replace(/\n/g, '<br/>'))
				}
			});
			this.socket.on('fetch_database.result', function(res) {
				if (res['ret'] == -1) {
					self.notifyMsg(res['msg'], 'error');
					return false
				}
				self.is_connect = true;
				self.databases= res['databases'];
				self.notifyMsg('连接成功','success');
				self.configs['database'] = '';
			});
			this.socket.on('get_types.result', function(res) {
				if (res['ret'] == -1) {
					self.notifyMsg(res['msg'], 'error');
					return false
				}
				self.plugins = res['types'];
				self.checked_plugin = res['types'];
			});
		},
		/**
		 * 选择所有插件
		 * @return {[type]} [description]
		 */
		handleCheckAllPlugin(val){
			const self = this;
			this.checked_plugin = val ? this.plugins : [];
        	this.isIndeterminate = false;
		},
		handleCheckedPluginChange(value) {
	        let checkedCount = value.length;
	        this.check_all_plugin = checkedCount === this.plugins.length;
	        this.isIndeterminate = checkedCount > 0 && checkedCount < this.plugins.length;
	    },
	    /**
	     * 清除屏幕
	     * @param  {[type]} type [description]
	     * @return {[type]}      [description]
	     */
	    handleClearScreen(type){
	    	this.logs=[];
	    },
		/**
		 * 绑定建立连接按钮事件
		 * @return {[type]} [description]
		 */
		onSendConnectDb() {
			let param = this.configs;
			param['port'] = Number(param['port'])<=0?'':Number(param['port']);
			if(param['host'].replace(/\s/g, "")==''){
				this.notifyMsg("请输入主机地址",'error');
				return false
			}
			if(param['port']==""){
				this.notifyMsg("请输入主机端口",'error');
				return false
			}
			if(param['user'].replace(/\s/g, "")==''){
				this.notifyMsg("请输入数据库帐号",'error');
				return false
			}
			
			this.socket.emit('fetch_database', {
				data: param
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
			var param = Object.assign({}, default_param, this.configs);
			param['port'] = Number(param['port'])<=0?'':Number(param['port']);

			if(param['host'].replace(/\s/g, "")==''){
				this.notifyMsg("请输入主机地址",'error');
				return false
			}
			if(param['port']==""){
				this.notifyMsg("请输入主机端口",'error');
				return false
			}
			if(param['database'].replace(/\s/g, "")==''){
				this.notifyMsg("数据库名无效",'error');
				return false
			}
			if(param['user'].replace(/\s/g, "")==''){
				this.notifyMsg("请输入数据库帐号",'error');
				return false
			}
			if(param['sql']==''){
				this.notifyMsg("请输入需要分析的SQL语句",'error');
				return false
			}
			this.notifyMsg('正在分析...')
			this.socket.emit('sqladvisor', {
				data: param
			});
		},
		notifyMsg(msg = "执行失败", type = "info") {
			this.$notify({
				title: '提示',
				message: msg,
				duration:1000,
				type: type
			});
		},
		
		/**
		 * 初始化插件
		 * @return {[type]} [description]
		 */
		initPlugin(){
			const self = this;
			this.socket.emit('get_types',{},function(){})
		},
		initApp() {
			this.initSocket();
			this.initPlugin();
			this.bindSocketEvent();
		}
	},
	mounted() {
		this.initApp()
	}
})