import { useState } from "react";
import { ListBox, InputBox, InputBoxDuration, DateBox } from "../Components/Box";
import { trigerSingleFile } from "../TCXATOR/TCXator";

const Single = () => {
    const [activity, setActivity] = useState("Run");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [distance, setDistance] = useState("");
    const [calories, setCalories] = useState("");
    const [date, setDate] = useState("");
    const [triggerError, setTriggerError] = useState(false);
    const [errorDate, setErrorDate] = useState(false);
    const [errorDuration, setErrorDuration] = useState(false);
    const [distanceError, setDistanceError] = useState(false);
    const [caloriesError, setCaloriesError] = useState(false);
    const [trainHour, setTrainHour] = useState("");
    const [errorTrainHour, setErrorTrainHour] = useState(false);
    const [trainMinute, setTrainMinute] = useState("");
    const inputBoxNames = [["distance", distance, setDistance, distanceError], ["calories", calories, setCalories, caloriesError]];
    const CHOICES = ["Run", "Indoor Run", "Trail Run", "Bike", "Indor Bike"];

    const resetErrors = () => {
        setErrorDate(false);
        setErrorDuration(false);
        setDistanceError(false);
        setCaloriesError(false);
        setErrorTrainHour(false);
        setErrorTrainHour(false);
    }

    const triggerClick = () => {
        resetErrors();

        const minuteTotal = (Number(hour) * 60 + Number(minute)) * 60;
        const formatedDate = date.split("-").reverse().join("-");
        const trainHourCombined = `${trainHour.padStart(2, "0")}:${trainMinute.padStart(2, "0")}`;

        try {
            if(!(/\d{2}-\d{2}-\d{4}/g).test(formatedDate)) setErrorDate(true);
            if(minuteTotal === 0) setErrorDuration(true);
            if(distance.length === 0) setDistanceError(true);
            if(calories.length === 0) setCaloriesError(true);
            if(!(/\d{2}:\d{2}/g).test(trainHourCombined)) {
                setErrorTrainHour(true);
                throw new Error("wrongDate");
            }

            if((trainHour < 0 || trainHour > 23) || (trainMinute < 0 || trainMinute > 59)) {
                setErrorTrainHour(true);
                throw new Error("errorHour")
            }

            trigerSingleFile(activity, `${formatedDate}-${trainHourCombined.replace(":", "-")}`, minuteTotal.toString(), distance, calories);
            window.location.reload();
        }
        catch { setTriggerError(true); }
    };

    return (
        <div className="flex items-center justify-center flex-col w-full h-full gap-16 text-xl ">
            <div className="flex flex-col w-full gap-3 justify-center items-center landscape-mobile:grid landscape-mobile:grid-rows-2 landscape-mobile:grid-flow-col landscape-mobile:gap-6">
                <ListBox Key="Activity" id="Activity" nameId="Activity" stateChange={setActivity} />
                <DateBox state={date} stateChange={setDate} error={errorDate} />
                <InputBoxDuration minute={trainMinute} hour={trainHour} setMinute={setTrainMinute} setHour={setTrainHour} error={errorTrainHour} labelName="Hour" />
                <InputBoxDuration minute={minute} hour={hour} setMinute={setMinute} setHour={setHour} error={errorDuration} labelName="Duration" />
                { inputBoxNames.map(x => <InputBox key={x[0]} id={x[0]} nameId={x[0]} Value={x[1]} stateChange={x[2]} error={x[3]} />) }
            </div>
            <div className="flex flex-col gap-2">
                <button 
                    className="flex text-white bg-w text-2xl border-4 border-solid border-white rounded-xl w-56 justify-center shadow-sm shadow-white"
                    onClick={() => triggerClick()}
                >
                    GENERATE
                </button>
                <div className="flex w-full h-8 justify-center">
                    <p className={triggerError ? "flex text-red-900 justify-center" : "hidden"}>Error! Correct red fields</p>
                </div>
            </div>
        </div>
    );
};

export default Single;