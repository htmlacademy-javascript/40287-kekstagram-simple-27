import { getData } from './api.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const makePicture = (photo) => {
  const picture = template.cloneNode(true);
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;

  return picture;
};

const addPictures = (thumbnails) => {
  const fragment = document.createDocumentFragment();
  thumbnails.forEach((item) => {
    fragment.appendChild(makePicture(item));
  });
  picturesContainer.appendChild(fragment);
};

getData()
  .then((thumbnails) => addPictures(thumbnails));
