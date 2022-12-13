import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from 'pages/Landing';
import Profile from 'pages/Profile';
import Login from 'pages/Login';
import Register from 'pages/Register';
import InputData from 'pages/InputData';
import Pembayaran from 'pages/Pembayaran';
import Tiket from 'pages/Tiket';
import Admin from 'layout/Admin';
import SuperAdmin from 'layout/superadmin';
import 'react-dates/initialize';
import 'tw-elements';

// Font Awesome Style Sheet
import '@fortawesome/fontawesome-free/css/all.min.css';
// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';
import Panduan from 'pages/Panduan';
import Faq from 'pages/Faq';
import About from 'pages/About';
import AuthUser from 'components/AuthUser';
import ProtectedRoute from 'ProtectedRoute';
import harga from 'components/harga/Harga';
import { Suspense } from 'react';
import CariTiket from 'pages/CariTiket';


function App() {
    return (
		<Suspense fallback={null}>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register}  />
            <Route path="/input-data" component={InputData}/>
            <Route path="/pembayaran" component={Pembayaran}/>
            <Route path="/tikets" component={CariTiket}/>
            <Route path="/tiket/:id" component={Tiket}/>
            <Route path="/authuser" component={AuthUser}/>
            {/* <Route path="/admin" component={Admin}/> */}
            <Route path="/panduan" component={Panduan}/>
            <Route path="/faq" component={Faq}/>
            <Route path="/about" component={About}/>
            <Route path="/harga-tiket" component={harga}/>
            <ProtectedRoute path="/admin" render={props=><Admin {...props} />}/>
            <ProtectedRoute path="/superadmin" render={props=><SuperAdmin {...props} />}/>
            <Redirect to="/" />
        </Switch>
        </Suspense>
    );
}

export default App;
