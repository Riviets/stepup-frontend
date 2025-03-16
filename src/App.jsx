import Navigation from './components/Navigation'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NoMatch from './components/NoMatch'
import Habits from './components/Habits'
import Tracker from './components/Tracker'
import Shop from './components/Shop'
import Levels from './components/Levels'
import Profile from './components/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Habits />
  },
  {
    path: '/habits',
    element: <Habits />
  },
  {
    path: '/tracker',
    element: <Tracker />
  },
  {
    path: '/shop',
    element: <Shop />
  },
  {
    path: '/levels',
    element: <Levels />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '*',
    element: <NoMatch />
  },
])

function App() {

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
