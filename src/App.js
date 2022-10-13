import { Switch, Route } from 'react-router-dom';
import Landing from 'pages/Landing';
import Profile from 'pages/Profile';
import Login from 'pages/Login';
import Register from 'pages/Register';
import InputData from 'pages/InputData';
import Pembayaran from 'pages/Pembayaran';
import Tiket from 'pages/Tiket';
import Admin from 'layout/Admin';
import SuperAdmin from 'layout/superadmin';


// Font Awesome Style Sheet
import '@fortawesome/fontawesome-free/css/all.min.css';

// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';

function App() {

    return (
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register}  />
            <Route path="/input-data" component={InputData}/>
            <Route path="/pembayaran" component={Pembayaran}/>
            <Route path="/tiket" component={Tiket}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/superadmin" component={SuperAdmin}/>
        </Switch>
    );
}

export default App;
