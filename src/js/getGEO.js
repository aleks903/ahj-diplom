function callPopup(msg, popup) {
  const title = 'Что-то пошло не так';
  popup.showPopup('get', title, msg);
}

export default function getGEO(popup) {
  console.log('getGeo');
  const elPopupInput = document.querySelector('.popup-inp');
  const elPopupCancel = document.querySelector('.popup-cancel');
  const elPopupOk = document.querySelector('.popup-ok');

  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve(`${latitude}, ${longitude}`);
        }, (error) => {
          const msg = 'К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайт разрешение на использование геолакации, либо введите координаты вручную. Введите Широту и долготу через запятую (55.0000, 37.0000)';
          callPopup(msg, popup);
          elPopupOk.addEventListener('click', () => {
            console.log('GEO ok', error);
            if (popup.validate()) {
              resolve(elPopupInput.value);
            }
          });
          elPopupCancel.addEventListener('click', () => {
            reject('cancel'); // eslint-disable-line prefer-promise-reject-errors
          });
        },
      );
    } else {
      const msg = 'Не поддерживает браузер. Введите широту и долготу через запятую';
      callPopup(msg, popup);

      elPopupOk.addEventListener('click', () => {
        console.log('GEO ok');
        if (popup.validate()) {
          resolve(elPopupInput.value);
        }
      });
      elPopupCancel.addEventListener('click', () => {
        reject('cancel'); // eslint-disable-line prefer-promise-reject-errors
      });
    }
  });
}
