import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Search from './components/Search';
import DetailCharacter from "./components/DetailCharacter";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/detailCharacter" element={<DetailCharacter />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
