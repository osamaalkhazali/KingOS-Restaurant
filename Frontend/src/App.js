import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/Navbar'

function App() {
  return (
    <>
      <NavBar />
      
      <Outlet/>

      <footer className='bg-body-tertiary'>
        <p className='p-3 m-0 text-center'>Copyright @ made by KingOS</p>
      </footer>
    </>
  );
}


export default App;
