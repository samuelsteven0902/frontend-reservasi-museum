import { useTranslation } from 'react-i18next';
import about1 from '../../assets/img/about1.jpeg'
import about2 from '../../assets/img/about2.jpg'

export default function Container({  }) {
    const { t } = useTranslation() 

    return (
        <div className=' mx-auto h-full'>
            <div className='flex justify-center flex-wrap flex-col my-24 mb-12 '>
                <p className='text-5xl font-merriweather font-bold p-4 pb- w-full text-center'>About UPT Museum</p>
                <hr className='h-1 bg-red-300 w-1/3 flex mx-auto' />
                <p className='font-nunito tracking-wider w-3/5 mx-auto pt-6 pb-3 text-center'>{t('about.desc')}
                </p>
            </div>
            <div className="w-11/12 mx-auto min-h-full">
                <div className="flex text-black">
                    <div className='sm:mx-8 mx-2 pt-5 mb-12'>
                        <p className='font-nunito text-lg text-justify'>
                        {t('about.isi.part1')}</p>
                        <p className='font-nunito text-lg text-justify'>
                        {t('about.isi.part2')}.</p>
                            <img class="sm:float-right py-6 sm:py-0 w-60  mx-auto sm:mx-5  ... " src={about1}/>
                        <p className='font-nunito  text-lg pr-5 w- text-justify'>
                        {t('about.isi.part3')}</p>
                            <img class="sm:float-left py-6 sm:py-0 w-60 mx-auto sm:mx-5 pt-3 pb-5 ..." src={about2}/>
                        <p className='font-nunito text-lg pt-3 text-justify '>
                        {t('about.isi.part4')}</p>
                        <p className='font-nunito text-lg pt-3 text-justify '>
                        {t('about.isi.part5')}</p>
                        <p className='font-nunito text-lg pt-3 text-justify '>
                        {t('about.isi.part6')}</p>
                        <p className='font-nunito text-lg pt-3 text-justify '>
                        {t('about.isi.part7')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}