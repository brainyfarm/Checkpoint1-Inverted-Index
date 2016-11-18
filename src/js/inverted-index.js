
/* Inverted index class */
class InvertedIndex {
  /**
   * @constructor
   */
  constructor() {
    this.indexMap = {};
  }

  /**
   * createIndex
   * create an index map of an array of object
   * @param {Object} jsonContent an array of objects 
   * @return {Object} 
   */
  createIndex(jsonContent) {
    if (!(this.isValidJson(jsonContent))) {
      return "invaid json";
    }
    jsonContent.forEach((currentDocument, docId) => {
      let wordsInDocument = `${currentDocument.title} ${currentDocument.text}`;
      let currentDocumentTokens = this.getCleanTokens(wordsInDocument);
      this.indexBot(currentDocumentTokens, docId)

    });
  }

  /**
   * getIndex
   * @return {Object} indexMap
   */
  getIndex() {
    return this.indexMap;
  }

  /**
   * searchIndex
   * @param {String} terms string of terms to search for 
   * @return {Object} An array of the search terms index
   */
  searchIndex(terms) {
    let searchTermTokens = this.getCleanTokens(terms);
    let foundInDocuments = [];

    searchTermTokens.forEach((word) => {
      if (this.search(word)) {
        foundInDocuments.push(this.search(word));
      }
    })
    return foundInDocuments;
  }

  /* Helper methods */

  /**
   * isValidJson
   * Check if all items in an array is a JSON valid.
   * @param {Object} jsonArray Array of JSON objects
   * @return {Boolean}
   */
  isValidJson(jsonArray) {
    if (typeof jsonArray !== "object" || jsonArray.length === 0) {
      return false
    }

    jsonArray.forEach((currentBook) => {
      if (!(currentBook.hasOwnProperty("title") && currentBook.hasOwnProperty("text"))) {
        return false;
      }
    });
    return true;
  }

  /**
   * getCleanTokens
   * sanitizes and splits a string
   * @param {String} string string to sanitize and tokenize
   * @return {Object} An array of clean splitted string
   */
  getCleanTokens(string) {
    let invalidCharaters = /[^a-z0-9\s]/gi;
    return string.replace(invalidCharaters, " ")
      .toLowerCase()
      .split(" ")
      .filter((word) => {
        return Boolean(word);
      });
  }

  /**
   * indexBot 
   * maps an arrays their it docs index
   * @param {Object}  tokens An array of words
   */
  indexBot(tokens, docId) {
    tokens.forEach((token) => {
      if (token in this.indexMap) {
        if (this.indexMap[token].indexOf(docId) === -1) {
          this.indexMap[token].push(docId);
        }
      } else {
        this.indexMap[token] = [docId];
      }
    });
  }

  /**
   * search
   * returns an array containing document id in which a search term exist
   * @param {String} searchTerm A single search term string
   * @return {Object} An array containing index of a search term
   */
  search(searchTerm) {
    let indexDatabase = this.indexMap;

    if (indexDatabase.hasOwnProperty(searchTerm)) {
      return indexDatabase[searchTerm];
    } else {
      return false;
    }
  }
}
