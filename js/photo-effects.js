import {hideElement, showElement} from './util.js';

const effectList= document.querySelector('.effects__list');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectField = document.querySelector('.img-upload__effect-level');
const imagePreview = document.querySelector('.img-upload__preview img');

const photoEffects = {
  'effect-chrome': {
    effect: 'chrome',
    filter: 'grayscale',
    units: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  'effect-sepia': {
    effect: 'sepia',
    filter: 'sepia',
    units: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  'effect-marvin': {
    effect: 'marvin',
    filter: 'invert',
    units: '%',
    min: 0,
    max: 100,
    step: 1
  },
  'effect-phobos': {
    effect: 'phobos',
    filter: 'blur',
    units: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  'effect-heat': {
    effect: 'heat',
    filter: 'brightness',
    units: '',
    min: 1,
    max: 3,
    step: 0.1
  },
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

let filter;
let units;

effectSlider.noUiSlider.on('update', (value) => {
  imagePreview.style.filter = `${filter}(${value}${units})`;
  effectValue.value = value;
});

const updateSlider = ({min, max, step}) => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start: max,
    step,
  });
};

effectList.addEventListener('click', (evt) => {
  if (evt.target.id !== 'effect-none') {
    const chosenEffect = photoEffects[evt.target.id];
    filter = chosenEffect.filter;
    units = chosenEffect.units;
    imagePreview.className = `effects__preview--${chosenEffect.effect}`;
    updateSlider(chosenEffect);
    showElement(effectField);
  } else {
    hideElement(effectField);
    imagePreview.className = '';
    imagePreview.style.filter = '';
  }
});
export {effectField};
