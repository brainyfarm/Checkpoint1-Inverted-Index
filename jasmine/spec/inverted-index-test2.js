/* Setups goes here */
const sampleBookData = [
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
];

describe("Inverted Index Tests", () => {

  describe("Read Book Data", () => {
    myInvertedIndex = new InvertedIndex();
    myInvertedIndex.createIndex(sampleBookData);

    it("should check that JSON is not empty", () => {
      expect(myInvertedIndex.isValidJson([]))
        .toBeFalsy();
    });

    it("should check that content of JSON is valid", () => {
      expect(myInvertedIndex.isValidJson(sampleBookData))
        .toBeTruthy();
    });

  });


  describe("Populate Index", () => {
    it("should return type object when index is properly created", () => {
      expect(Object.keys(myInvertedIndex.getIndex()).length)
        .toBeGreaterThan(0);
    });

    it("should return correct index if mapping is properly done", () => {
      expect(myInvertedIndex.getIndex().alice)
        .toEqual([0]);
    });
  });


  describe("Search Index", () => {
    it("should return an array of the correct document indices", () => {
      expect(myInvertedIndex.searchIndex("alice"))
        .toEqual({"alice":[0]});
    });

    it("should return correct result for multiple search term", () => {
      expect(myInvertedIndex.searchIndex("alice powerful"))
        .toEqual({"alice":[0], "powerful":[1]});
    });

  });

})