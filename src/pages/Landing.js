import DefaultNavbar from 'components/DefaultNavbar';
import Header from 'components/landing/Header';
import WorkingSection from 'components/landing/WorkingSection';
import FooterPengunjung from 'components/FooterPengunjung';
import Informasi from 'info/Informasi';
import About from 'components/landing/About';

export default function Landing() {
    return (
        <>
            <div className="absolute w-full z-50">
                <DefaultNavbar />
            </div>  
            <main className='bg-gray-50'>
                <Header/>
                <WorkingSection/>
                {/* <HargaTiket /> */}
                <Informasi/>
                <About/>
                {/* <TeamSection /> */}
                {/* <ContactSection /> */}
            </main>
            <FooterPengunjung />
            {/* <DefaultFooter /> */}
        </>
    );
}
