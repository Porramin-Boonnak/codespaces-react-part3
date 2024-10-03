import './App.css';
import About from './About';
import Home from './Home';
import Posts from './Posts';
import { BrowserRouter,Route,Router,Link, Routes } from 'react-router-dom';
function App() {
  return (
    <>
    <BrowserRouter>
      <ul>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/posts?fname=Porramin&lname=Boonnak">Posts</Link></li>
        <li><Link to="/posts/1">Posts 1</Link></li>
        <li><Link to="/posts/2">Posts 2</Link></li>
      </ul>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/posts" element={<Posts/>}/>
        <Route path="/posts/:id" element={<Posts/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
