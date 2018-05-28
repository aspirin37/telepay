## Installation

`npm install`
или
`yarn install`

## Usage

Самодельный shell script который спрашивает

1.  открыть девсервер в браузере? (y,n)
2.  какое окружение использовать (l - local,d - dev, p - production)

`npm run ds`
или
`yarn ds`

можно запустить как
`npm run ds l/d/p`
или
`yarn ds l/d/p`
чтобы запустить сервер на выбранном окружении без открытия в браузере

## Dev utils

#### comp.sh

Создает папку с шаблонами `index.vue` и `index.html`
`dev_utils/comp.sh path/to/folder component_name`

#### module.sh

Спрашивает особенности модуля и создает нужные файлы

1.  путь к папке с модулями
2.  название
3.  внешний хтмл или внутри vue компонента
4.  Если круд - создает 3 компонента (create,update,list), если нет - 1 компонент
5.  Создавать файл с роутом или добавить комментарий с роутом к routes/index.js
6.  Создавать или нет файл с api resource

`dev_utils/module.sh`

#### ds.sh

Используется в
`npm run ds`

## Troubleshooting

Если `npm run ds` не срабатывает - запускаем девсервер руками:
`npm run start_ds`
