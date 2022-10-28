
import RemoveCookie from 'hooks/RemoveCookie';
import React from 'react'
import { useHistory } from 'react-router';

function LogOut() {

  let history = useHistory();
  const handleLogOut = () => {
    RemoveCookie('token');
    window.location.reload(true);
    // history.push("/");
    // console.log('keluar');
  }
    
  return (
    <div className="text-red-500 text-lg hover:bg-red-100 rounded-xl p-3 duration-300 transition-all hover:pl-5 " typeof='button' onClick={handleLogOut}>Log Out</div>
  )
}

export default LogOut