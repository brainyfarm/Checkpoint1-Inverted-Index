let myInvertedIndex = new InvertedIndex();
/**
 * showToastMessage
 * Displays a toast message to the user
 * @param {String} message Message to show to user.
 */
let showToastMessage = (message) => {
  Materialize.toast(message, 2000, 'cyan');
};

/**
 * useApp
 * Handles manipulation of view and class when user selects file
 * @param {String} activeFile Current JSON file name 
 * @param {String} activeFileContent Content of active JSON file
 */
function useApp(activeFileName, activeFileContent, activeFileLength) {
  let isValidJson = myInvertedIndex.isValidJson(activeFileContent);
  if (!isValidJson) {
    setTimeout(function () {
      showToastMessage(`${activeFileName} is badly formatted`);
    }, 2000)
  } else {
    myInvertedIndex.createIndex(activeFileContent);
    let indexMap = myInvertedIndex.getIndex();
    let wordCount = Object.keys(indexMap).length;
    let fileCard = generateFileCard(activeFileName, wordCount);
    $('#display-area').append(fileCard);

    let safeFileName = activeFileName.replace('.', '-');
    $(`#${safeFileName}-create-btn`).on("click", function () {
      generateFileIndexTable(activeFileName, indexMap, activeFileLength);
      $(this).hide();
    })

  }
}

function markDocumentCell() {

}

function generateFileCard(fileName, wordCount) {
  let safeFileName = fileName.replace('.', '-');
  let fileCardHTML =
    `<div class="row">
      <div class="col s12 m10">
        <div class="card-panel" id="${safeFileName}-display-panel">
           <h4> ${fileName} <small>(${wordCount} unique words)</small></h4>
          <button id="${safeFileName}-create-btn" 
                  class="btn waves-effect waves-light"> 
                  Create Index 
          </button>
        </div>
      </div>
    </div>`;
  return fileCardHTML;
}

function generateFileIndexTable(fileName, fileIndexMap, activeFileLength) {
  let safeFileName = fileName.replace('.', '-');
  let searchBarHTML =
    `<input id="search-${safeFileName}" 
             placeholder="Search ${fileName}"
     >`;
  let tableStart =
    `<table class="striped">
        <thead>
          <th>
            Words
          </th>`;
  for (let i = 1; i <= activeFileLength; i++) {
    let currentTableHead = `<th> doc_${i} </th>`;
    tableStart += currentTableHead;
  }
  tableBody = `<tbody>`;
  tableFullHtml = tableStart + ' ' + tableBody;
  for (let word in fileIndexMap) {
    let thisResult = fileIndexMap[word];
    let tr = `<tr><td>${word}</td>`;
    let cells = ``;
    let currentCellId = 0;
    while (currentCellId < activeFileLength) {
      if (thisResult.indexOf(currentCellId) === -1) {
        thisCell =
          `<td class="red-text"><i class="material-icons">close</i></td>`;
      } else {
        thisCell =
          `<td class="teal-text"> 
              <i class="material-icons">check_circle</i>
            </td>`;
      }
      cells += thisCell;
      currentCellId++
    }
    let endtr = `</tr>`;
    let fullCell = `${tr}${cells}${endtr}`;
    tableFullHtml += fullCell;
  }

  $(`#${safeFileName}-display-panel`)
    .append(`${searchBarHTML} ${tableFullHtml}`);
     $(`#search-${safeFileName}`).on("keypress", event => {
      let pressedKeyCode = event.which;
      if( pressedKeyCode == 13){
        let searchInput = $(`#search-${safeFileName}`).val();
        let searchResult = myInvertedIndex.searchIndex(searchInput);
           //generateFileIndexTable(fileName, searchResult));
           console.log(searchResult);
      }
    })
}

function displayIndexTable(fileName, indexMap) {

}

function generateSearchIndexTable(searchTerm, resultIndexMap) {
  let indexTableHTML
}

$(document).ready(function () {
  $('.modal').modal();
  let activeFileName;
  let activeFileContent;
  let fileInputField = document.getElementById('fileInput');
  fileInputField.addEventListener('change', () => {
    $('#uploadModal').modal('close');
    let selectedFile = fileInputField.files[0];
    let acceptedFileType = "application/json";
    let selectedFileType = selectedFile.type;
    let selectedFileName = selectedFile.name;
    let isValidFileType = Object.is(selectedFileType, acceptedFileType);
    if (!isValidFileType) {
      showToastMessage(`${selectedFileName} is invalid`);
    } else {
      let readFile = new FileReader();
      readFile.onload = () => {
        let fileJSONContent = JSON.parse(readFile.result);
        let activeFileLength = fileJSONContent.length;
        showToastMessage(`${selectedFileName} uploaded :) `);
        activeFileName = selectedFileName;
        activeFileContent = fileJSONContent;
        useApp(activeFileName, activeFileContent, activeFileLength);
      };
      readFile.readAsText(selectedFile);
    }
  });
});
