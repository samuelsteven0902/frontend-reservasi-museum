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
import { addDays, format, isMonday } from 'date-fns';
import { Link,  useHistory } from 'react-router-dom';
import pesan from '../../assets/img/icon/pesan.png'

export default function WorkingSection({setRes}) {
    const [museum, setMuseum] = useState("Pilih Museum");
    const [category, setCategory] = useState("Pilih Category");
    const [disabledCategory , setDisabledCategory] = useState(true);
    const [disabledDate , setDisabledDate] = useState(true);
    const [disableInput , setDisableInput] = useState(true);
    const [calendar, setCalendar] = useState('');
    const [count, setCount] = useState(0);
    const [open,setOpen] = useState(false);
    // const [libur, setLibur] = useState('')
    const [input,setInput] = useState({
        museum : '',
        category : '',
        calendar : ''
        
    })
    const redirect = useHistory();

    const refOne = useRef(null)

    const handleInput =(e) =>{
        setInput({...input,[e.target.name]:e.target.value}) 
        console.log(e);
    }

    const museumClass = document.getElementById('museum');
    const categoryClass = document.getElementById('category');

    const cekMuseum = () =>{
        if(input.museum === "museum_keris" || "museum_radya_pustaka") {
            setDisabledCategory(false);
            museumClass.classList.add('font-bold','text-gray-800',)
            console.log(museumClass);
        }
    }

    const cekCategory = () =>{
        if(category !== ''){
            setDisabledDate(false);
            categoryClass.classList.add('font-bold','text-gray-800')
           }
    }

    useEffect(() => {
    //   setRes(input); 
      setCalendar(format(new Date(), 'MM/dd/yyyy'));
      document.addEventListener("keydown", hidenOnEscape , true);
      document.addEventListener("click", hideOnClickOutside , true    );
      
      //   setInput({...input,museum:museum}) 
      
    }, [input])
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


    const handleSelect = (date) =>{
        setCalendar(format(date, 'MM/dd/yyyy'))
        setCount(count + 1)
    }


      function customDayContent(day) {
        let extraDot = null;
        if (isMonday(day)) {
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
    
console.log(input);
    return (
        <section className="pb-20 bg-gradient-to-b from-white bg-gray-100 -mt-32">
            <div className="container max-w-7xl mx-auto px-4">
                <form onSubmit={saveData}>
                <div className="flex flex-wrap relative z-50">
                    <StatusCard color="red" icon="stars" title="Pesan Tiket">
                    <div className="flex w-full ">
                    
                    <select id='museum' value={museum} className="block appearance-none w-1/3 bg-white text-center border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" 
                        onChange={(e) => {
                            // handleInput(e);
                            setInput({...input,museum:e.target.value})
                            cekMuseum()
                            console.log(input); 
                            const selectedMuseum = e.target.value;
                            setMuseum(selectedMuseum);
                            console.log(museum);  
                           
                             }}>
                        <option disabled>Pilih Museum</option>
                        <option value="museum_keris" className='text-gray-800'>Museum Keris</option>
                        <option value="museum_radya_pustaka" className='text-gray-800'>Museum Radya Pustaka</option>
                    </select>

                    <select  value={category} id="category" className="w-1/3 mx-5 p-2.5 text-gray-500 text-center bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-red-800 focus:outline-none" onChange={(e) => {
                            setInput({...input,category:e.target.value})
                            cekCategory()
                            console.log(e);
                        setCategory(e.target.value); 
                       
                        }} 
                    disabled={disabledCategory} 
                    > 
                        <option disabled>Pilih Kategori</option>
                        <option value="umum">Umum</option>
                        <option value="mahasiswa">Mahasiswa</option>
                        <option value="pelajar">Pelajar</option>
                        <option value="rombongan_umum">Rombongan Umum </option>
                        <option value="rombongan_pelajar">Rombongan Pelajar</option>
                        <option value="wna">Wisatawan Asing</option>
                    </select>
                    <input value={calendar} readOnly onClick={(e)=>{ setOpen(open => !open); 
                        setInput({...input,calendar:e.target.value}); console.log(e)} } className="relative text-center w-1/3 rounded-md border bg-white" disabled={disabledDate} />
                    <div ref={refOne} className="absolute right-0 mr-20 mt-8">
                        
                        {open && 
                        <Calendar 
                            date={ new Date()}
                            onChange = {handleSelect}
                            months={1}
                            minDate={addDays(new Date(), 0)}
                            maxDate={addDays(new Date(), 90)}
                            dayContentRenderer={customDayContent}
                            excludeDates={[addDays(new Date(), 21), addDays(new Date(), 15)]}
                             />
                        }
                    </div>
                </div>
                    </StatusCard>
                </div>
                <div className='flex flex-wrap relative justify-center pt-14 '>
                    <Link  ripple="light" disabled={true}  style={{pointerEvents: count === 1 ? '' : 'none'}} className=" w-72 h-12 text-center align-middle px-6 bg-[#372B2B] hover:bg-[#645c5c] text-white font-medium text-xl pt-2.5 leading-tight uppercase rounded shadow-md hover:shadow-lg focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-400 active:shadow-lg transition duration-150 ease-in-out" to={{
                        pathname:"/input-data",
                        state : {input},
                    }}>Pesan Tiket</Link>
                </div>
                </form>

                <div className="flex flex-wrap items-center mt-32">
                    <div className="w-full md:w-5/12 px-4 mx-auto">
                        <div className="text-blue-gray-800 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                            <Icon name="people" size="3xl" />
                        </div>
                        <H4 color="gray">About Us</H4>
                        <LeadText color="blueGray">
                            Museum Keris Nusantara merupakan sebuah museum yang dibangun oleh Direktorat Jenderal Kebudayaan, Kementerian Pendidikan dan Kebudayaan melalui Direktorat Pelestarian Cagar Budaya dan Permuseuman sejak 2013 lalu diresmikan oleh Presiden Republik Indonesia, Joko Widodo pada tanggal 9 Agustus.
                        </LeadText>
                        <LeadText color="blueGray">   
                            Museum Radya Pustaka, Museum Tertua di Indonesia. Didirikan oleh Kanjeng Raden Adipati Sosrodiningrat IV pada 18 Oktober 1890 ini merupakan museum tertua yang ada di Indonesia.
                        </LeadText>
                        <a
                            href="#pablo"
                            className="font-medium text-light-blue-500 mt-2 inline-block"
                        >
                            Read More
                        </a>
                    </div>

                    <div className="w-full md:w-4/12 px-4 mx-auto flex justify-center mt-24 lg:mt-0">
                        <Card>
                            <CardImage alt="Card Image" src={museumKeris} />
                            <CardBody>
                                <H6 color="gray">Museum Keris</H6>
                                <Paragraph color="blueGray">
                                Museum Keris Nusantara merupakan sebuah museum yang dibangun oleh Direktorat Jenderal Kebudayaan, Kementerian Pendidikan dan Kebudayaan melalui Direktorat Pelestarian Cagar Budaya dan Permuseuman
                                </Paragraph>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
