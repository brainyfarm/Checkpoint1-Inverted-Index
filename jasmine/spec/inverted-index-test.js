/* Sample Test Data */

const book = [
  {
    title: 'Alice in Wonderland',
    text: 'Alice falls into a rabbit hole and enters a world full of ...'
  },

  {
    title: 'The Lord of the Rings: The Fellowship of the Ring.',
    text: 'An unusual alliance of man, elf, dwarf, wizard and hobbit ...'
  }
];

/* Test Setup */
const myInvertedIndex = new InvertedIndex();
myInvertedIndex.storeFile('book.json', book);
myInvertedIndex.createIndex('book.json');
const indexMap = myInvertedIndex.indexMap;
const aliceSearchResult = { alice: { 'book.json': [0] } };

/* Test Suites */
describe('Inverted Index Test Suites', () => {
  describe('Read Book Data', () => {
    it('should return false when checking a bad JSON array', () => {
      expect(myInvertedIndex.isValidJSON(''))
        .toBeFalsy();
    });

    it('should return true when validating a good JSON array', () => {
      expect(myInvertedIndex.isValidJSON(book))
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
      expect(Object.hasOwnProperty.call(indexMap, 'book.json'))
        .toBeTruthy();
    });
    it('should ensure that index created is accurate', () => {
      expect(indexMap['book.json'].alice)
      .toEqual([0]);
    });
  });

  describe('Search Index', () => {
    it('should return correct index of the search term', () => {
      expect(myInvertedIndex.searchIndex('alice', ['book.json']))
        .toEqual(aliceSearchResult);
    });
    it('should return false when no result is found', () => {
      expect(myInvertedIndex.searchIndex('impossibility'))
        .toBeFalsy();
    });
  });
});
