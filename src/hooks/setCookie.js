import Cookies from "js-cookie";
import React from 'react'

function SetCookie(cookiename,data_user) {
     Cookies.set(cookiename, data_user,{
        expires:1,
        secure:true,
        sameSite:'strict',
        path:'/'
        });
}

export default SetCookie