import React from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import {BiDownArrow} from 'react-icons/bi'

const NavbarDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();

  function refreshPage() {
    window.location.reload(false);
  }
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <p className="px-4 py-2  text-black font-nunito font-bold flex items-center hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400"><p className="pr-1">Informasi Reservasi </p><BiDownArrow/></p>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link  to='/panduan' className="block py-2 px-4 hover:bg-red-100 dark:hover:bg-red-600 dark:hover:text-white">Panduan Pemesanan Tiket</Link>
        <Link to='/faq' className="block py-2 px-4 hover:bg-red-100 dark:hover:bg-red-600 dark:hover:text-white" >FAQ</Link>
        <Link to='/harga-tiket' className="block py-2 px-4 hover:bg-red-100 dark:hover:bg-red-600 dark:hover:text-white" >Harga Tiket</Link>
      </div>
    </>
  );
};

export default NavbarDropdown;
