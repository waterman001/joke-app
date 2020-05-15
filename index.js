const request = require('request');
const fs = require('fs');

const theSearchWord = process.argv[2];

const options = {
   url:`https://icanhazdadjoke.com/search?terms${theSearchWord}`,
   headers: {
       'User-Agent': 'request',
       'Accept': "application/json"
   }
};

request(options, function(error, response, body){
    if (!error && response.statusCode == 200){
        let jokes = JSON.parse(body).results
        ParseJoke(jokes)
    }
    else{
        console.log("Error >>>", error)
    }
})

function ParseJoke(jokes){
    if(jokes.length !== 0){
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        const joke = randomJoke.joke
        fs.appendFile('data.txt', joke + "\n", function(err){
            if(err) throw err;
            console.log('File has been updated with random joke');
        })
    }
    else{
        console.log('No joke matches the search word')
    }
}