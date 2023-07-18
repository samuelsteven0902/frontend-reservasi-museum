/*eslint-disable*/
import LogOut from "pages/LogOut.js";
import profile from '../../../assets/img/admin/profile.png'
import React from "react";
import { Link } from "react-router-dom";

import NotificationDropdown from "../Dropdowns/NotificationDropdown.js";
import UserDropdown from "../Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Profile and Brand*/}
          <div className="flex"> 
            <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
              <img src={profile} className="rounded-full w-12 h-12 mr-3"/>
            </ul>
            <div>
              <Link
              className="md:block text-left md:pb-1 font-merriweather text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-1 px-1"
              to="/"> UPT MUSEUM
              </Link>
              <p 
              className="md:block text-left md:pb-1 font-merriweather text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-1 px-1">Admin
              </p>
            </div>
          </div>

          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              {/* <NotificationDropdown /> */}
            </li>
            <li className="inline-block relative">
              {/* <UserDropdown /> */}
          <img src={profile} className="rounded-full w-12 h-12 mr-3"/>
            </li>
          </ul>

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none  absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >

            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    UPT MUSEUM
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />

            {/* Heading */}
            <h6 className="md:min-w-full font-merriweather text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Dashboard
            </h6>

            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-merriweather font-bold block " +
                    (window.location.href.indexOf("/admin/grafik") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500 hover:bg-gray-100 rounded-xl pl-4 duration-300 transition-all hover:pl-6")
                  }
                  to="/admin/grafik"
                >
                  <i
                    className={
                      "fas fa-solid fa-chart-bar mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/grafik") !== -1
                        ? "opacity-75"
                        : "text-blueGray-500")
                    }
                  ></i>{""}
                  Grafik
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-merriweather font-bold block " +
                    (window.location.href.indexOf("/admin/data-pengunjung") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500  hover:bg-gray-100 rounded-xl pl-4 duration-300 transition-all hover:pl-6")
                  }
                  to="/admin/data-pengunjung"
                >
                  <i
                    className={
                      "fas fa-solid fa-users mr-2 text-sm " +
                      // <i class="fa-solid fa-users"></i>
                      (window.location.href.indexOf("/admin/data-pengunjung") !== -1
                        ? "opacity-75"
                        : "text-blueGray-500 ")
                    }
                  ></i>{" "}
                  Data Pengunjung
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-merriweather font-bold block " +
                    (window.location.href.indexOf("/admin/data-kehadiran") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500  hover:bg-gray-100 rounded-xl pl-4 duration-300 transition-all hover:pl-6")
                  }
                  to="/admin/data-kehadiran"
                >
                  <i
                    className={ 
                      "fas fa-solid fa-clipboard-list mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/data-kehadiran") !== -1
                        ? "opacity-50"
                        : "text-blueGray-500")
                    }
                  ></i>{" "}
                  Data Kehadiran
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-merriweather font-bold block " +
                    (window.location.href.indexOf("/admin/status-pembayaran") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500  hover:bg-gray-100 rounded-xl pl-4 duration-300 transition-all hover:pl-6")
                  }
                  to="/admin/status-pembayaran"
                >
                  <i
                    className={ 
                      "fas fa-solid fa-clipboard-list mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/status-pembayaran") !== -1
                        ? "opacity-50"
                        : "text-blueGray-500")
                    }
                  ></i>{" "}
                  Status Pembayaran
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-merriweather font-bold block " +
                    (window.location.href.indexOf("/admin/pemasukan") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500  hover:bg-gray-100 rounded-xl pl-4 duration-300 transition-all hover:pl-6")
                  }
                  to="/admin/pemasukan"
                >
                  <i
                    className={ 
                      "fas fa-solid fa-clipboard-list mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/pemasukan") !== -1
                        ? "opacity-50"
                        : "text-blueGray-500")
                    }
                  ></i>{" "}
                  Pemasukan
                </Link>
              </li>

              <hr className="my-1 md:min-w-full" />
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-merriweather font-bold block " +
                    (window.location.href.indexOf("/admin/ganti-password") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500  hover:bg-gray-100 rounded-xl pl-4 duration-300 transition-all hover:pl-6")
                  }
                  to="/admin/ganti-password"
                >
                  <i
                    className={ 
                      "fas fa-solid fa-clipboard-list mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/ganti-password") !== -1
                        ? "opacity-50"
                        : "text-blueGray-500")
                    }
                  ></i>{" "}
                  Ganti Pasword
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-1 font-merriweather font-bold block " +
                    (window.location.href.indexOf("/admin/logout") !== -1
                      ? "text-red-500 hover:text-red-600"
                      : "text-red-700 hover:text-red-500")
                  }
                  to="/admin/logout"
                >
                  <i
                    className={ 
                      "mr-2 text-sm " +
                      // <i name="log-out"></i> +
                      // <i class=""></i>
                      (window.location.href.indexOf("/admin/logout") !== -1
                        ? "opacity-50"
                        : "text-red-300")
                    }
                  ></i>{" "}
                  <LogOut />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}