import JSZip from "jszip";

const tcxFilesToZip = async files => {
    try{
        // console.log(files)

        const zip = new JSZip();
    
        // console.log(files)
        files.forEach((file, idx) => {

            zip.file(`activity${idx}.tcx`, file);
        });


        const content = await zip.generateAsync({ type: "blob" });

        return content;
    }
    catch {
        return ["Error", "errorCreationZip"];
    }
};

export default tcxFilesToZip;