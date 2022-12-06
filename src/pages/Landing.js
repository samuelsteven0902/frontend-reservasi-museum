import DefaultNavbar from 'components/DefaultNavbar';
import DefaultFooter from 'components/DefaultFooter';
import Header from 'components/landing/Header';
import WorkingSection from 'components/landing/WorkingSection';
import TeamSection from 'components/landing/TeamSection';
import ContactSection from 'components/landing/ContactSection';
import HargaTiket from 'info/HargaTiket';
import FooterPengunjung from 'components/FooterPengunjung';
import Informasi from 'info/Informasi';
import About from 'components/landing/About';

export default function Landing() {
    return (
        <>
        <div className="absolute w-full z-50">
            <DefaultNavbar />
        </div>  
        <main className=''>
            <Header/>
            <WorkingSection/>
            {/* <HargaTiket /> */}
            <Informasi/>
            <About/>
            {/* <TeamSection /> */}
            {/* <ContactSection /> */}
        </main>
            <FooterPengunjung/>
            {/* <DefaultFooter /> */}
        </>
    );
}
