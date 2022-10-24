import Cookies from "js-cookie";

function GetCookie(cookiename) {
    return Cookies.get(cookiename)

}

export default GetCookie