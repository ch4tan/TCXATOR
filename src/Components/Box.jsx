const inputBoxStyle = "w-60 h-8 bg-white rounded-xl text-center shadow-sm shadow-white text-black";
const errorInputBoxStyle = "w-60 rounded-xl text-center shadow-sm shadow-white text-white bg-red-900";
const durationBoxStyle = "w-12 h-8 rounded-xl text-center text-black";
const errorDurationBoxStyle = "w-12 h-8 rounded-xl text-center bg-red-900 text-white";
const boxChoicesStyle = "flex flex-col gap-4 shadow";
const CHOICES = ["Run", "Indoor Run", "Trail Run", "Bike", "Indor Bike"];
const UNITIES = {
    "duration": "hour and minutes",
    "distance": "Metters",
    "calories": "Kilo Calories"
};

const ListBox = ({ nameId, stateChange }) => {
    return (
       <div className={boxChoicesStyle}>
            <label htmlFor="" className="text-white font-bold">{nameId}:</label>
            <select name="" id="activity" className={inputBoxStyle} onChange={(e) => stateChange(e.target.value)}>
                { CHOICES.map(x => (<option key={x} value={x}>{x}</option>)) }
            </select>
        </div>
    );
};

const InputBox = ({ nameId, state, stateChange, error }) => {
    return (
        <div className={boxChoicesStyle}>
            <label htmlFor="" className="text-white font-bold">{`${nameId.charAt(0).toUpperCase()}${nameId.slice(1)}`} ({UNITIES[nameId]}):</label>
            <input type="number" id={`input${nameId}`} className={error ? errorInputBoxStyle : inputBoxStyle} value={state} onChange={(e) => stateChange(e.target.value)} ></input>
        </div>
    );
};

const DateBox = ({ state, stateChange, error }) => {
    return (

        <div className={boxChoicesStyle}>
            <label htmlFor="" className="text-white font-bold">Date:</label>
            <input type="date" id={`date`} className={error ? errorInputBoxStyle : inputBoxStyle} value={state} onChange={(e) => stateChange(e.target.value)} />
        </div>
    );
};

const InputBoxDuration = ({ minute, hour, setMinute, setHour, error, labelName }) => {
    return (
        <div className={boxChoicesStyle}>
            <label htmlFor="" className="text-white font-bold">{labelName}:</label>
            <div className="flex flex-row gap-8">
                <div className="flex flex-row gap-3">
                    <label htmlFor="" className="text-white">Hour(s):</label>
                    <input type="number" 
                        onInput={(e) => { if (e.target.value.length > 2) { e.target.value = e.target.value.slice(0, 2); }}} 
                        id="inputHour"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        className={error ? errorDurationBoxStyle : durationBoxStyle}>
                    </input>
                </div>
                <div className="flex flex-row gap-4">
                    <label htmlFor="" className="text-white">Minute(s):</label>
                    <input type="number" 
                        onInput={(e) => { if (e.target.value.length > 2) { e.target.value = e.target.value.slice(0, 2); }}}
                        id="inputMinute"
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                        className={error ? errorDurationBoxStyle : durationBoxStyle}>
                    </input>
                </div>
            </div>
        </div>
    );
};

export { ListBox, InputBox, InputBoxDuration, DateBox };