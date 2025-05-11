let currentsong = new Audio();
let songs;

async function getSongs() {
    
    let a = await fetch("http://127.0.0.1:3000/songs/table.html")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("[iSongs.info]")[1])
            
        }
       
    }
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
      
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
      
        return `${formattedMinutes}:${formattedSeconds}`;
      }

    // console.log(songs)
    const playMusic = (track) => {
        let audio = new Audio("/songs/[iSongs.info]"+track);
        currentsong.src = "/songs/[iSongs.info]"+track;
        // audio = currentsong
        currentsong.play();
    };
    
    async function main() {
        songs = await getsongs();
        playMusic(songs);
    }
    
    // let currentsong = new Audio(songs);
    // currentsong.addEventListener("loadeddata", () => {
    //     let duration = currentsong.duration;
    //     console.log(duration);
    //     return duration
        
    // });
    let songUL = document.querySelector(".songs").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                
        <div class="info">${song.replaceAll("%20"," ")}</div>  
        <img src="music.svg" alt="" class="invert"> 
        <div>
            <img src="play.svg" alt="" class="invert playy">
        </div>
    </li>`;
}
document.querySelector(".time").innerHTML = "00:00/00:00"
    Array.from(document.querySelector(".songs").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click",element=>{
            playMusic((e).querySelector(".info").innerHTML)
        })
        //console.log((e).querySelector(".info").innerHTML)

        })
        // currentsong = new Audio();
        play.addEventListener("click",func=>{
            if (currentsong.paused){
                currentsong.play();
                play.src = "pause.svg"
            }
            else{
                currentsong.pause();
                play.src = "play.svg"
           
            }
        })
        
            
        
        next.addEventListener("click",func=>{
            playMusic()
        })
        //to know the current time of the song
        // let currentsong = new Audio();
        currentsong.addEventListener("timeupdate",()=>{
            // currentsong = new Audio();
            console.log(currentsong.duration,currentsong.currentTime);
            // console.log((currentsong.currentTime / currentsong.duration)*100)
            console.log((currentsong.currentTime / currentsong.duration) * 100)
            document.querySelector(".time").innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`
            document.querySelector(".circle").style.left = (((currentsong.currentTime / currentsong.duration) * 100+ "%").trim()) ;
            document.querySelector(".seekbar").addEventListener("click",e=>{
                let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100 ;
                document.querySelector(".circle").style.left = percent + "%";
                currentsong.currentTime = (currentsong.duration)*percent/100;
                currentsong.play();
            });
        
            //previous song
            back.addEventListener("click",func=>{
                console.log(songs)
                console.log(currentsong.src.split("[iSongs.info]")[1])
               
                
                let index = songs.indexOf(currentsong.src.split("[iSongs.info]")[1]);
                console.log(index)
                 if(index>0){
                     playMusic(songs[index-1]);
                    
                    
                 }
            })
                
            next.addEventListener("click",func=>{
                let index = songs.indexOf(currentsong.src.split("[iSongs.info]")[1]);
                if((index+1) >= length){
                    playMusic(songs[index+1]);
                }
                    
                
            })
                
                // console.log(songs)
                    
                // currentsong.src.split("[iSongs.info]")[1];
                // console.log(songs,index)
                // playMusic(songs[index-1])
                
                
            })

            
            }
        
        
            
                
            
        // document.querySelector(".circle").style.left = (((currentsong.currentTime / currentsong.duration) * 100+ "%").trim()) ;
        // const progress = (currentsong.currentTime / currentsong.duration) * 100;
        // circle.style.left = `${progress}%`;
        
    

    


getSongs();
