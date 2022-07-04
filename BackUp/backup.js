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

    // else if (result.isDenied) {
    //     Swal.fire('Changes are not saved', '', 'info')
    //   }
    
// Swal.fire({
//     title: 'Entre Tiempo',

// })
function final() {
    Swal.fire({
        title: "Final del partido",
        html:`<b>${nombre.innerText} </b> VS <b>${nombre2.innerText}</b> <br>
              ${eq1.innerText + " - " + eq2.innerText}`,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
    localStorage.setItem("Historial",nombre.innerText + " " + eq1.innerText + " - " + eq2.innerText + " " + nombre2.innerText)
}

// Partido

function partido() {
    inicio.setAttribute("disabled", "")
    let posicion = 50;
    range.value = 50;

    let tiempo = setInterval(() => {
        timer.innerHTML = parseInt(timer.innerText) + 1 + "'";
        if (timer.innerText == "45'" || timer.innerText == "90'") {
            clearInterval(tiempo)
        }
    }, 600)

    let juego = setInterval(() => {
        let eq1M = Math.round(Math.random() * 6)
        let eq2M = Math.round(Math.random() * 6)
        console.log(eq1M)
        console.log(eq2M)

        if (eq1M < eq2M) {
            posicion -= 24.5
        } else if (eq1M > eq2M) {
            posicion += 24.5
        }

        switch (posicion) {
            case 1:
                golEnContra()
                eq2.innerHTML = parseInt(eq2.innerText) + 1
                posicion = 50
                break;

                case 99:
                    gol()
                    eq1.innerHTML = parseInt(eq1.innerText) + 1
                    posicion = 50
                }

        range.value = posicion
        console.log(posicion)

        if (timer.innerText == "45'") {
            clearInterval(juego)
            entreTiempo()
        } else if (timer.innerText == "90'") {
            clearInterval(juego)
            final()

        }

    }, 2300);
}  