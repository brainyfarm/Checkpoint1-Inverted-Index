'use strict'
/* Setups goes here */
const books = [
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
];


describe("Read Book Data", () => {
  beforeEach(function () {
    this.myInvertedIndex = new InvertedIndex();
  });

  describe("Json content should not be empty", () => {
    it("Check that uploaded JSON content is not empty", function () {
      expect(this.myInvertedIndex.isValidJson([])).toBeFalsy();
    });
  });

  describe("JSON should not be invalid", () => {
    it("Should check if content of JSON is valid", function () {
      expect(this.myInvertedIndex.isValidJson(books)).toBeTruthy();
    });
  });

});


describe("Populate data", () => {
  beforeEach(function () {
    this.myInvertedIndex = new InvertedIndex();
  });

  describe("Ensure that index is properly created", () => {
    it("Return an object file type when index is properly created", function () {
      expect(typeof this.myInvertedIndex.createIndex(books)).toBe("object");
    });
  });

  describe("Ensure string is mapped is mapped to the correct index", () => {
    it("Return an object file type when index is properly created", function () {
      let indexMap = this.myInvertedIndex.createIndex(books);
      let aliceStringMapArray = indexMap.alice
      expect(aliceStringMapArray).toEqual([0]);
    });
  });
});


describe("Search index", () => {
  beforeEach(function () {
    this.myInvertedIndex = new InvertedIndex();
  });

  describe("Ensure that searchIndex method returns the correct result", () => {
    it("Should return the correct array of document indices", function () {
      let indexMap = this.myInvertedIndex.createIndex(books);
      let aliceSearchResult = this.searchIndex("alice");
      expect(aliceSearchResult).toEqual([0]);
    });
  });
});