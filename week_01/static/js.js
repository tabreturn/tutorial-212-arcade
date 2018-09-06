// variables

colors = [
  '#D00',
  '#DD0',
  '#0DD',
  '#22D',
  '#D0D'
]

scores = [
 /* ['TAB','1991-03-03','12345'] */
]

topscore = 15000;

// insert entry

function insertEntry() {
  scores.push(entry);

  document.getElementById('highscores').innerHTML = '<tr><th>[NAME]</th><th>[DATE]</th><th>[SCORE]</th></tr>';
  document.getElementById('chart').innerHTML = '';

  for (i in scores) {
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
  entry = [
   document.getElementById('name').value,
   document.getElementById('date').value,
   document.getElementById('score').value
  ]

  document.querySelector('#addscore .alert').innerHTML = '';

  if (entry[0] == '') {
    document.querySelector('#addscore .alert').innerHTML = 'RE-ENTER NAME!';
  }
  else if (entry[1].search(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) == -1) {
    document.querySelector('#addscore .alert').innerHTML = 'MISSING DATE!';
  }
  else if (entry[2].search(/^[0-9]*$/) < 0) {
    document.querySelector('#addscore .alert').innerHTML = 'MISSING SCORE!';
  }
  else {
    insertEntry()
  }
})
