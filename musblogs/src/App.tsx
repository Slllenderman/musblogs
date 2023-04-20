import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import "./styles/base.scss";

function App() {
  return (
    <div className="content_body">
      <BrowserRouter basename="/">
        <Header />
        <div className='dynamic_content'>
          <main>
            <Routes>
              <Route path="/" element={<div>MainPage</div>} />
              <Route path="/login" element={<div>Login</div>} />
              <Route path="/registration" element={<div></div>} />
              <Route path="/post/:id" element={<div></div>} />
              <Route path="/" element={<div></div>} />
              </Routes>    
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
