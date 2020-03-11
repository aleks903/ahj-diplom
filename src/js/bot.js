/* eslint-disable class-methods-use-this */
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

export default class Bot {
  constructor(parentEl) {
    this.weather = ['За окном солнечно', 'Не забудьте взять зонтик', 'Температура за бортом +20', 'Дождь со снегом целый день', 'Жарко. Очень жарко', 'Сегодня -10'];
    this.toGo = ['В кино сегодня много интересного!', 'В солнечный денек лучше провести время на природе', 'Сходите с любимым человеком в ресторан', 'Посидите дома, за окном дождь'];
    this.likeYou = ['Лучше всех!', 'Грустно(', 'Все хорошо! А как ты', 'Бывало и получше', 'Теперь стало намного лучше'];
    this.whatSee = ['Мультфильмы по Карусели', 'Боевичок со Сталоне', 'Ужастики лучше не смотреть перед сном', 'Балет - Либидиное озеро', 'Сказку про колобка', 'Мыльную оперу', 'Сходи в театрт'];
    this.howTime = ['Почитать книжку', 'Написать програмку', 'Убраться в комнате', 'Хорошенько выспаться', 'Пригласить друзей в гости', 'Съездить в путешествие', 'Сходи в театрт'];
    this.parentEl = parentEl;
  }

  funcBot(msg) {
    let msgHtml = '';
    let elItemMsg = document.createElement('div');
    elItemMsg.className = 'item-message';
    elItemMsg.innerHTML = `
    ${msg}
    <div class="footer-msg">
      <div class="date-time">${printData(new Date())}</div>
    </div>
    `;
    this.parentEl.appendChild(elItemMsg);

    const zapros = msg.replace(/^@chaos: /, '');

    switch (zapros) {
      case 'погода':
        msgHtml = this.randomMsg(this.weather);
        break;
      case 'куда пойти':
        msgHtml = this.randomMsg(this.toGo);
        break;
      case 'как ты':
        msgHtml = this.randomMsg(this.likeYou);
        break;
      case 'что посмотреть':
        msgHtml = this.randomMsg(this.whatSee);
        break;
      case 'как провести время':
        msgHtml = this.randomMsg(this.howTime);
        break;
      default:
        msgHtml = 'На данный запрос, в данный момент, я не могу дать ответ!';
        break;
    }

    elItemMsg = document.createElement('div');
    elItemMsg.className = 'item-message bot';
    elItemMsg.innerHTML = `
    ${msgHtml}
    <div class="footer-msg">
      <div class="date-time">${printData(new Date())}</div>
    </div>
    `;
    this.parentEl.appendChild(elItemMsg);
  }

  randomMsg(arr) {
    console.log(arr);
    const randomIndex = Math.floor(Math.random() * arr.length);
    console.log(randomIndex);
    return arr[randomIndex];
  }
}
