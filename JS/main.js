window.onload = function(){
	var clock = new ClockObj();
	clock.init();
	clock.drawClock();
	function clockLoop(){
		setTimeout(function(){
			clock.drawClock();
			clockLoop();
		},1000);	
	}
	clockLoop();

}