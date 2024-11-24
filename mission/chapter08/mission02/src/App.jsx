import { useState } from 'react'
import './App.css'
import MainPage from './pages/mainPage/mainPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/root-layout'
import DetailPage from './pages/detailPage/detailPage'

function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <MainPage/>
      },
      {
        path: 'details/:todoId',
        element: <DetailPage/>
      }
    ]
  }])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
