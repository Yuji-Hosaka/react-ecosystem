import React, { useState, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
// สร้าง <AuthContext/> สำหรับ Provide isAuth,handleAuth ให้ <App/>

const AuthContext = createContext();

// function AuthContextProvider(props) {
//   return <AuthContext.Provider>{props.children}</AuthContext.Provider>;
// }

function AuthContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ name: 'Guest' });
  const [isAuth, setIsAuth] = useState(false);

  const handleAuth = async () => {
    //Logout
    if (isAuth) {
      setIsAuth(false);
      setUser({ name: 'Guest' });
      return;
    }

    // Login
    try {
      setIsLoading(true);
      const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
      console.log(response.data);
      setUser(response.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  // const shareObj = { isAuth, handleAuth };
  return (
    <AuthContext.Provider value={{ isAuth, handleAuth, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  const { isAuth, handleAuth, isLoading, user } = useContext(AuthContext);
  return (
    <div className='App'>
      {isLoading ? <h1>Loding...</h1> : <h1>Welcome.. {!isAuth ? 'Guest' : user?.name} </h1>}
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