import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Blog from "./pages/Blog"
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-blog" element={<Blog/>}/>
      </Routes>
    </>
  )
}

export default App
