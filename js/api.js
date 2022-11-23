import { showErrorMessage, showSuccessMessage, reloadPage } from './util.js';

const dataGetInfo = 'https://27.javascript.pages.academy/kekstagram-simple/data';
const dataPostInfo = 'https://27.javascript.pages.academy/kekstagram-simple';

const getData = async () => fetch(dataGetInfo)
  .then((response) => response.json())
  .catch(() => showErrorMessage('Ошибка при загрузке данных с сервера', reloadPage));

const sendData = (body) => {
  fetch(dataPostInfo,
    {
      method: 'POST',
      body
    },
  )
    .then((response) => {
      if (response.ok) {
        showSuccessMessage();
        return;
      }
      showErrorMessage('Не удалось отправить форму', false, true);
    })
    .catch(() => {
      showErrorMessage('Не удалось отправить форму', false, true);
    });
};

export { getData, sendData };
