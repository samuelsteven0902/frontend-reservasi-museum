import Card from '@material-tailwind/react/Card';
import CardImage from '@material-tailwind/react/CardImage';
import CardBody from '@material-tailwind/react/CardBody';
import Icon from '@material-tailwind/react/Icon';
import H4 from '@material-tailwind/react/Heading4';
import H6 from '@material-tailwind/react/Heading6';
import LeadText from '@material-tailwind/react/LeadText';
import Paragraph from '@material-tailwind/react/Paragraph';
import StatusCard from 'components/landing/StatusCard';
import Teamwork from 'assets/img/teamwork.jpeg';
import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'react-date-range';
import { addDays, format, isMonday } from 'date-fns';
import { Link,  useHistory } from 'react-router-dom';

export default function WorkingSection({setRes}) {
    const [museum, setMuseum] = useState("Pilih Museum");
    const [category, setCategory] = useState("Pilih Category");
    const [disabledCategory , setDisabledCategory] = useState(true);
    const [disabledDate , setDisabledDate] = useState(true);
    const [calendar, setCalendar] = useState('');
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

    const cekMuseum = () =>{
        if(input.museum === "museum_keris" || "museum_radya_pustaka") {
            setDisabledCategory(false);
            console.log('masuk');
        }
    }

    const cekCategory = () =>{
        if(category !== ''){
            setDisabledDate(false);
           }
    }

    useEffect(() => {
    //   setRes(input); 
      setCalendar(format(new Date(), 'MM/dd/yyyy'));
      document.addEventListener("keydown", hidenOnEscape , true);
      document.addEventListener("click", hideOnClickOutside , true    );
      
      
    //   setInput({...input,museum:museum}) 

    }, [input])
    
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
        <section className="pb-20 bg-gray-100 -mt-32">
            <div className="container max-w-7xl mx-auto px-4">
                <form onSubmit={saveData}>
                <div className="flex flex-wrap relative z-50">
                    <StatusCard color="red" icon="stars" title="Pesan Tiket">
                    <div className="flex w-full ">
                    
                    <select value={museum} className="w-full mx-5 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600" 
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
                        <option value="museum_keris">Museum Keris</option>
                        <option value="museum_radya_pustaka">Museum Radya Pustaka</option>
                    </select>

                    <select value={category} id="category" className="w-full mx-5 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600" onChange={(e) => {
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
                        setInput({...input,calendar:e.target.value}); console.log(e)} } className="relative" disabled={disabledDate} />
                    <div ref={refOne} className="absolute">
                        
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
                <div className='flex flex-wrap relative justify-center '>
                    <Link className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out" to={{
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
                        <H4 color="gray">Working with us is a pleasure</H4>
                        <LeadText color="blueGray">
                            Don't let your uses guess by attaching tooltips and
                            popoves to any element. Just make sure you enable
                            them first via JavaScript.
                        </LeadText>
                        <LeadText color="blueGray">
                            The kit comes with three pre-built pages to help you
                            get started faster. You can change the text and
                            images and you're good to go. Just make sure you
                            enable them first via JavaScript.
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
                            <CardImage alt="Card Image" src={Teamwork} />
                            <CardBody>
                                <H6 color="gray">Top Notch Services</H6>
                                <Paragraph color="blueGray">
                                    The Arctic Ocean freezes every winter and
                                    much of the sea-ice then thaws every summer,
                                    and that process will continue whatever
                                    happens.
                                </Paragraph>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
