
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Blog from './Components/Blog';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Write from './Components/Write';
import Page from './pages/Page';
import Layout from './Components/Layout';
import {  useState } from 'react';
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <>
      <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/blog" /> : <Navigate to="/signup" />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/blog" /> : <Signup setToken={setToken} />}
        />
        <Route
          path="/signin"
          element={token ? <Navigate to="/blog" /> : <Signin setToken={setToken} />}
        />
        <Route
          path="/blog"
          element={
            token ? (
              <Layout setToken={setToken}>
                <Blog />
              </Layout>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/write"
          element={token ? <Write /> : <Navigate to="/signin" />}
        />
        <Route
          path="/page"
          element={
            token ? (
              <Layout setToken={setToken}>
                <Page />
              </Layout>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>
    </Router>
    </>
  )
}

export default App
