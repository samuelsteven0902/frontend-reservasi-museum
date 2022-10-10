import DefaultNavbar from 'components/DefaultNavbar';
import DefaultFooter from 'components/DefaultFooter';
import Header from 'components/landing/Header';
import WorkingSection from 'components/landing/WorkingSection';
import TeamSection from 'components/landing/TeamSection';
import ContactSection from 'components/landing/ContactSection';
import HargaTiket from 'info/HargaTiket';
import FooterPengunjung from 'components/FooterPengunjung';
import Informasi from 'info/Informasi';

export default function Landing() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>  
            <main className=''>
                <Header />
                <WorkingSection />
                <HargaTiket />
                <Informasi />
                {/* <TeamSection /> */}
                {/* <ContactSection /> */}
            </main>
            <FooterPengunjung />
            {/* <DefaultFooter /> */}
        </>
    );
}