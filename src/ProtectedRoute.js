import Cookies from 'js-cookie';
import Admin from 'layout/Admin';
import SuperAdmin from 'layout/superadmin';
// import Kepalauptmuseum from 'layout/kepalauptmuseum';
import React, { useEffect, useState } from 'react'
import { Route , Redirect } from 'react-router-dom'
import ReactLoading from 'react-loading';
import Kepalauptmuseum from 'layout/kepalauptmuseum';

function ProtectedRoute({role, component: Component, ...rest}) {
  const [token, setToken] = useState(Cookies.get('token'));
  const [user,setUser] = useState('loading');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/me`, {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
    const json = await data.json();
      console.log(json);
      var result =''
      if(json.message !== 'Unauthenticated.')
        {
          result = json.user.roles[0].name;
        }
        setUser(result);
          // return json;
          // console.log(result);
    }
        fetchData ();
  }, 
[]
);
      if (user === 'default') {
        setLoading(true)
      }
      console.log(user);  
      
return (
  <>
  <Route 
    {...rest}
    render={(props) =>{
      if(user === 'loading') return
        <div className='h-screen flex justify-center items-center '>
          <ReactLoading type={"spinningBubbles"} color={"red"} height={'20%'} width={'20%'} className="m-auto" />
        </div>

      // if(user == 'admin') return <Redirect to="/admin" />
      if(user === 'admin') return <Admin {...props}/>
      if(user === 'superadmin') return <SuperAdmin {...props }/>
      if(user === "kepalauptmuseum") return <Kepalauptmuseum {...props }/>

      // if(user == 'superadmin') return <Redirect to={{path: "/superadmin", state:{from: props.location}}}  />;
      if(user !== 'admin' || user !== 'superadmin' || user !== 'kepalauptmuseum' ) return <Redirect to={{path: "/", state:{from: props.location}}} />;
    }}
  />
  </>
  )
}

export default ProtectedRoute