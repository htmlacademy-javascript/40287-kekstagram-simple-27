import { sendData } from './api.js';
import { checkStringLength, blockSubmitButton, lockScroll, unlockScroll, resetElement, isEscapeKey, hideElement, showElement, unlockSubmitButton, enableElement, disableElement } from './util.js';


const MIN_COMMENT_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const uploadInput = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadCancel = uploadModal.querySelector('#upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');
const description = uploadForm.querySelector('.text__description');
const commentSymbolsCount = uploadForm.querySelector('.symbols-count');
const commentSymbolsCountOutput = uploadForm.querySelector('.symbols-count__output');
const imagePreview = uploadModal.querySelector('.img-upload__preview img');
const scaleControlValue = uploadModal.querySelector('.scale__control--value');
const scaleControlSmaller = uploadModal.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadModal.querySelector('.scale__control--bigger');
const effectField = uploadForm.querySelector('.img-upload__effect-level');


const SCALE_STEP = 0.25;
const MIN_SCALE = 0.25;
const MAX_SCALE = 1;

let scaleValue = MAX_SCALE;

function onPhotoUploadCancelClick() {
  hideElement(uploadModal );
  resetElement(uploadInput);
  unlockScroll();

  uploadCancel.removeEventListener('click', onPhotoUploadCancelClick);
  document.removeEventListener('keydown', onModalEscKeydown);
}

function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    hideElement(uploadModal);
    resetElement(uploadInput);
    unlockScroll();

    uploadCancel.removeEventListener('click', onPhotoUploadCancelClick);
    document.removeEventListener('keydown', onModalEscKeydown);
  }
}

const resetScaleValue = () => {
  scaleValue = MAX_SCALE;
};

const setControlValue = () => {
  scaleControlValue.value = `${scaleValue * 100 }%`;
};
const setImageScale = () => {
  imagePreview.style.transform = `scale(${scaleControlValue.value})`;
};

scaleControlSmaller.addEventListener('click', () => {
  scaleValue -= SCALE_STEP;
  setControlValue();
  if (scaleValue === MIN_SCALE) {
    disableElement(scaleControlSmaller);
  }
  enableElement(scaleControlBigger);
  setImageScale();
});

scaleControlBigger.addEventListener('click', () => {
  scaleValue += SCALE_STEP;
  setControlValue();
  if (scaleValue === MAX_SCALE) {
    disableElement(scaleControlBigger);
  }
  enableElement(scaleControlSmaller);
  setImageScale();
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const validateComment = (value) => checkStringLength(value, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH);
pristine.addValidator(description, validateComment, `от ${MIN_COMMENT_LENGTH} до ${MAX_COMMENT_LENGTH} символов`);

const onCommentFieldChange = () => {
  commentSymbolsCountOutput.textContent = description.value.length;
};

description.addEventListener('input', onCommentFieldChange);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    sendData(formData);
    blockSubmitButton();
  }
});

const clearCommentSymbolsCount = () => {
  commentSymbolsCount.classList.remove('symbols-count--invalid');
  resetElement(commentSymbolsCountOutput);
};

const clearEffects = () => {
  const effectNone = document.querySelector('#effect-none');
  effectNone.checked = true;
  imagePreview.style.filter = '';
  imagePreview.className = '';
  imagePreview.style.transform = '';
};

const removeErrorMessage = () => {
  const errorMessage = uploadModal.querySelector('.form__error');
  if (errorMessage) {
    resetElement(errorMessage);
  }
};

const resetPhotoUploadWindow = () => {
  clearEffects();
  hideElement(effectField);
  clearCommentSymbolsCount();
  removeErrorMessage();
  resetElement(description);
  resetScaleValue();
  setControlValue();
  enableElement(scaleControlSmaller);
  disableElement(scaleControlBigger);
};

function onPhotoUploadInputChange() {

  imagePreview.src = URL.createObjectURL(uploadInput.files[0]);

  showElement(uploadModal);
  unlockSubmitButton();
  lockScroll();

  uploadCancel.addEventListener('click', onPhotoUploadCancelClick);
  document.addEventListener('keydown', onModalEscKeydown);
  resetPhotoUploadWindow();
}

uploadInput.addEventListener('change', onPhotoUploadInputChange);

export {
  onModalEscKeydown,
  onPhotoUploadCancelClick,
  uploadModal,
  imagePreview,
  commentSymbolsCountOutput,
  commentSymbolsCount,
  resetScaleValue,
  setControlValue,
  uploadCancel,
  uploadInput,
  scaleControlSmaller,
  scaleControlBigger,
  description,
};
