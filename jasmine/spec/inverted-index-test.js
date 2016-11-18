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
      expect(myInvertedIndex.isValidJson([])).toBeFalsy();
    });

    it("should check that content of JSON is valid", () => {
      expect(myInvertedIndex.isValidJson(sampleBookData)).toBeTruthy();
    });

  });


  describe("Populate Index", () => {
    it("should return type of an object when index is properly created", () => {
      expect(typeof myInvertedIndex.getIndex()).toBe("object");
    });

    it("should return the correct of a word if mapping is properly done", () => {
      expect(myInvertedIndex.getIndex().alice).toEqual([0]);
    });
  });


  describe("Search Index", () => {
    it("should return an array of the correct document indices", () => {

      expect(myInvertedIndex.search("alice")).toEqual([0]);
      expect(myInvertedIndex.search("of")).toEqual([0, 1])
    });
  });

})