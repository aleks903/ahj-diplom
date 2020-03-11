# ahj-diplom
https://aleks903.github.io/ahj-diplom/
[![Build status](https://ci.appveyor.com/api/projects/status/r5trrckklh9q23p7?svg=true)](https://ci.appveyor.com/project/aleks903/ahj-diplom)

## Реализованны функции
###Обязательные
* Сохранение в истории ссылок и текстовых сообщений
* Ссылки (то, что начинается с `http://` или `https://`) должны быть кликабельны и отображаться как ссылки
![](https://github.com/aleks903/ahj-diplom/blob/master/imgs/tekst-ssilka.jpg)
* Сохранение в истории изображений, видео и аудио (как файлов) - через Drag & Drop и через иконку загрузки (скрепка в большинстве мессенджеров)
![](https://github.com/aleks903/ahj-diplom/blob/master/imgs/input-img-drag.jpg)
* Скачивание файлов (на компьютер пользователя)
![](https://github.com/aleks903/ahj-diplom/blob/master/imgs/input-img-screpka.jpg)
* Ленивая подгрузка: сначала подгружаются последние 10 сообщений, при прокрутке вверх подгружаются следующие 10 и т.д.

###Дополнительные
* Синхронизация - если приложение открыто в нескольких окнах (вкладках), то контент должен быть синхронизирован
* Запись видео и аудио (используя API браузера)
* Воспроизведение видео/аудио (используя API браузера)
![](https://github.com/aleks903/ahj-diplom/blob/master/imgs/rec-play-av.jpg)
* Отправка геолокации
![](https://github.com/aleks903/ahj-diplom/blob/master/imgs/geo.jpg)
* Отправка команд боту, например: `@chaos: погода`, бот должен отвечать рандомный прогноз погоды (интегрироваться с реальными сервисами не требуется), команд должно быть не менее 5
`@chaos: погода`
`@chaos: куда пойти`
`@chaos: как ты`
`@chaos: что посмотреть`
`@chaos: как провести время`
![](https://github.com/aleks903/ahj-diplom/blob/master/imgs/bot.jpg)
* Добавление сообщения в избранное (тогда должен быть интерфейс для просмотра избранного)
Добавление
![](https://github.com/aleks903/ahj-diplom/blob/master/imgs/add-favorit.jpg)
Просмотр
![](https://github.com/aleks903/ahj-diplom/blob/master/imgs/favorits.jpg)
* Отправка зашифрованных сообщений и файлов (привет crypto-js!) с просмотром расшированных (для этого нужно ввести пароль)
Для просмотра предзагруженных данных пароль - test
![](https://github.com/aleks903/ahj-diplom/blob/master/imgs/input%20pass.jpg)
* Поддержка оформления кода, например, при отправке сообщения в бэктиках:
![](https://github.com/aleks903/ahj-diplom/blob/master/imgs/code.jpg)