import './App.css';
import Home from '../src/pages/Home';
import Chat from '../src/pages/Chat';
import Register from '../src/pages/Register'
import Login from '../src/pages/Login'
import { Routes, Route } from 'react-router-dom'; 

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
