/* eslint-disable */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  },
  {
    "title": "Animal Farm",
    "text": "All animals are equal but some animals are equal than others - George Orwell"
  }
]

},{}],2:[function(require,module,exports){
module.exports=""
},{}],3:[function(require,module,exports){
/* Test Setup */
const myInvertedIndex = new InvertedIndex();
const book = require('./../books.json');
const emptyBook = require('./../empty-book.json');

myInvertedIndex.files['book.json'] = book;


/* Test Suites */
describe('Inverted Index Test', () => {
  describe('Read Book Data', () => {
    it('should return false when checking a bad JSON array', () => {
      expect(myInvertedIndex.readBookData(emptyBook))
        .toBeFalsy();
    });

    it('should return true when validating a good JSON array', () => {
      expect(myInvertedIndex.readBookData(book))
        .toBeTruthy();
    });

    it('should return correct keys for files when file is saved', () => {
      expect(Object.keys(myInvertedIndex.files))
        .toEqual(['book.json']);
    });

    it('should ensure the file content is saved accurrately', () => {
      expect(myInvertedIndex.files['book.json'])
        .toEqual(book);
    });
  });

  describe('Populate Data', () => {
    it('should ensure that index is created', () => {
      expect(myInvertedIndex.createIndex('book.json'))
        .toBeTruthy();
    });

    it('should ensure that index of a file is returned accurrately', () => {
      expect(myInvertedIndex.getIndex('book.json').alice)
      .toEqual([0]);
    });
  });

  describe('Search Index', () => {
    it('should return correct index of the search term', () => {
      expect(myInvertedIndex.searchIndex('alice'))
        .toEqual({ 'book.json': { alice: [0] } });
    });
    it('should return false when no result is found', () => {
      expect(myInvertedIndex.searchIndex('impossibility'))
        .toBeFalsy();
    });
  });
});

},{"./../books.json":1,"./../empty-book.json":2}]},{},[3])