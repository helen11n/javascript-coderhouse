$(document).ready(function () {

  let heroimgs = [
    "./images/hero-1.png",
    "./images/hero-2.png",
    "./images/hero-3.png"
  ]
  
  
  let imagen = $(".gallery-hero")
  
  let i = 0
  setInterval(function(){
    
      i = (i + 1) % heroimgs.length
      imagen.fadeOut(1000, () => {
        imagen.attr("src", heroimgs[i])
        imagen.fadeIn(1000)
      })
    
  }, 5000)
  


  $("#ir-reservas-online").click(function () {
    $("html, body").animate({
      scrollTop: $("#reservas").offset().top
    }, 1000)
  })
  
  $("#ir-servicios").click(function () {
    $("html, body").animate({
      scrollTop: $("#servicios").offset().top
    }, 1000)
  })
  
  
  //EVENTOS PARA EL SLIDE BAR DONDE SE GUARDAN LAS RESERVAS DEL USUARIO 
  
  
  $(".reservasMenu").click(function(){
   $("#sidebar").addClass("active")
   
  })
  
  $(".close-menu").click(function(){
    $("#sidebar").removeClass("active")
    
  })
  
})