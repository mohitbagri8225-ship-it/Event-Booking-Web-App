import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login.jsx";
import Layout from "./pages/Layout/LayOut.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import BookEvent from "./pages/BookEvent/BookEvent.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp/>}/>
          <Route path="/:eventId" element = {<BookEvent/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;