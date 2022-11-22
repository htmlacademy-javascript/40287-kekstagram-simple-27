import { onModalEscKeydown, onPhotoUploadCancelClick } from './form.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const submitButton = document.querySelector('.img-upload__submit');

const checkStringLength = (string, minLength, maxLength) => string.length >= minLength && string.length <= maxLength;

const lockScroll = () => document.body.classList.add('modal-open');

const unlockScroll = () => document.body.classList.remove('modal-open');

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const resetElement = (elem) => {
  if (elem.value) {
    elem.value = '';
    return;
  }
  elem.innerHTML = '';
};

const hideElement = (elem) => elem.classList.add('hidden');

const showElement = (elem) => elem.classList.remove('hidden');

const disableElement = (elem) => elem.setAttribute('disabled', true);
const enableElement = (elem) => elem.removeAttribute('disabled');

const showErrorMessage = (message, action, escEnable) => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  errorMessage.querySelector('.error__title').textContent = message;
  errorButton.addEventListener('click', () => {
    errorMessage.remove();
    if (action) {
      action();
    }
  });
  document.body.append(errorMessage);
  document.removeEventListener('keydown', onModalEscKeydown);
  unlockSubmitButton();
  if (escEnable) {
    document.addEventListener('keydown', onErrorModalEsc);
    errorMessage.addEventListener('click', onModalMouseClick);
  }
};

function onErrorModalEsc(evt) {
  if (isEscapeKey(evt)) {
    const errorMessage = document.querySelector('.error');
    errorMessage.remove();
    document.removeEventListener('keydown', onErrorModalEsc);
    document.addEventListener('keydown', onModalEscKeydown);
  }
}

function onSuccessModalEsc(evt) {
  if (isEscapeKey(evt)) {
    const successMessage = document.querySelector('.success');
    successMessage.remove();
    document.removeEventListener('keydown', onSuccessModalEsc);
  }
}

function onModalMouseClick(evt) {
  if (!evt.target.matches('.success__inner') && !evt.target.matches('.error__inner')) {
    evt.target.remove();
    evt.target.removeEventListener('click', onModalMouseClick);
    document.removeEventListener('keydown', onErrorModalEsc);
    document.removeEventListener('keydown', onSuccessModalEsc);
    if (!(evt.target.matches('.success__button') || evt.target.matches('.success'))) {
      document.addEventListener('keydown', onModalEscKeydown);
    }
  }
}

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    successMessage.remove();
  });
  document.body.append(successMessage);
  onPhotoUploadCancelClick();
  document.addEventListener('keydown', onSuccessModalEsc);
  successMessage.addEventListener('click', onModalMouseClick);
};

const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', 'true');
  submitButton.textContent = 'Отправляю...';
};

function unlockSubmitButton() {
  submitButton.removeAttribute('disabled');
  submitButton.textContent = 'Отправить';
}

const reloadPage = () => document.location.reload();

export {
  lockScroll,
  unlockScroll,
  isEscapeKey,
  checkStringLength,
  resetElement,
  hideElement,
  showElement,
  disableElement,
  enableElement,
  showErrorMessage,
  showSuccessMessage,
  blockSubmitButton,
  unlockSubmitButton,
  reloadPage
};

