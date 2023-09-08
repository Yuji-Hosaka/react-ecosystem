import React,{useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './index.css'

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com"

function HomePage () {
  const [friend, setFriend] = useState([]);
  const navigate = useNavigate();

  const fetchFriend = async () => {
    try {
      const response = await axios.get('/users')
      console.log(response.data)
      setFriend(response.data)
    } catch(error) {
        console.log(error)
    }
  }
  const handleNavigate = (userId) => {
    if(userId ==1) navigate("/profile")
    else navigate(`/profile/${userId}`)
  }
  useEffect(() => {
    fetchFriend();
  }, [])

  return  (
  <div className = 'App'>
    <h1> Home Page </h1>
   {friend.map ((f) => (
   <div className='friend' 
      key={f.id}
      onClick={()=> handleNavigate(f.id)}
      >
    
      <h3>{f.name}</h3>
      <h5>
        {f.email}, {f.phone}</h5>
    
    </div>
    ))}
      </div>
  )
}

function ProfilePage () {
  return <div className = 'App'>Profile Page</div>
}

function FriendPage () {
  return <div className = 'App'>Friend Page</div>
}
function FeedPage () {
  return <div className = 'App'>Feed Page</div>
}

/* เอา ReactDOM.createRoot(document.getElementById('root')).render
มาเก็บไว้ในตัวแปร root */

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
  <Link to="/">Home</Link>
  <Link to="/profile">Profile</Link>
  <Link to="/profile/5">friend</Link>
  <Link to="/feed">Feed</Link>

  <Routes>
<Route path="/" element={<HomePage/>}/>
<Route path="/profile" element={<ProfilePage/>}/>
<Route path="/profile/:id" element={<FriendPage/>}/>
<Route path="/feed" element={<FeedPage/>}/>

  </Routes>
  </BrowserRouter>
)

//npm i react-router-dom
//npm i axios
