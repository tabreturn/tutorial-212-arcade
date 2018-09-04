document.getElementById('submit').addEventListener('click', function(){
  console.log ( document.getElementById('name').value )
  console.log ( document.getElementById('date').value )
  console.log ( document.getElementById('score').value )
})

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    //alert(this.responseText);
    console.log('T');
  }
};
xhttp.open('POST', 'http://localhost:5000/user', true);
xhttp.setRequestHeader('Content-type', 'application/json');
xhttp.send('Your JSON Data Here');
