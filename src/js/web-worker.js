import CryptoJS from 'crypto-js';

self.addEventListener('message', async (event) => {
  const content = await toServer(event.data.file, event.data.keyCrypt);
  self.postMessage(content);
});

async function toServer(objMsg, crypton) {
  const cryptMsg = CryptoJS.AES.encrypt(objMsg.msg, crypton).toString();
  
  objMsg.msg = cryptMsg;
  // const resp = await fetch('http://localhost:7070/msg', {
  //   body: JSON.stringify(objMsg),
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  // });
  // console.log(resp);
  return objMsg;
}
