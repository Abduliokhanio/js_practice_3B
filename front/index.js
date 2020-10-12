document.addEventListener('DOMContentLoaded', () => {
    fetchGifs()
});

//Globals 
const BASE_URL = "http://127.0.0.1:3000"


//Create <2nd Step>

//Read <1st Step>

function fetchGifs(){
    fetch(`${BASE_URL}/gifs`)
        .then(response => response.json())
        .then(gifs => {
            for (const gif of gifs){
                let g = new Gif(gif.id, gif.title, gif.gif_add)
                g.renderGif();
            }
        })

}

//Delete <3rd Step>
