// import React from 'react'

// function AuthUser() {
//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState({});
//     const [user, setUser] = useState(null);
//     const location = useLocation();

//     // On page load, we take "search" parameters 
//     // and proxy them to /api/auth/callback on our Laravel API
//     useEffect(() => {

//         fetch(`http://localhost:8000/api/auth/callback${location.search}`, {
//             headers : {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         })
//             .then((response) => {
//                 return response.json();
//             })
//             .then((data) => {
//                 setLoading(false);
//                 setData(data);
//                 console.log(data);
//                 SetCookie("token" , data.access_token);
//             });
//     }, []);

//     // Helper method to fetch User data for authenticated user
//     // Watch out for "Authorization" header that is added to this call
//     function fetchUserData() {
//         fetch(`http://localhost:8000/api/user`, {
//             headers : {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//                 'Authorization': 'Bearer ' + data.access_token,
//             }
//         })
//             .then((response) => {
//                 return response.json();
//             })
//             .then((data) => {
//                 setUser(data);
//             });
//     }

//     if (loading) {
//         return <DisplayLoading/>
//     } else {
//         if (user != null) {
//             return <DisplayData data={user}/>
//         } else {
//             return (
//                 <div>
//                     <DisplayData data={data}/>
//                     <div style={{marginTop:10}}>
//                         <button onClick={fetchUserData}>Fetch User</button>
//                     </div>
//                 </div>
//             );
//         }
//     }


// }

// function DisplayLoading() {
//     return <div>Loading....</div>;
// }

// function DisplayData(data) {

//     const datass = JSON.stringify(data);
//     const datas = JSON.parse(datass);
//     var user = [];

//     for(var e in datas)
//         user.push(datas[e]);

//     const userr = user[0].user.roles[0].name;
//     RemoveCookie('data_user');
//     // SetCookie('data_user', JSON.stringify(data))
    
        
    

    
//         return (    
//                     <NavLink to="/admin">
//                         {userr === 'admin' ? <Redirect to="/admin"/> : <Redirect to="/" />}
//                     </NavLink> 
//             // console.log(data)
//             // <div>
//             //     <p>Succesfully login with google as a <span className='text-primary h4'> {userr} </span></p>
//             //     <button> Go </button>
//             // </div>
    
            
//         );


    
// }

// export default AuthUser