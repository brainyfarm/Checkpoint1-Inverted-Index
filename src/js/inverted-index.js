/**
 * @class InvertedIndex
 */
class InvertedIndex {
  /**
   * @constructor
   */
  constructor() {
    // Contains filenames as keys and content as value
    this.files = {};
    // Contains fileName as keys and contents as value
    this.indexMap = {};
  }

  /**
   * createIndex
   * @param {Object} jsonContent an array of objects
   * @return {Object} undefined
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
   * @return {Object} indexMap
   */
  getIndex(fileName) {
    return this.indexMap[fileName];
  }


searchIndex(fileNames, searchTerms) {
  this.result = {};
  const allSearchTerms = this.getCleanTokens(searchTerms);

  allSearchTerms.forEach((term) => {
    const allFiles = Object.keys(this.indexMap);
    fileNames.forEach((currentFile) => {
      if (Object.hasOwnProperty.call(this.indexMap[currentFile], term)) {
        if (term in this.result) {
          this.result[term][currentFile] = this.indexMap[currentFile][term];
        } else {
          this.result[term] = { };
          this.result[term][currentFile] = this.indexMap[currentFile][term];
        }
      }
    });
  });
  return this.result;
}

  /**
   * getCleanTokens
   * get an array of tokens from a string
   * @param {String} string string to be generate token from
   * @memberOf InvertedIndex
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

  storeFile(fileName, fileContent) {
    this.alreadyInStore = Object.hasOwnProperty.call(this.files, fileName);
    if (!this.fileAlreadyInStore) {
      this.files[fileName] = fileContent;
    } else {
      return false;
    }
  }

  isValidJSON(JSONContent) {
    const JSONLength = JSONContent.length;
    for (let fileIndex = 0; fileIndex < JSONLength; fileIndex += 1) {
      const document = JSONContent[fileIndex];
      const docHasTitle = Object.hasOwnProperty.call(document, 'title');
      const docHasText = Object.hasOwnProperty.call(document, 'text');
      if (!docHasTitle || !docHasText) {
        return false;
      }
    }
    return true;
  }

}
const sampleBook = [
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

const sampleBook2 = [
  {
    "title": "Animal Farm of",
    "text": "All animals are equal but some animals are equal than others - George Orwell"
  }
];


const myInvertedIndex = new InvertedIndex();
myInvertedIndex.storeFile('book.json', sampleBook);
myInvertedIndex.createIndex("book.json");
myInvertedIndex.storeFile('book2.json', sampleBook2);
myInvertedIndex.createIndex("book2.json");
//console.log(myInvertedIndex.isValidJSON(sampleBook));
// console.log(myInvertedIndex.indexMap);

console.log(myInvertedIndex.searchIndex(["book.json",  "book2.json"],"of alice lord animals full of wonderland imagination"));
