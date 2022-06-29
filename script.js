let song = [
    {songName:"Agar Tum Saath Ho", filePath:"music/1.mp3", time:"05:41", gif:"gif/1.gif"},
    {songName:"Khairiyat", filePath:"music/2.mp3", time:"04:40", gif:"gif/2.gif"},
    {songName:"Gerua", filePath:"music/3.mp3", time:"05:46", gif:"gif/3.gif"},
    {songName:"Channa Mereya", filePath:"music/4.mp3", time:"04:49", gif:"gif/4.gif"},
    {songName:"Bekhayali", filePath:"music/5.mp3", time:"06:10", gif:"gif/5.gif"},
]
let musicIndex = 1;
let AudioElement = new Audio('music/1.mp3');
let masterplay = document.getElementById("masterplay");
let gif = document.getElementById("gif");
let myProgressbar = document.getElementById("myProgressbar"); 
let text = document.getElementById("text"); 
let nextSongtext = document.getElementById("nextSongtext");
let end = document.getElementById("end");
let sound = document.getElementById("sound");


masterplay.addEventListener("click",()=>{
    if(AudioElement.paused || AudioElement.currentTime<=0){
        AudioElement.play();
        masterplay.classList.remove("fa-play-circle");
        masterplay.classList.add("fa-pause-circle");
        text.innerText = "Now Playing -" + " " + song[musicIndex-1].songName;
        if(musicIndex<5){
            nextSongText.innerText = "Next Song -" + " " + song[musicIndex].songName;
        }
        else{
            nextSongText.innerText = "Next Song -" + " " + song[0].songName;
        }
        gif.style.opacity = 1;
        
    }
    else{
        AudioElement.pause();
        masterplay.classList.add("fa-play-circle");
        masterplay.classList.remove("fa-pause-circle");
        makeAllPlays();
        gif.style.opacity = 0;
        text.innerText = "Music Paused";
    }
})

AudioElement.addEventListener('timeupdate', ()=>{
    
    progress = parseInt((AudioElement.currentTime / AudioElement.duration)*100);
    myProgressbar.value = progress;
    if(myProgressbar.value > 99){
        musicIndex++;
        AudioElement.src = `music/${musicIndex}.mp3`;
        AudioElement.play();
        text.innerText = "Now Playing -" + " " + song[musicIndex-1].songName;
        if(musicIndex<5){
            nextSongText.innerText = "Next Song -" + " " + song[musicIndex].songName;
        }
        else{
            nextSongText.innerText = "Next Song -" + " " + song[0].songName;
        }
    }
})

myProgressbar.addEventListener('change',()=>{
    AudioElement.currentTime = myProgressbar.value * AudioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        if(AudioElement.paused){
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        musicIndex = parseInt(e.target.id);
        AudioElement.src = `music/${musicIndex}.mp3`;
        AudioElement.play();
        text.innerText = "Now Playing -" + " " + song[musicIndex-1].songName;
        end.innerText = song[musicIndex-1].time;
        if(musicIndex<5){
            nextSongText.innerText = "Next Song -" + " " + song[musicIndex].songName;
        }
        else{
            nextSongText.innerText = "Next Song -" + " " + song[0].songName;
        }
        AudioElement.currentTime=0;
        masterplay.classList.remove("fa-play-circle");
        masterplay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
        }
        else if(AudioElement.played){
            makeAllPlays();
            e.target.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
            musicIndex = parseInt(e.target.id);
            AudioElement.src = `music/${musicIndex}.mp3`;
            AudioElement.pause();
            text.innerText = "Music Paused";
            end.innerText = song[musicIndex-1].time;
            AudioElement.currentTime=0;
            masterplay.classList.add("fa-play-circle");
            masterplay.classList.remove("fa-pause-circle");
            gif.style.opacity = 0; 
        }
    })
})

document.getElementById("next").addEventListener("click",()=>{
    if(musicIndex>=5){
        musicIndex = 0;
    }
    else{
        musicIndex += 1;
    }
    text.innerText = "Now Playing -" + " " + song[musicIndex-1].songName;
    if(musicIndex<5){
        nextSongText.innerText = "Next Song -" + " " + song[musicIndex].songName;
    }
    else{
        nextSongText.innerText = "Next Song -" + " " + song[0].songName;
    }
    AudioElement.src = `music/${musicIndex}.mp3`;
    AudioElement.play();
    AudioElement.currentTime=0;
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause-circle");
    end.innerText = song[musicIndex-1].time;

})

document.getElementById("previous").addEventListener("click",()=>{
    if(musicIndex<=1){
        musicIndex = 1;
    }
    else{
        musicIndex -= 1;
    }
    text.innerText = "Now Playing -" + " " + song[musicIndex-1].songName;
    if(musicIndex<5){
        nextSongText.innerText = "Next Song -" + " " + song[musicIndex].songName;
    }
    else{
        nextSongText.innerText = "Next Song -" + " " + song[0].songName;
    }
    AudioElement.src = `music/${musicIndex}.mp3`;
    AudioElement.play();
    AudioElement.currentTime=0;
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause-circle");
    end.innerText = song[musicIndex-1].time;
})

document.getElementById("restart").addEventListener("click",()=>{
    AudioElement.currentTime=0;
    end.innerText = song[musicIndex-1].time;

})

sound.addEventListener("click",()=>{
    if(AudioElement.muted){
        AudioElement.muted = false;
        sound.classList.add("fa-volume-down");
        sound.classList.remove("fa-volume-mute");
    } 
    else {
        AudioElement.muted = true;
        sound.classList.remove("fa-volume-down");
        sound.classList.add("fa-volume-mute");
    }
})


