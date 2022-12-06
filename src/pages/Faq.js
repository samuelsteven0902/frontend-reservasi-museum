import DefaultNavbar from 'components/DefaultNavbar';
import Container from 'components/faq/Container';

export default function Faq() {
    return (
        <div className='bg-gray-50'>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>  
            <main className='container mx-auto  p-10 h- relative'>
                <Container/>
            </main>
        </div>
    );
}
