// import H5 from '@material-tailwind/react/Heading5';
// import LeadText from '@material-tailwind/react/LeadText';
// import Icon from '@material-tailwind/react/Icon';

export default function DefaultFooter() {
return (
        <>
            <footer className="relative bg-gray-100 pt-6 pb-6">
                <div className="container max-w-7xl mx-auto px-4">
                    <hr className="my-6 border-gray-300" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-7/12 mx-auto text-center">
                            <div class="text-center font-merriweather text-black">
                                <span>© {new Date().getFullYear()} Copyright </span>
                                <a class="font-merriweather text-black font-bold" href="https://uptmuseum.surakarta.go.id/">UPT Museum Surakarta </a><span> by KMI Team 22 </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
