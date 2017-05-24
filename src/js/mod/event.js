var EventCenter = (function(){
	var events = {}
		/*
		events = {
			my_event: [handeler: function(data){}, handler: function(data){}]
		}
		*/

	function on(event, handler){
		events[event] = events[event] || []			
		events[event].push({
			handler: handler
		})
	}

	function fire(event, arguments){
		if(!events[event]){
			return
		}
		for(var i=0; i<events[event].length; i++){
			events[event][i].handler(arguments)
		}
	}

	function off(event){
		delete events[event]
	}

	return {
		on: on,
		fire: fire,
		off: off
	}
})()


module.exports = EventCenter