import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import  ListNews  from './Components/ListNews';
import  AddNews  from '../src/Components/AddNews'
import { ToastContainer } from 'react-toastify';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import Store from './Redux/Store'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListNews/>}></Route>
          <Route path='/add' element={<AddNews/>}></Route>
          <Route path='/add/:id' element={<AddNews/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </div>
    </Provider>
  );
}

export default App;
