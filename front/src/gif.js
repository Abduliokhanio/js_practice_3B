class Gif{
    constructor(id, title, gif_add){
        this.id = id;
        this.title = title;
        this.gif_add = gif_add;
    }

    renderGif(){
        let gifDiv = document.getElementById("gif-container")
        
        gifDiv.innerHTML += 
        `
        <div id = ${this.id} >
            <h3>${this.id}) ${this.title}</h3>
            <img src=${this.gif_add} alt=${this.title} class = "gif"><br>
            ${this.gif_add}
            <button class= "delete-button" id = ${this.id} onclick="deleteGif()">Delete User</button>
        </div>
        `
    }

}