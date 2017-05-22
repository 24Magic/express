

var WaterFall = (function(){

	function init($content, $item){
	 	waterFall($content, $item)
	 	$(window).resize(function(){
	 		waterFall($content, $item)
	 	})
	}

	function waterFall($content, $item){
		var colLength = parseInt($content.outerWidth(true)/$item.outerWidth(true)),
		 	itemArr = []
		for(var i=0; i<colLength; i++){
			itemArr[i] = 0
		}
		$item.each(function(){
			 var minValue = Math.min.apply(null, itemArr),
			 	minIndex = itemArr.indexOf(minValue)
			 $(this).css({
			 	top: itemArr[minIndex],
			 	left: $(this).outerWidth(true) * minIndex
			 })
			 itemArr[minIndex] += ($(this).find('.note-ct').outerHeight(true)+60)
		})
	}

	return {
		init: init
	}
})()

module.exports = WaterFall
