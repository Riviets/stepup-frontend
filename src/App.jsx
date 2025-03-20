import Navigation from './components/layout/Navigation'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NoMatch from './components/layout/NoMatch'
import Habits from './components/habits/Habits'
import Tracker from './components/tracker/Tracker'
import Shop from './components/shop/Shop'
import Levels from './components/levels/Levels'
import Profile from './components/profile/Profile'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ProtectedRoute from './components/utils/ProtectedRoute'
import AddHabit from './components/habits/AddHabit'

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
