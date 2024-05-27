
# Assessment Test




## Run Locally

Clone the project

```bash
  git clone https://github.com/SyarifuanEfendi/todo-list.git
```

Go to the project directory

```bash
  cd todo-list
```

create database

```bash
  docker compose up -d --build db
```

Copy .env

```bash
  cp .env.example .env
  cp .env.example ./src/sequelize/.env
  *sesuaikan host dengan database
```

Install Dependensi

```bash
  npm install
```

Start Application

```bash
  yarn dev / npm dev
```


## Run With Docker

Clone the project

```bash
  git clone https://github.com/SyarifuanEfendi/todo-list.git
```

Go to the project directory

```bash
  cd todo-list
```

Docker build

```bash
  docker compose up -d --build
```

generate db if exist

```bash
  docker-compose exec db psql -U user -d postgres -c "CREATE DATABASE todo_list"
```

migrate table if exist

```bash
  cd src/sequelize
  npx sequelize-cli db:migrate
```

data seeder
```bash
npx sequelize-cli db:seed:all
```

jika error bcrypt
```bash
npm uninstall bcrypt
npm install bcryptjs
npm install bcrypt
```