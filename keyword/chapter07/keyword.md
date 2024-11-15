- Tanstack-Query 🍠
    - Tanstack-Query 초기 세팅 방법
        
        ```jsx
        yarn add @tanstack/react-query
        yarn add json-server
        yarn add axios
        ```
        
        context나 redux같이 Provider로 전체를 감쌈
        
        ```jsx
        import ReactDOM from "react-dom/client";
        import App from "./App.jsx";
        import "./index.css";
        import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
        
        const queryClient = new QueryClient();
        
        ReactDOM.createRoot(document.getElementById("root")).render(
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        );
        ```
        
         queryClient를 만들어 주고, 사용할때는 new QueryClient가 아닌 useQueryClient를 사용
        
    - Query-DevTools?
        
        React Query의 사용을 이해,최적화, 디버깅하는걸 도와주는 도구
        
        개발 중인 모든 쿼리의 상태를 표시해줌
        
        - 세팅 법
            
            ```jsx
            import { ReactQueryDevtools } from 'react-query/devtools'
            
            function MyApp({ Component, pageProps }) {
              return (
                <>
                  <Component {...pageProps} />
                  {/* Add the DevTools component */}
                  <ReactQueryDevtools initialIsOpen={false} />
                </>
              );
            }
            ```
            
            브라우저 확인 시 하단에 로고 모양의 개발자 도구 버튼이 나타남, 버튼을 이용해서 개발자 도구를 열고 닫을 수 있음
            
            ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/612a3e8b-c76a-412a-9824-a3b20649c679/image.png)
            
            queryKey로 쿼리를 표시하고 쿼리의 상태와 마지막으로 업데이트된 타임스탬프를 알려줌
            
    - useQuery
        
        get 요청에 사용됨
        
        - queryKey
            
            쿼리를 식별하는 고유한 값으로, 배열의 형태를 지정
            
        - queryFn
            
            데이터를 가져오는 비동기함수
            
        
        ```jsx
         const {
            data: todos, isPending, isError,} = useQuery({
        	    queryKey: ["todos"],
        	    queryFn: fetchTodos,
          });
        ```
        
        useQuery 내부에서 객체 형식으로 queryKey와 queryFn을 넣어 사용
        
        최초 요청시 queryFn으로 데이터 받아온후 queryKey에 맞게 저장
        
        이때 저장된 데이터는 캐싱되어 같은 요청에 캐싱된 데이터를 주어 추가적인 데이터 요청이 없음.
        
    - useInfiniteQuery
        
        파라미터 값만 변경하여 동일한 useQuery를 무한정 호출할 때 사용
        
        ex)infinite Scroll
        
        - 사용법
            - 기본 형태
                
                ```jsx
                const res = useInfiniteQuery(queryKey, queryFn);
                ```
                
            - pageParam
                
                useInfiniteQuery가 현재 어떤 페이지에 있는지 확인할 수 있는 파라미터 값
                
                 api요청시 파라미터 값으로 넣어 사용 가능
                
                ```jsx
                const res = useInfiniteQuery(
                    ['infinitePerson'],
                ({ pageParam =5 }) => axios.get('http://localhost:8080/person', {
                params: {
                id: pageParam
                    }
                ```
                
            - getNextPageParam, fetchNextPage
                
                다음 페이지에 있는 데이터를 조회해 올 때 사용
                
                - getNextPageParam
                    
                    다음 api요청에 사용될 pageParam값을 지정할 수 있음
                    
                    ```jsx
                    const res = useInfiniteQuery(
                        ['infinitePerson'],
                    ({ pageParam =5 }) => axios.get('http://localhost:8080/person', {
                    params: {
                    id: pageParam
                        }
                    }), {
                    getNextPageParam:(lastPage, allPages) => {
                    return lastPage.data.id +1;// 다음 페이지를 호출할 때 사용 될 pageParam
                        },
                    });
                    ```
                    
                    lastPage : useInfiniteQuery를 이용해서 호출된 마지막 페이지 데이터
                    
                    allPages: useInfiniteQuery를 이용해 호출된 모든 페이지 데이터
                    
                    return 값이 다음페이지를 호출할 때 pageParam값으로 사용됨
                    
                - fetchNextPage
                    
                    다음 페이지의 데이터 호출 시 사용
                    
                    ```jsx
                    <Person.NextButton onClick={() => res.fetchNextPage()}>
                    Next</Person.NextButton> {/* 클릭 시 다음 페이지 호출 */}
                    ```
                    
                    fetchNextPage로 호출된 데이터는 배열의 가장 우측에 담김
                    
                    ex)[ '5 data' ] →fetchNextPage → [ '5 data', '6 data' ] →fetchNextPage →[ '5 data', '6 data', '7 data' ]
                    
            - getPreviousPageParam, fetchPreviousPage
                
                이전 페이지 데이터 불러올때 사용
                
                getNextPageParam과 fetchNextPage 반대라 생각하면 됨
                
                - getPreviousPageParam
                    
                    ```jsx
                    const res = useInfiniteQuery(
                        ['infinitePerson'],
                    ({ pageParam =5 }) => axios.get('http://localhost:8080/person', {
                    params: {
                    id: pageParam
                        }
                    }), {
                    getNextPageParam:(lastPage, allPages) => {
                    return lastPage.data.id +1;// 다음 페이지를 호출할 때 사용 될 pageParam
                        },
                    });
                    ```
                    
                - fetchPreviousPage
                    
                    ```jsx
                       <Person.PrevButton onClick={() => res.fetchPreviousPage()}>
                       Prev</Person.PrevButton> {/* 클릭 시 이전 페이지 호출 */}
                    ```
                    
                    fetchPreviousPage로 호출된 데이터는 배열의 가장 좌측에 담김
                    
                    ex)[ '5 data' ] →fetchNextPage → [ '4 data', '5 data' ] →fetchNextPage →[ '3 data', '4 data', '5 data' ]
                    
            - hasNextPage, hasPreviousPage
                
                데이터 호출은 무한정 할 수 있지만, 호출되는 데이터는 한계가 있음
                
                호출되는 데이터를 한정시켜주기 위해 사용
                
                getNextPageParam과 getPreviousPageParam에서 결정되는 true false값을 저장함
                
                ex)다음 api 호출에 사용될 pageParam값이 정상적으로 담겨있을 경우 
                
                hasNextPage와 hasPreviousPage는 true
                
                값이 담겨있지 않은 경우 false
                
                ```jsx
                const res = useInfiniteQuery(
                    ['infinitePerson'], 
                    ({ pageParam = 5 }) => axios.get('http://localhost:8080/person', {
                    params: {
                        id: pageParam
                    }
                }), {
                    getNextPageParam: (lastPage, allPages) => {
                        return lastPage.data.id < 10 && lastPage.data.id + 1; // 다음 페이지를 호출할 때 사용 될 pageParam
                    },
                    getPreviousPageParam: (firstPage, allPages) => {
                        return firstPage.data.id > 1 && firstPage.data.id - 1; // 이전 페이지를 호출할 때 사용 될 pageParam 
                    },
                });
                
                 <Person.NextButton onClick={() => res.hasNextPage && res.fetchNextPage()}>
                 Next</Person.NextButton> {/* 클릭 시 다음 페이지 호출 */}
                 <Person.PrevButton onClick={() => res.hasPreviousPage && res.fetchPreviousPage()}>
                 Prev</Person.PrevButton> {/* 클릭 시 이전 페이지 호출 */}
                
                ```
                
                getNextPageParam, getPreviousPageParam으로 한계값을 정해줌
                
                hasNextPage,hasPreviousPage를 이용해 data 호출이 정상적으로 된 경우에만
                
                fetchPage를 사용
                
    - queryKey
        
        쿼리 키(queryKey)는 데이터를 식별하는 데 사용되는 고유한 식별자로 useQuery, useMutation, useQueryClient 등의 훅에서 사용
        
        데이터를 가져오거나 캐시된 데이터를 식별하는 데 필요
        
- Pagination 🍠
    - Pagination은 무엇인가요?
        
        많은 데이터를 부분적으로 불러오는 기술
        
        - 종류
            - **Page Based Pagination**
                
                페이지를 기반으로 데이터를 잘라서 요청하는 방식
                
                 요청을 보낼 때 몇 개의 데이터를 가져올지, 몇 번째 페이지를 가져올 지를 명시하여페이지 숫자를 누르면, 해당 페이지로 넘어가는 형태의 UI에서 사용
                
                - 장점
                    
                    구현이 쉬움
                    
                - 단점
                    
                    페이지네이션 과정 중 데이터 추가 및 삭제가 이뤄질 경우 데이터 누락이나 중복될 가능성 존재
                    
            - **Cursor Based Pagination**
                
                가장 최근에 가져온 데이터를 기준으로 다음 데이터를 가져오는 방식의 pagination
                
                요청을 보낼 때, 가장 마지막 데이터의 id와 함께 몇 개의 데이터를 가져올 지 개수를 명시하여 스크롤 형태의 리스트에서 자주 사용
                
                무한 스크롤 방식이 바로 커서 페이지네이션 방식
                
                - 장점
                    
                    데이터가 중복되거나 누락될 확률이 낮음
                    
                - 단점
                    
                    구현이 복잡함
                    
    - Pagination을 어떠한 방식으로 구현할 수 있을까요?
        1. 데이터 갯수에 따라 최대 페이지 갯수 정하기
            
            api요청 시 전체 데이터 개수 받아옴
            
        2. 페이지를 선택하거나 다음 방향표를 눌러서 그 페이지에 해당하는 API 요청하는 부분 (offset)
            
            페이지를 넘길 때마다 새로운 데이터를 받아올 API를 호출,
            
            useEffect를 이용해서 현재 페이지를 나타내는 state인 page가 변경될 때마다, useEffect의 콜백 함수에서 새로운 데이터 받아옴
            
        3. 최대 페이지가 5페이지가 넘어갈 경우, 5페이지 다음으로 넘어가면 6~10 페이지 보여주기
    - Pagination의 장점과 단점에 대해 정리해주세요.
        - 장점
            - 특정 항목 검색이 용이
            - 북마크
        - 단점
            - 사용자의 추가적인 액션이 필요함
- Infinite Scroll 🍠
    - Intersection Observer는 무엇인가요?
        
        화면(뷰포트) 상에 내가 지정한 타겟 엘레멘트가 보이고 있는지를 관찰하는 API
        
        비동기적으로 실행되기 때문에, `scroll` 이벤트 기반의 요소 관찰에서 발생하는 렌더링 성능이나 이벤트 연속 호출 같은 문제 없이 사용
        
        - 장점
            - 비동기적으로 실행되기 때문에, 메인 스레드에 영향을 주지 않으면서 요소들의 변경사항들을 관찰
            - 리플로우 현상을 방지
        - 사용법
            
            ```jsx
            const io = new IntersectionObserver (callback, options); // 관찰자 초기화
            io.observe(element)
            ```
            
            new IntersectionObserver()를 통해 생성한 인스턴스(io)로 관찰자를 초기화하고 관찰할 대상(Element)를 지정
            
            - `callback`
                
                관찰할 대상이 등록되거나 가시성(보이는지 안보이는지)에 변화가 생기면 관찰자는 콜백(Callback)을 실행
                Callback은 2개의 인수(**entries**, **observer**)를 가짐
                
                - **entries**
                    
                    IntersectionObserverEntry 인스턴스의 배열로 다음의 읽기 전용 속성을 가짐
                    
                    - **boundingClientRect**: 관찰 대상의 사각형 정보
                        - 관찰 대상의 사각형 정보를 반환
                        - 이 값은, Element.getBoundingClientRect()를 사용해 동일하게 얻을 수 있음
                        
                        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/f70f9339-256f-4a1e-9699-24b6c1f06676/image.png)
                        
                    
                    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/9beed4c7-6032-4279-92e0-d429f28dfefa/image.png)
                    
                    - **intersectionRect**: 관찰 대상의 교차한 영역 정보
                        - 관찰 대상과 루트 요소와의 교차하는 영역에 대한 사각형 정보
                        
                        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/33d8630c-0f49-4a46-871d-8735cedea0c6/image.png)
                        
                    - **intersectionRatio**: 관찰 대상의 교차한 영역 백분율
                        - 관찰 대상이 루트 요소와 얼마나 교차하는지의 수치를 0~1.0 사이의 숫자로 반환한 것
                        - 이는 intersectionRect영역과 boundingClientRect 영역의 비율을 의미
                    - **isIntersecting**: 관찰 대상의 교차 상태(Boolean, 주로 사용하는 속성)
                        - 관찰 대상이 루트 요소와 교차 상태로 들어가거나 교차 상태에서 나가는지 여부를 나타내느 값(Boolean)
                        - 루트 요소와 교차했는지에 따라 결정 되는 Boolean값으로 무한 스크롤을 구현할 수 있음 (맨 마지막 요소가 보이면 api 통신하도록 callback 함수 설계)
                        
                        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/bf16ffcf-842a-425a-a4d3-01b6c93ea640/image.png)
                        
                    - **rootBounds**: 지정한 루트 요소의 사각형 정보
                        - 루트 요소에 대한 사각형 정보를 반환
                        - 이는 옵션 rootMargin에 의해 값이 변경되며, 만약 별도의 루트 요소(옵션 root)를 선언하지 않았을 경우 null을 반환
                    - **target**: 관찰 대상 요소
                        - 관찰 대상(Element)을 반환
                    - **time**: 변경이 발생한 시간 정보
                        - 문서가 작성된 시간을 기준으로 교차 상태 변경이 발생한 시간을 나타내는 DOMHighResTimeStamp를 반환
                - **observer**
                    
                    콜백 함수가 호출되는 IntersectionObserver
                    
            - `options`
                
                관찰이 시작되는 상황에 대해 옵션을 설정할 수 있다. 기본 값이 정해져 있으므로 필수는 아님
                
                - **root**
                    - 교차 기준이 되는 엘리먼트
                    - 타겟의 가시성을 검사하기 위해 뷰포트(viewport) 대신 사용할 요소 객체를 지정
                    - 타겟의 조상 요소이어야 하며 지정하지 않거나 null일 경우 브라우저의 뷰포트(viewport)가 기본 사용
                    
                    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/11c9d968-98c6-4878-8edc-282049401b3f/image.png)
                    
                - **rootMargin**
                    - root로 지정된 엘리먼트의 margin값 설정(default: 0px)
                    - 바깥 여백을 이용해 Root 범위를 확정, 축소가 가능
                    - css와 같이 4단계로 여백 설정 가능하며 px 또는 %로 나타냄
                    
                    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/2a59c4aa-9b23-443f-88b1-134476a479b1/image.png)
                    
                - **thredhold**
                    - root엘리먼트와 observer 엘리먼트가 얼만큼 교차되어있는지를 말하며 0은 전혀 교차 x, 1은 전체가 교차됨을 의미(default: 0)
                    - 옵저버가 실행되기 위해 타겟의 가시성이 얼마나 필요한지 백분율로 표시
                    - 기본값은 Array 타입의 [0]이지만 Number 타입의 단일 값으로도 작성 가능
                    - 0: 타겟의 가장자리 픽셀이 Root 범위를 교차하는 순간 옵저버가 실행
                    - 0.3: 타겟의 가시성 30% 일 때 옵저버 실행
                    - [0, 0.3, 1]: 타겟의 가시성이 0%, 30%, 100% 일 때 모두 옵저버 실행
                    
                    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/d2cd75a8-9054-43fc-9e0a-a401b28b8d2f/image.png)
                    
        - methods
            - `IntersectionObserver.observe(target)`: 관찰 시작
            
            ```jsx
            const io1 = new IntersectionObserver(callback, options)
            const io2 = new IntersectionObserver(callback, options)
            
            const div = document.querySelector('div')
            const li = document.querySelector('li')
            const h2 = document.querySelector('h2')
            
            io1.observe(div) // DIV 요소 관찰
            io2.observe(li) // LI 요소 관찰
            io2.observe(h2) // h2 요소 관찰
            ```
            
            - `IntersectionObserver.unobserve(target)`: 관찰 종료
            
            ```jsx
            const io1 = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                // 가시성의 변화가 있으면 관찰 대상 전체에 대한 콜백이 실행되므로,
                // 관찰 대상의 교차 상태가 false일(보이지 않는) 경우 실행하지 않음.
                if (!entry.isIntersecting) {
                  return
                }
                // 관찰 대상의 교차 상태가 true일(보이는) 경우 실행.
                // ...
            
                // 위 실행을 처리하고(1회) 관찰 중지
                observer.unobserve(entry.target)
              })
            }, options)
            ```
            
            - `IntersectionObserver.disconnect(target)`: 모든 요소 관찰 멈추기
            
            ```jsx
            const io1 = new IntersectionObserver(callback, options)
            const io2 = new IntersectionObserver(callback, options)
            
            // ...
            
            io1.observe(div)
            io2.observe(li)
            io2.observe(h2)
            
            io2.disconnect() // io2가 관찰하는 모든 요소(LI, H2) 관찰 중지
            ```
            
    - Infinite Scroll은 무엇일까요?
        
        사용자가 페이지 가장 아래에 도달할 때 데이터나 콘텐츠가 계속 로드가 되게 하는 방식
        
    - Inifinite Scroll은 어떻게 구현할까요?
        
        intersection Observer를 이용해서
        
        맨 마지막 요소가 관찰되는 순간 새로운 데이터 불러오기
        
    - Infinite Scroll의 장점과 단점에 대해 정리해주세요
        - 장점
            - 사용자 참여 증가(이탈률이 감소함)
            - 사용자의 추가적인 액션 필요없음
            - 모바일 기기에 적합
        - 단점
            - 페이지 성능이 느려짐
            - 특정 위치로 이동 어려움
            - 컨텐츠 수량이 얼마나 되는지 파악 어려움