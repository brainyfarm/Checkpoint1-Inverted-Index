/**
 * @class InvertedIndexUtilities
 */
class InvertedIndexUtilities {

  /**
   * getCleanTokens
   * get an array of tokens from a string
   * @param {String} string string to be generate token from
   * @return {Object} An array of the generated token
   */
  static getCleanTokens(string) {
    this.invalidCharaters = /[^a-z0-9\s]/gi;
    return string.replace(this.invalidCharaters, ' ')
      .toLowerCase()
      .split(' ')
      .filter(word => (
        word
      ));
  }
}
