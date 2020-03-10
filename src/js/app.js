import API from './Api.js';
import TransferMessage from './transfer-message.js';
// import Crypton from './crypt.js';
// **************** rec AV *********************
import Popup from './popup.js';
import RecAV from './recAV.js';
// **************** rec AV *********************
import getGEO from './getGEO.js';

const uuid = require('uuid');

// *******************************************
const elAddFile = document.querySelector('.add-file');
// let crypton = {};
let transferMsg = {};
// const localArrMessages = [];
// const transferMsg = new TransferMessage(crypton);
// *******************************************

const api = new API('http://localhost:7070/users');
// const api = new API('https://heroku-ahj-hw-8-2.herokuapp.com/users');



const popup = new Popup();
popup.init();

const elWindowStart = document.querySelector('.window');
const submitName = document.querySelector('#submit-name');
const alertName = document.querySelector('#alert');
const okAlert = document.querySelector('#ok-alert');

submitName.addEventListener('click', async () => {
  const inputName = document.querySelector('#inp-name');
  const keyCrypt = inputName.value;
  
  transferMsg = new TransferMessage(keyCrypt);
  transferMsg.init();
  
  inputName.value = '';
  elWindowStart.classList.add('hidden');
  // **************** rec AV *********************

  const recorder = new RecAV(popup, transferMsg);
  recorder.init();
// **************** rec AV *********************

});

okAlert.addEventListener('click', () => {
  alertName.classList.add('hidden');
});

// ***************************** add file ****************************
const buttonSelectFile = document.querySelector('#button-select');
const elSelectFile = document.querySelector('#drop-file');

elAddFile.addEventListener('click', (event) => {
  buttonSelectFile.value = null;
  buttonSelectFile.dispatchEvent(new MouseEvent('click'));
});

elSelectFile.addEventListener('dragover', (event) => {
  event.preventDefault();
});

elSelectFile.addEventListener('drop', (event) => {
  event.preventDefault();
  const files = Array.from(event.dataTransfer.files);
  for (const item of files) {
    loadFile(item);
  }
});

buttonSelectFile.addEventListener('change', (event) => {
  const files = Array.from(event.currentTarget.files);
  loadFile(files[0]);
});

elSelectFile.addEventListener('scroll', (event) => {
  if (event.target.scrollTop === 0) {
    transferMsg.lazyLoad();
  }
});

// **************** input file *********************
function loadFile(file) {
  const itemId = uuid.v4();
  const regExp = /[a-z]+/;
  const typeFile = file.type.match(regExp)[0];

  // let dataFile = null;
  const fr = new FileReader();
  fr.readAsDataURL(file);

  fr.onload = () => {
    // dataFile = crypton.enCrypt(fr.result);

    const objMessage = {
      id: itemId,
      type: typeFile,
      pin: false,
      favorit: false,
      msg: fr.result,
      dateTime: new Date(),
    };
    transferMsg.sendMessage(objMessage);
  };
}

// **************** input text *********************
const elInput = document.querySelector('#el-input');

elInput.addEventListener('keypress', (evt) => {
  if (evt.key === 'Enter') {
    const objMessage = {
      id: uuid.v4(),
      type: 'text',
      pin: false,
      favorit: false,
      msg: elInput.value,
      dateTime: new Date(),
    };
    transferMsg.sendMessage(objMessage);
    elInput.value = '';
    // cmessageAddGeo.messageAddGEO(`<p>${elInput.value}</p>`, popup);
  }
});

// **************** rec AV *********************
const elPopup = document.querySelector('.popup');
const elPopupInput = document.querySelector('.popup-inp');
const elPopupCancel = document.querySelector('.popup-cancel');
const elPopupOk = document.querySelector('.popup-ok');

// popup cancel
elPopupCancel.addEventListener('click', () => {
  elPopup.classList.add('hidden');
  return false;
});

// popup OK
elPopupOk.addEventListener('click', () => {
  if (elPopupInput.classList.contains('hidden')) {
    elPopup.classList.add('hidden');
  }
});

// **************** GEO *********************
const elGEO = document.querySelector('.geo-teg');

elGEO.addEventListener('click', async () => {
  const GEOteg = await getGEO(popup);
  elPopup.classList.add('hidden');
  console.log(GEOteg);
  const objMessage = {
    id: uuid.v4(),
    type: 'text',
    pin: false,
    favorit: false,
    msg: GEOteg,
    dateTime: new Date(),
  };
  transferMsg.sendMessage(objMessage);
});

