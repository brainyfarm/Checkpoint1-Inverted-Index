/**
 * @class InvertedIndex
 */
class InvertedIndex {
  /**
   * @constructor
   */
  constructor() {
    this.files = {};
    this.indexMap = {};
  }

  /**
   * createIndex
   * @param {Object} fileName name of file to map index for
   * @return {Boolean} false if index is not created
   */
  createIndex(fileName) {
    if (Object.hasOwnProperty.call(this.files, fileName)) {
      const currentFileContent = this.files[fileName];
      this.indexMap[fileName] = this.indexMap[fileName] || {};
      const fileLength = this.files[fileName].length;
      for (let docIndex = 0; docIndex < fileLength; docIndex += 1) {
        const currentFileDoc = currentFileContent[docIndex];
        const docTitle = currentFileDoc.title;
        const docText = currentFileDoc.text;
        const docToken = this.getCleanTokens(`${docText} ${docTitle}`);
        docToken.forEach((word) => {
          if (word in this.indexMap[fileName]) {
            if (this.indexMap[fileName][word].indexOf(docIndex) === -1) {
              this.indexMap[fileName][word].push(docIndex);
            }
          } else {
            this.indexMap[fileName][word] = [docIndex];
          }
        });
      }
    } else {
      return false;
    }
  }

  /**
   * getIndex
   * Returns index map of a file
   * @param {String} fileName name of file to return index map
   * @return {Object} a key pair value of file index map
   */
  getIndex(fileName) {
    return this.indexMap[fileName];
  }

  /**
   * searchIndex
   * Search for the occurrence of words in the indexMap
   * @param {String} searchTerms The search term(s)
   * @param {Object} fileNames An array of filenames to search
   * @returns {Object} A map of the search result
   */
  searchIndex(searchTerms, fileNames) {
    fileNames = fileNames || Object.keys(this.files);
    this.result = {};
    const allSearchTerms = this.getCleanTokens(searchTerms);
    allSearchTerms.forEach((term) => {
      fileNames.forEach((currentFile) => {
        if (Object.hasOwnProperty.call(this.indexMap[currentFile], term)) {
          if (term in this.result) {
            this.result[term][currentFile] = this.indexMap[currentFile][term];
          } else {
            this.result[term] = {};
            this.result[term][currentFile] = this.indexMap[currentFile][term];
          }
        }
      });
    });
    return Object.keys(this.result).length > 0 ? this.result : false;
  }

  /**
   * getCleanTokens
   * get an array of tokens from a string
   * @param {String} string string to be generate token from
   * @return {Object} An array of the generated token
   */
  getCleanTokens(string) {
    this.invalidCharaters = /[^a-z0-9\s]/gi;
    return string.replace(this.invalidCharaters, ' ')
      .toLowerCase()
      .split(' ')
      .filter(word => (
        word
      ));
  }

  /**
   * storeFile
   * stores file name and content
   * @param {String} fileName name of file
   * @param {Object} fileContent An array of file content
   * @return {Boolean} status of file storing operation
   */
  storeFile(fileName, fileContent) {
    this.alreadyInStore = Object.hasOwnProperty.call(this.files, fileName);
    if (!this.fileAlreadyInStore) {
      this.files[fileName] = fileContent;
      return true;
    }
  }

  /**
   * isValidJSON
   * verifies if a JSON file is properly formatted
   * @param {Object} JSONContent content of JSON to check for validity
   * @return {Boolean} validity status of the JSON content.
   */
  isValidJSON(JSONContent) {
    this.JSONContent = JSONContent;
    if (typeof JSONContent !== 'object' || JSONContent.length === 0) {
      return false;
    }

    try {
      JSONContent.forEach((thisBook) => {
        const HasTitle = Object.hasOwnProperty.call(thisBook, 'title');
        const HasText = Object.hasOwnProperty.call(thisBook, 'text');
        if (!(HasTitle && HasText)) {
          return false;
        }
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
