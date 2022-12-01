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
import pesan from '../../assets/img/icon/pesan.png'
import axios from 'axios';


export default function WorkingSection({setRes}) {
    const [museum, setMuseum] = useState("");
    const [museumId, setMuseumId] = useState("");
    const [category, setCategory] = useState("Pilih Museum dulu");
    const [disabledCategory , setDisabledCategory] = useState(true);
    const [disabledDate , setDisabledDate] = useState(true);
    const [disableInput , setDisableInput] = useState(true);
    const [calendar, setCalendar] = useState('Pilih Museum Dulu');
    const [count, setCount] = useState(0);
    const [open,setOpen] = useState(false);
    // const [libur, setLibur] = useState('')
    const [input,setInput] = useState({
        museum : 'Pilih Museum',
        category : 'Pilih Museum Dulu',
        calendar : 'Pilih Museum Dulu'
    })
    const [namaInput, setNamaInput] = useState({
        namaMuseum : 'Pilih Museum',
        namaCategory : 'Pilih Museum Dulu',
        namaCalendar : 'Pilih Museum Dulu'
    })

    const redirect = useHistory();

    const refOne = useRef(null)

    const handleInput =(e) =>{
        setInput({...input,[e.target.name]:e.target.value}) 
        console.log(e);
    }

    const cekMuseum = (e) =>{
        if(input.museum === "museum_keris" || "museum_radya_pustaka") {
            const museumClass = document.getElementById('museum');
            setDisabledCategory(false);
            museumClass.classList.add('font-bold','text-[#A70B0B]',)
            // console.log(museumClass);
            // setCategory('Pilih Category')
            // setNamaInput({...namaInput,namaMuseum:e.currentTarget.value})
            setNamaInput({...namaInput,namaCategory:'Pilih Kategori'}) 
            setCalendar('Pilih Kategori Dulu')
        }
    }
    
    const cekCategory = () =>{
        if(category !== ''){
            const categoryClass = document.getElementById('category');
            setDisabledDate(false);
            categoryClass.classList.add('font-bold','text-gray-800')
            setCalendar(format(new Date(), 'MM/dd/yyyy'))
        }
    }

    useEffect(() => {
        const fetchMuseum = async ()=>{
            const resMuseum = await axios.get('http://localhost:8000/api/show_museum').then((res)=>{
                setMuseum(res.data.museum);
                console.log(res.data.museum);
            }) 
        }
        // setCalendar(format(new Date(), 'MM/dd/yyyy'));
        fetchMuseum();
    }, [])

    useEffect(() => {
        const fetchCategory = async ()=>
        {
            // const resCategory = await axios.get(`http://localhost:8000/api/show_category/${museumId}`)
            // .then((res)=>{  
                // setCategory(res.data.katergori); 
                // console.log(category);
                // } )
                const resCategory = await fetch(`http://localhost:8000/api/show_category/${museumId}`)
                const resCategoryData = await resCategory.json()
            setCategory(await resCategoryData.kategori); 
        }

        fetchCategory()
    }, [museumId,namaInput])
    
    useEffect(() => {

    //   setRes(input); 
    document.addEventListener("keydown", hidenOnEscape , true);
    document.addEventListener("click", hideOnClickOutside , true    );

      //  setInput({...input,museum:museum}) 
        // setInput({...input,calendar:calendar}) 
    }, [input,museum,namaInput])

    // console.log(museumClass);
    const hidenOnEscape = (e) =>{
        // console.log(e.key);
        if( e.key === "Escape"){
            setOpen(false)
        }
    }
    const hideOnClickOutside = (e) =>{
        if( refOne.current && ! refOne.current.contains(e.target)){
            setOpen(false)
        }
    }

    // Tnanggal
    const handleSelect = (date) =>{
        setInput({...input,calendar:format(date, 'dd-MM-yyyy')}) 
        setCalendar(format(date, 'dd-MM-yyyy'))
        setCount(count + 1)
        setOpen(false)
    }

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
        redirect.push('/input-data')
    }
    
// console.log(museum);
console.log(namaInput);
console.log(input);
    return (
        <section className="pb-20 bg-white -mt-48 left-1/2 mx-auto z-10 w-5/6">
            <div className="container text-center max-w-5xl mx-auto px-10">
                <form onSubmit={saveData}>
                    <div className="flex flex-wrap relative z-20">
                        <StatusCard color="none" icon="stars" title="Pesan Tiket">
                            <div className="sm:flex justify-center block z-10">
                                <select id='museum' value={namaInput.namaMuseum} className="block appearance-none sm:w-1/3 w-full p-2.5 bg-[#ECE3DE] text-[#A70B0B] font-nunito font-semibold text-center border-none px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" 
                                    onChange={(e) => {
                                    // handleInput(e);
                                    const index = e.target.selectedIndex;
                                    const el = e.target.childNodes[index]
                                    const option =  el.getAttribute('id'); 
                                    const selectedMuseum = e.target.id;
                                    setNamaInput({...namaInput,namaMuseum:e.target.value})
                                    console.log(namaInput.namaMuseum);
                                    setMuseumId(option)
                                    setInput({...input,museum:option})
                                    // console.log(selectedMuseum);
                                    cekMuseum()
                                    // console.log(e); 
                                    // setMuseum(selectedMuseum);
                                    }}>
                                    <option disabled>{namaInput.namaMuseum}</option>
                                    {museum && museum.map((item,index) =>{
                                    // console.log(item.id);
                                    return(
                                        <option className='py-6 my-6  h-32' key={index} id={item.id} value={item.nama_museum}>{item.nama_museum}</option>
                                    )})}
                                </select>
                                <select value={{label: input.category}} id="category" className="sm:w-1/3 w-full sm:mx-5 sm:my-0 my-5 p-2.5 text-[#A70B0B] font-nunito font-semibold text-center bg-[#ECE3DE] border-none rounded-md shadow-sm  appearance-none focus:border-red-800  focus:outline-none" onChange={(e) => {
                                    const index = e.target.selectedIndex;
                                    const el = e.target.childNodes[index]
                                    const option =  el.getAttribute('id');
                                    setInput({...input,category:option})
                                    setNamaInput({...namaInput,namaCategory:e.target.value})
                                    cekCategory()
                                    }} 
                                    disabled={disabledCategory} > 
                                    <option className='p-7 m-5 text-xl'>{namaInput.namaCategory}</option>
                                    {category && typeof category !== 'string'  && category.map((itemm,indexx)=>{
                                    return(
                                        <option  key={indexx} id={itemm.id} value={itemm.nama_kategori} c>{itemm.nama_kategori}</option>
                                        )})}
                                </select>

                                <input value={calendar} readOnly onClick={(e)=>{ setOpen(open => !open); 
                                console.log(e)} } className={disabledDate?"relative text-[#A70B0B] font-nunito font-semibold text-center sm:w-1/3 w-full p-2.5 rounded-md border bg-[#ECE3DE] opacity-70":"relative text-center w-1/3 rounded-md border bg-white "} disabled={disabledDate} />
                                    <div ref={refOne} className="absolute right-0 mr-20 mt-8">
        
                                {open && 
                                <Calendar 
                                    date={new Date()}
                                    onChange = {handleSelect}
                                    months={1}
                                    showSelectionPreview
                                    minDate={addDays(new Date(), 0)}
                                    maxDate={addDays(new Date(), 90)}
                                    disabledDay={isMonday}
                                    dayContentRenderer={customDayContent}
                                    calendarFocus
                                    excludeDates={[addDays(new Date(), 21), addDays(new Date(), 15)]}
                                    />
                                }
                                </div>
                            </div>
                        </StatusCard>
                    </div>
                <div className='flex flex-wrap relative justify-center pt-6 '>
                    <Link  ripple="light" disabled={true}  style={{pointerEvents: count >= 1 ? '' : 'none'}} className=" w-64 h-12 text-center align-middle px-6 bg-[#A70B0B] hover:bg-[#645c5c] text-white font-medium text-xl pt-2.5 font-merriweather leading-tight uppercase rounded shadow-md hover:shadow-lg focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-400 active:shadow-lg transition duration-150 ease-in-out" to={{
                        pathname:"/input-data",
                        state : {input},
                    }}>Pesan Tiket</Link>
                </div>
                </form>
            </div>
        </section>
    );
}
