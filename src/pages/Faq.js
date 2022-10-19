import DefaultNavbar from 'components/DefaultNavbar';
import Container from 'components/faq/Container';

export default function Faq() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>  
            <main className=''>
                <Container/>
            </main>
        </>
    );
}
