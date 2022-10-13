import DefaultNavbar from 'components/DefaultNavbar';
import Container from 'components/panduan/Container';

export default function Panduan() {
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
