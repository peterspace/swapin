import { BrowserRouter, Routes, Route } from 'react-router-dom';
//================={Intermediate}==========================================
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//==============={AIR}======================================================
import './App.css';
import IndexPage from './pages/IndexPage.jsx';
import Layout from './Layout';
import BuyPage from './components/Buy/buyPage';
// import axios from 'axios';

//==============={AIR}======================================================

// axios.defaults.baseURL = 'http://127.0.0.1:4000';
// axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route exact path="/buy" element={<BuyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
