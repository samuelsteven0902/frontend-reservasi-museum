import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import {BiDownArrow} from 'react-icons/bi'
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import en from '../../src/assets/img/lng/en.png'
import id from '../../src/assets/img/lng/id.png'

const LanguageDropdownn = () => {

  const { i18n, t } = useTranslation()

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
        <div className="items-center flex  ">
          <div className="px-4 py-2 shadow-lg  bg-[#ECE3DE] text-black font-nunito font-bold flex items-center justify-center mx-auto w-40 hover:bg-red-200 rounded transition-all duration-300 ease-in-out active:bg-red-400"><p className="pr-1">{t('navbar_lg')} </p> {localStorage.getItem("i18nextLng") == "id"?<img src={id} className="w-8 mx-1" />:<img src={en} className="w-8 mx-1" />}<BiDownArrow/></div>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 justify-center mx-auto list-none text-left rounded shadow-lg min-w-40 w-40 flex flex-col"
        }
							value={localStorage.getItem("i18nextLng")}
							
      >
        <button onClick={()=> {i18n.changeLanguage('en');window.location.reload(true);}} className="justify-center items-center hover:bg-red-300 border-b-2 py-1  flex">English<img src={en} className="w-8 pl-2" /></button>
        <button onClick={()=>{i18n.changeLanguage('id');window.location.reload(true);}} className=" justify-center items-center hover:bg-red-300  flex">Indonesia<img src={id} className="w-8 ml-2" /></button>
      </div>
    </>
  );
};

export default LanguageDropdownn;
