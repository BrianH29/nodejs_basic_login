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

### basic_login4

- sequelize
- passport-kakao

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

---
### basic_login4

| Field    | Type         | Null | Key | Default           | Extra             |
| -------- | ------------ | ---- | --- | ----------------- | ----------------- |
| id       | int(11)      | NO   | PRI | NULL              | auto_increment    |
| email    | varchar(40)  | YES  | UNI | NULL              |                   |
| nick     | varchar(40)  | NO   |     | NULL              |                   |
| password | varchar(150) | YES  |     | NULL              |                   |
| provider | varchar(10)  | NO   |     | local             |                   |
| snsId    | varchar(30)  | NO   |     | NULL              |                   |
| createAt | datetime     | NO   |     | NULL              |                   |
| updateAt | datetime     | NO   |     | NULL              |                   |
| deleteAt | datetime     | YES  |     | NULL              |                   |

| id  | email         | nick | password  | Provider | snsnId    | createAt            | updateAt            | deleteAt |
| --- | ------------- | ---- | ----------| -------- |-----------| ------------------- | --------------------| ---------|
| 1   | hyp@naver.com | B    | NULL      | kakao    | 2321312   | 2021-05-05 21:35:19 | 2021-05-05 21:35:19 | NULL     |