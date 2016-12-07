/**
 * @class InvertedIndexHelper
 */
class InvertedIndexHelper {

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

  /**
   * isValidJSON
   * verifies if a JSON file is properly formatted
   * @param {Object} jsonContent content of JSON to check for validity
   * @return {Boolean} validity status of the JSON content.
   */
  static isValidJson(jsonContent) {
    this.jsonContent = jsonContent;
    if (typeof jsonContent !== 'object' || jsonContent.length === 0) {
      return false;
    }

    try {
      jsonContent.forEach((thisBook) => {
        const hasTitle = Object.hasOwnProperty.call(thisBook, 'title');
        const hasText = Object.hasOwnProperty.call(thisBook, 'text');
        if (!(hasTitle && hasText)) {
          return false;
        }
      });
      return true;
    } catch (err) {
      return false;
    }
  }

}
