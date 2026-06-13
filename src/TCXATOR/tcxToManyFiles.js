import generateTcxFile from "./tcxToFile.js";
import generateTcxPattern from "./generateTcx.js";

const generateManyTcxFile = datas => {
    const filesArray = datas.map((data, idx) => {
        // console.log(data)

        const [activityFrench, date, duration, distance, calories] = data;
        const tcxData = generateTcxPattern(activityFrench, date, duration, distance, calories);

        if((/Error/g).test(tcxData)) return "Error";

        return generateTcxFile(tcxData, `activity${idx + 1}`)
    });

    if(filesArray.includes("Error")) return ["Error", "creationFileError"];

    return filesArray;
};

export default generateManyTcxFile;