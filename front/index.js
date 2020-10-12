document.addEventListener('DOMContentLoaded', () => {
    createForm()
    fetchGifs()
});

//Globals 
const BASE_URL = "http://127.0.0.1:3000"


//Create <2nd Step>
    //1) create a form
    //2) add an event listener
    //3) once from is submitted submit a POST request to back end
    //4) do something with the returned object
    
//create a form
function createForm(){
    let gifForm = document.getElementById("gif-form")
    gifForm.innerHTML += 
    `
    <form>
        Title: <input type="text" id = "title"><br>
        Gif: <input type="text" id = "gif_add"><br>
        <input type = "submit" value = "Create Gif">
    </form>
    `
    eventFormListener()
}

//add an event listener
function eventFormListener(){
    let gifForm = document.getElementById("gif-form")
    gifForm.addEventListener("submit", gifFormSubmission)
}

function gifFormSubmission(){
    event.preventDefault();
    let title = document.getElementById("title").value;
    let gif_add = document.getElementById("gif_add").value;

    let gif = {
        title: title,
        gif_add: gif_add
    }

    const configObj = {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gif)
    }

    fetch(`${BASE_URL}/gifs`,configObj)
    .then(resp => resp.json())
    .then(gif => {
        let g = new Gif(gif.id, gif.title, gif.gif_add)
        g.renderGif()
    })


}

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
function deleteGif(){
    event.preventDefault()
    let targeted_button = event.target
    let id_of_targeted_button = parseInt(targeted_button.id)
    
    const configObj = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        } 
    }

   fetch(`${BASE_URL}/gifs/${id_of_targeted_button}`,configObj )
   debugger
   event.target.parentElement.remove()
}