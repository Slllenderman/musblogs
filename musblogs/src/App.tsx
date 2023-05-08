import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';
import { Settings } from './components/Settings/Settings';
import { NewPost } from './components/NewPost/NewPost';
import { Subscribers } from './components/Subscribers/Subscribers';
import { Subscriptions } from './components/Subscriptions/Subscriptions';
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
              <Route path="/subscribers" element={<Subscribers />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/new_post" element={<NewPost />} />
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
