'use strict';

(function () {

  var TranslatedTypeOfHousing = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var templateAd = window.lib.template.querySelector('.map__card');
  var nextSibling = document.querySelector('.map__filters-container');

  // Принимает число. Склоняет существительное комната по числу комнат.
  var getDeclensionOfRoom = function (num) {
    switch (num) {
      case 1: return ' комната для ';
      case 5: return ' комнат для ';
      default: return ' комнаты для ';
    }
  };

  // Принимает число. Склоняет существительное гость по числу гостей.
  var getDeclensionOfGuests = function (num) {
    return (num === 1) ? ' гостя' : ' гостей';
  };

  // Принимает объект.
  // Удаляет все дочерние элементы объекта.
  var deleteChildren = function (obj) {
    while (obj.firstChild) {
      obj.removeChild(obj.firstChild);
    }
  };

  // Принимает имя тега, класса и сождержимое текста.
  // Возвращает элемент с тегом tagName, классом className и текстом text(если есть).
  var makeElement = function (tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };

  // Принимает объект и массив.
  // Удаляет дочерние элементы объекта и создает новые дочерние объекты, с классами из массива arr.
  var createNewChildren = function (obj, arr) {
    deleteChildren(obj);
    arr.forEach(function (el) {
      var item = makeElement('li', 'popup__feature');
      item.classList.add('popup__feature--' + el);
      obj.appendChild(item);
    });
  };

  // Принимает объект и массив. Удаляет все дочерние элементы объекта. Клонирует новые элементы из шаблона, в количестве
  // равном длине массива. Назначает свойство src i-му элементу объекта, равное значению i-го элемента массива.
  var copyNewChildren = function (obj, arr) {
    deleteChildren(obj);
    arr.forEach(function (el) {
      var element = templateAd.querySelector('.popup__photo').cloneNode();
      element.src = el;
      obj.appendChild(element);
    });
  };

  // Принимает массив объектов-объявлений ads.
  // Создает копию разметки объявления из шаблона TemplateAd. Определяет содержимое выбранных элементов, в соответсвии со
  // свойствами объекта.
  var getAd = function (obj) {
    var popupAd = templateAd.cloneNode(true);
    popupAd.style = 'display: none;';
    popupAd.querySelector('.popup__avatar').src = obj.author.avatar;
    popupAd.querySelector('.popup__title').textContent = obj.offer.title;
    popupAd.querySelector('.popup__text--address').textContent = obj.offer.address;
    popupAd.querySelector('.popup__text--price').textContent = obj.offer.price + 'Р/ночь';
    popupAd.querySelector('.popup__type').textContent = TranslatedTypeOfHousing[obj.offer.type];
    popupAd.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + getDeclensionOfRoom(obj.offer.rooms) +
    obj.offer.guests + getDeclensionOfGuests(obj.offer.guests);
    popupAd.querySelector('.popup__text--time').textContent =
    'заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    createNewChildren(popupAd.querySelector('.popup__features'), obj.offer.features);
    popupAd.querySelector('.popup__description').textContent = obj.offer.description;
    copyNewChildren(popupAd.querySelector('.popup__photos'), obj.offer.photos);
    return popupAd;
  };

  // Отрисовывает сгенерированные DOM-элементы в блок .map(map) перед блоком .map__filters-cintainer(nextSibling).
  window.renderAds = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (el) {
      fragment.appendChild(getAd(el));
    });
    window.pinMain.map.insertBefore(fragment, nextSibling);
  };

})();
