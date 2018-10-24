/*
 * @Author: Jeffery
 * @Date:   2018-10-24 10:58:02
 * @Last Modified by:   Jeffery
 * @Last Modified time: 2018-10-24 11:00:03
 */
new Vue({
	el: "#app",
	data: {},
	method: {
		initApp() {
			var host = location['protocol'] + '//' + location['host'];
			var socket = io(host);

			$("#send-sql").click(function() {
				var sql = $('#sql').val();
				// var database = $('#database option:selected').val();
				// if(sql.length==0){
				// 	alert('请输入SQL');
				// 	return false;
				// }
				var data = {
					sql: sql.replace(/\`/ig, '').replace(/\n/g, " "),
					// database:database
				}
				socket.emit('sqladvisor', {
					data: data
				});
			});
			$("#clean-sql").click(function() {
				$("#sql").val('');
			})
			$('#clean-result').click(function() {
					$(".analysis-result").html('');
				})
				//提示板
			$('.js-more').click(function(e) {
				var $elem = $(this);
				if ($elem.hasClass('active')) {
					$(".js-tips-content").slideUp();
					$elem.removeClass('active');
					$elem.html('-');
				} else {
					$(".js-tips-content").slideDown();
					$elem.addClass('active');
					$elem.html('+');
				}
				e.stopPropagation();
				e.preventDefault();
			});
			$('.card-header').click(function(e) {
				$('.js-more').trigger('click');
			})
			socket.on('result', function(data) {
				var $result = $(".analysis-result");
				var datas = data['message'].match(/.*(` )/)
				$result.append('<p>' + data['message'] + '</p>');
			});
		}
	},
	mounted() {
		this.initApp()
	}
})