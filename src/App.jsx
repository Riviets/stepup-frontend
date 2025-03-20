import Navigation from './components/Navigation'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NoMatch from './components/NoMatch'
import Habits from './components/Habits'
import Tracker from './components/Tracker'
import Shop from './components/shop/Shop'
import Levels from './components/Levels'
import Profile from './components/Profile'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ProtectedRoute from './components/ProtectedRoute'
import AddHabit from './components/AddHabit'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/habits',
    element: (
      <ProtectedRoute>
        <Habits />
      </ProtectedRoute>
    )
  },
  {
    path: '/habits/add',
    element: (
      <ProtectedRoute>
        <AddHabit />
      </ProtectedRoute>
    )
  },
  {
    path: '/tracker',
    element: (
      <ProtectedRoute>
        <Tracker />
      </ProtectedRoute>
    )
  },
  {
    path: '/shop',
    element: (
      <ProtectedRoute>
        <Shop />
      </ProtectedRoute>
    )
  },
  {
    path: '/levels',
    element: (
      <ProtectedRoute>
        <Levels />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
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
