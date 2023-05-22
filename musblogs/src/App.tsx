import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';
import { Settings } from './components/Settings/Settings';
import { NewPost } from './components/NewPost/NewPost';
import { Subscribers } from './components/Subscribers/Subscribers';
import { Subscriptions } from './components/Subscriptions/Subscriptions';
import { MainPage } from './components/MainPage/MainPage';
import { PostPage } from './components/PostPage/PostPage';
import { UserPage } from './components/UserPage/UserPage';
import { OtherUser } from './components/OtherUser/OtherUser';
import "./styles/base.scss";
import React, { useEffect } from 'react';
import { useAppDispatch } from './store';
import { getCookies } from './store/actions/getUserInfo';
import Cookies from 'universal-cookie';

function App() {

  const dispatch = useAppDispatch()
  const cookies = new Cookies()

  useEffect(() => {
    if (cookies.get('auth_token'))
      dispatch(getCookies({token: cookies.get('auth_token'), login: cookies.get('username')}))
  }, [])

  return (
    <div className="content_body">
      <BrowserRouter basename="/">
        <Header />
        <div className='dynamic_content'>
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/subscribers" element={<Subscribers />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/new_post" element={<NewPost />} />
              <Route path="/userpage" element={<UserPage />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/user/:id" element={<OtherUser />} />
              </Routes>    
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
