## API 명세서



### 사용자 API

1) #### 회원가입

`POST` /signup

- request

  - body

    ```json
    {
        "userId": "", 
        "userPw": "", 
        "userName": ""
    }
    ```

- response

  - status code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 201  | 회원가입이 완료되었습니다.    |
    | 409  | 이미 존재하는 ID 입니다.      |
    | 500  | 서버에서 문제가 발생했습니다. |

  - parameters

    | name    | type    | example                    | desc           |
    | ------- | ------- | -------------------------- | -------------- |
    | success | boolean | true                       | 요청 성공 여부 |
    | message | string  | 회원가입이 완료되었습니다. | 응답 메세지    |
    | token   | string  | bear sdkjfndskjaf...       | 사용자 토큰    |

  - body example

    ```json
    // 성공시
    {
        "success": true,
        "message": "회원가입에 성공했습니다.",
        "token": "eyJhbGciOiJIUz..."
    }
    
    // 실패시
    {
        "success": false,
        "message": "이미 존재하는 id입니다."
    }
    {
    	"success": false, 
    	"message": "서버에서 문제가 발생했습니다."
    }
    ```

    

2) #### 로그인

`POST` /signin

- request

  - body

    ```json
    {
        "userId": "", 
        "userPw": ""
    }
    ```

- response

  - status code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 201  | 회원가입이 완료되었습니다.    |
    | 404  | 존재하지 않는 ID 입니다.      |
    | 500  | 서버에서 문제가 발생했습니다. |

  - parameters

    | name    | type    | example                  | desc           |
    | ------- | ------- | ------------------------ | -------------- |
    | success | boolean | true                     | 요청 성공 여부 |
    | message | string  | 로그인이 완료되었습니다. | 응답 메세지    |
    | token   | string  | bear sdkjfndskjaf...     | 사용자 토큰    |

  - body example

    ```json
    // 성공시
    {
        "success": true,
        "message": "로그인에 성공했습니다.",
        "token": "eyJhbGciOiJIUz..."
    }
    
    // 실패시
    {
        "success": false,
        "message": "존재하지 않는 ID 입니다."
    }
    {
    	"success": false, 
    	"message": "서버에서 문제가 발생했습니다."
    }
    ```



### 게시판 API

1) #### 게시글 생성

`POST` /board

- request

  - header

    | KEY           | VALUE                        |
    | ------------- | ---------------------------- |
    | Authorization | eyJhbGciOiJIUzI1NiIsInR5c... |

  - body

    ```json
    {
        "title": "", 
        "contents": "", 
        "categoryCode": 0(or 1 or 2)
    }
    ```

- response

  - status Code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 201  | 게시글이 등록되었습니다.      |
    | 401  | 로그인이 필요합니다.          |
    | 500  | 서버에서 문제가 발생했습니다. |

  - parameters

    | name    | type    | example                  | desc           |
    | ------- | ------- | ------------------------ | -------------- |
    | success | boolean | true                     | 요청 성공 여부 |
    | message | string  | 게시글이 등록되었습니다. | 응답 메세지    |

  - body example

    ```json
    // 성공시
    {
        "success": true,
        "message": "게시글이 등록되었습니다."
    }
    
    // 실패시
    {
        "success": false,
        "message": "로그인이 필요합니다."
    }
    {
    	"success": false, 
    	"message": "서버에서 문제가 발생했습니다."
    }
    ```

2) #### 게시글 수정

`PATCH` /board/:id

- request

  - header

    | KEY           | VALUE                        |
    | ------------- | ---------------------------- |
    | Authorization | eyJhbGciOiJIUzI1NiIsInR5c... |

  - params

    ```json
    boardId
    ```

  - body

    ```json
    {
        "title": "", 
        "contents": "", 
        "categoryCode": 0(or 1 or 2)
    }
    ```

- response

  - status Code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 200  | 수정되었습니다.               |
    | 403  | 권한이 없습니다.              |
    | 404  | 존재하지 않는 게시글입니다.   |
    | 500  | 서버에서 문제가 발생했습니다. |

  - parameters

    | name    | type    | example        | desc           |
    | ------- | ------- | -------------- | -------------- |
    | success | boolean | true           | 요청 성공 여부 |
    | message | string  | 수정되었습니다 | 응답 메세지    |

  - body example

    ```json
    // 성공시
    {
        "success": true,
        "message": "수정되었습니다"
    }
    
    // 실패시
    {
        "success": false,
        "message": "권한이 없습니다."
    }
    {
        "success": false,
        "message": "존재하지 않는 게시물입니다."
    }
    {
    	"success": false, 
    	"message": "서버에서 문제가 발생했습니다."
    }
    ```

3) #### 게시글 삭제

`DELETE` /board/:id

- request

  - header

    | KEY           | VALUE                        |
    | ------------- | ---------------------------- |
    | Authorization | eyJhbGciOiJIUzI1NiIsInR5c... |

  - params

    ```json
    boardId
    ```

- response

  - status Code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 200  | 삭제되었습니다.               |
    | 403  | 권한이 없습니다.              |
    | 404  | 존재하지 않는 게시글입니다.   |
    | 500  | 서버에서 문제가 발생했습니다. |

  - parameters

    | name    | type    | example         | desc           |
    | ------- | ------- | --------------- | -------------- |
    | success | boolean | true            | 요청 성공 여부 |
    | message | string  | 삭제되었습니다. | 응답 메세지    |

  - body example

    ```json
    // 성공시
    {
        "success": true,
        "message": "삭제되었습니다."
    }
    
    // 실패시
    {
        "success": false,
        "message": "권한이 없습니다."
    }
    {
        "success": false,
        "message": "존재하지 않는 게시물입니다."
    }
    {
    	"success": false, 
    	"message": "서버에서 문제가 발생했습니다."
    }
    ```

4) #### 게시글 내용 가져오기

`GET` /board/:id

- request

  - params

    ```json
    boardId
    ```

- response

  - status Code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 200  | 수정되었습니다.               |
    | 404  | 존재하지 않는 게시글입니다.   |
    | 500  | 서버에서 문제가 발생했습니다. |

  - parameters

    | name      | type    | example             | desc           |
    | --------- | ------- | ------------------- | -------------- |
    | success   | boolean | true                | 요청 성공 여부 |
    | message   | string  | 성공했습니다.       | 응답 메세지    |
    | boardInfo | object  | { title: "", ...  } | 게시글 정보    |
    | cnt       | number  | 1                   | 조회수         |

  - body example

    ```json
    // 성공시
    {
        "success": true,
        "message": "성공했습니다."
    }
    
    // 실패시
    {
        "success": false,
        "message": "존재하지 않는 게시물입니다."
    }
    {
    	"success": false, 
    	"message": "서버에서 문제가 발생했습니다."
    }
    ```

5) #### 게시글 목록 가져오기

`GET` /board/?pageNo=&pageSize=

- request

  - query

    ```json
    pageNo, pageSize
    ```

- response

  - status Code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 200  | 성공했습니다.                 |
    | 404  | 존재하지 않는 페이지입니다.   |
    | 500  | 서버에서 문제가 발생했습니다. |

  - parameters

    | name      | type    | example               | desc           |
    | --------- | ------- | --------------------- | -------------- |
    | success   | boolean | true                  | 요청 성공 여부 |
    | message   | string  | 성공했습니다.         | 응답 메세지    |
    | skipSize  | number  | 10                    | pagination     |
    | boardInfo | array   | [{ title: "", ...  }] | 게시글 정보    |

  - body example

    ```json
    // 성공시
    {
        "success": true,
        "message": "성공했습니다."
    }
    
    // 실패시
    {
        "success": false,
        "message": "존재하지 않는 페이지입니다.."
    }
    {
    	"success": false, 
    	"message": "서버에서 문제가 발생했습니다."
    }
    ```

6) #### 게시글 검색 글쓴이/제목/카테고리

`GET` /board/?title=제목&pageNo=

- request

  - query

    ```json
    title(제목) or author(글쓴이) or category(카테고리 번호), pageNo
    ```

- response

  - status Code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 200  | 성공했습니다.                 |
    | 404  | 존재하지 않는 페이지입니다.   |
    | 500  | 서버에서 문제가 발생했습니다. |

  - parameters

    | name      | type    | example               | desc           |
    | --------- | ------- | --------------------- | -------------- |
    | success   | boolean | true                  | 요청 성공 여부 |
    | message   | string  | 성공했습니다.         | 응답 메세지    |
    | skipSize  | number  | 10                    | pagination     |
    | boardInfo | array   | [{ title: "", ...  }] | 게시글 정보    |

  - body example

    ```json
    // 성공시
    {
        "success": true,
        "message": "성공했습니다."
    }
    
    // 실패시
    {
        "success": false,
        "message": "존재하지 않는 페이지입니다.."
    }
    {
    	"success": false, 
    	"message": "서버에서 문제가 발생했습니다."
    }
    ```

### 댓글, 대댓글 API

1. #### 댓글, 대댓글 생성

`POST` /comment

- request

  - header

    | KEY           | VALUE                        |
    | ------------- | ---------------------------- |
    | Authorization | eyJhbGciOiJIUzI1NiIsInR5c... |

  - body

    ```json
    // 댓글
    {
        "boardId": 1 or ect..,
        "contents": " ",
        "depth": 1 or 2
    }
    ```

- response

  - status Code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 201  | 댓글이 등록되었습니다.        |
    | 401  | 로그인이 필요합니다.          |
    | 500  | 서버에서 문제가 발생했습니다. |

  - parameters

    | name    | type    | example                  | desc           |
    | ------- | ------- | ------------------------ | -------------- |
    | success | boolean | true                     | 요청 성공 여부 |
    | message | string  | 게시글이 등록되었습니다. | 응답 메세지    |

  - body example

    ```json
    // 성공시
    {
        "success": true,
        "message": "댓글이 등록되었습니다."
    }
    
    // 실패시
    {
        "success": false,
        "message": "로그인이 필요합니다."
    }
    {
    	"success": false, 
    	"message": "서버에서 문제가 발생했습니다."
    }
    ```

2. #### 댓글, 대댓글 수정 

`PATCH` /comment/:id

- request

  - header

    | KEY           | VALUE                        |
    | ------------- | ---------------------------- |
    | Authorization | eyJhbGciOiJIUzI1NiIsInR5c... |

  - params

    ```json
    commentId
    ```

  - body

    ```json
    {
        "contents": ""
    }
    ```

- response

  - status Code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 200  | 수정되었습니다.               |
    | 403  | 권한이 없습니다.              |
    | 404  | 존재하지 않는 댓글입니다.     |
    | 500  | 서버에서 문제가 발생했습니다. |

  - parameters

    | name    | type    | example         | desc           |
    | ------- | ------- | --------------- | -------------- |
    | success | boolean | true            | 요청 성공 여부 |
    | message | string  | 수정되었습니다. | 응답 메세지    |

  - body example

    ```json
    // 성공시
    {
        "success": true,
        "message": "수정되었습니다"
    }
    
    // 실패시
    {
        "success": false,
        "message": "권한이 없습니다."
    }
    {
        "success": false,
        "message": "존재하지 않는 댓글입니다."
    }
    {
    	"success": false, 
    	"message": "서버에서 문제가 발생했습니다."
    }
    ```

3. #### 댓글, 대댓글 삭제

`DELETE` /comment/:id

- request

  - header

    | KEY           | VALUE                        |
    | ------------- | ---------------------------- |
    | Authorization | eyJhbGciOiJIUzI1NiIsInR5c... |

  - params

    ```json
    commentId
    ```

- response

  - status Code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 200  | 삭제되었습니다.               |
    | 403  | 권한이 없습니다.              |
    | 404  | 존재하지 않는 댓글입니다.     |
    | 500  | 서버에서 문제가 발생했습니다. |

  - parameters

    | name    | type    | example         | desc           |
    | ------- | ------- | --------------- | -------------- |
    | success | boolean | true            | 요청 성공 여부 |
    | message | string  | 삭제되었습니다. | 응답 메세지    |

  - body example

    ```json
    // 성공시
    {
        "success": true,
        "message": "삭제되었습니다"
    }
    
    // 실패시
    {
        "success": false,
        "message": "권한이 없습니다."
    }
    {
        "success": false,
        "message": "존재하지 않는 댓글입니다."
    }
    {
    	"success": false, 
    	"message": "서버에서 문제가 발생했습니다."
    }
    ```

4. #### 댓글, 대댓글 읽기

`GET` /comment?

- request

  - query

    ```json
    pageNo, pageSize, commentId or boardId
    ```

    > commentId : 대댓글
    >
    > boardId : 댓글

- response

  - status Code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 200  | 성공했습니다.                 |
    | 404  | 존재하지 않는 페이지입니다.   |
    | 500  | 서버에서 문제가 발생했습니다. |

  - parameters

    | name        | type    | example                  | desc                      |
    | ----------- | ------- | ------------------------ | ------------------------- |
    | success     | boolean | true                     | 요청 성공 여부            |
    | message     | string  | 성공했습니다.            | 응답 메세지               |
    | maxPageNo   | number  | 10                       | 현재 조건에서 maxpage번호 |
    | commentInfo | array   | [{ contents: "", ...  }] | 댓글 정보                 |

  - body example

    ```json
    // 성공시
    {
        "success": true,
        "message": "성공했습니다.",
        "maxPageNo": 1,
        "commentInfo": [
            {
                "_id": "61801f50a59d2209ea68cb62",
                "userId": "sally",
                "boardId": 0,
                "parentId": null,
                "depth": 1,
                "content": "이것은 댓글이다.",
                "createdDt": "2021-11-01T17:09:36.621Z",
                "updatedDt": "2021-11-01T17:09:36.621Z",
                "commentId": 2,
                "__v": 0
            },
            ...
        ]
    }
    
    // 실패시
    {
        "success": false,
        "message": "존재하지 않는 페이지입니다."
    }
    {
    	"success": false, 
    	"message": "서버에서 문제가 발생했습니다."
    }
    ```

    

