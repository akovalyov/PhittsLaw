$(document).ready(function(){
	console.log('Приветствую тебя в программе расчета по закону Фиттса - паркетное меню.');
	
	//НАЖАТИЕ_НА_КНОПКУ_ВЫБОРА_МЕНЮ_ИЗ_СПИСКА
	$('#btn-set-setting').on('click',function(){
		var name = $('.form-control').val();
		console.log('Отлично, Вы выбрали меню - '+ name +'');
		switch ( name ){
			case 'Parcket':
				console.log('Немного подождите, пока я отрисую Вам параметры для Вашего меню!');
				$('.panel-body').empty();
				$('.panel-body').append('<h4> Над сколькими пользователями Вы хотите провести эксперименты ?');
				$('.panel-body').append('<input type="text" id="menu-people"><br>');
				$('.panel-body').append('<button class="btn btn-primary" id="menu-people-btn"> Задать пользователей</button>');
				break;
			default :
				alert('Возможно скоро будет работать!');
		}
	});
	//НАЖАТИЕ_НА_КНОПКУ_ЗАДАТЬ_ПОЛЬЗОВАТЕЛЕЙ
	$('.panel-body').on('click','#menu-people-btn',function(){
		var num = parseInt($('#menu-people').val());
		if ( num == 0) {
			alert('Эммм... Навряд ли нуль человек пройдет тест..');
		} else {
			console.log('Отлично! Вы на полпути к тому чтобы все рассчитать!');
			$('.panel-body').empty();
			localStorage.setItem('userIndex',num);
			console.log('Программа сохранила информацию о ваших пользователях в localStorage');
			for ( var i = 0; i < num; i++ ){
				var m = i+1;
				$('.panel-body').append('<label>Задайте a для Пользователя ' + m +'<input type="text" id="menu-user-a-'+i+'" value="197.61" placeholder="197.61" "></label><br>');
				$('.panel-body').append('<label>Задайте b для Пользователя ' + m +'<input type="text" id="menu-user-b-'+i+'" value="155.77" placeholder="155.77" "></label><br>');
				
			}
			
			$('.panel-body').append('<button class="btn btn-primary" id="menu-people-settings"> Сохранить настрйоки пользователей</button>');
		}
	});
	//НАЖАТИЕ_НА_КНОПКУ_СОХРАНИТЬ_НАСТРОЙКИ_ПОЛЬЗОВАТЕЛЕЙ
	$('.panel-body').on('click','#menu-people-settings',function(){
		var num = localStorage.getItem('userIndex');
		console.log('Насколько я помню, у Вас - '+num+' пользователь(я)');
		for ( var i = 0 ; i < num ; i++){
			localStorage.setItem('user'+i+'a',$('#menu-user-a-'+i+'').val());
			localStorage.setItem('user'+i+'b',$('#menu-user-b-'+i+'').val());
		}
		console.log(localStorage);
		console.log('Отлично, я запомнил все ваши данные.');
		$('.panel-body').empty();
		$('.panel-body').append('Теперь задайте значения для вашего меню.<br>');
		$('.panel-body').append('Количество элементов меню <br>');
		$('.panel-body').append('<select class="form-control-parcket" id="menu-select-col"><option value="4">4</option><option value="6">6</option><option value="8">8</option></select><br>');
		$('.panel-body').append('Ширина элементов<br>');
		$('.panel-body').append('<select class="form-control-parcket" id="menu-select-width"><option value="40">40</option><option value="80">80</option><option value="120">120</option><option value="160">160</option><option value="200">200</option><option value="240">240</option><option value="280">280</option></select><br>');
		$('.panel-body').append('Высота элемента<br>');
		$('.panel-body').append('<select class="form-control-parcket" id="menu-select-height"><option value="40">40</option><option value="80">80</option><option value="120">120</option><option value="160">160</option><option value="200">200</option><option value="240">240</option><option value="280">280</option></select><br>');
		$('.panel-body').append('Расстояние между блоками фиксировано - 10 ( px )<br>');
		$('.panel-body').append('<button class="btn btn-primary" id="menu-save-menu"> Сохранить данные</button>');
	});
	//НАЖАТИЕ_НА_КНОПКУ_СОХРАНИТЬ_ЗАДАННЫЕ_ДАННЫЕ_ДЛЯ_ПОСТРОЕНИЯ_МЕНЮ
	$('.panel-body').on('click','#menu-save-menu',function(){
		console.log('Отлично, теперь по заданным параметрам я отрисую и рассчитаю характеристики для Вас!');
		localStorage.setItem('width',$('#menu-select-width').val());
		localStorage.setItem('height',$('#menu-select-height').val());
		localStorage.setItem('col',$('#menu-select-col').val());
		localStorage.setItem('width',$('#menu-select-width').val());
		console.log(localStorage);
		//ВЫЗВАТЬ_ФУНКЦИЮ_ОТРИСОВКИ
		buildMenuofCharacteristics();
	});
	
	//ФУНКЦИЯ_ОТРИСОВКИ_МЕНЮ
	function buildMenuofCharacteristics(){
		$('.panel-body').empty();
		console.log('Теперь я возьмусь за Ваше меню, для начала получим все данные из локального хранилища!');
		var num = localStorage.getItem('col');
		var inter = 0;
		for ( var i = 0; i < 2; i++){
			$('.panel-body').append('<tr class="tr-'+i+'"></tr>');
			for ( var j = 0; j < num / 2; j++){
				var h = inter + 1;
				$('.tr-'+i+'').append('<td><div class="menu-item" id="menu-'+inter+'" data-inter='+inter+' data-j='+j+' data-tr='+i+'>'+h+'</div></td>');
				$('.menu-item').css({'width':localStorage.getItem('width'),'height':localStorage.getItem('height')});
				$('td').css({'padding':10});
				inter++;
			}
		}
		//ПЕРЕБОР_ЭЛЕМЕНТОВ_МЕНЮ
		var mas = []; //МАССИВ_ДЛЯ_D
		var mass = [];//МАССИВ_ДЛЯ_W
		var elemInterIndex = parseInt(localStorage.getItem('col'));
		var elemInter = elemInterIndex ;
		var elemTr = 0;
		/*for ( var ii = 0; ii < 2; ii++ ) {
			mass[ii] = [];
			elemTr++;
			for ( var jj = 0; jj < num / 2 ; jj++ ){
				if ( elemTr = ii ) {
					//проверка, стоят ли элементы на одной строке
					 if ( elemInter == jj ) {
						 mass[ii][jj] = 0;
						 elemInter ++;
					 } else {
						 if ( elemInter < jj ) {
							 var razn = jj - elemInter;
							//смотрю, есть ли разница между элементами, стоящими на одной строке
							mass[ii][jj] = parseInt(localStorage.getItem('width')) * razn;
							elemInter++;
						 }
					 } 
				} else {
					//если элементы расположены на разных строках
					if ( elemInter == jj ) {
						mass[ii][jj] = parseInt(localStorage.getItem('height'));
						elemInter++;
					} else {
						if ( elemInter < jj ) {
							 //вызов функции рассчета расстояния
							 var numm = jj*(ii+1);
							 mass[ii][jj] = mathW('#menu-'+elemInter+'','#menu-'+numm+'')*2;
							 elemInter++;
						 }
					}
				}
			}
		}*/
		//РАССЧЕТ_W
		
		for ( var ii = 0; ii < elemInterIndex ; ii ++){
			mass[ii] = [];
			for ( var jj = 0; jj < elemInterIndex; jj ++ ){
				
				if ( $('#menu-'+ii+'').data('tr') == $('#menu-'+jj+'').data('tr')){
					//если элементы на одной строке
					if ( $('#menu-'+ii+'').data('inter') == $('#menu-'+jj+'').data('inter') ){
						mass[ii][jj] = 0;
						
					} else {
						var numElemii = $('#menu-'+ii+'').data('inter'); // inter первого элемента
						var numElemjj = $('#menu-'+jj+'').data('inter'); // inter второго элемента
						var razn = Math.abs( parseInt(numElemjj - numElemii));
						mass[ii][jj] = parseInt(localStorage.getItem('width') * razn) + 10;
						 
					}
					
				} else {
					if ( $('#menu-'+ii+'').data('inter') == $('#menu-'+jj+'').data('inter') || $('#menu-'+ii+'').data('j') == $('#menu-'+jj+'').data('j') ){
						mass[ii][jj] = parseInt(localStorage.getItem('height')) + 10;
						
					} else {
						mass[ii][jj] = mathW('#menu-'+ii+'','#menu-'+jj+'')*2;
						
					}
				}
			}
		}
		//РАССЧЕТ_D
		
		for ( var iii = 0; iii < elemInterIndex ; iii ++){
			mas[iii] = [];
			for ( var jjj = 0; jjj < elemInterIndex; jjj ++ ){
				
				mas[iii][jjj] = mathD('#menu-'+iii+'','#menu-'+jjj+'');
				
			}
		}
		
		//РАСЧЕТ_СРЕДНИХ_ЗНАЧЕНИЙ-С_УЧЕТОМ_ПОЛЬЗОВАТЕЛЕЙ
		var massW = 0; // средние значения W для каждого элемента
		var massD = 0; //  средние значения D для каждого элемента
		var massWW = 0;
		var massDD = 0;
		var massWWW = []; //массив Wi средних
		var massDDD = []; //массив Di средних
		var ign = 0; //переменная для подсчета массива выше - > Di средних и Wi средних
		var massT = 0;
		var num = parseInt(localStorage.getItem('userIndex'));
		for ( var u = 0; u < num; u++ ) {
			/*localStorage.setItem('user'+i+'a',$('#menu-user-a-'+i+'').val());
			localStorage.setItem('user'+i+'b',$('#menu-user-b-'+i+'').val());*/
			var a = parseInt( localStorage.getItem('user'+u+'a'));
			console.log(a);
			var b = parseInt( localStorage.getItem('user'+u+'b'));
			console.log(b);
			var uu = u + 1;
			$('.panel-body').append('Значения для Пользователя '+uu+' где a = '+a+' , а b = '+b+' <br>');
			$('.panel-body').append('<div class="table-responsive-'+u+'"><table class="table table-bordered table-hover"><tbody class="menu-table-user-'+u+'"></tbody>');
			for ( var k = 0; k < elemInterIndex ; k++ ){
				if ( k == elemInterIndex - 1 ) {
					var kk = k + 1;
					//$('.menu-table-user-'+u+'').append('<tr id="trus-'+kk+'"></tr>');
					massWW = massWW / parseInt(localStorage.getItem('col'));
					massDD = massDD / parseInt(localStorage.getItem('col'));
					massT = a + b * Math.log(massDD / massWW + 1);
					$('.menu-table-user-'+u+'').append('<tr id="trus-'+k+'"></tr>');
					$('.menu-table-user-'+u+'').append('<td></td><td>Среднее значение W = '+massWW.toFixed(3)+'</td><td>Среднее значение D = '+massDD.toFixed(3)+'</td><td> Среднее значение T = '+massT.toFixed(3)+'</td>');
				} else {
					$('.menu-table-user-'+u+'').append('<tr id="trus-'+k+'"></tr>');
				}
				for ( var l = 0; l < elemInterIndex; l++) {
					if ( l == elemInterIndex - 1 ) {
						massW+=mass[k][l];
						massD+=mas[k][l];
						
						massW = massW / elemInter;
						massD = massD / elemInter;
						
						massWW+=massW;
						massDD+=massD;
						
						var T = a + b * Math.log(massD/massW + 1);
						
						var hh = k + 1;
						
						$('.menu-table-user-'+u+' #trus-'+k+'').append('<td>Элемент - '+hh+'</td><td>'+massW.toFixed(3)+'</td><td>'+massD.toFixed(3)+'</td><td>'+T.toFixed(3)+'</td>');
						massDDD[ign] = massD;
						massWWW[ign] = massW;
						ign++;
						massW = 0;
						massD = 0;
					} else {
						massW+=mass[k][l];
						massD+=mas[k][l];
					}
					
					
				}
			}
			console.log(mas);
					console.log(mass);
		}
		
		console.log('Виски уже начал кончаться , но мы все же досчитали этот страх... Пора перейти к отображению всего этого счастья пользователю');
		//ОТРИСОВКА_ТАБЛИЦЫ
		$('.panel-body').append('Значения Dij<br>');
		$('.panel-body').append('<div class="table-responsive"><table class="table table-bordered table-hover"><tbody class="menu-table-w"></tbody>');
		for ( var m = 0; m < elemInterIndex; m++ ){
			$('.menu-table-w').append('<tr id="tr-'+m+'"></tr>');
			for ( var l = 0; l < elemInterIndex; l++ ) {
				
				$('#tr-'+m+'').append('<td>'+mas[m][l].toFixed(3)+'</td>');
			}
		}
		$('.panel-body').append('Значения Wij<br>');
		$('.panel-body').append('<div class="table-responsive"><table class="table table-bordered table-hover"><tbody class="menu-table-d"></tbody>');
		for ( var mm = 0; mm < elemInterIndex; mm++ ){
			$('.menu-table-d').append('<tr id="trd-'+mm+'"></tr>');
			for ( var ll = 0; ll < elemInterIndex; ll++ ) {
				$('#trd-'+mm+'').append('<td>'+mass[mm][ll].toFixed(3)+'</td>');
			}
		}
		//РАСЧЕТ_ХАРАКТЕРИСТИК_С_УЧЕТОМ_ВЕРОЯТНОСТЕЙ
		$('.panel-body').append('Давайте представим, что у Вас есть свой сайт на котором надо расположить элементы меню.</br>');
		$('.panel-body').append('Отрисуем таблицу вероятностей выбора меню ( на данный момент это подходит только для 6 пунктов).</br>');
		$('.panel-body').append('<div class="table-responsive"><table class="table table-bordered table-hover"><tbody><tr><td>1. Моя страница </td><td>0.25</td></tr><tr><td>2. Мои партнеры </td><td>0.17</td></tr><tr><td>3. Мои заказы </td><td>0.15</td></tr><tr><td>4. Сообщения </td><td>0.13</td></tr><tr><td>5. Мои компании </td><td>0.1</td></tr><tr><td>6. Люди </td><td>0.2</td></tr></tbody><br>');
		var massVerFirst = [0.25,0.13,0.15,0.2,0.1,0.17]; //массив вероятностей для первого варианта
		
		$('.panel-body').append('Рассчитаем при последовательности меню (1) - > Моя страница , Мои партнеры, Мои заказы , Сообщения, Мои компании, Люди.</br>');
		var sumD = 0;
		var sumW = 0;
		for ( var ls = 0; ls < massDDD.length; ls++) {
			sumD = sumD + massVerFirst[ls] * massDDD[ls];
			sumW = sumW + massVerFirst[ls] * massWWW[ls];
		}
		var tVerFirst = a + b * Math.log( sumD / sumW + 1);
		$('.panel-body').append('В этом случае Dср = '+sumD+', Wср = '+sumW+', Tср = '+tVerFirst+'<br>');
		$('.panel-body').append('Рассчитаем при последовательности меню (2) - > Моя страница , Сообщения, Мои партнеры , Люди, Мои компании, Мои заказы.</br>');
		sumD = 0;
		sumW = 0;
		var massVerTwo = [0.13,0.25,0.15,0.1,0.2,0.17];
		for ( var lss = 0; lss < massDDD.length; lss++) {
			sumD = sumD + massVerTwo[lss] * massDDD[lss];
			sumW = sumW + massVerTwo[lss] * massWWW[lss];
		}
		var tVerTwo = a + b * Math.log( sumD / sumW + 1);
		$('.panel-body').append('В этом случае Dср = '+sumD+', Wср = '+sumW+', Tср = '+tVerTwo+'<br>');
	}
	//ФУНКЦИЯ_РАСЧЕТА_W
	function mathW(div1,div2){
		//ПОСТРОИМ_УРАВНЕНИЕ_ПРЯМЫХ_ДЛЯ_ОДНОГО_И_ДРУГОГО_БЛОКА
		var linew = 0;
		var x1 = $(div1).offset().left + $(div1).width() / 2;
		var y1 = $(div1).offset().top + $(div1).height() / 2; //X_Y_ПЕРВОГО_БЛОКА_СЕРЕДИНЫ
		var x2 = $(div2).offset().left + $(div2).width() / 2;
		var y2 = $(div2).offset().top + $(div2).height() / 2; //X_Y_ВТОРОГО_БЛОКА_СЕРЕДИНЫ
		
		var w = Math.abs(x2 - x1);
		var h = Math.abs(y2 - y1);
		linew = (($(div2).width() / 2) / Math.cos(Math.atan( h / w)));
		
		return linew;
	}
	//ФУНКЦИЯ_РАСЧЕТА_D
	function mathD(div1,div2){
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
	//ФУНКЦИЯ_ОТРИСОВКИ_ТАБЛИЦЫ_D_W_IJ
	function drawTable(mas){
		$('.panel-body').append('<div class="table-responsive"><table class="table table-bordered table-hover"><tbody class="menu-table-w"></tbody>');
		var elemInterIndex = parseInt(localStorage.getItem('col')); // количество элементов
		for ( var i = 0; i < elemInterIndex; i++ ){
			$('.menu-table-w').append('<tr id="tr-'+i+'"></tr>');
			for ( var j = 0; j < elemInterIndex; j++ ) {
				$('tr-'+i+'').append('<td>'+mas[i][j]+'</td>');
			}
		}
	}
});
