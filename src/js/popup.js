import validateGEO from './validateGEO.js';

export default class Popup {
  init() {
    this.elPopup = document.createElement('div');
    this.elPopup.className = 'popup hidden';
    this.elPopup.innerHTML = `
    <p class="popup-header"></p>
    <p class="popup-msg"></p>
    <input type"text" class="popup-inp hidden">
    <div class="popup-buttons">
      <div class="popup-cancel button hidden">Отмена</div>
      <div class="popup-ok button">OK</div>
    </div>
    `;
    document.body.appendChild(this.elPopup);

    this.elPopupHeader = document.querySelector('.popup-header');
    this.elPopupMsg = document.querySelector('.popup-msg');
    this.elPopupInput = document.querySelector('.popup-inp');
    this.btnCancel = document.querySelector('.popup-cancel');
  }

  showPopup(type, header, msg) {
    this.elPopup.classList.remove('hidden');
    this.elPopupHeader.innerText = header;
    this.elPopupMsg.innerText = msg;
    if (type === 'get') {
      this.elPopupInput.classList.remove('hidden');
      this.btnCancel.classList.remove('hidden');
    }
  }

  validate() {
    if (validateGEO(this.elPopupInput.value)) {
      this.elPopupInput.style.borderColor = '#000000';
      return true;
    }
    this.elPopupInput.style.borderColor = '#ff0000';
    return false;
  }
}
