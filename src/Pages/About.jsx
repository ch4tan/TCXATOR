const About = () => {
    return (
        <div className="flex flex-col h-full w-full gap-[5vh] items-center">
            <div className="flex text-white text-[10vh] text-center justify-center items-end h-[15vh] font-bold">
                <p className="">TCXATOR</p>
            </div>
            <div className={`flex flex-col w-[80vw] text-white text-justify gap-[2vh] md:gap-[5vh] md:text-2xl justify-center items-center`}>
                <p className="text-center">This web app was designed to simplify the lives of connected athletes.</p>
                <img src="/public/tcx.svg" alt="Image Not Found" className="w-[10vw] h-[10vh]" />
                <p className="text-center">It allows you to instantly generate customized workout files in TCX format, ready to be imported into your favorite platforms (Strava, Garmin, Coros...).</p>
                <img src="/public/tcx.svg" alt="Image Not Found" className="w-[10vw] h-[10vh]" />
                <p className="text-center">Whether you need to fix a missing activity or plan a workout, create your running or cycling sessions in just a few clicks, no fuss.</p>
            </div>

        </div>
    );
};

export default About;
