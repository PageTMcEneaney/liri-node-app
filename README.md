# liri-node-app
--------------------------------
##Overview
--------------------------------
This Command Line Interface app will search Spotify for songs, Bands in Town for concerts, and OMDB for movies. LIRI (Language Interpretation and Recognition Interface) takes user commands and search terms to retrieve information from various APIs using node.js and node package manager.


--------------------------------
##Command Line Instructions
--------------------------------
Example: node liri.js concert-this "Kurt Vile"

concert-this "artist/band" | spotify-this-song "artist/band" | movie-this "movie title" | do-what-it-says

    concert-this: seaches the Bands In Town API via the Axios package
    spotify-this-song: searches the Spotify API
    movie-this: searches the OMDB API via the Axios package
    "search": (optional) user-input for what to seach. If nothing is typed, each command has a default vaue to return
    do-what-it-says: reads the random.txt file for instructions

--------------------------------
##Required to run
--------------------------------
-node.js
-bash / terminal
-.gitnore / .env with secret spotify API keys
-all files in folder


--------------------------------
##Gif examples of function
--------------------------------
concert-this
![concert-this gif](/gifs/concert-this_gif.gif)
concert-this "kurt vile"
![concert-this-unique gif](/gifs/concert-this-unique_gif.gif)

spotify-this-song
![spotify-this-song gif](/gifs/spotify-this-song_gif.gif)
spotify-this-song "down the line"
![spotify-this-song-unique gif](/gifs/spotify-this-song-unique_gif.gif)

movie-this
![movie-this gif](/gifs/movie-this_gif.gif)
movie-this "princess-bride"
![movie-this-unique gif](/gifs/movie-this-unique_gif.gif)

do-what-it-says
    concert-this,"migos"
    spotify-this-song,"down the line"
    movie-this,"princess bride"
![do-what-it-says gif](/gifs/do-what-it-says_gif.gif)
