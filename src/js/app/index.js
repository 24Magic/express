require('less/index.less')

var path = require('path')
var noteMessage = require('mod/noteMessage.js').NoteMessage
var Event = require('mod/event.js')
var WaterFall = require('mod/waterfall.js')

noteMessage.load()

$('.add-note').on('click', function(){
	noteMessage.add()
})

Event.on('waterfall', function(){
	WaterFall.init($('#content'), $('.note'))
})




