// Necessary Requirements
        require('dotenv').config();
        let [node , location , method, ...uQuery] = process.argv
        let fs = require('fs')
        let keys = require('./keys.js')
        let twitter = require('twitter')
        let spotify = require('node-spotify-api')
        let omdb = require('omdb')
        let request = require('request')
        let chalk = require('chalk')
        const log = console.log

// Bring in the keys!
        let tClient = new twitter(keys.twitter)
        let sClient = new spotify(keys.spotify)

// This function.. well.. it shows tweets.
        const showTweets = () => {
            tClient.get('statuses/user_timeline' , function(error, tweets, response){
                log(chalk.cyan("Here's some of your latest tweets!"))
                for (i in tweets) {
                    log(chalk.red(tweets[i].text))
                }
            })
        }

// This function - however - will show you song information thanks to Spotify!
        const spotifySong = (songName) => {
            sClient
                .search({type: 'track' , query : uQuery , limit: 1} , function(error, data) {
                    let songInfo = data.tracks.items
                    for ( i in songInfo) {
                        log(chalk.cyan("So you want some info on " + chalk.red(songInfo[i].name) + "?"))
                        log(chalk.cyan("That song by " + chalk.red(songInfo[i].artists[0].name) + "?"))
                        log(chalk.cyan("Well I know for a fact it came from the " + chalk.red(songInfo[i].album.name) + " album,"))
                        log(chalk.cyan("which was released on/in " + chalk.red(songInfo[i].album.release_date) + "."))
                        log(chalk.cyan("Outside of that, I think any more information you might need you'll just have to get from listening to it."))
                        log(chalk.cyan("So to make life easy for you, here's a link: " + chalk.red(songInfo[i].external_urls.spotify)))
                    }
                })
        }

// But boy am I glad to tell you about this function, which tells you everything your pretty little heart wants to know about any movie, all thanks to OMDb.
        const omdbLookUp = (movieName) => {
            request('http://www.omdbapi.com/?t=' + uQuery + '&y=&plot=&short&apikey=trilogy&r=json', function (error, response, body) {
                let movieInfo = JSON.parse(body)
                log(movieInfo)
                log(chalk.cyan("So you want some info about " + chalk.red(movieInfo.Title) + "?"))
                log(chalk.cyan("That movie came out in " + chalk.red(movieInfo.Year) + "."))
                log(chalk.cyan("IMDb gave it a solid " + chalk.red(movieInfo.Ratings[0].Value) + ","))
                log(chalk.cyan("while Rotten Tomatoes valued it at " + chalk.red(movieInfo.Ratings[1].Value) + "."))
                log(chalk.cyan(movieInfo.Title + " is available in " + chalk.red(movieInfo.Language) + "."))
                log(chalk.cyan("Not hooked yet? Check out the plot: " + chalk.red(movieInfo.Plot)))
                log(chalk.cyan("Who starred in " + chalk.red(movieInfo.Title) +"?" + " That would be: " + chalk.red(movieInfo.Actors) + "."))
                log(chalk.cyan("Who directed " + chalk.red(movieInfo.Title) + "?" + " None other than the prestigious " + chalk.red(movieInfo.Director) + "."))
            })
        }

//BUT DON'T TOUCH THIS FUNCTION. NO ONE KNOWS WHAT IT DOES. IM SERIOUS!
        const random = () => {
            
        }

// and this is some super boring code that lets you make decisions or whatever
        switch (method) {
            case 'tweets' :
                showTweets()
                break
            case 'spotifyIt' :
                spotifySong()
                break
            case 'omdbIt' :
                omdbLookUp()
                break
            case 'random' :
                random()
                break
        }