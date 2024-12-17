/* eslint-disable no-unused-vars */
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Register from "./pages/Register"
import Home from "./pages/Home"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
