import CryptoJS from 'crypto-js';

export default class Crypt {
  constructor(keyCrypt) {
    this.keyCrypt = keyCrypt;
  }

  enCrypt(data) {
    return CryptoJS.AES.encrypt(data, this.keyCrypt).toString();
  }

  deCrypt(data) {
    let bytes  = CryptoJS.AES.decrypt(data, this.keyCrypt);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}