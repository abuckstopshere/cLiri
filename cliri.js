// Necessary Requirements
        require('dotenv').config();
        let [node , liri , method, ...uQuery] = process.argv
        let fs = require('fs')
        // let cLiri = module.exports()
        let keys = require('./keys.js')
        let twitter = require('twitter')
        let spotify = require('node-spotify-api')
        let omdb = require('omdb')
        let request = require('request')
        let chalk = require('chalk')
        let chalkAnimate = require('chalk-animation')
        let randText = ('./random.txt')
        let utf = ('utf-8')
        const log = console.log
        // let dataArray
        const rainbow = chalkAnimate.rainbow
        const cyan = chalk.cyan
        const red = chalk.red

// Bring in the keys!
        let tClient = new twitter(keys.twitter)
        let sClient = new spotify(keys.spotify)

// This function.. well.. it shows tweets.
        const showTweets = () => {
            tClient.get('statuses/user_timeline' , function(error, tweets, response){
                log(cyan("Here's some of your latest tweets!"))
                for (i in tweets) {
                    log(red(tweets[i].text))
                }
            })
        }

// This function - however - will show you song information thanks to Spotify!
        const spotifySong = (songName) => {
            sClient
                .search({type: 'track' , query : uQuery , limit: 1} , function(error, data) {
                    if (error) throw error
                    let songInfo = data.tracks.items
                    for ( i in songInfo) {
                        log(cyan("So you want some info on " + red(songInfo[i].name) + "? \n" +
                                        "That song by " + red(songInfo[i].artists[0].name) + "? \n" +
                                        "Well I know for a fact it came from the " + red(songInfo[i].album.name) + " album, \n" +
                                        "which was released on/in " + red(songInfo[i].album.release_date) + ". \n" +
                                        "Outside of that, I think any more information you might need you'll just have to get from listening to it. \n" +
                                        "So to make life easy for you, here's a link: " + red(songInfo[i].external_urls.spotify)))
                    }
                })
        }

// But boy am I glad to tell you about this function, which tells you everything your pretty little heart wants to know about any movie, all thanks to OMDb.
        const omdbLookUp = (movieName) => {
            request('http://www.omdbapi.com/?t=' + uQuery + '&y=&plot=&short&apikey=trilogy&r=json', function (error, response, body) {
                if (error) throw error
                let movieInfo = JSON.parse(body)
                log(cyan("So you want some info about " + red(movieInfo.Title) + "? \n"
                            + red(movieInfo.Title) + " came out in " + red(movieInfo.Year) + ". \n"
                            + "IMDb gave it a solid " + red(movieInfo.Ratings[0].Value) + ", \n"
                            + "while Rotten Tomatoes valued it at " + red(movieInfo.Ratings[1].Value) + ". \n"
                            + red(movieInfo.Title) + " is available in " + red(movieInfo.Language) + ", \n"
                            +  red(movieInfo.Title) + " went to DVD format on " + red(movieInfo.DVD) + ". \n"
                            +  "Not hooked yet? Check out the plot: " + red(movieInfo.Plot) + " \n"
                            + "Who starred in " + red(movieInfo.Title) +"?" + " That would be: " + red(movieInfo.Actors) + ". \n"
                            + "Who directed " + red(movieInfo.Title) + "?" + " None other than the prestigious " + red(movieInfo.Director) + "."))
            })
        }

//BUT DON'T TOUCH THIS FUNCTION. NO ONE KNOWS WHAT IT DOES. IM SERIOUS!
        const random = () => fs.readFileSync( randText , utf).split(',')

// and this is some super boring code that lets you make decisions or whatever
        const switchy = ( method , uQuery ) => {
            switch (method) {
                case 'tweets' :
                    showTweets()
                    break
                case 'spotify' :
                    spotifySong()
                    break
                case 'omdb' :
                    omdbLookUp()
                    break
                case 'random' :
                    let newMethod = random()[0]
                    let uQuery = random()[1]
                    log(newMethod , uQuery)
                    // log(newCom)
                    switchy(newMethod , uQuery)
                    break
                default :
                    log(cyan("That, unfortunately, is not something you can do."))
                    log(cyan("What is it you would like to do?"))
                    log(cyan("Try this: node cLiri spotify dna"))
            }
        }

switchy( method , uQuery )