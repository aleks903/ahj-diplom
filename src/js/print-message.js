function convertDate(value) {
  const rValue = value < 10 ? `0${value}` : value;
  return rValue;
}

function printData(valueDate) {
  const itemDate = new Date(valueDate);
  const date = convertDate(itemDate.getDate());
  const month = convertDate(itemDate.getMonth() + 1);
  const year = convertDate(itemDate.getFullYear());
  const hours = convertDate(itemDate.getHours());
  const minut = convertDate(itemDate.getMinutes());
  // const second = convertDate(itemDate.getSeconds());
  const itemCreated = `${hours}:${minut} ${date}.${month}.${year}`;
  return itemCreated;
}

export default class PrintMessage {
  constructor(parentEl, crypton) {
    this.parentEl = parentEl;
    this.crypton = crypton;
  }

  printMsg(messageObj, insertPosition) {
    // const itemMsg = this.crypton.deCrypt(messageObj.msg);
    const itemMsg = messageObj.msg;
    let msgHtml = '';
    
    console.log(messageObj.type);

    switch (messageObj.type) {
      case 'text':
        msgHtml = this.printTextMsg(itemMsg);
        break;
      case 'image':
        msgHtml = this.printImg(itemMsg);
        break;
      case 'video':
        msgHtml = this.printVideo(itemMsg);
        break;
      case 'audio':
        msgHtml = this.printAudio(itemMsg);
        break;
      case 'application':
        msgHtml = this.printApp(itemMsg);
        break;
    }
    
    const elItemMsg = document.createElement('div');
    elItemMsg.className = 'item-message loaded';
    elItemMsg.dataset.id = messageObj.id;
    elItemMsg.innerHTML = `
    ${msgHtml}
    <div class="footer-msg">
      <div class="${messageObj.pin ? 'pined' : ''}">"${messageObj.pin ? 'pined' : 'noPined'}"</div>
      <div class="${messageObj.favorit ? 'favorit' : ''}">"${messageObj.favorit ? 'favorit' : 'nofavorit'}"</div>
      <div class="date-time">${printData(messageObj.dateTime)}</div>
    </div>
    `;
    if (insertPosition === 'end') {
      this.parentEl.appendChild(elItemMsg);
      this.parentEl.scrollTo(0, elItemMsg.offsetTop);
      console.log('end');
    } else {
      console.log('start');
      this.parentEl.prepend(elItemMsg);
      // this.parentEl.scrollTo(0, this.parentEl.scrollHeight);
    }
    
    
    console.log('appendChild');
  }

  printTextMsg(message) {
    const regExp = /(https?:\/\/)[%:\w.\/-]+/;
    const regExpCod = /```(.|\n)*?```/;
    let htmlMsg = message;
    if (message.search(regExp) !== -1) {
      htmlMsg = message.replace(regExp, `
      <a href="${message.match(regExp)[0]}">
      ${message.match(regExp)[0]}
      </a>
    `);
    }
    if (message.search(regExpCod) !== -1) {
      const textCode = message.match(regExpCod)[0].replace(/```/g, '');
      htmlMsg = message.replace(regExpCod, `
      <code>
      ${textCode}
      </code>
    `);
    }
    return `
      <p>${htmlMsg}</p>
    `;
  }

  printImg(img) {
    let htmlMsg = `
      <img src="${img}">
      <a href="${img}" download="image">downoad</a>
    `
    return `
      <p>${htmlMsg}</p>
    `;
  }
  
  printVideo(obj) {
    let htmlMsg = `
      <video src="${obj}" controls="controls"></video>
      <a href="${obj}" download="video">downoad</a>
    `
    return `
      <p>${htmlMsg}</p>
    `;
  }

  printAudio(obj) {
    let htmlMsg = `
      <audio src="${obj}" controls="controls"></audio>
      <a href="${obj}" download="audio">downoad</a>
    `
    return `
      <p>${htmlMsg}</p>
    `;
  }
  
  printApp(obj) {
    let htmlMsg = `
      <div class="applicat">App</div>
      <a href="${obj}" download="app">downoad</a>
    `
    return `
      <p>${htmlMsg}</p>
    `;
  }
}
