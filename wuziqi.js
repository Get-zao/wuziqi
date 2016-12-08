$(function(){
		var canvas=$('#canvas').get(0);
		var ctx =canvas.getContext('2d');
		var sep=40;
		var sR=4;
		var mR=18;
		var yinxiao=$('#yinxiao').get(0);
		var heiqi=$('#heiqi').get(0);
		var baiqi=$('#baiqi').get(0);
		var AI=false;
		var gameState="pause";
		var kongbai={};
	
		var luozi={};
		function cri(x,y,r){
			ctx.save();
			ctx.beginPath();
			ctx.arc(weizhi(x),weizhi(y),r,0,Math.PI*2)
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}
		function weizhi(a){
			return (a+0.5)*sep+0.5;
		}
		function qipan(){
			ctx.beginPath();
		for(var i=0;i<15;i++){
			ctx.moveTo(20.5,20.5+i*sep);
			ctx.lineTo(580.5,20.5+i*sep);
			ctx.moveTo(20.5+i*sep,20.5);
			ctx.lineTo(20.5+i*sep,580.5);
		}
			ctx.closePath();
			ctx.stroke();
			ctx.restore();	
			cri(7,7,sR);
			cri(3,3,sR);
			cri(3,11,sR);
			cri(11,3,sR);
			cri(11,11,sR);
			for(var j=0;j<15;j++){
				for(var k=0;k<15;k++){
					kongbai[j+"_"+k]=true;
					
				}
		}
	}
		qipan();
	function qizi(n,m,color){
		ctx.save();
		ctx.beginPath();
		
		if(color=='black'){
				ctx.save();
				ctx.beginPath();
				ctx.drawImage(heiqi,weizhi(n-0.5),weizhi(m-0.5),36,36);
				ctx.closePath();
				ctx.restore();
		}else{
				ctx.save();
				ctx.beginPath();
				ctx.drawImage(baiqi,weizhi(n-0.5),weizhi(m-0.5),36,36);
				ctx.closePath();
				ctx.restore();
				
		}
		
		ctx.restore();
		luozi[n+'_'+m]=color;
		gameState="play";
		delete kongbai[n+'_'+m];
	}
	
	var flag=1
	var t1;
	var t2;
	
	function handleclick(e){
		yinxiao.play();
		var n=Math.floor(e.offsetX/sep);
		var m=Math.floor(e.offsetY/sep);
		hua_y.clearRect(0,0,100,200);
		hua.clearRect(0,0,100,200);
		if(luozi[n+'_'+m]){			
			return;	
		}
		 	//		人机
		if(AI){
			de=0;
			qizi(n,m,"black")
			clearInterval(t2);
			t1=setInterval(function(){
					hua_y.clearRect(0,0,100,200);
					miaozhen(hua_y);
				},250)
			if(panduan(n,m,"black")===5){
				$(canvas).off("click")
				$('.heisheng').addClass('hei-gg');
				$(canvas).off('click');
				chessMinual();
			}
				var p=intel();
				qizi(p.n,p.m,"white")
				de=0;
				clearInterval(t1);
				 t2=setInterval(function(){
					hua.clearRect(0,0,100,200);
					miaozhen(hua);
				},250)
				if(panduan(p.n,p.m,'white')===5){
					$('.baisheng').addClass('bai-gg');
					$(canvas).off('click');
					chessMinual();
				}
			
			return false;
		}
		//		人人
		if(luozi[n+'_'+m]){
			return
		}
		if(flag){
			de=0;
			qizi(n,m,'black');
			clearInterval(t2);
			t1=setInterval(function(){
					hua_y.clearRect(0,0,100,200);
					miaozhen(hua_y);
				},250)
			if(panduan(n,m,'black')===5){
				$('.heisheng').addClass('hei-gg');
				$(canvas).off('click');
				chessMinual();
			}
		}else{
			de=0;	
			qizi(n,m,'white');
			clearInterval(t1);
			 t2=setInterval(function(){
				hua.clearRect(0,0,100,200);
				miaozhen(hua);
			},250)
			if(panduan(n,m,'white')===5){
				$('.baisheng').addClass('bai-gg');
				$(canvas).off('click');
				chessMinual();
			}
		}
		flag=!flag;
	}
	
	
	
	$(canvas).on("click",handleclick);
	
	
	var biao=$('#biao').get(0);
	var hua=biao.getContext('2d');
	var biao_y=$('#biao-y').get(0);
	var hua_y=biao_y.getContext('2d');
	 var de=0;
		function miaozhen(q){			
			q.save();
			q.translate(50,50);		
			q.rotate(Math.PI/180 * 12 *de);
			q.beginPath();
			q.arc(0,0,5,0,Math.PI*2);
			q.moveTo(0,5);
			q.lineTo(0,10);
			q.moveTo(0,-5);
			q.lineTo(0,-30);
			q.closePath();
			q.stroke();
			q.restore();
			de+=1;
		}
		function M(n,m){
			return n+'_'+m;
		}
		
	function panduan(n,m,color){
		var hang=1;
		var i=1;
		while(luozi[M(n+i,m)]===color){hang++;i++};
		while(luozi[M(n-i,m)]===color){hang++;i++};
  
  		var lie=1;
  		while(luozi[M(n,m+i)]===color){lie++;i++};
  		while(luozi[M(n,m-i)]===color){lie++;i++};
  		
  		var zX=1;
  		while(luozi[M(n-i,m+i)]===color){zX++;i++};
  		while(luozi[M(n+i,m-i)]===color){zX++;i++};
  		
  		var yX=1;
  		while(luozi[M(n+i,m+i)]===color){yX++;i++};
  		while(luozi[M(n-i,m-i)]===color){yX++;i++};
 
 		return Math.max(hang,lie,zX,yX); 
 
  
	}

	
	
	chessMinual=function(){
		var i=1;
		if(luozi[i]==="white"){
				ctx.fillStyle="black";			
				
			}else if(luozi[i]==="black"){
				ctx.fillStyle="white";			
		}
		ctx.save();		
		ctx.font='16px/1    微软雅黑'
		ctx.textAlign="center"
		ctx.textBaseline="middle";
		for(var j in luozi){			
			var arr=j.split("_");			
			ctx.fillText(i,M(parseInt(arr[0])),M(parseInt(arr[1])));
			i++;
		}		
		if($(".look .box").find("img").length){		
			$(".look .box").find("img").attr('src',canvas.toDataURL());	
		}else{
			$("<img>").attr('src',canvas.toDataURL()).appendTo(".look .box")		
		}
		if($(".look .box").find("a").length){
			$("<a>").attr('href',canvas.toDataURL()).attr('download','qipu.png')			
		}else{
			$("<a>").attr('href',canvas.toDataURL()).attr('download','qipu.png').appendTo(".look .box");				
		}

		ctx.restore();
		
	}
	
	//	棋谱显示和消失
	$(".chess").on("click",function(){
		$(".look").addClass('kan');
		chessMinual();
	})
	
	
	$(".close").on("click",function(){
		$(".look").removeClass('kan');
	})
	
	//	再来一次、重新开始
function againnew(){
	clearInterval(t1);
	clearInterval(t2);
	hua.clearRect(0,0,100,200);
	hua_y.clearRect(0,0,100,200);
	ctx.clearRect(0,0,600,600);
		qipan();
		qizi();
		flag=true;
		luozi={};
		$(canvas).on("click",handleclick);
		$('.baisheng').removeClass('bai-gg');
		$('.heisheng').removeClass('hei-gg');
}
	$(".jixu").on("click",againnew);
	$(".cxks").on("click",againnew);

	var kai=$('#begin');
	$(kai).on('click',function(){
		$('.moshi').addClass('xuanze');	
	})
	var bang=$('#bang');
	$(bang).on('click',function(){
		$('.guize').addClass('guize-x');	
	})
	$('.guize').on('click',function(){
		$('.guize').removeClass('guize-x');	
	})
	$('.likai').on('click',function(){
		clearInterval(t1);
		clearInterval(t2);
		hua.clearRect(0,0,100,200);
		hua_y.clearRect(0,0,100,200);
		ctx.clearRect(0,0,600,600);
		qipan();
		qizi();
		flag=true;
		luozi={};
		$(canvas).on("click",handleclick);
		$('.baisheng').removeClass('bai-gg');
		$('.heisheng').removeClass('hei-gg');
		$('.kaishi').removeClass('kai-k');	
		$('.heisheng').removeClass('hei-gg');
		$('.baisheng').removeClass('bai-gg');
		$('.moshi').removeClass('xuanze');
	})
	$('#renshu').on('click',function(){
		$('.baisheng').addClass('bai-gg');
	})
	//模式切换
	$('.rvr').on('click',function(){
		AI=false;
		if(gameState==="play"){
			$(".moshi").find("li").eq(1).off("click");
		}
		$('.kaishi').addClass('kai-k');
//		$('.moshi').removeClass('xuanze');
	})
	
	$(".rvj").on("click",function(){
		AI=true;
		if(gameState==="play"){
			$(".moshi").find("li").eq(0).off("click");
		}
		$('.kaishi').addClass('kai-k');
//		$('.moshi').removeClass('xuanze');
	})
	
	
	
	//	人机

	function intel(){
		var max=-Infinity;
		var pos={};
		for(var k in kongbai){
			var x=parseInt(k.split("_")[0]);
			var y=parseInt(k.split("_")[1]);
			var l=panduan(x,y,"black");
			if(l>max){
				max=l;
				pos={n:x,m:y};
			}
		}
		var max1=-Infinity;
		var pos1={};
		for(var k in kongbai){
			var x=parseInt(k.split('_')[0]);
			var y=parseInt(k.split('_')[1]);
			var m1=panduan(x,y,"white");
			if(m1>max1){
				max1=m1;
				pos1={n:x,m:y};
			}
		}
		if(max>max1){
			return pos;
		}else{
			return pos1;
			 
		}
	
	}
	
	
	
	
})