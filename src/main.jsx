import React, { useState, createContext, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// สร้าง <AuthContext/> สำหรับ Provide isAuth,handleAuth ให้ <App/>

const AuthContext = createContext();

// function AuthContextProvider(props) {
//   return <AuthContext.Provider>{props.children}</AuthContext.Provider>;
// }

function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // isAuth : false => true ให้ deley 1 วิ
  // useEffect(() => {
  //   if (isLoading) {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 3000);
  //   }
  // }, [isLoading]);

  const handleAuth = () => {
    // login : isAuth : false => true
    if (!isAuth) {
      setIsLoading(true);
      setTimeout(() => {
        setIsAuth(true);
        setIsLoading(false);
      }, 3000);
    } else {
      setIsAuth(false);
    }
  };

  // const shareObj = { isAuth, handleAuth };
  return (
    <AuthContext.Provider value={{ isAuth, handleAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  const { isAuth, handleAuth, isLoading } = useContext(AuthContext);
  return (
    <div className='App'>
      {isLoading ? <h1>Loading...</h1> : <h1>Welcome.. {!isAuth ? 'Guest' : 'User'} </h1>}
      <button onClick={handleAuth} disabled={isLoading}>
        {!isAuth ? 'Login' : 'Logout'}
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);