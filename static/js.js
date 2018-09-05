// submit button

document.querySelector('#addscore a').addEventListener('click', function() {
  name = document.getElementById('name').value;
  date =  document.getElementById('date').value;
  score = document.getElementById('score').value;

  var entry = document.querySelector('#highscores tr:last-child');
  var clone = entry.cloneNode(true);
  clone.querySelector('td:nth-child(1)').textContent = name;
  clone.querySelector('td:nth-child(2)').textContent = date;
  clone.querySelector('td:nth-child(3)').textContent = score;
  document.getElementById('highscores').appendChild(clone);
})

// 

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
