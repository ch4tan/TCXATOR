import generateTcxPattern from "./generateTcx.js";
import generateTcxFile from "./tcxToFile.js";
import generateManyTcxFile from "./tcxToManyFiles.js";
import tcxFilesToZip from "./tcxFilesToZIp.js";
import saveAs from "file-saver";

const trigerSingleFile = (activityFrench, date, duration, distance, calories) => {
    const tcxData = generateTcxPattern(activityFrench, date, duration, distance, calories);

    if((/Error/g).test(tcxData)) throw new Error("Generating TCX Files");

    const tcxFile = generateTcxFile(tcxData, "activity.tcx");

    if((/Error/g).test(tcxFile)) throw new Error("Creation TCX Files");

    saveAs(tcxFile, "activity.tcx");
};

const trigerZipFile = async datas => {
    const tcxFilesArray = generateManyTcxFile(datas);

    if(tcxFilesArray.includes("Error")) throw new Error("Error generating TCX Files");

    const zipFile = await tcxFilesToZip(tcxFilesArray);

    if(Array.isArray(zipFile)) throw new Error("Error creation zip file");

    saveAs(zipFile, "activies.zip");
};

export { trigerSingleFile, trigerZipFile };