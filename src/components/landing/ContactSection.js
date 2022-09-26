import Title from 'components/landing/Title';
import ContactCard from 'components/landing/ContactCard';
import Form from 'components/landing/Form';

export default function ContactSection() {
    return (
        <section className="pb-20 relative block bg-gray-100">
            <div className="container max-w-7xl mx-auto px-4 lg:pt-24">
                <Title heading="UPT Museum Solo">
                    Put the potentially record low maximum sea ice extent tihs
                    year down to low ice. According to the National Oceanic and
                    Atmospheric Administration, Ted, Scambos.
                </Title>

                <div className="flex flex-wrap -mt-12 justify-center">
                    <ContactCard icon="stars" title="Museum Keris Nusantara">
                    Alamat: Jl. Bhayangkara No.2, Sriwedari, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57141
                    </ContactCard>
                    <ContactCard icon="insert_chart" title="Museum Radya Pustaka">
                        
                    Alamat: Jl. Slamet Riyadi No.275, Sriwedari, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57141
                    </ContactCard>
                    {/* <ContactCard icon="launch" title="Launch Time">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </ContactCard> */}
                </div>

                <Form />
            </div>
        </section>
    );
}
