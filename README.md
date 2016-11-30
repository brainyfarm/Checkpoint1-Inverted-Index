[![Build Status](https://travis-ci.org/andela-oakinseye/checkpoint1-inverted-index.svg?branch=dev-2)](https://travis-ci.org/andela-oakinseye/checkpoint1-inverted-index)
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


## Running Locally
Follow the steps below to run the application locally on your machine.

 1. Clone the repository: `git clone <THIS_REPOSITORY_URL>`
 2. Enter into the apps directory by running `cd Checkpoint1-Inverted-Index`
 3. Install npm packages `npm install`
 4. Run the app by typing `gulp`


## Preview
![project screenshot](https://3.bp.blogspot.com/-bLKZAS35aC4/WD5kYYx2A2I/AAAAAAAAAbg/-1h5ZLTAVfQVex3y9Md-EU6BZhwgaOaJQCLcB/s1600/Screen%2BShot%2B2016-11-30%2Bat%2B6.30.11%2BAM.png "Inverted Index Preview")




## Testing

The tests are done using jasmine test runner that reports in the browser
