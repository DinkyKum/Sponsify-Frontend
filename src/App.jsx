import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Components/Body";
import Home from "./Components/Home";
import Login from "./Components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appstore";
import SponsorList from "./Components/SponsorList";
import OrganizerList from "./Components/OrganizerList";
import EventList from "./Components/EventList";
import SponsorDashboard from "./Components/SponsorDashboard";
import OrganizerDashboard from "./Components/OrganizerDashboard";
import AddEvent from "./Components/AddEvent";
import EventPage from "./Components/EventPage";
import Invest from "./Components/Invest";

function App() {
  return (
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
    <Route path="/" element={<Body/>}>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/sponsors" element={<SponsorList/>}/>
    <Route path="/organizers" element={<OrganizerList/>}/>
    <Route path="/events" element={<EventList/>}/>
    <Route path="/sponsor/:id" element={<SponsorDashboard/>}/>
    <Route path="/organizer/:id" element={<OrganizerDashboard/>}/>
    <Route path="/event/:id" element={<EventPage/>}/>
    <Route path="/addEvent" element={<AddEvent/>}/>
    <Route path="/invest/:id" element={<Invest/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}


export default App
