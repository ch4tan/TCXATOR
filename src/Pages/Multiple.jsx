import { useState } from "react";
import Modal from "../Components/Modal";
import { trigerZipFile } from "../TCXATOR/TCXator";

const Multiple = () => {
    const [listFiles, setListFiles] = useState([]); // array of array => entry -> [activityFrench, date, duration, distance, calories]
    const [displayModal, setDisplayModal] = useState(false);
    const deleteAFile = index => setListFiles(listFiles.filter((x, y) => y !== index));

    const triggerClick = async () => { 
        await trigerZipFile(listFiles) 
        window.location.reload();
    };
    
    return (
        <div className="flex items-center justify-center flex-col w-full h-full gap-32 text-xl landscape-mobile:gap-5">
            <div className={displayModal ? "hidden" : "flex flex-col justify-center gap-4 landscape-mobile:gap-2"}>
                <div className="flex flex-col bg-black h-80 w-80 border-4 border-solid border-white items-center pt-2 rounded-xl overflow-y-auto gap-5 landscape-mobile:h-56">
                    <div
                     className="flex flex-col bg-gray-600 text-white h-10 w-64 border-2 border-solid border-white shrink-0 justify-center items-center font-bold rounded-sm"
                    >
                        <p>Files List</p>
                    </div>
                    {
                        listFiles.map((x, y) => {
                            return (
                               <div
                                className="flex flex-row gap-8 bg-white text-black text-base h-10 w-64 border-2 border-solid border-gray-600 shrink-0 justify-center items-center font-bold rounded-sm"
                                key={`${x[0].toUpperCase()} ${x[1]}`}
                                >
                                    <p>
                                        {`${x[0].toUpperCase()} ${x[1]}`}
                                    </p>
                                    <button 
                                        className="flex w-6 justify-center items-center bg-black text-white text-xl"
                                        onClick={() => deleteAFile(y)}
                                    >
                                        X
                                    </button>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="flex w-80 justify-end">
                    <button 
                        className="flex text-white bg-w text-xl border-4 border-solid border-white rounded-xl w-32 justify-center shadow-sm shadow-white"
                        onClick={() => setDisplayModal(true)}
                    >
                        ADD A FILE
                    </button>
                </div>
            </div>
            <button 
                className={
                    displayModal
                    ? "hidden"
                    : "flex text-white bg-w text-4xl border-4 border-solid border-white rounded-xl w-56 justify-center shadow-sm shadow-white"
                }
                onClick={ () => triggerClick() }
            >
                GENERATE
            </button>

            <Modal visible={displayModal} setVisible={setDisplayModal} setListFiles={setListFiles} />
        </div>
    );
};

export default Multiple;