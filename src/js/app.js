const indexApp = angular.module('indexApp', []);
indexApp.controller('indexCtrl', ($scope) => {
  $scope.appName = 'Inverted Index';
  $scope.myInvertedIndex = new InvertedIndex();
  $scope.indexTable = '';
  $scope.indexTableFiles = [];
  $scope.currentFileName = null;
  $scope.liveSearchResult = false;
  $scope.liveSearchKeys = false;
  $scope.indexedFiles = [];

  $scope.getBookDocs = (fileName) => {
    const fileLength = $scope.myInvertedIndex.files[fileName].length;
    return Array.from({ length: fileLength }, (value, key) => key);
  };

  $scope.indexFile = () => {
    $scope.myInvertedIndex.createIndex($scope.currentFileName);
    $scope.indexTable = $scope.myInvertedIndex.indexMap;
    $scope.indexTableFiles.push($scope.currentFileName);
    $scope.indexedFiles.push($scope.currentFileName);
    $scope.currentFileName = '';
  };

  /* Validate JSON, read and store file  */
  $scope.readAndCheckFile = (selectedFile) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileJSONContent = JSON.parse(fileReader.result);
      if (!$scope.myInvertedIndex.isValidJSON(fileJSONContent)) {
        Materialize.toast('Invalid JSON file', 2000, 'red');
      } else {
        $scope.myInvertedIndex.storeFile(selectedFile.name, fileJSONContent);
        $scope.$apply(() => {
          $scope.currentFileName = selectedFile.name;
          $scope.indexTableFiles.push($scope.currentFileName);
        });
      }
    };

    fileReader.readAsText(selectedFile);
  };


  /* Handling file upload and extension checking */
  const fileInputField = document.getElementById('fileInput');
  fileInputField.addEventListener('change', (e) => {
    const selectedFile = e.target.files[0];
    const acceptedFileType = 'application/json';
    const selectedFileType = selectedFile.type;
    const isValidFileType = Object.is(selectedFileType, acceptedFileType);
    if (!isValidFileType) {
      Materialize.toast('Invalid File Type', 2000, 'cyan');
      $('#fileInput').val('');
    } else {
      $scope.readAndCheckFile(selectedFile);
    }
  });

  $('#search').on('keyup', () => {
    if (Object.keys($scope.myInvertedIndex.indexMap).length === 0) {
      Materialize.toast('Index a file first', 500, 'orange');
    }
    const searchTerm = $('#search').val();
    //const searchResult =
      $scope.myInvertedIndex.searchIndex(searchTerm);
    $scope.$apply(() => {
      $scope.liveSearchResult =
        $scope.myInvertedIndex.searchIndex(searchTerm);
      $scope.liveSearchKeys = Object.keys($scope.liveSearchResult);
    });
  });
});

$(document).ready(() => {
  $('.modal').modal();
});
