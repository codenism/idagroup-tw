// Функция проверки текущего состояния меню (открыто/закрыто)
function navMenuState(menu){
	var state = menu.style.display;
	if (state == "block") {
		menu.style.display = "none";
	}
	else {
		menu.style.display = "block";
	}
};
// Функция для обработки клика по кнопке мобильного меню
function navBtnClick(){
	document.getElementById("menu__nav_btn_id").onclick = function(){
		var menu = document.getElementById("menu__id");
		navMenuState(menu);
	};
};
window.onload = navBtnClick;