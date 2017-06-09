function gotourl() {
    window.open(document.getElementById('text').value,"_self");
}
function createnewroom() {
  $.ajax({
    type: 'POST',
    url: '/',
    data: 1,
    success: function(response){
		window.open(response,"_self");
    }
  });
}
