
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
    <div className="btn btn-danger text-danger" typeof='button' onClick={handleLogOut}>Log Out</div>
  )
}

export default LogOut