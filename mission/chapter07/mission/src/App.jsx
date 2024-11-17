import RootLayout from "./layout/root-layout"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CategoryPage from "./pages/categoryPage/categoryPage";
import SearchPage from "./pages/basicPages/searchPage/searchPage";
import LoginPage from "./pages/basicPages/loginPage/myloginPage";
import SignupPage from "./pages/basicPages/signupPage/mysignupPage";
import HomePage from "./pages/basicPages/homePage/homePage";
import MovieRoute from "./pages/movieRoute/moveRoute";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {   index:true,
                element : <HomePage/>
            },
            {
                path: 'search',
                element: <SearchPage/>
            },
            {
                path: 'movies',
                element: <CategoryPage/>
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'signup',
                element: <SignupPage/>
            }
            ,
            {
                path: 'movies/:categoryOrMovieId',
                element: <MovieRoute/>
            }
        ]
    }
])
const queryClient = new QueryClient();
function App() {
    return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    )
}

export default App
