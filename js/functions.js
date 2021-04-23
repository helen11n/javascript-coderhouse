$(document).ready(function () {
let nombre
let email
let tipoCanchaIngresada 
let diaIngresado
let horarioIngresado
let precio 
let reserva 
let cantidadReservas = []


class Reserva{
  constructor (nombre, email, cancha, dia, hora, precio) {
  this.nombre = nombre
  this.email = email
  this.cancha = cancha
  this.dia = dia
  this.hora = hora
  this.precio = precio
   }
  }

  


function guardarStorage(){
  localStorage.setItem("cantidadReservas", JSON.stringify(cantidadReservas))
}


// EVENTO Y FUNCION QUE ESTABLECE EL PRECIO SEGUN HORA Y CANCHA ELEGIDA

$("#horarioIngresado, #tipoCancha").change(function(){
  let horarioElegido = parseInt($("#horarioIngresado").val())
  let canchaElegida = $('select[name="cancha"] option:selected').text()

  //EL PRECIO ES DETERMINADO SEGUN EL TIPO DE CANCHA Y EL HORARIO

  if(horarioElegido >= 19 && horarioElegido <= 22 && canchaElegida == "Futbol 5" ){
    precio = 2000
  }else if (horarioElegido <= 18 && canchaElegida == "Futbol 5" ) {
    precio = 1600
  }if(horarioElegido >= 19 && horarioElegido <= 22 && canchaElegida == "Futbol 8" ){
    precio = 2300
  }else if (horarioElegido <= 18 && canchaElegida == "Futbol 8" ) {
    precio = 1900
  }if(horarioElegido >= 19 && horarioElegido <= 22 && canchaElegida == "Tenis" ){
    precio = 1500
  }else if (horarioElegido <= 18 && canchaElegida == "Tenis" ) {
    precio = 1200
  }if(horarioElegido >= 19 && horarioElegido <= 22 && canchaElegida == "Padel" ){
    precio = 1300
  }else if (horarioElegido <= 18 && canchaElegida == "Padel" ) {
    precio = 1000
  } 
  
})

//EL PRECIO APARECE AL SELECCIONAR EL HORARIO 

$("#horarioIngresado").change(function(){
  let select = ('select[name="horarios"]:selected')
  if(select){
    $("#preciocancha").text("Valor: $" + precio)
    
  }

   
  })



// FUNCION PARA QUE VAYA GUARDANDO LAS RESERVAS HECHAS EN EL STORAGE. 

function reservasHechas(reserva) {
 
  let getStorage = localStorage.getItem("cantidadReservas")

  if(getStorage !== null){
    cantidadReservas = JSON.parse(localStorage.getItem("cantidadReservas"))
   
  }

  cantidadReservas.push(reserva) 
  localStorage.setItem("cantidadReservas", JSON.stringify(cantidadReservas))

}


let error_name = false
let error_email = false
let error_cancha = false
let error_dia = false
let error_horario = false

$("#nombre").focus(function(){
  $("#errorNombre").hide()
})
$("#email").focus(function() {
  $("#errorEmail").hide()
});
$("#tipoCancha").focus(function() {
  $("#errorCancha").hide()
})
$("#diaIngresado").focus(function() {
  $("#errorDia").hide()
});
$("#horarioIngresado").focus(function() {
  $("#errorHorario").hide();
})


function validarNombre(){
  let patternNombre = /^[a-zA-Z- ]*$/
  if ( nombre == "" ||  nombre.length <= 3 ){
   
    $("#errorNombre").text("Ingresa tu nombre").show()
    $("#errorNombre").css("color", "#ec4553" )
    error_name = true
  }
  else if(!patternNombre.test(nombre)){
     $("#errorNombre").text("Ingresa un nombre correcto").show()
     $("#errorNombre").css("color", "#ec4553" )
     error_name = true
   } 
   
   else {
    $("#errorNombre").hide()
   
  }

}


function validarEmail(){
  let patternEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  if (email == null || email == "" ){
   
    $("#errorEmail").text("Ingresa un correo electrónico").show()
    $("#errorEmail").css("color", "#ec4553" )
    error_email = true
  }
  else if(!patternEmail.test(email)){
    $("#errorEmail").text("Ingresa un correo electrónico válido").show()
    $("#errorEmail").hide()
    error_email = true
  }  
    else {
      $("#errorEmail").hide()
    }
  
}

function validarCancha(){
  
  let canchaElegida = $("#tipoCancha").val()
  if (canchaElegida == 0){
   
    $("#errorCancha").text("Debes seleccionar una cancha").show()
    $("#errorCancha").css("color", "#ec4553" )
    error_cancha = true
  } else {
    $("#errorCancha").hide()

    
  }
  
}


function validarDia(){
 
  let diaIngresado = $("#diaIngresado").val()
  if(diaIngresado == 0) {

   $("#errorDia").text("Debes seleccionar el día").show()
    $("#errorDia").css("color", "#ec4553" )
    error_dia = true
  } else {
    $("#errorDia").hide()
 
  }
 
}


function validarHorario(){
 
  let horarioElegido = $("#horarioIngresado").val()
  if (horarioElegido == ""){
    
    $("#errorHorario").text("Debes seleccionar un horario").show()
    $("#errorHorario").css("color", "#ec4553" )
    error_horario = true
  } else {
    $("#errorHorario").hide()

    
  }
 
}


//FUNCION PARA VALIDAR TODOS LOS CAMPOS DEL FORM

$("#verReserva").click(function(){
  
  nombre = $.trim($("#nombre").val())
  email = $.trim($("#email").val())
  tipoCanchaIngresada = $('select[name="cancha"] option:selected').text()
  diaIngresado = $("#diaIngresado").val()
  horarioIngresado = $("#horarioIngresado").val()
  precio

  error_name = false;
  error_email = false;
  error_cancha = false;
  error_dia = false;
  error_horario = false;
  
  validarNombre()
  validarEmail()
  validarCancha()
  validarDia()
  validarHorario()
  

  if (error_name === false && error_email === false && error_cancha === false && error_dia === false && error_horario === false) {
    $("#loading").css("display", "block")
   $("#first").hide()
   $("#verReserva").hide()
 $("#preciocancha").hide()
  setTimeout(mostrarReserva, 1000)
    
 } else {
    
    return false
 }

})



function mostrarReserva (){
  $("#loading").css("display", "none")
 
  // PASAR A JSON
  let reservaJson = {
    "nombre" : nombre,
    "email" : email,
    "tipoCanchaIngresada" : tipoCanchaIngresada,
    "diaIngresado" : diaIngresado,
    "horarioIngresado" : horarioIngresado,
    "precio" : precio
  }

  //GUARDAR EN LOCALSTORAGE
  let json = JSON.stringify(reservaJson)
  localStorage.setItem("reservaIngresada", json)
  localStorage.setItem("tipoCanchaIngresada", tipoCanchaIngresada)
  localStorage.setItem("diaIngresado", diaIngresado)
  localStorage.setItem("horarioIngresado", horarioIngresado)
  localStorage.setItem("precio", precio)
  
  
// ELEMENTOS QUE SE CREAN EN EL DOM

let tituloReserva = document.createElement("h3")
let textotituloReserva = document.createTextNode("Esta es tu reserva")
tituloReserva.appendChild(textotituloReserva)
let outputtext0 = document.getElementsByClassName ("titulo-reserva")[0]
outputtext0.appendChild(tituloReserva)

  let nodoCancha = document.createElement("h5")
  let textoCancha = document.createTextNode("Cancha elegida: " + tipoCanchaIngresada)
  nodoCancha.appendChild(textoCancha)
  let outputtext1 = document.getElementsByClassName ("datos-reserva")[0]
  outputtext1.appendChild(nodoCancha)

  let nodoDia = document.createElement("h5")
  let textoDia = document.createTextNode("Dí­a: " + diaIngresado)
  nodoDia.appendChild(textoDia)
  let outputtext4 = document.getElementsByClassName ("datos-reserva")[1]
  outputtext4.appendChild(nodoDia)

  let nodoHorario = document.createElement("h5")
  let textoHorario = document.createTextNode("Horario: " + diaIngresado)
  nodoHorario.appendChild(textoHorario)
  let outputtext5 = document.getElementsByClassName ("datos-reserva")[2]
  outputtext5.appendChild(nodoHorario)

  let nodoPrecio = document.createElement("h5")
  let textoPrecio = document.createTextNode("Total a pagar: " + precio)
  nodoPrecio.appendChild(textoPrecio)
  let outputtext6 = document.getElementsByClassName ("datos-reserva")[3]
  outputtext6.appendChild(nodoPrecio)
  

  let botonConfirmar = document.createElement("button")
  let textobotonConfirmar = document.createTextNode("Confirmar")
  botonConfirmar.appendChild(textobotonConfirmar)
  let outputtext2 = document.getElementsByClassName ("boton-reserva")[0]
  outputtext2.appendChild(botonConfirmar)
  botonConfirmar.classList.add("confirma")
  botonConfirmar.addEventListener ("click", function() {
    Swal.fire({
      title: '¡Gracias por jugar con nosotros, ' + nombre + '!',
      html: 
      'te enviamos un email a ' + email + 
      ' con tu reserva.',
      showCloseButton: true,
     
      confirmButtonText:
        'Ok!',
      
      
    })
    
  //Crea una nueva reserva realizada
  
  //agregarReserva(reserva)
    reservasHechas(reserva)
    document.querySelector("form").reset()
    guardarStorage()
    $("#preciocancha").empty()
    $(".content-reserva, .titulo-reserva, .datos-reserva, .boton-reserva" ).empty()
    $("#datosIngresados").hide()
    $("#verReserva, #preciocancha, #first").show()
   // listaReservasUsuario()
  })

  let botonCancelar = document.createElement("button")
  let textobotonCancelar = document.createTextNode("Modificar")
  botonCancelar.appendChild(textobotonCancelar)
  let outputtext3 = document.getElementsByClassName ("boton-reserva")[1]
  outputtext3.appendChild(botonCancelar)
  botonCancelar.classList.add("modifica")
  botonCancelar.addEventListener ("click", function() {
    $(".content-reserva, .titulo-reserva, .datos-reserva, .boton-reserva" ).empty()
    $("#datosIngresados").hide()
    $("#first, #verReserva, #preciocancha").show()
  })

  reserva = new Reserva (nombre, email, tipoCanchaIngresada, diaIngresado, horarioIngresado, precio) 

  console.log(reserva)
  
  reserva.nombre = nombre
  reserva.email = email
  reserva.cancha = tipoCanchaIngresada
  reserva.dia = diaIngresado
  reserva.hora = horarioIngresado
  reserva.precio = precio
  
  
 $("#datosIngresados").slideDown(500)

}

    function agregarReserva(){
    
        if( (localStorage.getItem("reservaIngresada")) !== null ){
          let reservasGuardadas = document.querySelector("#tableReservas")
        let reservaLista = document.createElement("tbody")
        let reservaOld = JSON.parse(localStorage.getItem("cantidadReservas"))

        for (let i=0; i<reservaOld.length; i++) {
          reservaLista.innerHTML += `
         <tr>
          <th scope="row">Reserva:</th>
          <td>${reservaOld[i].cancha} </td>
          <td>${reservaOld[i].dia}</td>
          <td>${reservaOld[i].hora}:00</td>
          <td>${reservaOld[i].precio}</td>
          <td> <a href="#" class="btn btn-danger btnEliminar" id="eliminar-reserva">Cancelar Reserva</a> </td>
           </tr>
          `
        }

        reservasGuardadas.appendChild(reservaLista)
        reservaLista.querySelector("#eliminar-reserva").addEventListener("click", function cancelarReserva() {
        localStorage.removeItem("reservaIngresada")
         reservaLista.remove()
       })
     }     
 }


 agregarReserva()

})