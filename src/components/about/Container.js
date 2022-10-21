import about1 from '../../assets/img/about1.jpeg'
import about2 from '../../assets/img/about2.jpg'

export default function Container({  }) {

    return (
        <div className='container bg-gray-100 p-10 h-screen'>
            <div className='bg-white rounded-md shadow py-5 pb-12 mt-12'>
                <div className='flex justify-center pt-2'>
                    <p className=' bg-[#A70B0B] text-2xl rounded-md text-white py-1 px-10 font-bold' >About</p>
                </div>

                <div className="w-11/12 mx-auto bg-gray-100 mt-6 shadow-lg">
                    <div className="flex text-black">
                        <div className='mx-8 pt-5 '>
                            <p className=' text-lg text-justify'>
                            Solo merupakan salah satu kota yang sering dikunjungi oleh para wisatawan. Tempat wisata yang ada di Solo juga sangat beragam. Salah satu tempat wisata yang ada di Solo yaitu Museum. Banyak museum yang terdapat di Solo karena Solo juga merupakan daerah yang memiliki sejarah yang melimpah.</p>
                            <p className='text-lg text-justify'>
                            Museum Keris Nusantara dan Radya Pustaka merupakan museum yang dikelola oleh pemerintah Solo. Keduanya memiliki daya tarik sendiri.</p>
                            <img class="float-right w-1/6 mx-5 ..." src={about1}/>
                            <p className='text-lg pr-5 w-4/5 text-justify'>
                            Museum Keris Nusantara merupakan sebuah museum yang dibangun oleh Di rektorat Jenderal Kebudayaan, Kementerian Pendidikan dan Kebudayaan melalui Direktorat Pelestarian Cagar Budaya dan Permuseuman sejak 2013 lalu diresmikan oleh Presiden Republik Indonesia, Joko Widodo pada tanggal 9 Agustus.</p>
                            <img class="float-left w-1/6 mx-5 pt-3 pb-5 ..." src={about2}/>
                            <p className='text-lg w-4/5 pt-3 text-justify'>
                            Museum Radya Pustaka, Museum Tertua di Indonesia. Didirikan oleh Kanjeng Raden Adipati Sosrodiningrat IV pada 18 Oktober 1890 ini merupakan museum tertua yang ada di Indonesia.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}