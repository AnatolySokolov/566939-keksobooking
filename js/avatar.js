'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var preview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__input');
  var photoList = document.querySelector('.ad-form__photo-container');

  var makeElement = function (tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    return element;
  };

  var onAvatarLoad = function (evt) {
    preview.src = evt.target.result;
  };

  var onPhotoLoad = function (evt) {
    var item = makeElement('img', 'ad-form__photo');
    item.src = evt.target.result;
    photoList.appendChild(item);
  };

  var createReader = function (list, onLoad) {
    Array.from(list).forEach(function (el) {
      var fileName = el.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', onLoad);
        reader.readAsDataURL(el);
      }
    });
  };

  var onAvatarChange = function () {
    var files = avatarChooser.files;
    createReader(files, onAvatarLoad);
  };

  var onPhotoChange = function () {
    var files = photoChooser.files;
    createReader(files, onPhotoLoad);
  };

  photoList.removeChild(document.querySelector('div.ad-form__photo'));
  avatarChooser.addEventListener('change', onAvatarChange);
  photoChooser.addEventListener('change', onPhotoChange);

})();
