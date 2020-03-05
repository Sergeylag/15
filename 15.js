var arr = [], game,counter=0, ei,ej;						
// меняем ячейеки массива местами
function swap(arr,i1,j1,i2,j2){				
	t = arr[i1][j1];
	arr[i1][j1] = arr[i2][j2];
	arr[i2][j2] = t;
}
//запускаем игру послезагрузки страницы
window.onload = function() {				
	game = document.getElementById("game");
	newGame();				
}
//при нажатии на соседнюю от пустой ячейку меняем их содержимое местами
function cellClick(event) {
	var event = event || window.event,
		el = event.srcElement || event.target,
		i = el.id.charAt(0),
		j = el.id.charAt(2),
		ki=ei,
		kj=ej;
	if((i == ei && Math.abs(j - ej) == 1) || (j == ej && Math.abs(i - ei) == 1)){	
//--------------анимация-----------------
let start = Date.now();

      let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        	if(ki==ei&&kj>ej){
						document.getElementById(ei + " " + ej).style.left = timePassed / 8 + 'px';
					}else if(ki==ei&&kj<ej){
						document.getElementById(ei + " " + ej).style.right = timePassed / 8 + 'px';
					}else if(ki>ei&&kj==ej){
						document.getElementById(ei + " " + ej).style.top = timePassed / 8 + 'px';
					}else if(ki<ei&&kj==ej){
						document.getElementById(ei + " " + ej).style.bottom = timePassed / 8 + 'px';
					}
        if (timePassed > 500) {clearInterval(timer);
        	document.getElementById(ki + " " + kj).innerHTML = el.innerHTML;
					el.innerHTML = "";
					document.getElementById(ki + " " + kj).style = 'border: 1px solid #ffb300;';
					el.style = 'border: 1px solid yellow; background-color: yellow; z-index: -1;';
// проверяем содержимое таблици на наличие верной комбинации
							var q = true;
							for(i = 0; i < 4; ++i)
								for(j = 0; j < 4; ++j)
									if(i + j != 6 && document.getElementById(i + " " + j).innerHTML != i*4 + j + 1){
										q = false;
										break;
									}
									if(q) alert("Victory!");
        }
      }, 20);
		ei = i;
		ej = j;
		counter++;
		document.getElementById("step").innerHTML = "Ходов: " + counter;
			}
}
function newGame(){			//Создаём функцию новой игры
// Заполняем массив номерами костяшек по порадку
//			 1  2  3  4
//			 5  6  7  8
//			 9  10 11 12
//			 13 14 15 _ 
	for(i = 0; i < 4; ++i){
		arr[i] = []
		for(j = 0; j < 4; ++j){
			if(i + j != 6)
				arr[i][j] = i*4 + j + 1;
			else
				arr[i][j] = "";
		}
	}
// Запоминаем индексы пустого элемента
	ei = 3;
	ej = 3;
// цикл перемешивания массива
	for(i = 0; i < 1050; ++i)
		switch(Math.round(3*Math.random())){
			case 0: if(ei != 0) swap(arr,ei,ej,--ei,ej); break; // up
			case 1: if(ej != 3) swap(arr,ei,ej,ei, ++ej); break; // right
			case 2: if(ei != 3) swap(arr,ei,ej,++ei,ej); break; // down
			case 3: if(ej != 0) swap(arr,ei,ej,ei,--ej); // left
		}
// создаём таблицу, зносим в неё значения перемешанного массива
	var table = document.createElement("table"),
		tbody = document.createElement("tbody");					
	table.append(tbody);
	for(i = 0; i < 4; ++i){
		var row = document.createElement("tr");
		for(j = 0; j < 4; ++j){
			var cell = document.createElement("td");
				cell.id = i + " " + j;
				cell.onclick = cellClick;
				cell.innerHTML = arr[i][j];
				if(cell.innerHTML == ""){
				cell.style = 'border: 1px solid yellow; background-color: yellow;';
			}
				row.append(cell);
		}
		tbody.append(row);					
	}
// очищаем содержимое game  и добавляем в него созданую таблицу
	if(game.childNodes.length == 1)
		game.remove(game.firstChild);	
	game.append(table);	
document.getElementById("step").innerHTML ="Ходов: " + counter;
}


