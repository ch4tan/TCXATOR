import { useState } from "react";
import { ListBox, InputBox, InputBoxDuration, DateBox } from "./Box";

const Modal = ({ visible, setVisible, setListFiles }) => {
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

    const resetErrors = () => {
        setTriggerError(false);
        setErrorDate(false);
        setErrorDuration(false);
        setDistanceError(false);
        setCaloriesError(false);
        setErrorTrainHour(false);
    };

    const resetStates = () => {
        setActivity("Run");
        setHour("");
        setMinute("");
        setDistance("");
        setCalories("");
        setDate("");
        setTrainHour("");
        setTrainMinute("");

        document.getElementById("activity").value = "Run";
        document.getElementById("date").value = "";
        document.getElementById("inputHour").value = "";
        document.getElementById("inputMinute").value = "";
        document.getElementById("inputdistance").value = "";
        document.getElementById("inputcalories").value = "";
    };

    const triggerClick = () => {
        resetErrors();

        const minuteTotal = (Number(hour) * 60 + Number(minute)) * 60;
        const formatedDate = date.split("-").reverse().join("-");
        const trainHourCombined = `${trainHour.padStart(2, "0")}:${trainMinute.padStart(2, "0")}`
        let errorArray = [];
        let isError = false;

        try {
            if(!(/\d{2}-\d{2}-\d{4}/g).test(formatedDate)) {
                setErrorDate(true)
                isError = true;
                errorArray.push("wrongDate");
            }
            if(minuteTotal === 0) {
                setErrorDuration(true)
                isError = true;
                errorArray.push("wrongDuration");
            }
            if(distance.length === 0) {
                setDistanceError(true)
                isError = true;
                errorArray.push("wrongDistance");
            }
            if(calories.length === 0) {
                setCaloriesError(true)
                isError = true;
                errorArray.push("wrongCalories");
            }
            if(!(/\d{2}:\d{2}/g).test(trainHourCombined)) {
                setErrorTrainHour(true);
                isError = true;
                errorArray.push("wrongHour");
                throw new Error("errorHour")
            }
            if((Number(trainHour) < 0 || Number(trainHour) > 23) || (Number(trainMinute) < 0 || Number(trainMinute) > 59)) {
                setErrorTrainHour(true);
                isError = true;
                errorArray.push("wrongHour");
                throw new Error("errorHour")
            }

            if(isError) throw new Error(errorArray.join("+"));
            
            setListFiles(curr => [...curr, [activity, `${formatedDate}-${trainHourCombined.replace(":", "-")}`, minuteTotal.toString(), distance, calories]])
            resetStates();
            resetErrors();
            setVisible(false);
        }
        catch { setTriggerError(true); }
    };

    const triggerClose = () => {
        resetErrors();
        resetStates();
        
        setVisible(false);
    };

    return (
        <div className={
            visible
                ? "flex flex-col h-[98%] w-[95%] items-center border-2 border-solid border-white landscape-mobile:w-[98%]"
                : "hidden"
            }
        >
            <div className="flex w-full justify-end">
                <button 
                    className="flex text-black bg-white w-6 h-5 justify-center items-center font-bold rounded-bl-lg"
                    onClick={() => triggerClose()}
                >
                    X
                </button>
            </div>

            <div className="flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-4 landscape-mobile:grid landscape-mobile:grid-rows-3 landscape-mobile:grid-flow-col landscape-mobile:gap-6">
                <ListBox Key="Activity" id="Activity" nameId="Activity" stateChange={setActivity} />
                <DateBox state={date} stateChange={setDate} error={errorDate} />

                {/* <HourBox state={trainHour} stateChange={setTrainHour} error={errorTrainHour} /> */}
                <InputBoxDuration minute={trainMinute} hour={trainHour} setMinute={setTrainMinute} setHour={setTrainHour} error={errorTrainHour} labelName="Hour" />

                <InputBoxDuration minute={minute} hour={hour} setMinute={setMinute} setHour={setHour} error={errorDuration} labelName="Duration" />
                { inputBoxNames.map(x => <InputBox key={x[0]} id={x[0]} nameId={x[0]} Value={x[1]} stateChange={x[2]} error={x[3]} />) }
            </div>

            <div className="flex flex-col gap-2 h-full justify-end">
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

export default Modal;