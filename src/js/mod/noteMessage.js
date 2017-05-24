var Toast = require('mod/toast.js').Toast
var Event = require('mod/event.js')
var Note = require('mod/note.js').Note

var NoteMessage = (function(){
	
	function load(){
		$.get('/api/notes')
		 .done(function(ret){
		 	if(ret.status === 0){
		 		$.each(ret.data, function(idx, artical){
		 			var id = artical.id
		 			var date = artical.text.slice(-15)
		 			var reg = /\d{2}:\d{2}\s\d{4}-\d-\d{2}/g
		 			if(!date.match(reg)){
		 				var date_ =  new Date()
						var year = date_.getFullYear()
						var month = date_.getMonth() + 1
						var day = date_.getDate()
						var hours = date_.getHours()
						var minutes = date_.getMinutes()
						if(hours < 10) hours = '0' + hours
						if(minutes < 10) minutes = '0' + minutes
						date =  hours + ':' + minutes + ' ' + year + '-' + month + '-' + day
		 				// date = '08:08 2008-08-08'
		 			}
		 			var text = artical.text.replace(date, '')
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
		var note = new Note()

	}

	return {
		load: load,
		add: add
	}
})()

module.exports.NoteMessage = NoteMessage