// variables

var colors = [
  '#D00',
  '#DD0',
  '#0DD',
  '#22D',
  '#D0D'
];

var scores = [
 /* ['TAB','1991-03-03','12345'] */
];

var topscore = 15000;

// insert entry

function insertEntry(entry) {
  scores.push(entry);

  document.getElementById('highscores').innerHTML = '<tr><th>[NAME]</th><th>[DATE]</th><th>[SCORE]</th></tr>';
  document.getElementById('chart').innerHTML = '';

  for (var i=0; i < scores.length; i++) {
    color = colors[i%colors.length];

    var bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.width = scores[i][2] / topscore * 100 + '%';
    bar.style.backgroundColor = color;
    document.getElementById('chart').appendChild(bar);

    var row = document.createElement('tr');
    row.style.color = color;
    row.innerHTML += '<td>' + scores[i][0] + '</td>';
    row.innerHTML += '<td>' + scores[i][1] + '</td>';
    row.innerHTML += '<td>' + scores[i][2] + '</td>';
    document.getElementById('highscores').appendChild(row);
  }
}

// submit button

document.querySelector('#addscore a').addEventListener('click', function() {
  var entry = [
   document.getElementById('name').value,
   document.getElementById('date').value,
   document.getElementById('score').value
  ];

  document.querySelector('#addscore .alert').innerHTML = '';

  if (entry[0] == '') {
    document.querySelector('#addscore .alert').innerHTML = 'RE-ENTER NAME!';
  }
  else if (entry[1].search(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) == -1) {
    document.querySelector('#addscore .alert').innerHTML = 'RE-ENTER DATE!';
  }
  else if (entry[2].search(/^[0-9]*$/) < 0 || entry[2] == '') {
    document.querySelector('#addscore .alert').innerHTML = 'RE-ENTER SCORE!';
  }
  else {
    insertEntry(entry);
    scoresList();
  }

});

/*
// api test

document.querySelector('#addscore a').addEventListener('click', function() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log(this.responseText);
  };
  xhttp.open('GET', 'https://love-calculator.p.mashape.com/getPercentage?fname=John&sname=Alice');
  xhttp.setRequestHeader('X-Mashape-Key','2xW4DcY7V3mshYasWjBGt81Fj0dJp13AK2Ljsnu9H4pjpVFM8J');
  xhttp.send();
});
*/

function scoresList() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
    else {
      console.log(this.readyState, this.status);
    }
  };
  xhttp.open('GET', '/scores', true);
  xhttp.send();
}
