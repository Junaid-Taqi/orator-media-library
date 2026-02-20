import React, { useEffect, useState } from 'react';
import './App.css';
import './styles/MediaLibrary.css';
import Header from './components/Header';
import UploadButton from './components/UploadButton';
import StatsPanel from './components/StatsPanel';
import SearchBar from './components/SearchBar';
import Notice from './components/Notice';
import MediaGrid from './components/MediaGrid';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './Services/Store/Store';
import { getAllMedia } from './Services/Slices/GetMediaSlice';
import { fetchToken } from './Services/Slices/AuthSlice';

function AppContent() {
  const dispatch = useDispatch();
  const { mediaList } = useSelector((state) => state.GetMedia);
  const { token, expiresIn } = useSelector((state) => state.auth);
  const user = JSON.parse(sessionStorage.getItem("liferayUser")) || {
    "userId": "32533",
    "fullName": "admin lahore",
    "email": "admin@lahore.com",
    "groups": [
      {
        "id": "32394",
        "name": "Municipality One"
      }
    ]
  };
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  useEffect(() => {
    if (token && expiresIn) {
      // Refresh token 60 seconds before it expires
      const refreshTime = (expiresIn - 60) * 1000;

      if (refreshTime > 0) {
        const timer = setTimeout(() => {
          console.log("Token expiring soon, refreshing...");
          dispatch(fetchToken());
        }, refreshTime);

        return () => clearTimeout(timer);
      }
    }
  }, [token, expiresIn, dispatch]);

  useEffect(() => {
    if (user?.groups?.[0]?.id && token) {
      dispatch(getAllMedia({ groupId: user.groups[0].id }));
    }
  }, [dispatch, token]);

  return (
    <>
      <Header user={user} />
      <main className="container-fluid mt-3">
        <div className="page-top">
          <div className="page-left">
            <h1 className="page-title">Media Library</h1>
            <div className="page-sub">Storage for images, videos, logos, and backgrounds. Media must be used inside a Slide to be scheduled.</div>
          </div>
          <div className="page-right">
            <UploadButton user={user} />
          </div>
        </div>

        <StatsPanel items={mediaList || []} />
        <Notice />
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <MediaGrid user={user} items={(mediaList || []).filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))} />
      </main>
    </>
  );
}

function App() {
  return (
    <div className="app-root">
      <Provider store={store}>
        <AppContent />
      </Provider>
    </div>
  );
}

export default App;
