require('less/toast.less')


function toast(msg, time){
	this.msg = msg
	this.existTime = time || 1000
	this.createToast()
	this.showToast()
}

toast.prototype = {
	createToast: function(){
		let tpl = '<div class="toast">' + this.msg + '</div>'
		this.$toast = $(tpl)
		$('body').append(this.$toast)
	},
	showToast: function(){
		let _this = this
		this.$toast.fadeIn(300, ()=>{
			setTimeout(()=>{
				_this.$toast.fadeOut(300, ()=>{
					_this.$toast.remove()
				})
			}, _this.existTime)
		})
	}
}

function Toast(msg, time){
	return new toast(msg, time)
}

module.exports.Toast = Toast