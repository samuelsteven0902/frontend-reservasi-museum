import about1 from '../../assets/img/about1.jpeg'
import about2 from '../../assets/img/about2.jpg'

export default function Container({  }) {
    return (
        <div className='container mx-auto p-10 h-screen'>
            <div className='flex justify-center flex-wrap flex-col my-24 mb-12 '>
                <p className='text-5xl font-merriweather font-bold p-4 pb- w-full text-center'>About UPT Museum</p>
                <hr className='h-1 bg-red-300 w-1/3 flex mx-auto' />
                <p className='font-nunito tracking-wider w-3/5 mx-auto pt-6 pb-3 text-center'>Mendeskripsikan mengenai UPT Museum Surakarta
                </p>
            </div>
            <div className="w-11/12 mx-auto">
                <div className="flex text-black">
                    <div className='mx-8 pt-5 mb-12'>
                        <p className='font-nunito text-lg text-justify'>
                            Solo merupakan salah satu kota yang sering dikunjungi oleh para wisatawan. Tempat wisata yang ada di Solo juga sangat beragam. Salah satu tempat wisata yang ada di Solo yaitu Museum. Banyak museum yang terdapat di Solo karena Solo juga merupakan daerah yang memiliki sejarah yang melimpah.</p>
                        <p className='font-nunito text-lg text-justify'>
                            Museum Keris Nusantara dan Radya Pustaka merupakan museum yang dikelola oleh pemerintah Solo. Keduanya memiliki daya tarik sendiri.</p>
                            <img class="float-right w-1/6 mx-5 ..." src={about1}/>
                        <p className='font-nunito text-lg pr-5 w-4/5 text-justify'>
                            Museum Keris Nusantara merupakan sebuah museum yang dibangun oleh Di rektorat Jenderal Kebudayaan, Kementerian Pendidikan dan Kebudayaan melalui Direktorat Pelestarian Cagar Budaya dan Permuseuman sejak 2013 lalu diresmikan oleh Presiden Republik Indonesia, Joko Widodo pada tanggal 9 Agustus.</p>
                            <img class="float-left w-1/6 mx-5 pt-3 pb-5 ..." src={about2}/>
                        <p className='font-nunito text-lg w-4/5 pt-3 text-justify pb-10'>
                            Museum Radya Pustaka, Museum Tertua di Indonesia. Didirikan oleh Kanjeng Raden Adipati Sosrodiningrat IV pada 18 Oktober 1890 ini merupakan museum tertua yang ada di Indonesia.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}