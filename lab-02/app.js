const fs = require('fs').promises

const songLyrics =  async () => {
try {
    let files = await fs.readdir("song_lyrics"); //read directory
    console.log(files);

    let fileData = await fs.readFile("song_lyrics/" + files[4]); // read a file
    console.log(fileData);

    let fileString = fileData.toString(); // turn fileData into a readable version
    console.log(fileString);
} catch(e) {
    console.log(e);
}
};

songLyrics();
