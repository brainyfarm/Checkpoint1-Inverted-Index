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
        return false;
    }
}


/**
 * showToastMessage
 * Displays a toast message to the user
 * @param {String} message Message to show to user.
 */
let showToastMessage= (message)=> {
    Materialize.toast(message);
};




$(document).ready(function () {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    let myInvertedIndex = new InvertedIndex();
    let fileInputField = document.getElementById('fileInput');

    fileInputField.addEventListener('change', () => {
    $('#uploadModal').modal('close');
    let selectedFile = fileInputField.files[0];
    
    if( readFileContent(selectedFile) ) {
      
    }    
    });
});