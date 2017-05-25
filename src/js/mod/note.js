require('less/note.less')

var path = require('path')
var Toast = require('mod/toast.js').Toast
var Event = require('mod/event.js')

/*
 单个note的事件绑定
 创建时的个性化样式
 创建后输入，拖动，删除等事件绑定
*/

function Note(opts){
	this.initOpts(opts)
	this.createNote()
	this.setStyle()
	this.setLayout()
	this.bindEvent()
}

Note.prototype = {
	colors: [
		['rgb(84,46,24)', 'rgb(244,191,86)'],
		['rgb(95,24,21)', 'rgb(181,128,93)'],
		['rgb(1,139,201)', 'rgb(100,102,109)'],
		['rgb(244,191,86)', 'rgb(38,163,130)'],
		['rgb(84,46,24)', 'rgb(95,24,21)'],
		['rgb(244,191,86)', 'rgb(244,137,203)'],
		['rgb(175,34,30)','rgb(244,191,86)'],
		['rgb(64,64,64)','rgb(255,255,255)'],
		['rgb(84,46,24)','rgb(100,102,109)'],
		['rgb(244,191,86)','rgb(183,169,44)'],
		['rgb(244,191,86)','rgb(255,255,255)'],
		['rgb(244,137,203)','rgb(255,255,255)'],
		['rgb(84,46,24)','rgb(244,137,203)'],
		['rgb(38,163,130)','rgb(255,255,255)'],
		['rgb(244,191,86)','rgb(107,214,214)']
	],

	animals: [
		'#icon-rabbit',
		'#icon-seal',
		'#icon-horse',
		'#icon-deer',
		'#icon-donkey',
		'#icon-mouse',
		'#icon-snake',
		'#icon-alligator',
		'#icon-pig',
		'#icon-elephant',
		'#icon-monkey',
		'#icon-cat',
		'#icon-sea-lion',
		'#icon-tiger',
		'#icon-dog',
		'#icon-hippo',
		'#icon-bull',
		'#icon-lion',
		'#icon-bear',
		'#icon-duck',
		'#icon-chicken',
		'#icon-sheep',
		'#icon-owl',
		'#icon-panda',
		'#icon-frog'
	],

	defaultOpts: {
		id: '',
		$ct: $('#content').length>0 ? $('#content'):$('body'),
		context: 'input here',
		date: ''
	},

	initOpts: function(opts){
		this.opts = $.extend({}, this.defaultOpts, opts || {})
		if(this.opts.id){
			this.id = this.opts.id
		}
	},

	createNote: function () {
		var tpl = '<div class="note">' +

				  '<div class="note-header">' + 

				  '<div class="logo">' +
				  '<div class="one"></div>' +
				  '<div class="two"></div>' +
				  '</div>' +
								  
				  '<div class="animal">' +
				  '<svg class="icon" aria-hidden="true">' +
  				  '<use xlink:href=""></use>' +
				  '</svg>' +
				  '</div>' +

				  '<div class="note-delete"><i class="iconfont icon-delete"></i></div>' + 
				  '</div>' +

				  '<div class="note-ct" contenteditable="true">' +				  
				  '</div>' +

				  '<div class="note-footer">'+
				  '<span class="date"></span>' +
				  '</div>' +

				  '</div>'
		this.$note = $(tpl)
		var $noteCt = this.$note.find('.note-ct')
		var $date = this.$note.find('.note-footer .date')
		$noteCt.html(this.opts.context)
		$date.html(this.opts.date)
		this.opts.$ct.append(this.$note)
		if(!this.id) this.$note.animate({'top':'200px','left':'42%'}, 300)	//新增的放一边

	},

	setStyle: function(){
		var _this = this

		var $noteHeader = this.$note.find('.note-header')
		var $noteCt = this.$note.find('.note-ct')
		var $animalIcon = $noteHeader.find('.animal .icon use')
		var $changeDoll = $('.change-doll')
		var $animalIcon2 = $changeDoll.find('.icon use')
		var $changeLogo = $('.change-logo')
		var $music = $('.music')

		var color = this.colors[Math.floor(Math.random()*15)]
		var animal = this.animals[Math.floor(Math.random()*25)]
		var num = Math.floor(Math.random()*2)
		var iceCream = '#icon-icecream-' + Math.floor(Math.random()*19+1)
		
		

		$noteHeader.css('background-color', color[num] )		
		$noteCt.css('background-color', color[1-num] )
		$animalIcon.attr('xlink:href', animal)
		$animalIcon2.attr('xlink:href', animal)

 		var i = 0,
 			j = 0,
 			k = 0
		$changeDoll.on('click', function(){
			var arr = [iceCream, animal]
			i = i%2
			$animalIcon.attr('xlink:href', arr[i])
			$animalIcon2.attr('xlink:href', arr[i])
			i++
		})

		$changeLogo.on('click', function(){
			
			var arr = ['rgb(240, 106, 109)', 'rgb(38, 163, 130)']
			j = j%2
			_this.str = '<style type=text/css class="logo-color">'+
						'body #nav .change-logo .one:before,'+
						'body #nav .change-logo .one:after,'+
						'body #nav .change-logo .two:before,'+
						'body #nav .change-logo .two:after,'+
						'.note .note-header .logo .one:before,'+
						'.note .note-header .logo .one:after,'+
						'.note .note-header .logo .two:before,'+
						'.note .note-header .logo .two:after'+
						'{background-color:'+
						arr[j]+
						'}</style>'
			if ($('head .logo-color')) {
				$('head .logo-color').remove()
			}

			$('head').append($(_this.str));
			j++

		})

		

		var audio = new Audio()
		audio.src = path.join(__dirname, '../audio/Preparation.mp3')
		audio.volume = .5
		audio.autoplay = true
		var music = document.querySelector('.music svg')
		audio.addEventListener('playing', function(){
			music.classList.add('animation')
		})
		audio.addEventListener('pause', function(){
			music.classList.remove('animation')
		})
		audio.addEventListener('ended', function(){
			setTimeout(function(){
				audio.src = path.join(__dirname, '../audio/Preparation.mp3')
			}, 500)
		})
		
		music.addEventListener('click', function(){
			function pause(){
				audio.pause()
			}
			function play(){
				audio.play()
			}
			var arr = [pause, play]
			k = k % 2
			arr[k]()
			k++
		})
	},

	setLayout: function(){
		var _this = this
		if(_this.click){
			clearTimeout(_this.click)
		}
		this.click = setTimeout(function(){
			Event.fire('waterfall')
		}, 100)
	},

	bindEvent: function(){
		var _this = this,
			$note = this.$note,
			$noteHeader = $note.find('.note-header'),
			$noteCt = $note.find('.note-ct'),
			$date = this.$note.find('.note-footer .date'),
			$delete = $note.find('.note-delete')

		$delete.on('click', function(){
			_this.delete()
		})

		//通过html5自带的contenteditable属性，改变内容后设置了save事件
		$noteCt.on('focus', function(){
			if($noteCt.html() == 'input here') $noteCt.html('')
			$noteCt.data('before', $noteCt.html())
			
		}).on('blur paste', function(){
			
			
			if ($noteCt.data('before') != $noteCt.html() ) {

				$noteCt.data('before', $noteCt.html())
				_this.date()
				_this.setLayout()
								
				var str = $noteCt.html() + $date.html()
				if(_this.id){
					_this.edit(str)
				}else{
					_this.add(str)
				} 
				
			}
		})

		//拖动事件
		$noteHeader.on('mousedown', function(e){
			var eX = e.pageX - $note.offset().left,	//点击位置到note左边缘的距离
				eY = e.pageY - $note.offset().top
			$note.addClass('draggble').data('evtPos', {x: eX, y: eY})	//保存上面计算的距离数据	
		}).on('mouseup', function(){
			$note.removeClass('draggble').removeData('evtPos')
		})

		$('body').on('mousemove', function(e){
			$('.draggble').length && $('.draggble').offset({
				top: e.pageY - $('.draggble').data('evtPos').y,	//鼠标移动时，根据当前鼠标的位置-前面保存的距离，即是note的绝对位置
				left: e.pageX - $('.draggble').data('evtPos').x

			})
		})
	},

	//添加日期时间
	date: function(){
		var $date = this.$note.find('.note-footer .date')
		var date =  new Date()
		var year = date.getFullYear()
		var month = date.getMonth() + 1
		var day = date.getDate()
		var hours = date.getHours()
		var minutes = date.getMinutes()
		if(hours < 10) hours = '0' + hours
		if(minutes < 10) minutes = '0' + minutes
		var str =  hours + ':' + minutes + ' ' + year + '-' + month + '-' + day
		$date.html('')
		$date.html(str)
	},

	//改变note内容
	edit: function(msg){
		var _this = this
		$.post('/api/notes/edit', {
			id: this.id,	//
			note: msg
		}).done(function(ret){
			if(ret.status === 0){
				Toast('update success')
			}else{
				Toast(ret.errorMsg) 
			}	
		})
	},

	//添加note
	add: function(msg){
		var _this = this
		$.post('/api/notes/add', {
			note: msg
		}).done(function(ret){
			if(ret.status === 0){
				Toast('add success')

			}else{
				_this.$note.remove()
				Event.fire('waterfall')	
				Toast(ret.errorMsg)
			}
			 
		})
	},

	//删除note
	delete: function(){
		var _this = this
		$.post('/api/notes/delete', {
			id: this.id
		}).done(function(ret){
			if(ret.status === 0){				
				_this.$note.remove()
				Event.fire('waterfall')
				Toast('delete success')
			}else{
				Toast(ret.errorMsg)
			}	
			 
		})
	}
}

module.exports.Note = Note
