require('less/index.less')

var path = require('path')
var noteMessage = require('mod/noteMessage.js').NoteMessage
var Event = require('mod/event.js')
var WaterFall = require('mod/waterfall.js')

noteMessage.load()

$('.add-note').on('click', function(){
	noteMessage.add()
})

var audio = new Audio()
audio.src = path.join(__dirname, './audio/Preparation.mp3')
audio.autoplay = true
audio.addEventListener('ended', function(){
	setTimeout(function(){
		audio.src = path.join(__dirname, './audio/Preparation.mp3')
	}, 500)
})
var i = 0
$('.music').on('click', function(){
	let arr = ['MusicOff', 'MusicOn']
	i = arr % 2
	$('.music').html(arr[i])
	if(i === 0){
		audio.pause()
	}else{
		audio.play()
	}
	i++
})

Event.on('waterfall', function(){
	WaterFall.init($('#content'), $('.note'))
})




