
/**
 * @class InvertedIndex
 */
class InvertedIndex {
  /**
   * @constructor
   */
  constructor() {
    this.files = {};
    this.indexTable = {};
  }

  /**
   * createIndex
   * @param {Object} fileName name of file to map index for
   * @return {Boolean} false if index is not created
   */
  createIndex(fileName) {
    if (Object.hasOwnProperty.call(this.files, fileName)) {
      const currentFileContent = this.files[fileName];
      this.indexTable[fileName] = this.indexTable[fileName] || {};
      const fileLength = this.files[fileName].length;
      for (let docIndex = 0; docIndex < fileLength; docIndex += 1) {
        const currentFileDoc = currentFileContent[docIndex];
        const docTitle = currentFileDoc.title;
        const docText = currentFileDoc.text;
        const docToken = Utils.getCleanTokens(`${docText} ${docTitle}`);
        docToken.forEach((word) => {
          if (word in this.indexTable[fileName]) {
            if (this.indexTable[fileName][word].indexOf(docIndex) === -1) {
              this.indexTable[fileName][word].push(docIndex);
            }
          } else {
            this.indexTable[fileName][word] = [docIndex];
          }
        });
        return true;
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
    return this.indexTable[fileName];
  }

  /**
   * searchIndex
   * Search for the occurrence of words in the indexTable
   * @param {String} searchTerms The search term(s)
   * @param {Object} fileNames An array of filenames to search
   * @returns {Object} A map of the search result
   */
  searchIndex(searchTerms, fileNames) {
    // debugger;
    fileNames = fileNames || Object.keys(this.files);
    this.result = {};
    const allSearchTerms = Utils.getCleanTokens(searchTerms);
    fileNames.forEach((currentFile) => {
      allSearchTerms.forEach((term) => {
        if (Object.hasOwnProperty.call(this.indexTable[currentFile], term)) {
          if (currentFile in this.result) {
            this.result[currentFile][term] = this.indexTable[currentFile][term];
          } else {
            this.result[currentFile] = {};
            this.result[currentFile][term] = this.indexTable[currentFile][term];
          }
        }
      });
    });
    return Object.keys(this.result).length > 0 ? this.result : false;
  }
}
