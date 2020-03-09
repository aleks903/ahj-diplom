import API from './Api.js';
import Messanger from './messanger.js';
import TransferMessage from './transfer-message.js';
// import Crypton from './crypt.js';

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

const elWindowStart = document.querySelector('.window');
const submitName = document.querySelector('#submit-name');
const alertName = document.querySelector('#alert');
const okAlert = document.querySelector('#ok-alert');
let nameUser = '';

// function conectChat() {
//   // const messanger = new Messanger(nameUser);
//   // messanger.init();
// }

submitName.addEventListener('click', async () => {
  const inputName = document.querySelector('#inp-name');
  const keyCrypt = inputName.value;
  
  transferMsg = new TransferMessage(keyCrypt);
  transferMsg.init();
  
  // nameUser = inputName.value;
  inputName.value = '';
  // alertName.classList.remove('hidden');
  elWindowStart.classList.add('hidden');

  // transferMsg.lazyLoad();

  // conectChat();

  // if (nameUser) {
  //   const response = await api.load();
  //   const arrUsers = await response.json();

  //   if (arrUsers.findIndex((item) => item.name === nameUser) === -1) {
  //     await api.add({ name: nameUser });
  //     elWindowStart.classList.add('hidden');
  //     inputName.value = '';
  //     conectChat();
  //     return;
  //   }
  //   alertName.classList.remove('hidden');
  // }
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
  console.log('start file');
  for (const item of files) {
    loadFile(item);
  }
  // loadFile(files[0]);
});

buttonSelectFile.addEventListener('change', (event) => {
  const files = Array.from(event.currentTarget.files);
  // console.log(files[0].type, crypton);
  // const regExp = /[a-z]+/;
  // console.log(files[0].type.match(regExp)[0]);
  loadFile(files[0]);
});

elSelectFile.addEventListener('scroll', (event) => {
  if (event.target.scrollTop === 0) {
    transferMsg.lazyLoad();
  }
  console.log(event.target.scrollTop);
});

// **************** input file *********************
function loadFile(file) {
  const itemId = uuid.v4();
  const regExp = /[a-z]+/;
  const typeFile = file.type.match(regExp)[0];

  // console.log(typeFile);
  // transferMsg.sendMessage(file, typeFile);

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
      // msg: dataFile,
      dateTime: new Date(),
    };
    console.log('objMessage');
    console.log(objMessage);
    // localArrMessages.push(objMessage);
    transferMsg.sendMessage(objMessage);

  };

}

// **************** input text *********************
const elInput = document.querySelector('#el-input');

elInput.addEventListener('keypress', (evt) => {
  if (evt.key === 'Enter') {
    // console.log(elInput.value);
    
    // const cryptText = crypton.enCrypt(elInput.value);
    
    // // console.log(cryptText);
    // // console.log(crypton.deCrypt(cryptText));
    const objMessage = {
      id: uuid.v4(),
      type: 'text',
      pin: false,
      favorit: false,
      msg: elInput.value,
      // msg: cryptText,
      dateTime: new Date(),
    };
    // localArrMessages.push(objMessage);
    transferMsg.sendMessage(objMessage);
    
    console.log(elInput.value);
    // transferMsg.sendMessage(elInput.value, 'text');
    
    elInput.value = '';
    // cmessageAddGeo.messageAddGEO(`<p>${elInput.value}</p>`, popup);
  }
});