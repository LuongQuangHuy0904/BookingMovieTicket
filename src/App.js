
import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import MovieDetailsPage from './pages/MovieDetailsPage';
import YourBooking from './pages/YourBooking';
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';
import BookingDashboard from './pages/BookingDashboard';
import SessionChecker from './components/SessionChecker';
function App() {
  return (
    <BrowserRouter>
    <SessionChecker>
      <ToastContainer />
      <Routes>
        <Route  path="/" element={<HomePage />}/>
        <Route  path="/movies/:id" element= {<MovieDetailsPage />} />
        <Route path="/your-booking/:id" element={<YourBooking />} />
        <Route path="/login" element= {<LoginPage />} />
        <Route path="/register" element= {<RegisterPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/users' element={<UserDashboard />} />
        <Route path='/dashboard/booking' element={<BookingDashboard />} />
      </Routes>
      </SessionChecker>
    </BrowserRouter>
  )
}

export default App
