- useMutation 🍠
    - useMutation이 무엇인가요?
        - useQuery 와 달리 useMutation은 데이터를 생성 / 업데이트 / 삭제 할 때 사용
        - 사용자 생성 또는 기존 엔티티 업데이트 등의 데이터 변형 작업을 수행해야 할 때 활용
        - 변형 요청, 캐싱, 데이터의 업데이트를 자동으로 처리
        - mutationFn
            
            mutationFn은 mutation Function으로 **promise 처리가 이루어지는 함수,**
            
            다른 말로는 axios를 이용해 서버에 API를 요청하는 부분
            
    - onMutate
        
        mutation 함수를 실행하기 전에 수행할 작업을 정의함, `optimistic update` 사용 시 유용한 함수
        
        ```jsx
        onMutate?: (variables: TVariables) => Promise<R | undefined> | R | undefined;
        ```
        
        TVariables는 mutation에 전달되는 변수들의 타입을 나타내고, R은 mutation의 결과 타입을 나타냄
        
        - onMutate 콜백 함수는 mutation 이전에 실행
        - onMutate 함수는 Promise를 반환할 수 있으며, 이 경우 useQuery 훅은 Promise가 완료될 때까지 대기
        - onMutate 함수는 쿼리 캐시를 업데이트할 수 있음
        - onMutate 함수는 mutation 실행 결과가 도착하기 전에 이전 데이터를 저장하는 함수를 반환할 수 있음
        
        onMutate 속성을 적절히 활용하면 mutation이 실행될 때 UI 업데이트나 캐시 업데이트 등을 더 빠르게 처리할 수 있음
        
    - onSuccess
        
        ```jsx
        onSuccess: (data: TData, variables: TVariables, context?: TContext) => Promise<unknown>
        ```
        
        mutation이 성공하고 결과를 전달할 때 실행되는 구간
        
    - onError
        
        ```jsx
        onError: (err: TError, variables: TVariables, context?: TContext) => Promise<unknown>
        ```
        
        mutation 이 error 를 만났을 때 실행되는 구간
        
    - onSettled
        
        ```jsx
        onSettled: (data: TData, error: TError, variables: TVariables, context?: TContext) => Promise<unknown>
        ```
        
         mutation 이 성공한 경우 또는 error를 만난 경우 실행되는 구간(성공하든 실패하든 결과 전달됨)
        
    
    ex)
    
    ```jsx
    const savePerson = useMutation({
        mutationFn: (person: Iperson) => axios.post('/savePerson', person),
        onSuccess: () => { // 요청이 성공한 경우
            console.log('onSuccess');
        },
        onError: (error) => { // 요청에 에러가 발생된 경우
            console.log('onError');
        },
        onSettled: () => { // 요청이 성공하든, 에러가 발생되든 실행하고 싶은 경우
            console.log('onSettled');
        }
    ```
    
    - invalidateQueries
        
         **useQuery에서 사용되는 queryKey의 유효성을 제거해주는 목적**으로 사용
        
         queryKey의 유효성을 제거하는 경우 → **서버로부터 다시 데이터를 조회해오기 위함**
        
        - 사용 방법
        
        ```jsx
        const queryClient = useQueryClient()
        const { mutate } = useMutation((updateData) => mutateFn(updateData), {
        	onSuccess: () => {
            	queryClient.invalidateQueries('query key')
            }
        })
        ```
        
        - flow
            1. query를 stale로 표시
            2. query가 현재 렌더징 중이면 refetch를 트리거 (query를 사용하는 컴포넌트가 표시되는 경우)
            3. mutate를 호출 -> mutate에 있는 onSuccess 핸들러가 관련 쿼리를 무효화 시킴(invalidateQueries) -> 데이터 refetch
        
        해당 invalidateQueries를 통해 사용자는 페이지새로고침 할 필요없이 데이터가 업데이트 됨
        
- 낙관적 업데이트 (Optimistic Update) 🍠
    - 낙관적 업데이트란?
        
        새 값이 무언인지 알고있는 경우 서버로부터 응답을 받기전에 사용자 캐시를 업데이트 하는 것
        
        요청을 보내는 것과 동시에 결과를 예측하고, 예측한 결과를 UI에 반영하는 것
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/a8136662-840c-4577-95de-1e7c231f420a/image.png)
        
        - 장점
            - 캐시를 업데이트 하기 위해 서버 응답을 기다릴 필요가 없어 캐시가 더 빨리 업데이트 가능
            - 여러개의 컴포넌트가 해당 데이터를 사용하는 경우 더 유용하게 쓰일 수 있음
        - 단점
            - 서버 업데이트가 실패한 경우에는 코드가 많이 복잡해질 수 있음
    - 낙관적 업데이트를 `useMutation`을 활용하여 구현할 수 있는 방법?
        - 예시
        
        ```jsx
        import { useQueryClient } from '@tanstack/react-query'
        
        const Feed = ({ feed }: {
        	id: number;			// 피드 아이디
            isLiked: boolean; 	// 피드에 대한 유저의 좋아요 여부 (요청을 보낸 유저 기준)
            likeCount: number;	// 피드 좋아요 개수
        }) => {
        	const queryClient = useQueryClient();
            const { mutate } = useMutation({
            	mutationFn: (feedId) => api.put('피드에 좋아요', { feedId }),
                
                // mutation이 발생할 때
                onMutate: (feedId) => {
                	// 현재 feed 정보를 prevFeed 변수에 저장한다.
                    // Feed 컴포넌트가 props로 받은 feed와 동일한 값이다.
                	const prevFeed = queryClient.getQueryData(['feeds', feedId]);
                    
                    // 새롭게 갈아끼울 feed 정보
                	const nextFeed = {
                    	id: feed.id,
                		isLiked: !feed.isLiked,
              			likeCount: feed.isLiked ? feed.likeCount - 1 : feed.likeCount + 1
                    };
                    
                    // ['feeds', feedId] 키에 저장된 쿼리 데이터를 nextFeed로 갈아끼운다.
                	queryClient.setQueryData(['feeds', feedId], nextFeed);
                    
                    // prevFeed 정보와 함께 context를 반환한다.
                    return { prevFeed };
                },
                
                // mutation이 실패할 때
                onError: (err, feedId, context) => {
                	// onMutate에서 반환한 context를 이용해서 에러 핸들링을 한다.
                	queryClient.setQueryData(['feeds', feedId], context.prevFeed);
                    
                    // ... 추가적인 에러 핸들링
                }
        	)};
                
            
            // 좋아요 아이콘 클릭 시 호출
            const handleClick = () => {
            	mutate(feed.id);
            };
            
            return (
            	<div>
                	<h3>피드 #{feed.id}</h3>
                    <img src={feed.isLiked ? '빨간하트' : '검은색하트'} onClick={handleClick}/>
                    <span>...님 외 {feed.likeCount}명이 좋아합니다.</span>
                </div>
            );
        };
        
        export default Feed;
        ```
        
        1.  Feed 컴포넌트는 피드 정보가 담겨있는 feed를 props로 받아옴. 
            
            ```
            { feed }: {
            	id: number;			// 피드 아이디
                isLiked: boolean; 	// 피드에 대한 유저의 좋아요 여부 (요청을 보낸 유저 기준)
                likeCount: number;	// 피드 좋아요 개수
            }
            ```
            
        2. mutationFn 옵션
            
            ```
            mutationFn: (feedId) => api.put('피드에 좋아요', { feedId })
            ```
            
            useMutation 훅이 반환한 mutate 함수가 호출될때 호출되는 api 요청
            
        3. onMutate 옵션
            
            ```
            // mutation이 발생할 때
            	onMutate: (feedId) => {
            		// 현재 feed 정보를 prevFeed 변수에 저장한다.
            		// Feed 컴포넌트가 props로 받은 feed와 동일한 값이다.
            		const prevFeed = queryClient.getQueryData(['feeds', feedId]);
            
            	// 새롭게 갈아끼울 feed 정보
            	const nextFeed = {
            		id: feed.id,
            		isLiked: !feed.isLiked,
            		likeCount: feed.isLiked ? feed.likeCount - 1 : feed.likeCount + 1
            	};
            
            	// ['feeds', feedId] 키에 저장된 쿼리 데이터를 nextFeed로 갈아끼운다.
            	queryClient.setQueryData(['feeds', feedId], nextFeed);
            
            	// prevFeed 정보와 함께 context를 반환한다.
            	return { prevFeed };
            }
            ```
            
            mutate 요청이 발생할 때 호출되는 함수를 onMutate에 전달함으로써 Optimistic Updates를 구현
            
            ```
            // 현재 feed 정보를 prevFeed 변수에 저장한다.
            // Feed 컴포넌트가 props로 받은 feed와 동일한 값이다.
            const prevFeed = queryClient.getQueryData(['feeds', feedId]);
            ```
            
            먼저 현재 feed 정보를 prevFeed 변수에 저장하는데, 이는 props로 받아온 feed 정보와 동일함
            
            ```
            // 새롭게 갈아끼울 feed 정보
            const nextFeed = {
            	id: feed.id,
            	isLiked: !feed.isLiked,
            	likeCount: feed.isLiked ? feed.likeCount - 1 : feed.likeCount + 1
            };
            ```
            
            다음으로 새롭게 끼워넣을 feed 정보를 만들어 nextFeed 변수에 저장
            
            ```
            // ['feeds', feedId] 키에 저장된 쿼리 데이터를 nextFeed로 갈아끼운다.
            queryClient.setQueryData(['feeds', feedId], nextFeed);
            ```
            
            그리고 ['feeds', feedId]라는 쿼리 키에 저장되어 있는 쿼리 데이터를 nextFeed로 갈아끼움.
            
             이러한 과정은 동기적으로 이루어지며, 해당 쿼리 데이터를 observe하고 있는 Feed 컴포넌트의 부모는 업데이트 된 feed 정보를 Feed 컴포넌트에 props로 내려줌.
            
             이를 통해 props가 변경된 것을 인식한 Feed 컴포넌트의 리렌더링이 발생하며 업데이트 된 UI를 즉각적으로 반영하게 됨
            
            ```
            // prevFeed 정보와 함께 context를 반환한다.
            return { prevFeed };
            ```
            
            마지막으로 에러 핸들링을 위해 앞서 저장해둔 prevFeed를 반환
            
        4. onError 옵션
            
            ```
            onError: (err, feedId, context) => {
                // onMutate에서 반환한 context를 이용해서 에러 핸들링을 한다.
                queryClient.setQueryData(['feeds', feedId], context.prevFeed);
            
                // ... 추가적인 에러 핸들링
            }
            ```
            
            mutate 요청이 실패할 때 호출되는 함수를 전달함으로써 에러 핸들링을 도움
            
            onMutate에서 반환한 값은 onError의 세번째 파라미터로 전달되고, mutate 요청이 실패했으므로 변경 전의 feed 정보로 다시 복원해줌.
            
        5. 렌더링
            
            ```
            return (
            	<div>
            		<h3>피드 #{feed.id}</h3>
            		<img src={feed.isLiked ? '빨간하트' : '검은색하트'} onClick={handleClick}/>
            		<span>...님 외 {feed.likeCount}명이 좋아합니다.</span>
            	</div>
            );
            ```
            
              Optimistic Updates가 Feed 컴포넌트에 내려주는 props의 원본 데이터(쿼리 데이터)에 작용하기 때문에 props로 내려받은 feed 값을 그대로 가져다 씀