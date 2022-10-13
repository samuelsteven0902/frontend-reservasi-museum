import React from "react";
import Chart from "chart.js";
import Card from '@material-tailwind/react/Card';
import CardImage from '@material-tailwind/react/CardImage';
import CardBody from '@material-tailwind/react/CardBody';
import Icon from '@material-tailwind/react/Icon';
import H4 from '@material-tailwind/react/Heading4';
import H6 from '@material-tailwind/react/Heading6';
import LeadText from '@material-tailwind/react/LeadText';
import Paragraph from '@material-tailwind/react/Paragraph';
import StatusCard from 'components/landing/StatusCard';
import museumKeris from 'assets/img/MuseumKeris.jpg';
import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'react-date-range';
import { addDays, format, isMonday, isSunday } from 'date-fns';
import { Link,  useHistory } from 'react-router-dom';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import axios from 'axios';


export default function CardJadwal() {
 
  const [calendar, setCalendar] = useState('Pilih Museum Dulu');
  const [count, setCount] = useState(0);
  const [open,setOpen] = useState(false);
  const [input,setInput] = useState({
    museum : 'Pilih Museum',
    category : 'Pilih Museum Dulu',
    calendar : 'Pilih Museum Dulu'
    
})
   // Tnanggal
   const handleSelect = (date) =>{
    setInput({...input,calendar:format(date, 'MM/dd/yyyy')}) 
    setCalendar(format(date, 'MM/dd/yyyy'))
    setCount(count + 1)
    setOpen(false)
}

const redirect = useHistory();

  function customDayContent(day) {
    let extraDot = null;
    if (isSunday(day)) {
      extraDot = (
        <div
          style={{
            height: "5px",
            width: "5px",
            borderRadius: "100%",
            background: "orange",
            position: "absolute",
            top: 2,
            right: 2,
          }}
        />
        
      )
    }
    return (
      <div>
        {extraDot}
        <span>{format(day, "d")}</span>
      </div>
    )
  }

//   const hariLibur = (day) =>{
//     setLibur(isMonday(day));
//   }

  const saveData = () => {
    // setRes({input});
    redirect.push('/jadwal')
  }

}