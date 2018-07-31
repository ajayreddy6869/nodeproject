// function menuClicks(){
//   $(".site-menu li").bind().on('click', function(event){
//     var a_obj = $(this).find('a');
//     if(!$(this).hasClass( 'active' )){
//       var route = $(a_obj).attr('href');
//       $.get(route,{}).done(function(out){
//         $('.page').find('#page-wrapper').html(out);
//       }).fail(function(){console.log('AJAX call failed for navigating the fireliner features');});
//     }
//     event.preventDefault();
//   });
// }
function menuClicks(){
  $(".sidebar-menu li").bind().on('click', function(event){
    var a_obj = $(this).find('a');
    if(!$(this).hasClass( 'active' )){
      var route = $(a_obj).attr('href');
      $.get(route,{ isAdmin: isAdmin }).done(function(out){
        $('#main-content').html(out);
        if(route=='/applications'){
          restoreALL();
        }        
      }).fail(function(){console.log('AJAX call failed for navigating the fireliner features');});
    }
    event.preventDefault();
  });
}
$(document).ready(function() {
  menuClicks();
  // ParticlesJS Config.
});
