import CryptoJS from 'crypto-js';

export default class Crypt {
  constructor(keyCrypt) {
    this.keyCrypt = keyCrypt;
  }

  enCrypt(data) {
    return CryptoJS.AES.encrypt(data, this.keyCrypt).toString();
  }

  deCrypt(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.keyCrypt);
      const retStr = bytes.toString(CryptoJS.enc.Utf8);
      return retStr;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
