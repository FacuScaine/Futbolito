let resultado = localStorage.getItem("Historial")

function historial (){
  Swal.fire(
    'Historial',
    `${resultado}`
    )
}
 function info(){
  Swal.fire(
    'Este juego consta en jugar al piedra papel o tijera contra la maquina! Si ganas avanzas en el campo hasta llegar a anotar,Pero si pierdes... retrocederas hasta que marquen en tu porteria!'
    )

 }