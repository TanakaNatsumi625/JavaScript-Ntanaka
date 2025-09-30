class OverSizeError extends Error {
    constructor(filePath, fileSize, limitSize){
        super(`${filePath} is over size ${fileSize} bytes than ${limitSize}`);
        this.name = 'OverSizeError';
        this.limitSize = limitSize;
        this.fileSize = fileSize;
    }

    getLimitSize(){
        return "FileSizeError";
    }
}

function checkFileSize(filePath){
    const limitSize = 1024 * 1024 * 5; // 5MB
    const fileSize = 6000000; // 6MB
    if(fileSize > limitSize){
        let error = new OverSizeError(filePath, fileSize, limitSize);
        console.error(error.fileSize);
        console.error(error.message);
        console.error(error.name);
        return false;
    }
    return true;
}

checkFileSize("path/to/file.txt");