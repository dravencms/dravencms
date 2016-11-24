$(document).ready(function(){
/*Email protector*/
    $('.mailtoprotected').click(function(e){
      e.preventDefault();
      var crypted = $(this).attr('href').replace('#','');
      $.get( "decrypt.json?encrypted=" + crypted, function( data ) {
        location.href = 'mailto:' + data.decrypted;
      });
    });
});
