const btnBuscar = document.getElementById("btnBuscar");
const inputBuscar = document.getElementById("inputBuscar");
const lista = document.getElementById("lista");
let filtro = [];


function Buscar() {
    let contentToAppend = '';
    if (inputBuscar != '') {
        filtro = pelis.filter((element) => {
            let generoContains = false;
            element.genres.forEach(genero => {
                if (genero.name.toLowerCase().includes(inputBuscar.value.toLowerCase())) {
                    generoContains = true;
                }
            });

            return (element.title.toLowerCase().includes(inputBuscar.value.toLowerCase()) ||
                    element.overview.toLowerCase().includes(inputBuscar.value.toLowerCase()) ||
                    element.tagline.toLowerCase().includes(inputBuscar.value.toLowerCase()) ||
                    generoContains);
        })

        for (let i = 0; i < filtro.length; i++) {

            let num = Math.round(filtro[i].vote_average/2)
            let stars = '';
            for (let k = 0; k < num; k++) {
                stars += `<span class="fa fa-star checked"></span>
                `
            }
            for (let k = num; k < 5; k++) {
                stars += `<span class="fa fa-star"></span>
                `
            }

            contentToAppend += `
            <li class="list-group-item bg-dark btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" onclick="offcanvasInfo(${i})" style="margin-bottom: 1px;">
                <p style="margin: -1px; color: white; text-align: left;">
                    <span class="fw-bold">${filtro[i].title}</span> <span style="float: right">${stars}</span>
                </p>
                <p style="margin: -1px; color: DimGrey; font-style: italic; text-align: left;">
                    ${filtro[i].tagline}
                </p>
            </li>`
            
        }
    }

    lista.innerHTML = contentToAppend
    
}


function offcanvasInfo(index) {
    document.getElementById("offcanvasLabel").innerHTML = filtro[index].title;
    document.getElementById("offcanvasText").innerHTML = filtro[index].overview;
    document.getElementById("offcanvasGeneros").innerHTML = filtro[index].genres[0].name;
    document.getElementById("year").innerHTML = filtro[index].release_date.slice(0,4);
    document.getElementById("runtime").innerHTML = filtro[index].runtime.toString() + ' mins';
    document.getElementById("budget").innerHTML = '$' + filtro[index].budget.toString();
    document.getElementById("revenue").innerHTML = '$' + filtro[index].revenue.toString();
    for (let j = 1; j < filtro[index].genres.length; j++) {
        document.getElementById("offcanvasGeneros").innerHTML += ' - ' + filtro[index].genres[j].name;
        
    }
}


document.addEventListener("DOMContentLoaded", async function(){
    pelis = await fetch('https://japceibal.github.io/japflix_api/movies-data.json').then(response => response.json())
})