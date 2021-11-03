# Assignment_1_AIMMO_express 🔥

🧩 wanted x wecode 프리온보딩 백엔드 코스 - [Assignment 1] 에이모 🧩



## 배포 🌎

#### 주소

[http://52.14.26.207:3013](http://52.14.26.207:3013)

#### 방식

AWS EC2 

## 팀원 소개

#### 🦄 [김바다](https://github.com/sally0226) 

- 개발 환경 세팅
- Error Handler 작성
- JWT middleware 작성
- `README` 작성
- AWS를 이용한 배포
- 사용자 Schena, API 작성

#### 👻 [장희진](https://github.com/heejin99)

- 게시판 Schema 작성

- 게시판 CRUD API 작성

- 서버 port, monogo DB 연결 
- `API 명세서` 작성

#### 👩‍💻 [조재복](https://github.com/ildang100)

- 

##### 공통

- 설계

- error 수정 

- 리팩토링 

  

## 구현 방법과 이유 👷‍♂️👷‍♀️

#### 1) JWT & Authorization Header 💳

사용자 인증에 JWT를 이용하였습니다.

jwtMiddleware를 만들어 이용했습니다.

로그인시에 JWT를 발급해주고,

모든 요청이 controller로 넘어가기 전에 jwtMiddleware를 거치게 됩니다.

Authorization Header에 JWT를 담아 이용했습니다.

#### 2) MVC 패턴 🎨

CSR로 가정하여 V는 따로 제작하지 않았습니다. 하지만 Model과 Controller를 나눠서, 로직을 분리했습니다.

#### 3) Error Handler 🚫

Error handle용 middleware를 작성하여 이용하였습니다.

error가 발생했을 때, 각 컨트롤러에서 일일이 처리하지 않고 next로 넘겨 middleware에서 처리할 수 있도록 했습니다.

Error handle용 middleware 코드는 `app.js`에 있습니다.

#### 4) .env ⛏

보안을 위해 jwt secret key와, mongoURL을 .env에 분리해 push하지 않았습니다.

local에서 test하실 때는 .env를 생성하시고 아래 내용을 붙여넣기 해주세요!

```
jwtSecretKey = ikDshiCLtsLQ66fiZMyr9qjS1NVNbWpz
mongoURI = mongodb+srv://team13:0000@cluster0.8ii4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```



## 실행 방법 🏄

git clone 받은 후, 아래 명령어를 실행합니다.

```
$ npm install
$ npm run start
```

성공적으로 완료되면, http://localhost:3013 에 서버가 열립니다.



## 테스트 시 주의 사항 🌠

Postman으로 API들을 테스트할 때,

`/signup` 이나 `/signin` 의 응답으로 오는 token값을, 

다른 요청시에 `Authorization Header`에 넣어서 보내주셔야 합니다!

```
예시) Headers
| KEY           | VALUE                        |
| ------------- | ---------------------------- |
| Authorization | eyJhbGciOiJIUzI1NiIsInR5c... |
```

## 사용 기술 ⚒

#### Nodejs 📗

> npm package
>
> ```
> express
> cors
> bcrypt
> dotenv
> mongoose
> mongoose-auto-increment
> jsonwebtoken
> ```

#### MongoDB 📘

> mongoose 라이브러리를 이용했습니다.


## ERD 🗺️
![AIMMO_ERD](https://user-images.githubusercontent.com/60311404/139860476-64427ebb-78b2-4555-9fec-021807509aea.png)


## API 명세서 📩

[API 명세서](https://github.com/preOnboarding-Team13/Assignment_1_AIMMO_express/blob/main/API%20%EB%AA%85%EC%84%B8%EC%84%9C.md#%EC%82%AC%EC%9A%A9%EC%9E%90-api)



## Postman Test 🧗‍♂️

1. resource별로 collection을 만들어 이용했습니다.

   <img src=".\images\postman_1.png" alt="postman_1" style="zoom:80%;" />

2. 각 API에서 공통으로 사용되는 url을 변수로 지정해 이용했습니다.

   <img src=".\images\postman_2.png" alt="postman_2" style="zoom:80%;" />
