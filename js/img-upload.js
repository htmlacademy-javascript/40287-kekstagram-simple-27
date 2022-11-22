
import {
  resetElement,
  hideElement,
  enableElement,
  disableElement,
  showElement,
  lockScroll,
  unlockScroll,
  unlockSubmitButton,
  isEscapeKey
} from './util.js';

import {
  uploadModal,
  imagePreview,
  commentSymbolsCountOutput,
  commentSymbolsCount,
  uploadCancel,
  uploadInput,
  scaleControlSmaller,
  scaleControlBigger,
  description,
  resetScaleValue,
  setControlValue
} from './form.js';

import {effectField} from './photo-effects.js';

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

function onPhotoUploadCancelClick() {
  hideElement(uploadModal);
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

uploadInput.addEventListener('change', onPhotoUploadInputChange);

export { onModalEscKeydown, onPhotoUploadCancelClick };
