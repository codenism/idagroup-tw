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
// Валидация формы
function validateForm(){
	cardNumberVal();
	cardOwner();
	cvvCode();
	isValid();
};
function isValid(){
	var items = document.querySelectorAll(".card__form form input");
	var valid = true;
	Array.from(items).forEach(function(item) {
		if (item.classList.contains("empty")){
			valid = false;
		}
	});
	if (valid == true) {
		document.querySelector(".payment__card_row").style.display = "none";
		document.getElementById("payment__result").style.display = "block";
	}
};
// Проверка вводимых данных для конкретного поля
function cardNumberKey() {
	var cardnumbers = document.getElementsByClassName("card__number_row_field");
	Array.prototype.forEach.call(cardnumbers, function (cardnumber){
		cardnumber.onkeypress = function(e) {
			e = e || event;

			if (e.ctrlKey || e.altKey || e.metaKey) return;

			var chr = getChar(e);

			if (chr == null) return;

			if (chr < '0' || chr > '9') {
				return false;
			}
		};
	});
};
// Проверка вводимого символа
function getChar(event) {
	if (event.which == null) {
		if (event.keyCode < 32) return null;
return String.fromCharCode(event.keyCode) // IE
}
if (event.which != 0 && event.charCode != 0) {
	if (event.which < 32) return null;
return String.fromCharCode(event.which) // остальные браузеры
}
return null;
}
// Валидация номера карты
function cardNumberVal(){
	var fields = document.getElementsByClassName('card__number_row_field');
	Array.prototype.forEach.call(fields, function (field){
		if (field.value.length == 4) {
			if (field.classList.contains('empty')) {
				field.classList.remove('empty');	
			}
			field.classList.add('filled');
		}
		else {
			if (field.classList.contains('filled')){
				field.classList.remove('filled');	
			}
			field.classList.add('empty');
		}
	});
};
// Валидация держателя карты
function cardOwner(){
	var ownField = document.getElementById("card__owner_id");
	var regex = new RegExp(/^[a-zA-Z]+$/);
	if (regex.test(ownField.value) && ownField.value.length > 3) {
		if (ownField.classList.contains("empty")) {
			ownField.classList.remove("empty");
		}
		ownField.classList.add("filled");
	}
	else {
		if (ownField.classList.contains("filled")) {
			ownField.classList.remove("filled");
		}
		ownField.classList.add("empty");
	}
};
// Проверка cvv на вводе
function cvvKey() {
	var cvv = document.getElementById("card__code_cvv");
	cvv.onkeypress = function(e) {
		e = e || event;

		if (e.ctrlKey || e.altKey || e.metaKey) return;

		var chr = getChar(e);

		if (chr == null) return;

		if (chr < '0' || chr > '9') {
			return false;
		}
	};
};
// Валидация cvv
function cvvCode(){
	var cvv = document.getElementById("card__code_cvv");
	if (cvv.value.length == 3) {
		if (cvv.classList.contains("empty")) {
			cvv.classList.remove("empty");
		}
		cvv.classList.add("filled");
	}
	else {
		if (cvv.classList.contains("filled")) {
			cvv.classList.remove("filled");
		}
		cvv.classList.add("empty");
	}
};

// Кастомные селекты
function customSelect(){
	customSelectCreate();
	customSelectChosen();
	customSelectClick();
	selectItem();
}
// parents
function parents (el, cls) {
	while ((el = el.parentElement) && !el.classList.contains(cls));
	return el;
}
// Формирование кастомного селекта
function customSelectCreate(){
	var options = document.querySelectorAll(".hidden__select option");
	for (var i = 0; i < options.length; i++) {
		var parent = options[i].parentElement.parentElement.parentElement.querySelector(".js__select_dropdown");
		var newlist = document.createElement('li');
		newlist.innerHTML = options[i].value;
		parent.querySelector('ul').appendChild(newlist);
	}
};

// Отображение значения в кастомном селекте
function customSelectChosen(){
	var select = document.getElementsByClassName("hidden__select");
	Array.from(select).forEach(function(item){
		var string = item.querySelector("select option:checked");
		item.parentElement.querySelector(".js__select_item").innerHTML = string.value;
	});
};
// Смена значения в кастомном селекте
function customSelectClick(){
	var items = document.querySelectorAll(".js__select_dropdown li");
	Array.from(items).forEach(function(item){
		item.addEventListener("click", function(){
			customSelectChange(this);
		});
	});
};
// Смена значения в скрытом селекте при нажатии на новый js-селект
function customSelectChange(btn){
	var newval = btn.innerHTML;
	var hiddensel = parents(btn, "card__date_manipulate");
	hiddensel.querySelector(".hidden__select select").value = newval;
	hiddensel.querySelector(".hidden__select select").change;
	customSelectChosen();
	closeSelect();
};
// Отображение активного js-селекта
function selectItem(){
	var items = document.getElementsByClassName("js__select_item");
	Array.from(items).forEach(function(item){
		item.addEventListener("click", function(){
			closeSelect();
			this.parentElement.querySelector(".js__select_dropdown").style.display = "block";
		});
	});
};
// Закрыть все открытые селекты
function closeSelect(){
	var selects = document.getElementsByClassName("js__select_dropdown");
	Array.from(selects).forEach(function(select){
		select.style.display = "none";
	});
};

document.addEventListener('DOMContentLoaded', function () {
	navBtnClick();
});
document.addEventListener('DOMContentLoaded', function () {
	cardNumberKey();
});
document.addEventListener('DOMContentLoaded', function () {
	cvvKey();
});
document.addEventListener('DOMContentLoaded', function () {
	customSelect();
});
document.addEventListener('change', function () {
	customSelectChosen();
});