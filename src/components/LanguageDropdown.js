import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import {BiDownArrow} from 'react-icons/bi'
import { useTranslation } from "react-i18next";
import i18next from 'i18next';

const LanguageDropdownn = () => {

  const { i18n, t } = useTranslation(["common"])

        useEffect(() => {
          if(localStorage.getItem("i18nextLng")?.length > 2)
          {
            i18next.changeLanguage("id")
          }
            
        }, [])


        const handleLanguageChange = (e) => {
            i18n.changeLanguage(e.target.value);
        };

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
          <p className="px-4 py-2  text-black font-nunito font-bold flex items-center hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400"><p className="pr-1">Language </p><BiDownArrow/></p>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 flex flex-col"
        }
							value={localStorage.getItem("i18nextLng")}
							
      >
        <button onClick={()=> {i18n.changeLanguage('en');window.location.reload(true);}} className="py-1 hover:bg-red-300 rounded-xl mx-5">English</button>
        <button onClick={()=>{i18n.changeLanguage('id');window.location.reload(true);}} className="py-1 hover:bg-red-300 rounded-xl mx-5">Indonesia</button>
      </div>
    </>
  );
};

export default LanguageDropdownn;
