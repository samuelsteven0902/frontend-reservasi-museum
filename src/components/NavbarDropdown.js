import React from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import {BiDownArrow} from 'react-icons/bi'
import { useTranslation } from "react-i18next";

const NavbarDropdown = () => {
  const { t } = useTranslation();
  
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
          <div className="px-4 py-2  text-black font-nunito font-bold flex items-center hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400"><p className="pr-1">{t('navbar')}</p><BiDownArrow/></div>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link  to='/panduan' className="block font-nunito py-2 px-4 text-black font-bold hover:bg-red-200  transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400'">{t('landing.panduan.judul')}</Link>
        <Link to='/faq' className="block font-nunito py-2 px-4 text-black font-bold hover:bg-red-200  transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400'" >FAQ</Link>
        <Link to='/harga-tiket' className="block font-nunito py-2 px-4 text-black font-bold hover:bg-red-200  transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400'" >{t('landing.harga.judul')}</Link>
        <Link to='/tikets' className="block font-nunito py-2 px-4 text-black font-bold hover:bg-red-200  transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400'" >
        {t('landing.cari.judul')}</Link>
      </div>
    </>
  );
};

export default NavbarDropdown;
