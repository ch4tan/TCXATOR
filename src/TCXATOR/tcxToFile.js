const generateTcxFile = (tcxData, name) => {
    try {
        const file = new File([tcxData], `${name}.tcx`, { type: "application/tcx+xml"});

        return file;
    }
    catch {
        return new Error("CreationFileError");
    }
};

export default generateTcxFile;