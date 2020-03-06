import API from './Api.js';

const api = new API('http://localhost:7070/users');

export default class TransferMessage{
  constructor(crypton) {
    this.crypton = crypton;
    this.url = 'ws://localhost:7070/ws';
    // this.url = 'wss://heroku-ahj-hw-8-2.herokuapp.com/ws';
  }
}