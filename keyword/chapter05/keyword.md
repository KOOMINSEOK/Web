- useRef 🍠
    
    함수형 컴포넌트 내에서 DOM 요소나 다른 React 요소를 참조하기 위해 사용되는 Hook
    
    - 기본 형태
        
        ```jsx
        const 변수명 = useRef(초기값);
        ```
        
         결과값으로 초기값 {current : 초기값}을 지닌 객체가 반환
        
    - 특징
        1. 컴포넌트가 계속해서 **렌더링이 되어도** 컴포넌트가 언마운드되기 전까지는 **값을 그대로 유지**
        2. **currnet 속성은 값을 변경해도** 상태를 변경할 때 처럼 **React 컴포넌트가 재렌더링 되지 않음 → 성능향상**
    - useRef를 사용하는 경우
        1. 컴포넌트의 렌더링과 관련이 없는 값들을 저장할 때
        2. DOM 요소에 대한 참조를 저장할 때
        3. 렌더링 과정에서 값이 변경되어도 다시 렌더링되지 않아도 되는 경우

- input의 주요 프로퍼티 🍠
    - 아래 내용 이외에, 자주 사용하는 프로퍼티가 있으면 추가로 더 정리해주세요! 🍠
        - **pattern**: 특정 정규표현식을 적용하여 입력 값을 검사함
            
            ```html
            
            <input type="text" pattern="[A-Za-z]{3,}" title="Only letters allowed" />
            
            ```
            
        - **autofocus**: 페이지 로드 시 해당 입력 필드에 자동으로 포커스를 설정
            
            ```html
            
            <input type="text" autofocus />
            
            ```
            
        - **size**: 입력 필드의 너비(글자 수 기준)를 지정
            
            ```html
            
            <input type="text" size="20" />
            
            ```