$(document).ready(function(){
	console.log('hi im menu-math!');
	/*var x1 = $("#div1").offset().left + $("#div1").width() / 2;
	var y1 = $("#div1").offset().top + $("#div1").height() / 2;
	var x2 = $("#div2").offset().left + $("#div2").width() / 2;
	var y2 = $("#div2").offset().top + $("#div2").height() / 2;
	var line = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
	console.log(line);*/
	function MathMenuStr(){
	var linedv2 = MathMenu("#div1","#div2");
	console.log(linedv2);
	var linedv3 = MathMenu("#div1","#div3");
	console.log(linedv3);
	var linedv4 = MathMenu("#div1","#div4");
	console.log(linedv4);
	var W = ($("#div1").width() + $("#div2").width() + $("#div3").width() + $("#div4").width())/ 4 ;
	var D = (linedv2 + linedv3 + linedv4) / 3 ;
	var DW = D / W;
	var srDW = D / Math.log(W + 1);
	var a = 150;
	var b = 250;
	var T = a + b * Math.log(D/W + 1);
	$(".td").remove();
	$("#tbtr").after('<td class="td">'+ W +'</td><td class="td">'+ D +'</td><td class="td">'+DW+'</td><td class="td">'+srDW+'</td><td class="td">'+T+'</td>');
	//W - ширина
	//D - дистанция между обьектами
	}
	function MathMenu(div1,div2){
		console.log(div1);
		console.log(div2);
		var x1 = $(div1).offset().left + $(div1).width() / 2;
		var y1 = $(div1).offset().top + $(div1).height() / 2;
		var x2 = $(div2).offset().left + $(div2).width() / 2;
		var y2 = $(div2).offset().top + $(div2).height() / 2;
		var line = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
		//console.log(line);
		return line;
	}
	$("#btn").on('click',function(){
			//alert($('#select').val()+' '+ $('#width').val());
			console.log($('.select').val());
			$($('.select').val()).css({width:$('#width').val()});
			MathMenuStr();

	});
	
});