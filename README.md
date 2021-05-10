# nodejs_basic_login

simple login

---

### basic_login

- Node.js
- Express
- mySql
- without sequelize

### basic_login2

- mvc pattern
- bcrypt password

### basic_login3

- passport

---

![login](./img/Login.PNG)
![login](./img/register.PNG)

| Field    | Type         | Null | Key | Default           | Extra             |
| -------- | ------------ | ---- | --- | ----------------- | ----------------- |
| id       | int          | NO   | PRI | NULL              | auto_increment    |
| email    | varchar(100) | YES  | UNI | NULL              |                   |
| nick     | varchar(5)   | NO   |     | NULL              |                   |
| password | varchar(100) | YES  |     | NULL              |                   |
| createAt | datetime     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |

| id  | email         | nick | password                                                     | createAt            |
| --- | ------------- | ---- | ------------------------------------------------------------ | ------------------- |
| 1   | ppp@naver.com | pj   | $2b$10$mzUlX0FRrc6rKIzSuFBJM.fOAAeHK5EG6C2IhPV5EMITa1vY448bm | 2021-05-05 21:35:19 |
