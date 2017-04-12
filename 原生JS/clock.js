var ClockObj = function(){
	this.clock;
	this.clockCtx;
	this.width = 0;
	this.height = 0;
	this.r = 0;
	this.hourNum = [];
}

ClockObj.prototype = {
	//绘制原点
	drawDot:function(){
		var _this = this;
		this.clockCtx.save();
		this.clockCtx.beginPath();
		this.clockCtx.fillStyle = 'white';
		this.clockCtx.strokeStyle = 'white';
		this.clockCtx.arc(0,0,3,0,Math.PI * 2 ,false);
		this.clockCtx.fill();
		this.clockCtx.stroke();
		this.clockCtx.closePath();
		this.clockCtx.restore();
	},
	//绘制秒针
	drawSeconds:function(seconds){
		var _this = this;
		this.clockCtx.save();
		this.clockCtx.beginPath();
		this.clockCtx.lineWidth = 2;
		this.clockCtx.lineCap = 'round';
		this.clockCtx.strokeStyle = 'red';
		var rad = Math.PI *2 / 60 * seconds;
		this.clockCtx.rotate(rad);
		this.clockCtx.moveTo(0,20);
		this.clockCtx.lineTo(0,-_this.r / 2 - 15);
		this.clockCtx.stroke();
		this.clockCtx.closePath();
		this.clockCtx.restore();
	},
	//绘制分针
	drawMinutes:function(minutes,seconds){
		var _this = this;
		this.clockCtx.save();
		this.clockCtx.beginPath();
		this.clockCtx.lineWidth = 3;
		this.clockCtx.lineCap = 'round';
		var rad = Math.PI *2 / 60 * minutes;
		var sRad = Math.PI * 2 / 60 / 60 * seconds;
		this.clockCtx.rotate(rad + sRad);
		this.clockCtx.moveTo(0,15);
		this.clockCtx.lineTo(0,-_this.r / 2 - 10);
		this.clockCtx.stroke();
		this.clockCtx.closePath();
		this.clockCtx.restore();
	},
	//绘制时针
	drawHours:function(hours,minites){
		var _this = this;
		this.clockCtx.save();
		this.clockCtx.beginPath();
		this.clockCtx.lineWidth = 4;
		this.clockCtx.lineCap = 'round';
		var rad = Math.PI * 2 / 12 * hours;
		var mRad = Math.PI * 2 / 12 / 60 * minites;
		this.clockCtx.rotate(rad + mRad);
		this.clockCtx.moveTo(0,10);
		this.clockCtx.lineTo(0,-_this.r / 2);
		this.clockCtx.stroke();
		//this.clockCtx.closePath();
		this.clockCtx.restore();
	},
	//绘制时刻
	drawTime:function(){
		var _this = this;
		this.clockCtx.save();
		this.clockCtx.font = '18px Arial'
		this.clockCtx.textAlign = 'center';//左右基线
		this.clockCtx.textBaseline = 'middle';//上下基线
		this.clockCtx.fillStyle = 'white';
		this.hourNum.forEach(function(number,i){
			var rad = Math.PI * 2 / 12 *i;
			var x = Math.cos(rad) * (_this.r - 30);
			var y = Math.sin(rad) * (_this.r - 30);
			_this.clockCtx.fillText(number,x,y);
		});
		for(var i = 0;i < 60;i++){
			var rad = Math.PI * 2 / 60 * i;
			var x = Math.cos(rad) * (this.r - 14);
			var y = Math.sin(rad) * (this.r - 14);
			this.clockCtx.beginPath();
			//this.clockCtx.fillStyle = 'black';
			this.clockCtx.lineWidth = 0;
			this.clockCtx.strokeStyle = 'yellow';
			if(i % 5 === 0){
				this.clockCtx.fillStyle = 'black';
				this.clockCtx.arc(x,y,3,0,Math.PI * 2,false);
			}else{
				this.clockCtx.fillStyle = 'white';
				this.clockCtx.arc(x,y,2,0,Math.PI * 2,false);
			}
			this.clockCtx.fill();
			this.clockCtx.stroke();
			this.clockCtx.closePath();
		}
		this.clockCtx.restore();
	},
	//绘制边框；
	drawBorder:function(){
		var _this = this;

		this.clockCtx.translate(_this.r,_this.r);
		//绘制边框
		this.clockCtx.save();
		this.clockCtx.beginPath();
		this.clockCtx.lineWidth = 4;
		this.clockCtx.arc(0,0,_this.r - _this.clockCtx.lineWidth / 2,0,Math.PI * 2,false);
		this.clockCtx.fillStyle = 'yellow';
		this.clockCtx.fill();
		this.clockCtx.stroke();
		this.clockCtx.closePath();
		this.clockCtx.restore();
	},
	//绘制时钟
	drawClock:function(){
		var _this = this;
		this.clockCtx.save();
		//this.clockCtx.clearRect(0,0,_this.width,_this.height);
		var now = new Date();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		var seconds = now.getSeconds();
		this.drawBorder();
		this.drawTime();
		this.drawHours(hours,minutes);
		this.drawMinutes(minutes,seconds);
		this.drawSeconds(seconds);
		this.drawDot();
		this.clockCtx.restore();
	},
	//初始化Canvas；
	init:function(){
		this.clock = document.getElementById('clock');
		this.clockCtx = this.clock.getContext('2d');
		this.width = this.clock.width;
		this.height = this.clock.height;
		this.r = this.clock.width / 2;
		this.hourNum = [3,4,5,6,7,8,9,10,11,12,1,2,3]
	}
};