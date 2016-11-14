
/* Inverted index class */
class InvertedIndex {

    /* @constructor */
    constructor() {
        /* Save stuff here */
        this.indexMap = {};
    }

	/**
	 * This method creates the index table
	 * Displays the words and indices on the html
	 */
    createIndex(fileName, jsonContent) {
        /* Return clean tokens of a text as an array */
        let getCleanTokens = (string) => {
            let invalidCharacters = /[^a-z0-9 ]/gi;
            return string.replace(invalidCharacters, " ")
                                    .toLowerCase()
                                    .split(" ");
        };

        if (jsonContent) {
            jQuery('#file-collection').append(`<li class='collection-item teal'><h4 class='title'>${fileName}</h4></li>`);
            try {
                for (let index in jsonContent) {
                    let thisDocument = jsonContent[index];

                    let titleTokens = getCleanTokens(thisDocument.title);
                    let textTokens = getCleanTokens(thisDocument.text);

                    //$('#file-collection').append(`title: ${titleTokens} \n content: ${textTokens}`);
                }

            }
            catch (err) {
                //alert(err.message);
                let userMessage = `${fileName} is not properly formatted`;
                Materialize.toast(userMessage, 4000);
            }
        }
    }

    getIndex() {

    }


	/**
     * 
     */
        readFileContent(selectedFile) {
        let acceptedFileType = "application/json";
        let selectedFileType = selectedFile.type;
        let selectedFileName = selectedFile.name;
        let isValidFileType = Object.is(selectedFileType, acceptedFileType);
        if (isValidFileType) {
            let reader = new FileReader();
            reader.readAsText(selectedFile);

            let createIndex = this.createIndex;

            reader.onload = () => {
                var fileJSONContent = JSON.parse(reader.result);
                // Try to create index 
                createIndex(selectedFileName, fileJSONContent);

            };

        } else {
            // Invalid file
            let userMessage =`${selectedFileName} is not a JSON file`;
            Materialize.toast(userMessage, 5000);
        }
    }

}
