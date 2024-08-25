import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './Components/SignIn/SignIn';
import Dashboard from './Components/Dashboard/Dashboard';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState({});

  return (
    <>
      <Routes>
        <Route path='/' exact element={<SignIn setUserData={setUser}/>}/>
        <Route path='/dashboard' element={<Dashboard user={user}/>}/>
      </Routes>
    </>
  )
}

export default App
