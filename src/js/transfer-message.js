import API from './Api.js';
import PrintMessage from './print-message.js';
import Worker from './web-worker.js';
import Crypton from './crypt.js';

const api = new API('http://localhost:7070/');

const uuid = require('uuid');

const localArrMessages = [];


export default class TransferMessage{
  constructor(crypton) {
    this.keyCrypt = crypton;
    this.urlWS = 'ws://localhost:7070/ws';
    this.url = 'http://localhost:7070/'
    this.crypton = new Crypton(crypton);
    this.lazyStart = true;
    // this.url = 'wss://heroku-ahj-hw-8-2.herokuapp.com/ws';
  }

  async init() {
    this.elListMessages = document.querySelector('.display-legends');
    this.printMsg = new PrintMessage(this.elListMessages, this.crypton);
    this.initWS();

    // const resp = await fetch('http://localhost:7070/initmsg', {
    //   body: './msg.json',
    //   method: 'POST',
    //   headers: this.contentTypeHeader,
    // });

    const resp = await fetch(`${this.url}initmsg`);
    const body = await resp.text();
    console.log('LoadInitMsg', body);

    this.lazyLoad();
// const body = await resp.text();
    // console.log('body', JSON.parse(body));
  }

  initWS() {
    this.ws = new WebSocket(this.urlWS);

    this.ws.addEventListener('open', () => {
      console.log('connected');
      // this.ws.send('hello');
    });

    this.ws.addEventListener('message', (evt) => {
      // print msg
      // console.log(evt);
      const inpMsg = JSON.parse(evt.data);

      const itemEl = document.querySelector(`[data-id="${inpMsg.id}"]`);
      if(itemEl !== null) {
          itemEl.classList.remove('loaded');
          return;
      }

console.log('start decrypt ', new Date());
      const deCrypt = this.crypton.deCrypt(inpMsg.msg);
      
console.log('end decrypt ', new Date());
      if (deCrypt && deCrypt !== null) {
        // console.log(deCrypt);
        inpMsg.msg = deCrypt;
        localArrMessages.push(inpMsg);
        this.printMsg.printMsg(inpMsg, 'end');
        document.querySelector(`[data-id="${inpMsg.id}"]`).classList.remove('loaded');
      }
      

    });

    this.ws.addEventListener('close', (evt) => {
      console.log('connection closed', evt);
    });

    this.ws.addEventListener('error', () => {
      console.log('error');
    });
  }

  sendMessage(message) {
    localArrMessages.push(message);
    this.printMsg.printMsg(message, 'end');

    if (this.ws.readyState === WebSocket.OPEN) {
      try {

        this.uploadMsg(message);

      } catch (e) {
        console.log('err');
        console.log(e);
      }
    } else {
      // Reconnect
      console.log('reconect');
      this.ws = new WebSocket(this.url);
      this.uploadMsg(message);

    }
  }

  uploadMsg(message) {
    const worker = new Worker();
        worker.addEventListener('message', (event) => {
          // console.log(event.data);
          this.ws.send(JSON.stringify(event.data));
          worker.terminate();
        });
  
        worker.postMessage({
          file: message,
          keyCrypt: this.keyCrypt,
          workCrypt: 'enCrypt',
        });
  }

  async lazyLoad() {

    if (this.lazyStart) {
      this.lazyStart = false;

      const lengthItem = localArrMessages.length;
      const resp = await fetch(`${this.url}msg/${lengthItem}`);
      const body = await resp.json();
      
      let lengthDown = body.length;
        const worker = new Worker();
        worker.addEventListener('message', (event) => {
            if (event.data.msg && event.data.msg !== null) {
              localArrMessages.push(event.data);
              this.printMsg.printMsg(event.data, 'start');
              document.querySelector(`[data-id="${event.data.id}"]`).classList.remove('loaded');
            }
            lengthDown -= 1;
            if (lengthDown === 0) {
              this.lazyStart = true;
            }
        });
  
        worker.postMessage({
          file: body,
          keyCrypt: this.keyCrypt,
          workCrypt: 'deCrypt',
        });
    }
  }
}