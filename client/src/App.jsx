import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login.jsx";
import Layout from "./pages/Layout/Layout.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import BookEvent from "./pages/BookEvent/BookEvent.jsx";
import PostEvent from "./pages/PostEvent/PostEvent.jsx";
import MyEvents from "./pages/MyEvents/MyEvents.jsx";
import MyTickets from "./pages/MyTickets/MyTickets.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import ViewEvent from "./pages/Admin/ViewEvent.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
         <Route element={<ProtectedRoute allowedRoles={["user"]}/>}>
          <Route path="/:eventId" element={<BookEvent />} />
          <Route path="/my-tickets" element={<MyTickets />} />
         </Route>
           

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/post-events" element={<PostEvent />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/my-events/:eventId" element= {<ViewEvent/>}/>
          </Route>
          <Route element={<ProtectedRoute />}>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;