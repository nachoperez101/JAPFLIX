document.addEventListener("DOMContentLoaded", async function(){
    pelis = await fetch('https://japceibal.github.io/japflix_api/movies-data.json').then(response => response.json())
})