$(document).ready(function () {

  cargarJson("tipoCancha") 
 
function cargarJson(id, parent_id){

  let html_option 
  $.getJSON("js/horarios.json", function(data){
    html_option += "<option value=''>Seleccioná</option>"
    $.each(data, function(i, value){
      
        if(id == "tipoCancha") {
          if(value.parent_id == "0"){
            html_option += "<option value='"+value.id+"'>"+value.cancha+"</option>"
          }
        }
        else{
          if(value.parent_id == parent_id){
            html_option += "<option value='"+value.horario+"'>"+value.horario+":00"+"</option>"
          }
        }
        
    })
    $("#"+id).html(html_option)
  })
}

$(document).on("change", "#tipoCancha", function(){

  let tipoCancha_id = $(this).val()
  
    if(tipoCancha_id != ""){
      cargarJson("horarioIngresado", tipoCancha_id)
    }
   

})


  
})