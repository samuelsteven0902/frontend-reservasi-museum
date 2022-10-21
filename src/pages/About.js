import Container from 'components/about/Container';
import DefaultNavbar from 'components/DefaultNavbar';
import FooterPengunjung from 'components/FooterPengunjung';


export default function About() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>  
            <div> 
                <main 
                className="w-full px-4 ml-auto mr-auto text-center">
                <Container/>
                </main>
            </div>
            <div>
                <FooterPengunjung/>
            </div>
        </>
    );
}

{/* <div className="w-full  px-4 ml-auto mr-auto text-center">
<div className="text-gray-200">
    <LeadText color="gray-200">
    Museum Keris Nusantara menyuguhkan daya tarik wisata pada koleksi keris yang asalnya dari berbagai tempat. Pesona dari keindahan keris-keris yang disuguhkan di Museum Keris Nusantara memiliki keindahan tersendiri karena masing-masing dari keris itu memiliki latar belakangnya masing-masing. Keris-keris yang ditampilkan diberikan penjelasan untuk edukasi pengunjung yang hadir.
    </LeadText>
</div> */}