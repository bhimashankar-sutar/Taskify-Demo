import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Project from "./Components/Project";
import { Routes,Route } from "react-router-dom";
import Board from "./Components/Board";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/project" element={<Project/>}></Route>
      <Route path="/board" element={<Board/>}></Route>
    </Routes>
    
  )
}

export default App;
