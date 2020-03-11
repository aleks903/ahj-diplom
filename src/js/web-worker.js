import CryptoJS from 'crypto-js';

function enCrypt(objMsg, crypton) {
  const itemMsg = objMsg;
  const cryptMsg = CryptoJS.AES.encrypt(itemMsg.msg, crypton).toString();
  itemMsg.msg = cryptMsg;
  return itemMsg;
}

function deCrypt(objMsg, crypton) {
  try {
    const itemMsg = objMsg;
    const bytes = CryptoJS.AES.decrypt(itemMsg, crypton);
    const retStr = bytes.toString(CryptoJS.enc.Utf8);
    return retStr;
  } catch (e) {
    console.log(e);
    return null;
  }
}

window.self.addEventListener('message', async (event) => {
  let content = '';
  if (event.data.workCrypt === 'enCrypt') {
    content = await enCrypt(event.data.file, event.data.keyCrypt);
    window.self.postMessage(content);
  } else if (event.data.workCrypt === 'deCrypt') {
    for (const item of event.data.file) {
      const inpMsg = JSON.parse(item);
      content = deCrypt(inpMsg.msg, event.data.keyCrypt);
      inpMsg.msg = content;
      window.self.postMessage(inpMsg);
    }
    window.self.close();
  }
});
