# Products RESTful API #

Xsolla School 2021. Backend. Тестовое задание.

API представляет собой реализацию системы управления товарами для площадки электронной коммерции.

Тестовое задание можно найти тут: https://github.com/xsolla/xsolla-school-backend-2021

## Приступая к работе ##
Чтобы получить копию API, необходимо в нужной дирректории выполнить:  
`$ git clone https://github.com/humbleAcolyte/xsolla-backend-products`

## Запуск с использованием Docker ##
### Требования ###
- Docker
- Docker-compose
### После установки ###
В корневом каталоге проекта выполнить следующие команды:
1. Создать docker образ  
    `$ docker-compose build`
2. Запустить docker контейнер  
    `$ docker-compose up`

## Запуск без использования Docker ##
### Требования ###
- NodeJS
- PostgreSQL
### После установки ###
1. Создать базу данных
2. В конфигурационном файле проекта `src/api/config/posgres.js` изменить следующие параметры:
    1. Имя пользователя Postgres `user` 
    2. Пароль пользователя Postgres `password`
    3. Название созданной базы данных `database`
    4. Адрес API `host` (Локальный адрес `localhost`)
3. Установить все зависимости, для этого выполнить в корневом каталоге `npm install`
4. Запустить в корневом каталоге `npm start`

## Использование ##
Документацию в виде SwaggerUI можно найти по адрессу http://localhost:3000/api-docs. Сам API работает по адресу http://localhost:3000/api/v1/products. 

