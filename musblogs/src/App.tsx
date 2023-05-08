import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';
import { Settings } from './components/Settings/Settings';
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
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/subscribes" element={<div></div>} />
              <Route path="/subscriptions" element={<div></div>} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/new_post" element={<div></div>} />
              <Route path="/userpage" element={<div>user</div>} />
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
