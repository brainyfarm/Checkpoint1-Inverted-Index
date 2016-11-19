/**
 * @file helpers.js
 */

/**
 * readFileContent
 * read a JSON file and then returns file name and content
 * @param {Object} selectedFile File upload input field
 * @return {Object} An array containing file name and content
 */
let readFileContent = (selectedFile)=> {
    let acceptedFileType = "application/json";
    let selectedFileType = selectedFile.type;
    let selectedFileName = selectedFile.name;
    let isValidFileType = Object.is(selectedFileType, acceptedFileType);
    if (isValidFileType) {
        let reader = new FileReader();
        reader.readAsText(selectedFile);

        reader.onload = ()=> {
            var fileJSONContent = JSON.parse(reader.result);
            return [selectedFileName, fileJSONContent];
        };

    } else {
        let errorMessage = 'JSON file format only';
        return errorMessage;
    }
}
