import Cookies from "js-cookie";


function RemoveCookie(cookiename) {
    Cookies.remove(cookiename)

}

export default RemoveCookie;