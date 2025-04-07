import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Components/Body";
import Home from "./Components/Home";
import Login from "./Components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appstore";
import SponsorList from "./Components/SponsorList";

function App() {
  return (
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
    <Route path="/" element={<Body/>}>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/sponsors" element={<SponsorList/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}


export default App
