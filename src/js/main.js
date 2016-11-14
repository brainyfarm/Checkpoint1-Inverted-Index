$(document).ready(function () {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    let myInvertedIndex = new InvertedIndex();
    let fileInputField = document.getElementById('fileInput');

    fileInputField.addEventListener('change', () => {
    $('#uploadModal').modal('close');
    let selectedFile = fileInputField.files[0];
    myInvertedIndex.readFileContent(selectedFile);    
    });
});