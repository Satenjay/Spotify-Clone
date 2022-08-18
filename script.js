console.log("Welcome to Spotify");

// Initializing the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'));




let songs = [
    {songName:"295", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName:"Believer", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName:"Hai junoon", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName:"Get ready to fight", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName:"Mic drop", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName:"Dil diya hai (Karma)", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName:"GOW-Warrior's Truth", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    
]

// songItems.forEach((element, i)=>{
//     console.log(element, i);
//     element.getElementsByTagName("img")[0].src = songs[i].coverPath;
//     element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

// })


// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        // It should change play icon to pause on playing
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        // gif must come in picture when song play
        gif.style.opacity=1;

    }
    else{
        audioElement.pause();
        // It should change pause icon to play when music playing stop
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate');
    // update Seekbar (in %)
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value=progress;
    //Now on clicking progress bar song must be ajusted according to porgress bar value
})

//Adjusting song according to progress bar value
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach( (element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    } )
}
//Handling click of play list play button (near the duration of song)
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        makeAllPlays(); //To pause other song first
        songIndex = parseInt(e.target.id);
        // console.log(songIndex); Use it incase songe order mismatch
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        //How to know which is clicked
        audioElement.src ="songs/"+(songIndex)+".mp3";
        masterSongName.innerText = songs[songIndex].songName; //Song name update
        //Since audio changed to current time need to start from zero
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1; // Gif transtion on song play
        

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 0;
    }
    else {
        songIndex +=1;
    }
    // SongIndex has been changed now play it!
    audioElement.src ="songs/"+(songIndex)+".mp3";
    masterSongName.innerText = songs[songIndex].songName; //Song name update in bottom
    //Since audio changed to current time need to start from zero
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1; // Gif transtion on song play
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

} )

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 6;
    }
    else {
        songIndex -=1;
    }
    // SongIndex has been changed now play it!
    audioElement.src ="songs/"+(songIndex)+".mp3";
    masterSongName.innerText = songs[songIndex].songName;
    //Since audio changed to current time need to start from zero
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1; // Gif transtion on song play
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    

} )