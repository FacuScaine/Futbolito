// Llamadas
let eq1 = document.getElementById("eq1");
let eq2 = document.getElementById("eq2");
let range = document.getElementById("range");
let inicio = document.getElementById("inicio");
let timer = document.getElementById("timer");

let image = document.querySelector("#img1");
let nombre = document.querySelector("#nombre");
let image2 = document.querySelector("#img2");
let nombre2 = document.querySelector("#nombre2");

const choicesDisplay = document.querySelector('#choices');

var indice = 0


//Api Equipos
function equipo1(logo, nombreEquipo) {
    image.setAttribute("src", logo);
    nombre.innerHTML = nombreEquipo;
}
function equipo2(logo, nombreEquipo) {
    image2.setAttribute("src", logo);
    nombre2.innerHTML = nombreEquipo;
}

let key = "2c6e53892b4fd81a84173e6497aecc629135c4a2003d6dd8ba8edf90a02f0d3a";
function mostrarEquipos(idEquipo, fucionEquipo) {

    fetch(`https://allsportsapi.com/api/football/?&met=Teams&teamId=${idEquipo}&APIkey=${key}`)
        .then(response => response.json())
        .then((equipos) => {
            fucionEquipo(
                equipos.result[0].team_logo,
                equipos.result[0].team_name)
        });
}

// Funciones
function selectEq1() {
    let randomN = Math.round(Math.random() * 100)
    mostrarEquipos(randomN, equipo1)
}
function selectEq2() {
    let randomN2 = Math.round(Math.random() * 100)
    mostrarEquipos(randomN2, equipo2)
}

function gol() {
    Toastify({
        text: "Gol!!!",
        duration: 1000,
        position: "right",
        offset: {
            x: 10,
            y: 540
        },
    }).showToast();
}

function golEnContra() {
    Toastify({
        text: "Gol en contra",
        duration: 1000,
        position: "left",
        offset: {
            x: 10,
            y: 540
        },
    }).showToast();
}

function selectMachine(choose) {
    Toastify({
        text: choose,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        offset: {
            x: 400,
            y: 250
        },
    }).showToast();
}
function selectUser(choose) {
    Toastify({
        text: choose,
        duration: 2000,
        gravity: "bottom",
        position: "left",
        offset: {
            x: 400,
            y: 250
        },
    }).showToast();
}
function avanzas() {
    Toastify({
        text: 'Avanzas!',
        duration: 2000,
        gravity: "bottom",
        position: "center",
        offset: {
            y: 250
        },
    }).showToast();
}
function retrocedes() {
    Toastify({
        text: 'Retrocedes!',
        duration: 2000,
        gravity: "bottom",
        position: "center",
        offset: {
            y: 250
        },
    }).showToast();
}
function empate() {
    Toastify({
        text: 'Empate!',
        duration: 2000,
        gravity: "bottom",
        position: "center",
        offset: {
            y: 250
        },
    }).showToast();
}

function entreTiempo() {
    Swal.fire({
        title: 'Entre Tiempo',
        confirmButtonText: 'Ir al Segundo Tiempo',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            partido()
        }
    })
}

function final() {
    Swal.fire({
        title: 'Final Del Partido',
        html: `<b>${nombre.innerText} </b> VS <b>${nombre2.innerText}</b> <br>
              ${eq1.innerText + " - " + eq2.innerText}`,
        confirmButtonText: 'Ir al Inicio',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            location.href = "../index.html";
        }
    })
    localStorage.setItem("Historial", nombre.innerText + " " + eq1.innerText + " - " + eq2.innerText + " " + nombre2.innerText)
}

// Partido

function partido() {
    inicio.setAttribute("disabled", "")
    let posicion = 50;
    range.value = 50;

    if (indice == 0) {
        choicesDisplay.addEventListener('click', click)
        indice ++
    }

    let tiempo = setInterval(() => {
        timer.innerHTML = parseInt(timer.innerText) + 1 + "'";
        if (timer.innerText == "45'") {
            inicio.removeAttribute("disabled")
            clearInterval(tiempo)
            entreTiempo()
        } else if (timer.innerText == "90'") {
            clearInterval(tiempo)
            final()
        }
    }, 600)

    const choices = ['piedra', 'papel', 'tijera']

    function click(e) {
        var compuSelect = choices[Math.floor(Math.random() * choices.length)]
        resultados(e.target.value, compuSelect)
        range.value = posicion
        selectMachine(compuSelect)
        selectUser(e.target.value)
        switch (posicion) {
            case 1:
                golEnContra()
                eq2.innerHTML = parseInt(eq2.innerText) + 1
                posicion = 50
                range.value = 50
                break;

            case 99:
                gol()
                eq1.innerHTML = parseInt(eq1.innerText) + 1
                posicion = 50
                range.value = 50
        }
        console.log(posicion)
    }

    const resultados = (userChoice, computerChoice) => {
        switch (userChoice + computerChoice) {
            case 'tijerapapel':
            case 'piedratijera':
            case 'papelpiedra':
                avanzas()
                posicion += 24.5
                break
            case 'papeltijera':
            case 'tijerapiedra':
            case 'piedrapapel':
                retrocedes()
                posicion -= 24.5
                break
            case 'tijeratijera':
            case 'piedrapiedra':
            case 'papelpapel':
                empate()
                break
        }
    }
}
