import RegisterUser from './components/register/regirster';
import Login from './components/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterUser />} />
          <Route path='/login' element={<Login />} />
          {/* <Route></Route>
          <Route></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

