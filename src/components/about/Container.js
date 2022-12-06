import { useTranslation } from 'react-i18next';
import about1 from '../../assets/img/about1.jpeg'
import about2 from '../../assets/img/about2.jpg'

export default function Container({  }) {
    const { t } = useTranslation() 

    return (
        <div className=' mx-auto h-full'>
            <div className='flex justify-center flex-wrap flex-col my-24 mb-12 '>
                <p className='text-5xl font-merriweather  font-bold p-4 pb- w-full text-center'>About UPT Museum</p>
                <hr className='h-1 bg-red-300 w-1/3 flex mx-auto' />
                <p className='font-nunito tracking-wider w-3/5 mx-auto pt-6 pb-3 text-center'>{t('about.desc')}
                </p>
            </div>

                <div className="w-11/12 mx-auto">
                    <div className="flex text-black">
                        <div className='mx-8 py-5 mb-12 text-sm md:text-lg'>
                            
                            <p className='  text-justify'>
                            {t('about.isi.part1')}</p>
                            <p className=' text-justify'>
                            {t('about.isi.part2')}</p>
                            <img class="float-right w-1/6 mx-5 ..." src={about1}/>
                            <p className=' pr-5 w-4/5 text-justify'>
                            {t('about.isi.part3')}</p>
                            <img class="float-left w-1/6 mx-5 pt-3 pb-5 ..." src={about2}/>
                            <p className=' w-4/5 pt-3 text-justify'>
                            {t('about.isi.part4')}</p>
                        </div>
                    </div>
                </div>

        </div>
    );
}