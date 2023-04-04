// import Card from '@material-tailwind/react/Card';
// import CardImage from '@material-tailwind/react/CardImage';
// import CardBody from '@material-tailwind/react/CardBody';
// import Icon from '@material-tailwind/react/Icon';
// import H4 from '@material-tailwind/react/Heading4';
// import H6 from '@material-tailwind/react/Heading6';
// import LeadText from '@material-tailwind/react/LeadText';
// import Paragraph from '@material-tailwind/react/Paragraph';
// import museumKeris from 'assets/img/MuseumKeris.jpg';
import StatusCard from 'components/landing/StatusCard';
import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'react-date-range';
import { addDays, format, isMonday, isSunday } from 'date-fns';
import { Link,  useHistory } from 'react-router-dom';
// import pesan from '../../assets/img/icon/pesan.png'
import axios from 'axios';
import { useTranslation } from 'react-i18next';


export default function WorkingSection({setRes}) {
    const { t } = useTranslation()
    const [museum, setMuseum] = useState("");
    const [museumId, setMuseumId] = useState("");
    const [category, setCategory] = useState("Kategori");
    const [disabledCategory , setDisabledCategory] = useState(true);
    const [disabledDate , setDisabledDate] = useState(true);
    const [calendar, setCalendar] = useState(t('landing.working.tanggal'));
    const [count, setCount] = useState(0);
    const [open,setOpen] = useState(false);
    // const [libur, setLibur] = useState('')
    const [input,setInput] = useState({
        museum : t('landing.working'),
        category : 'Pilih Kategori',
        calendar : 'Pilih Tanggal'
    })
    const [namaInput, setNamaInput] = useState({
        bebas : 'asdsa',
        namaMuseumm : t('landing.working'),
        namaCategory : t('landing.working.kategori'),
        namaCalendar : t('landing.working.tanggal'),
        namaMuseumBanget : t('landing.working.museum')
    })

    const redirect = useHistory();

    const refOne = useRef(null)
    // kayaknya ditambhkan di ws pembayaran
    // const handleInput =(e) =>{
    //     setInput({...input,[e.target.name]:e.target.value}) 
    //     console.log(e);
    // }

    const cekMuseum = (e) =>{
        if(input.museum === "museum_keris" || "museum_radya_pustaka") {
            const museumClass = document.getElementById('museum');
            const categoryClass = document.getElementById('button');
            categoryClass.classList.remove('font-bold','text-[#ECE3DE]', 'bg-[#A70B0B]' )
            categoryClass.classList.add('pointer-events-none', 'text-gray-600','bg-gray-300', )

            setDisabledCategory(false);
            setDisabledDate(true);
            museumClass.classList.add('font-bold','text-[#A70B0B]',)
            console.log(e);
            // setCategory('Pilih Category')
            setNamaInput({...namaInput,namaMuseumBanget:e,namaCategory:t('landing.working.kategori')})
            // setNamaInput({...namaInput,namaCategory:'Pilih Kategori'}) 
            setCalendar(t('landing.working.tanggal'))
        }
    }
    
    const cekCategory = () =>{
        if(category !== ''){
            const categoryClass = document.getElementById('category');
            setDisabledDate(false);
            categoryClass.classList.add('font-bold','text-[#]' )
            setCalendar(t('landing.working.tanggal'))
        }
    }

// Tanggal
    const handleSelect = (date) =>{
        const categoryClass = document.getElementById('button');
        categoryClass.classList.remove('pointer-events-none', 'text-gray-600','bg-gray-300', )
        categoryClass.classList.add('font-bold','text-[#ECE3DE]', 'bg-[#A70B0B]' )
        setInput({...input,calendar:format(date, 'dd-MM-yyyy')}) 
        setCalendar(format(date, 'dd-MM-yyyy'))
        setCount(count + 1)
        setOpen(false)
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
    }, [namaInput])

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
        
        console.log(category);
    }, [category,museumId,namaInput])
    
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
// console.log(namaInput.namaCategory);
console.log(category);
    return (
        <section className="pb-20 -mt-80 sm:-mt-56 left-1/2 mx-auto z-10 w-5/6" data-aos="fade-down" data-aos-duration="750">
            <div className="container text-center max-w-5xl mx-auto sm:px-10 ">
                <form onSubmit={saveData}>
                    <div className="flex flex-wrap relative z-20">
                        <StatusCard color="none" icon="stars" title="Pesan Tiket">
                            <div className="sm:flex justify-center block z-10">
                                <select value={{ label : input.museum}} id='museum' className="block appearance-none sm:w-1/3 w-full sm:my-0  p-2.5 bg-[#ECE3DE] text-[#A70B0B] font-nunito font-semibold text-center border-none px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline " onChange={(e) => {
                                    const index = e.target.selectedIndex;
                                    const el = e.target.childNodes[index]
                                    const option =  el.getAttribute('id'); 
                                    // const selectedMuseum = e.target.id;
                                    setInput({...input,museum:option})
                                    setNamaInput({...namaInput,namaCategory:e.target.value})
                                    console.log(e.target.value);
                                    setMuseumId(option)
                                    cekMuseum(e.target.value)
                                    // console.log(selectedMuseum);
                                    // console.log(e); 
                                    // setMuseum(selectedMuseum);
                                    }}>
                                    <option  className='p-7 m-5 text-xl'>{namaInput.namaMuseumBanget}</option>
                                    {museum && museum.map((item,index) =>{
                                    // console.log(item.id);
                                    return(
                                        <option className='py-6 my-6  h-32' key={index} id={item.id} value={item.nama_museum}>{item.nama_museum}</option>
                                    )})}
                                </select>
                                <select value={{label: namaInput.namaCategory}} id="category" className="disabled:text-gray-600 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-1/3 w-full sm:mx-5 sm:my-0 p-2.5 text-[#A70B0B] font-nunito font-semibold text-center bg-[#ECE3DE] border-none rounded-md shadow-sm  appearance-none focus:border-red-800  focus:outline-none " onChange={(e) => {
                                    const index = e.target.selectedIndex;
                                    const el = e.target.childNodes[index]
                                    const option =  el.getAttribute('id');
                                    setInput({...input,category:option})
                                    setNamaInput({...namaInput,namaCategory:e.target.value})
                                    cekCategory()
                                    }} 
                                    disabled={disabledCategory} > 
                                    <option className=' text-xl '>{namaInput.namaCategory}</option>
                                    {category && typeof category !== 'string'  && category.map((itemm,indexx)=>{
                                    return(
                                        <option  key={indexx} id={itemm.id} value={itemm.nama_kategori} >{itemm.nama_kategori}</option>
                                        )})}
                                </select>

                                <input value={calendar} readOnly onClick={(e)=>{ setOpen(open => !open); 
                                console.log(e)} } className={disabledDate?"disabled:text-gray-600 disabled:bg-gray-300 relative text-[#A70B0B] disabled:cursor-not-allowed font-nunito font-semibold text-center sm:w-1/3 w-full sm:my-0  p-2.5 rounded-md border bg-[#ECE3DE] opacity-70":"relative text-center sm:w-1/3 w-full sm:my-0 p-2.5 rounded-md text-[#A70B0B] font-semibold border bg-[#ECE3DE]"} disabled={disabledDate}/>
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
                    <Link  ripple="light" id='button' className="pointer-events-none text-gray-600 bg-gray-300 disabled:cursor-not-allowed w-64 h-12 text-center align-middle px-6 hover:bg-red-600  font-medium text-xl pt-2.5 font-merriweather leading-tight uppercase rounded shadow-md hover:shadow-lg focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-400 active:shadow-lg transition duration-150 ease-in-out" to={{
                        pathname:"/input-data",
                        state : {input},
                    }}>{t('landing.working.pesan')}</Link>
                </div>
                </form>
            </div>
        </section>
    );
}
