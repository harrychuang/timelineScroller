$(function(){
		
	/*初始函式*/
	init();
	
	function init(){
		
		/*window resize函式*/
		$(window).resize(function(e) {
			resizeHandler();
	   });
		resizeHandler();
		
		/*scroller函式*/
		$(window).scroll(function(e) {
			winScrollHandler(winPercent);
		});
		
		/*menu函式*/
		menuSetHandler();
		
	};
	
	/*menu按鈕函式*/
	var scrollPos = 0;
	
	function menuSetHandler(){
		
		$('#mainMenu li').click(function(e) {
		   scrollPos = ( labels[ $(this).index() ].time / tl.totalDuration() )*( $('#scrollBox').height() - sh );
		   TweenLite.to($("body, html"), 1.5, { scrollTop:scrollPos, ease:Power1.easeOut});
	   });
		
	};
	
	
	/*window scroller*/
	var winTop = 0;
	var winPercent = 0;
			
	function winScrollHandler(winPos){
		
		winTop = $(window).scrollTop();
		winPercent = (winTop/($('#scrollBox').height()-sh));	//scroller 百分比
		
		/*修正初始值*/
		if(winPercent <= 0){ 
			winPercent = 0 
		}else if(winPercent >= 1){ 
			winPercent = 1 
		};
		
		/*scroller的作動*/
		if(tl){ tl.totalProgress(winPercent); };
		
		/*測試值*/
		testTxtHandler();
		
	};
	
	function testTxtHandler(){
		$('#testTxt').text('winTop:' + winTop + ' ,percent:' + winPercent);
	};
	
	/*timeline 動畫動態*/
	var tl;	
	var labels;
	
	function timelineSetHandler(){
		
		tl	= new TimelineMax({paused:true});
		
		/*設定動態*/
		
		//第一段動畫
		tl.from("#logo", 2, {top:1000, ease:Quart.easeOut})
		  .add("label_01");
		  
		//第二段動畫
		tl.to("#logo", 2, {top:-100, delay:1, ease:Power1.easeIn})
		  .from("#img01", 3, {top:1000, ease:Quart.easeOut}, '-=2')
		  .add("label_02");
		
		//第三段動畫
		tl.from("#end", 2, {rotation:120, left:-2000, top:1000, ease:Power1.easeInOut})
		  .to("#img01", 1, {rotation:120, left:2000, top:0, ease:Power1.easeInOut}, '-=0.9')
		  .add("label_03");
		
		//取得標籤陣列
		labels = tl.getLabelsArray();
		
	};
	
	function action01(pos){
		console.warn(pos)
	};
	
	/*resize handler*/
	var sw;
	var sh;
	
	function resizeHandler(){
		
		sw = $(window).innerWidth();
		sh = $(window).innerHeight();
		
		/*設定所有物件的初始位置*/
		TweenLite.to($("#logo"), 0, { rotation:0, left:sw/2 - $('#logo').width()/2, top:sh/2 - $('#logo').height()/2 });
		TweenLite.to($("#img01"), 0, { rotation:0, left:sw/2 - $('#img01').width()/2, top:sh/2 - $('#img01').height()/2 });
		TweenLite.to($("#end"), 0, { rotation:0, left:sw/2 - $('#end').width()/2, top:sh/2 - $('#end').height()/2 });
		
		/*設定動態函式*/
		timelineSetHandler();			
		/*scroller reset*/
		winScrollHandler(winPercent);
		
	};
	
});