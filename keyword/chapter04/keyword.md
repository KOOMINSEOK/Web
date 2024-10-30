- `useEffect`  🍠
    
    컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 Hook
    
    컴포넌트가 mount, unmount, update 됐을때, 특정 잡업을 처리 할 수 있음
    
    - 기본 형태
        
        useEffect( function, deps)
        
        -function : 수행하고자 하는 작업
        
        -deps: 배열의 형태로 배열 안에 검사하고자 하는 특정 값 or 빈 배열
        
    1. Component가 mount 됐을 때
        
        ```jsx
        useEffect(()=> {
        	console.log('mounted');
        },[]);
        
        ```
        
        component가 화면에 가장 처음 랜더링 될때 딱 한번만 실해하고 싶으면 deps에 빈배열 넣음
        
        빈 배열 생략시, 리랜더링마다 실행
        
    2. Component가 update 될때
        
        ```jsx
        useEffect(()=> {
        	console.log('updated');
        },[name]);
        
        ```
        
        deps 배열 안에 검사하고 싶은 값을 넣음(mount 될때도 실행됨)
        
    3. Component가 unmount 될때
        
        ```jsx
        useEffect(()=> {
        	console.log('updated');
        	return()=>{
        		console.log('cleanup');
        	}
        },[name]);
        ```
        
        return()문을 이용해 cleanup함수를 만들어 줌
        
        unmount 될 때만 한번 cleanup 함수 실행하고 싶은 경우, deps에 빈배열
        
        특정 값이 업데이트 되기 전에 cleanup함수 실행하고 싶은경우, deps배열 안에  해당 값 넣음
        
- `try, catch, finally` 구문  🍠
    
    자바스크립트의 예외 처리 기법
    
    try → 예외가 발생할 지도 모르는 코드 블록을 정의하는 역할
    
    catch → try 블록 내부에서 예외 발생시 호출되는 문장 블록
    
    finally → try블록에서 예외 발생하는 것과 관계없이 항상 실행되는 블록(ex. 뒷정리 코드들)
    
    catch나 finally는 생략가능 하지만 try는 catch나 finally 둘 중 하나 이상을 함께 사용돼야함
    
    - 기본 형태
        
        ```jsx
        try{
        
        }
        catch(e){
        
        }
        finally{
        
        }
        ```
        
    - 사용 예시
        
        ```jsx
        try {
        	var a = 3;
        	var b = 0;
        	if(b === 0 ) {
        		throw {name : 'divideByZeroException', message: '0으로 나눌수가 없습니다.'}
        	}
        } catch(e) {
        	alert(e.name + ", " + e.message);
        } finally {
        	alert('프로그램을 정상종료합니다.')
        ```
        
        catch구문에서 지역 변수 e를 사용해서 Error객체의 값들을 참조하여 사용할 수 있음
        
- `axios`  🍠
    - **AJAX (Asynchronous Javascript And XML)**
        - Javascript의 라이브러리중 하나로 브라우저가 가지고있는 XMLHttpRequest 객체를 이용해 서 전체 페이지를 새로 고치지 않고도 페이지의 일부만을 위한 데이터를 로드하는 기법
        - JavaScript를 사용한 비동기 통신, 클라이언트와 서버간에 XML 데이터를 주고받는 기술
    - **비동기 방식**
        
        비동기 방식은 웹페이지를 리로드하지 않고 데이터를 불러오는 방식
        
        - 장점
            
            페이지 리로드의 경우 이미지, 스크립트 , 기타 코드등을 모두 재요청할 경우 전체 리소스를 다시 불러와야하여 불필요한 리소스 낭비가 발생
            
             비동기식 방식을 이용할 경우 필요한 부분만 불러와 사용할 수 있음
            
    - **Axios란?**
        
        Axios는 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리
        
        - 특징
            - HTTP 요청 취소 및 요청과 응답을 JSON 형태로 자동 변경
            - 요청과 응답 데이터의 변형
            - Promise(ES6) API 사용
            - npm이나 yarn을 통해 설치해야 함
        - 사용법
            - Get
                
                입력한 url에 존재하는 자원에 요청을 함
                
                - 기본형태
                    
                    ```jsx
                    axios.get(url,[,config])
                    ```
                    
                    응답은 json형태로 옴
                    
                     GET은 서버에서 어떤 데이터를 가져와서 보여준다거나 하는 용도
                    
                - 예제
                    
                    ```jsx
                    axios.get('https://localgost:3000/sewon/user')
                    ```
                    
            - Post
                
                새로운 리소스를 생성(create)할 때 사용
                
                - 기본형태
                    
                    ```jsx
                    axios.post("url주소",{
                      data객체
                        },[,config])
                    ```
                    
                    로그인, 회원가입 등 사용자가 생성한 파일을 서버에다가 업로드할때 사용
                    
                - 예제
                    
                    ```jsx
                    axios.post( 'url', 
                      { 
                       contact: 'Sewon', 
                       email: 'sewon@gmail.com' 
                       }, 
                      { 
                       headers:{ 
                        'Content-type': 'application/json', 
                        'Accept': 'application/json' 
                          } 
                        } 
                    ) 
                    ```
                    
            - Delete
                
                REST 기반 API 프로그램에서 데이터베이스에 저장되어 있는 내용을 삭제하는 목적으로 사용
                
                - 기본형태
                    
                    ```jsx
                    axios.delete(url,[,config]);
                    ```
                    
                    Delete메서드는 HTML Form 태그에서 기본적으로 지원하는 HTTP메서드가 아님
                    
                - 예제
                    
                    ```jsx
                    axios.delete("/thisisExample/list/30")
                    ```
                    
            - patch
                
                REST 기반 API 프로그램에서 데이터베이스에 저장되어 있는 내용을 갱신하는 목적으로 사용
                
                - 기본형태
                    
                    ```jsx
                    axios.patch(url[, data[, config]])
                    ```
                    
                    Put메서드는 HTML Form 태그에서 기본적으로 지원하는 HTTP메서드가 아님
                    
                - 예제
                    
                    ```jsx
                    axios.post("http://localhost:3001/todos", {
                            title: inputValue,
                          });
                    ```
                    
- `fetch`  🍠
    
     JavaScript에서 서버로 네트워크 요청을 보내고 응답을 받을 수 있도록 해주는 매서드
    
    - 기본 형태
        
        ```jsx
        fetch(url)
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
        ```
        
    - 요청 정보 파라미터
        
        ```jsx
        fetch(url, {
           method: 'post',
           headers: {
             "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
           },
           body: 'foo=bar&lorem=ipsum'
        }).then(res => {
          console.log(res);
        })
        .catch(error => console.log(error));
        ```
        
        **method** **:** 요청 방식을 나타냄. (GET, POST, PUT, DELETE 등)
        
        **headers** **:** 요청 헤더에 대한 정보를 나타냄.
        
        **body :** 요청을 보내는 데이터를 나타냄. 여러 가지 자료형을 대입할 수 있음.
        
    - 사용법
        - get
            
            존재하는 자원을 요청하며, 단순히 원격 API에 있는 데이터를 가져올 때 사용
            
            디폴트로 GET 방식으로 작동하여 인자가 필요가 없음
            
            - 예제
                
                ```jsx
                fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) =>
                  console.log(response)
                );
                ```
                
                ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/add80a3c-32ea-4107-b8fa-e796c94a8a49/image.png)
                
        - post
            
            새로운 자원을 생성을 요청
            
            폼 등을 사용해서 데이터를 만들어 낼 때, 보내는 데이터의 양이 많거나, 비밀번호 등 개인정보를 보낼 때 POST 메서드를 사용
            
            1.  method 옵션을 POST로 지정해주고, headers 옵션을 통해 JSON 포맷을 사용한다고 알려줘야 함
            2. body 옵션에는 요청 전문을 JSON 포맷으로 설정
            - 예제
                
                ```jsx
                fetch("https://jsonplaceholder.typicode.com/posts", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    title: "Test",
                    body: "I am testing!",
                    userId: 1,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => console.log(data));
                ```
                
                ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/4fb7d109-60d7-48b8-a689-aa94aa9b655a/image.png)
                
        - put
            
            존재하는 자원 변경을 요청
            
            API에서 관리하는 데이터의 수정을 위해 PUT 메서드를 사용
            
            - 예제
                
                ```jsx
                fetch("https://jsonplaceholder.typicode.com/posts/1", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    // title 엘리먼트로 전체 데이터를 바꾼다. (마치 innerHTML 같다.)
                    title: "Test",
                    body: "I am testing!",
                    userId: 1,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => console.log(data));
                ```
                
                ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/3afed301-9066-495c-a603-8bd88c52ab59/image.png)
                
        - patch
            
            존재하는 자원의 일부 변경을 요청
            
            - 예제
                
                ```jsx
                fetch("https://jsonplaceholder.typicode.com/posts/1", {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    // title만 바꾸고 나머지 요소는 건들지 않는다.
                    title: "Test",
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => console.log(data));
                ```
                
                ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/7db9bd00-dea3-4c32-a753-ebde1c38235a/image.png)
                
            - delete
                
                존재하는 자원 삭제를 요청
                
                - 예제
                    
                    ```jsx
                    fetch("https://jsonplaceholder.typicode.com/posts/1", {
                      method: "DELETE",
                    })
                      .then((response) => response.json())
                      .then((data) => console.log(data));
                    ```
                    
                    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/9e004e37-0d47-4cf1-b70a-34c0151f7099/image.png)
                    
- `axios` vs `fetch` (차이점)  🍠
    1. axios의 경우 외부 라이브러리로 npm이나 yarn을 통해 설치해야 사용 가능
    - fetch의 경우
        
        ```jsx
        const url ='http://localhost3000/test`
        const option ={
           method:'POST',
           header:{
             'Accept':'application/json',
             'Content-Type':'application/json';charset=UTP-8'
          },
          body:JSON.stringify({
          	name:'sewon',
            	age:20
          })
        
          fetch(url,options)
          	.then(response => {
        	  	let data = await response.json();
        	  	console.log(data);
        	  	
          	})
        ```
        
    - axios의 경우
        
        ```jsx
        const option ={
          url ='http://localhost3000/test`
           method:'POST',
           header:{
             'Accept':'application/json',
             'Content-Type':'application/json';charset=UTP-8'
          },
          data:{
          	name:'sewon',
            	age:20
          }
        
          axios(options)
          	.then(response => {
        	  	let data = await response.data;
        	  	console.log(data);
          	})
        ```
        
    1. fetch의 경우 body, axios의 경우 data property 사용
    2. fetch의 경우 url이 fetch함수의 인자로 들어가지만, axios의 경우 url이 option객체로 들어감
    3. data 넘기는 방식
        
        fetch의 경우 string화해서 넘김(stringfy() 메소드 사용)
        
        axios의 경우 객체로 넘김
        
    4. response 받는 경우
        
         fetch의 경우 .json메소드를 호출해서 json객체 얻음
        
         axious의 경우 data property에 접근하여 사용
        
    5. 
- `.env` 파일에는 어떤 내용들을 관리할까요?  🍠
    
    웹,앱 개발을 하다보면 포트, DB관련 정보, API_KEY등.. 개발자 혼자서 또는 팀만 알아야 하는 값 즉, git, 오픈소스에 올리면 안되는 값을 넣어 관리함
    
    - `.env` 파일을 사용하여 axios의 기본 URL 또는 기타 설정을 환경 변수로 관리할 수 있음
        1.  `.env` 파일에 환경 변수를 정의하기
            
            ```jsx
            REACT_APP_SERVER_URL=http://localhost:3001
            ```
            
        2. 이제 프로젝트 어디에서든 process.env 객체를 통해 환경 변수에 접근할 수 있음
            
            ```jsx
            await axios.get("http://localhost:3001/todos"); // 변경 전
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`); // 변경 후
            ```