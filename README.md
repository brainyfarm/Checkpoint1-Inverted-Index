[![Build Status](https://travis-ci.org/andela-oakinseye/checkpoint1-inverted-index.svg?branch=dev-2)](https://travis-ci.org/andela-oakinseye/checkpoint1-inverted-index) [![Coverage Status Badge](https://coveralls.io/repos/github/andela-oakinseye/checkpoint1-inverted-index/badge.png?branch=dev-2)][![Coverage Status](https://coveralls.io/repos/github/andela-oakinseye/checkpoint1-inverted-index/badge.svg?branch=develop)](https://coveralls.io/github/andela-oakinseye/checkpoint1-inverted-index?branch=develop)
# Inverted Index - [https://search-index.herokuapp.com](https://search-index.herokuapp.com/) 


# Checkpoint1-Inverted-Index
## Overview
### Concept
Once upon a time in the realm of computer science, computers became good enough to support storage of very large files and documents and then came the problem of searching for a little parts in large files.
The traditional approach was to loop through the whole file to find the little block of text which was not very efficient. The saviour came and a concept in CS known as `elastic search` (say: Inverted Index) 

The purpose of an inverted index is to allow fast full text searches, at a cost of increased processing when a document is added to the database.

### References
* [Inverted index - wikipedia.com](https://en.wikipedia.org/wiki/Inverted_index) 

* [Inverted index - elastic search](https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html) 

## Use Cases
- You have large number of documents you need to perform search operations on.

## Limitations
- This app can only work for JSON files with members having `title` and `text` properties.


## Running Locally
Follow the steps below to run the application locally on your machine.
 1. Clone the repository: `git clone <THIS_REPOSITORY_URL>`
 2. Enter into the apps directory by running `cd Checkpoint1-Inverted-Index`
 3. Install npm packages `npm install`
 4. Run the app by typing `gulp`
 
## How to Use 
Using this app is very simple and intuitive,
  1. Start the deployed or local version of the application `npm start` as outlined above
  2. Upload JSON files containing an array of object literals like the example below:
  ```

  [{
    "title": "The Sugar Girl",
    "text": "Ralia is lost in the forest and the whole village is in search for her, an innocent witch also accused"
  }]
  ```
  3. Click on `Create Index` button after uploading and you will see a table containing mapped words and their document location
  4. Use the search bar on the right side of the app display layout to perform search operations. 


## Technology 
  1. HTML5
  2. Javascript (NODEJS Environment)
  3. Jasmine for Testing


## Testing 
- After setting up the local version of the application, run `gulp test` to run test

## Preview
![project screenshot](https://4.bp.blogspot.com/-zz3Tl33-D9o/WEL2I6qsUCI/AAAAAAAAAb0/NHqtRoin7ZYm4W5HLw6QBtz7tIZyZbNbgCLcB/s1600/Screen%2BShot%2B2016-12-03%2Bat%2B5.41.40%2BPM.png "Inverted Index Preview")
