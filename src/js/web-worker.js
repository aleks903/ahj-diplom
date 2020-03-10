import CryptoJS from 'crypto-js';

self.addEventListener('message', async (event) => {
  let content = '';
  if (event.data.workCrypt === 'enCrypt') {
    content = await enCrypt(event.data.file, event.data.keyCrypt);
    self.postMessage(content);
  } else if (event.data.workCrypt === 'deCrypt') {
    for (const item of event.data.file) {
      const inpMsg = JSON.parse(item);
      content = deCrypt(inpMsg.msg, event.data.keyCrypt);
      inpMsg.msg = content;
      self.postMessage(inpMsg);
    }
    
  }
});

function enCrypt(objMsg, crypton) {
  const cryptMsg = CryptoJS.AES.encrypt(objMsg.msg, crypton).toString();
  objMsg.msg = cryptMsg;
  return objMsg;
}

function deCrypt(objMsg, crypton) {
  try {
    let bytes  = CryptoJS.AES.decrypt(objMsg, crypton);
    const retStr = bytes.toString(CryptoJS.enc.Utf8);
    return retStr;
  } catch (e) {
    console.log(e);
    return null;
  }
}
