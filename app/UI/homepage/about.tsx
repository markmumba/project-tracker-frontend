import Image from 'next/image';
import screenshot from '/public/images/screenshot.jpg';


function AboutSection() {
    return (
        <>
            <div className="flex flex-col items-center justify-center ">
                <h1 className='text-5xl font-bold p-10'>Effortlessy manage your students </h1>
            </div>
            <div id="about" className="flex flex-col items-center justify-center py-16  relative m-10">
                <div className="relative max-w-7xl overflow-hidden rounded-xl  shadow-blue ">
                    <Image
                        src={screenshot}
                        alt="Dashboard"
                        className="w-full h-full rounded-2xl object-cover "
                    />
                    <div className="lamp"></div>
                </div>
            </div>
        </>
    );
};

export default AboutSection;
