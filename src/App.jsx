import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './Components/SignIn/SignIn';
import Dashboard from './Components/Dashboard/Dashboard';
import AddSchedule from './Components/AddSchedule/AddSchedule';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState({});
  const [schedule, setSchedule] = useState([]);

  const handleAddSchedule = (newSchedule) => {
    setSchedule(schedule => [...schedule, newSchedule]);
  }

  return (
    <>
      <Routes>
        <Route path='/' exact element={<SignIn setUserData={setUser}/>}/>
        <Route path='/dashboard' element={<Dashboard user={user} schedule={schedule} setSchedule={setSchedule} />}/>
        <Route path='/add-schedule' element={<AddSchedule onSubmit={handleAddSchedule} currentLength={schedule.length} user={user} />}/>
      </Routes>
    </>
  )
}

export default App
