var Toast = require('mod/toast.js').Toast
var Event = require('mod/event.js')
var Note = require('mod/note.js').Note

var NoteMessage = (function(){
	
	function load(){
		$.get('/api/notes')
		 .done(function(ret){
		 	if(ret.status === 0){
		 		$.each(ret.data, function(idx, artical){
		 			let id = artical.id
		 			let date = artical.text.slice(-15)
		 			let reg = /\d{2}:\d{2}\s\d{4}-\d-\d{2}/g
		 			if(!date.match(reg)){
		 				let date_ =  new Date()
						let year = date_.getFullYear()
						let month = date_.getMonth() + 1
						let day = date_.getDate()
						let hours = date_.getHours()
						let minutes = date_.getMinutes()
						if(hours < 10) hours = '0' + hours
						if(minutes < 10) minutes = '0' + minutes
						date =  hours + ':' + minutes + ' ' + year + '-' + month + '-' + day
		 				// date = '08:08 2008-08-08'
		 			}
		 			let text = artical.text.replace(date, '')
		 			new Note({
		 				id: id,
		 				context: text,
		 				date: date
		 			})
		 		})

		 		Event.fire('waterfall')
		 	}else{
		 		Toast(ret.errorMsg)
		 	}
		 })
		 .fail(function(){
		 	Toast('网络异常')
		 })
	}

	function add(){
		let note = new Note()

	}

	return {
		load: load,
		add: add
	}
})()

module.exports.NoteMessage = NoteMessage