import React, { useState, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// สร้าง <AuthContext/> สำหรับ Provide isAuth,handleAuth ให้ <App/>

const AuthContext = createContext();

// function AuthContextProvider(props) {
//   return <AuthContext.Provider>{props.children}</AuthContext.Provider>;
// }

function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(true);
  const handleAuth = () => setIsAuth(!isAuth);

  // const shareObj = { isAuth, handleAuth };
  return <AuthContext.Provider value={{ isAuth, handleAuth }}>{children}</AuthContext.Provider>;
}

function App() {
  const { isAuth, handleAuth } = useContext(AuthContext);
  return (
    <div className='App'>
      <h1>Welcome.. {!isAuth ? 'Guest' : 'User'} </h1>
      <button onClick={handleAuth}>{!isAuth ? 'Login' : 'Logout'}</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);