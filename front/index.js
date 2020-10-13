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
    <form id='new-gif'>
        Title: <input type="text" id = "title"><br>
        Gif: <input type="text" id = "gif_add"><br>
        <input type = "submit" value = "Create Gif">
    </form>
    `
    eventFormListener('new-gif', gifFormSubmission);
}

//add an event listener
function eventFormListener(elementId = 'new-gif', formSubmission){
    let gifForm = document.getElementById(elementId)
    gifForm.addEventListener("submit", formSubmission)
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
        g.appendGif()
    })


}

//Read <1st Step>

function fetchGifs(){
    fetch(`${BASE_URL}/gifs`)
        .then(response => response.json())
        .then(gifs => {
            for (const gif of gifs){
                let g = new Gif(gif.id, gif.title, gif.gif_add)
                g.appendGif();
            }
        })

}

//Update 
function editGif(){
    event.preventDefault()
    const id = event.target.id
    fetch(BASE_URL + `/gifs/${id}`)
        .then(response => response.json())
        .then(gif => {
            let gifForm = document.getElementById("gif-form")
            gifForm.innerHTML += 
            `
            
                EDIT FORM
                <form id='edit-gif'>
                <div id= ${gif.id}>
                    Title: <input type="text" id = "edit_title" value="${gif.title}"><br>
                    Gif: <input type="text" id = "edit_gif_add" value="${gif.gif_add}"><br>
                    <input type='hidden' id = 'edit_gif_id' value="${gif.id}">
                    <input type = "submit" value = "Update Gif">
                </div>
                    </form>
            
            `

            eventFormListener('edit-gif', updateGif);
        })
}

function updateGif(event){
    event.preventDefault()
    let id = document.getElementById('edit_gif_id').value;
    let title = document.getElementById("edit_title").value;
    let gif_add = document.getElementById("edit_gif_add").value;

    let gif = {
        title: title,
        gif_add: gif_add
    }

    const configObj = {
        method: 'PATCH',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gif)
    }
    
    fetch(BASE_URL + `/gifs/${id}`, configObj).then(gif => {
        let g = new Gif(id,title, gif_add)
        g.replaceGif();
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
   event.target.parentElement.remove()
}