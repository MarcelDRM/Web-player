const menuBtn = document.querySelector(".menu-btn");
container = document.querySelector(".container");

const progressBar = document.querySelector(".bar"),
 progressDot = document.querySelector(".dot"),
 currentTimeEl = document.querySelector(".current-time"),
 DurationEl = document.querySelector(".duration");

menuBtn.addEventListener("click", () => {
    container.classList.toggle("active");
});


let playing = false,
currentSong = 0,
shuffle = false,
repeat = false,
favourits = [],
audio = new Audio();

const songs = [
    {
        title:"Pump The Jam",
        artist:"Tehnotronic",
        img_src: "1.jpg",
        src:"1.mp3",
    },
    {
      title:"Valahia",
      artist:"Banii si Fetele",
      img_src: "2.jpg",
      src:"2.mp3",
  },
];

const updatePlaylistContainer = document.querySelector("#playlist"),
   infoWrapper = document.querySelector(".info"),
   coverImage = document.querySelector(".cover-image"),
   currentSongTitle = document.querySelector(".current-song-title"),
   currentFavourite = document.querySelector("#current-favourite");



function init(){
    updatePlaylist(songs);
    loadSong(currentSong);
}
init();


function updatePlaylist(songs){
//remove any existing element
updatePlaylistContainer.innerHTML ="";

//use for each on songs array

songs.forEach((song , index) => {

    //get song data

    const{title, src} = song;

     const isFavourite = favourits.includes(index);

 const tr = document.createElement("tr");
tr.classList.add("songs");
tr.innerHTML = `
<td class="no">
        <h5>${index +1}</h5>
      </td>
      <td class="title">
        <h5>${title}</h5>
      </td>
      <td class="length">
        <h5>2:03</h5>
      </td>
      <td>
       <i class="fas fa-heart ${isFavourite ?"active" : ""}"></i>
      </td>
`;  

   updatePlaylistContainer.appendChild(tr);

   //play song when clicked onplaylist

   tr.addEventListener("click", (e) =>{

    //add to favourites when cicked on heart

    if(e.target.classList.contains("fa-heart")){
      addToFavourits(index);
      e.target.classList.toggle("active");
      //if heart clicked just add to favourite
      return;
    }

    currentSong = index;
    loadSong(currentSong);
    audio.play();
    container.classList.remove("active");
    playPauseBtn.classList.replace("fa-play" ,"fa-pause");
    playing = true;
   })


   const audioForDuration = new Audio(`data/${src}`);
   audioForDuration.addEventListener("loadedmetadata" ,() => {
    const duration = audioForDuration.duration;

    let songDuration = formatTime(duration);
    tr.querySelector(".length h5").innerText = songDuration;
   }) ;
});
}


function formatTime(time){
    //format time like 2:30
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    //add treailing zero if seconds less than 10
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;

}

function loadSong(num){
  infoWrapper.innerHTML = `
  <h2>${songs[num].title}</h2>
     <h3>${songs[num].artist}</h3> 
  `; 
  
  currentSongTitle.innerHTML = songs[num].title;
   
  coverImage.style.backgroundImage = `url(data/${songs[num].img_src})`;
//add src of cur song to audio vaer

audio.src = `data/${songs[num].src}`

 if (favourits.includes(num)){
current.Favourite.classList.add("active");
 }
 else {
    currentFavourite.classList.remove("active");
 }

}


// add play pause next prev functionality


const playPauseBtn = document.querySelector("#playpause"),
nextBtn = document.querySelector("#next"),
prevBtn = document.querySelector("#prev");




playPauseBtn.addEventListener("click" , () => {
  if (playing) {
    //pause if already playing
    playPauseBtn.classList.replace("fa-pause" , "fa-play");
    playing = false;
    audio.pause();
  } else{
   // if not playing play
   playPauseBtn.classList.replace("fa-play" , "fa-pause");
   playing = true;
   audio.play();
  }
});


function nextSong() {
  //shuffle when playing next song
 if(shuffle){
    shuffleFunc();
    loadSong(currentSong);

    //return because we don not want to play next song
  }
//if current song is not last in playlisty
  else if(currentSong < songs.length - 1){
    //load next song
    currentSong++;
    loadSong(currentSong);
    
  }else{
    //else if it's last song then play first
    currentSong = 0;
  }
  loadSong(currentSong);
  //after load of song was playing keep playing current too

  if(playing){
    audio.play();
  }
}

nextBtn.addEventListener("click" , nextSong);

function prevSong(){
  if(shuffle){
    shuffleFunc();
    loadSong(currentSong);
    
  }
// same for prev songs


  else if(currentSong >0){
    currentSong--;
  }else{
    currentSong = songs.length - 1;
  }
  loadSong(currentSong);
  if(playing){
    audio.play();
  }

}

prevBtn.addEventListener("click",prevSong);

function addToFavourits(index){
  //check if already in favourites the remove
  if(favourits.includes(index)){
    favourits = favourits.filter((item) => item !== index )
// if current playing song is removed so does curr fav
   
  currentFavourite.classList.remove("active");
  
  }else{
    //if not already in favourits add curent selection
    favourits.push(index);
    
    //if coming from current fav that is index and current are eqauls

    if(index === currentSong){
      currentFavourite.classList.add("active");
    } 
  }
  //after adding fav rerender playlist to show fav

  updatePlaylist(songs);
}

// add to favcurent playing song when heart clicked

currentFavourite.addEventListener("click" , () => {
 
   currentFavourite.classList.toggle("active");
   addToFavourits(currentSong);
});

//shuffle function

const shuffleBtn = document.querySelector("#shuffle");

function shuffleSongs(){
   //shuffle false make it true or switch
  shuffle = !shuffle;
  shuffleBtn.classList.toggle("active");
}

shuffleBtn.addEventListener("click" , shuffleSongs);

//if shuffle true song wneh playing nex/prev

function shuffleFunc(){
  if(shuffle){
    //select ramdon song
  currentSong = Math.floor(Math.random() * songs.length);
}
//if shufle false do nothing
}

//repeat functionality
const repeatBtn = document.querySelector("#repeat");

function repeatSong(){
       if(repeat === 0){
        //if repeat is off make it that means repeat currten song
        repeat = 1;

        repeatBtn.classList.add("active");

       }

       else if(repeat === 1){
        // if rep is 1 only rep curr song is rep is 2 rep playlist
        repeat = 2;
        repeatBtn.classList.add("active");
       }else{
        repeat = 0;
        repeatBtn.classList.remove("active");
       }
}

repeatBtn.addEventListener("click" , repeatSong);

//now if repat on audio end

audio.addEventListener("ended", () =>{
  if(repeat === 1){
    loadSong(currentSong);
    audio.play();
    
  }else if (repeat === 2){
    //if repeat playlist
    //play next song
    nextSong();
    audio.play();
  }else{
    //if rep off play all playlist
    if(currentSong === songs.length - 1){
// if it's last song in playlist = stop
    audio.pause();
    playPauseBtn.classList.replace("fa-pause" , "fa-play");
    playing = flase;

    }else{
      //if it's not last continue to next
      nextSong();
      audio.play();
    }
  }
});

//adding progress bar


//progress func
function progress(){
  //get duration and current time from audio
  let { duration, currentTime} = audio;

  //if anyone nAn make it 0
  isNaN(duration) ? (duration = 0) : duration;
  isNaN(currentTime) ? (currentTime = 0) : currentTime;

  //update time elements

  currentTimeEl.innerHTML = formatTime(currentTime);
  DurationEl.innerHTML = formatTime(duration);

// moveing the progress bar

let progressPercentage = (currentTime / duration) *100;
progressDot.style.left = `${progressPercentage}%`;
}


//update proggress on audio timeupdate event

audio.addEventListener("timeupdate" , progress);

//change progress in song

function setProgress(e){
  let width = this.clientWidth;
  let clickX = e.offsetX;
  let duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;

}
 progressBar.addEventListener("click" , setProgress);
 
 