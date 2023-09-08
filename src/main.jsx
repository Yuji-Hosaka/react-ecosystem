import React,{useState, createContext, useContext} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  const [isAuth, setIsAuth] = useState(true);
  const handleAuth = () => setIsAuth(!isAuth)
  return (
    <div className='App'>
      <h1>Welcome.. {!isAuth? 'Guest' : 'User'}</h1>
      <button onClick={handleAuth}>{!isAuth? 'Login': 'Logout'}</button>
    </div>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
