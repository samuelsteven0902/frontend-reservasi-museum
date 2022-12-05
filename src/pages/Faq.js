import DefaultNavbar from 'components/DefaultNavbar';
import Container from 'components/faq/Container';

export default function Faq() {


    
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>  
            <main className='container bg-gray-100 p-10 h-screen relative'>
                <Container/>
            </main>
        </>
    );
}
