const About = () => {
    return (
        <div className="flex items-center justify-center flex-col gap-12 2xl:justify-between pt-10 h-full">
            <p className="text-white text-3xl 2xl:text-7xl">TCXATOR</p>
            <div className={`flex flex-col w-[85%] text-white text-justify text-[100%] 2xl:text-xl gap-2`}>
                <p className="text-center">This web app was designed to simplify the lives of connected athletes.</p>
                <p className="text-center">It allows you to instantly generate customized workout files in TCX format, ready to be imported into your favorite platforms (Strava, Garmin, Coros...).</p>
                <p className="text-center">Whether you need to fix a missing activity or plan a workout, create your running or cycling sessions in just a few clicks, no fuss.</p>
            </div>
            <p className="text-white">Copyright 2026 by TCXATOR - All Rights Reserved</p>
        </div>
    );
};

export default About;