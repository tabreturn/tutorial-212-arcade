// variables

let colors = [
  '#D00',
  '#DD0',
  '#0DD',
  '#22D',
  '#D0D'
];

let scores = [
  /*
  ['TAB','1991-03-03','12345'],
  ['BAT','1991-02-02','5000'],
  ['JEM','1991-01-01','1000']
  */
];

let topscore = 13000;

// insert entry

function insertEntry(entry) {
  scores.push(entry);

  document.getElementById('highscores').innerHTML = '<tr><th>[NAME]</th><th>[DATE]</th><th>[SCORE]</th></tr>';
  document.getElementById('chart').innerHTML = '';

  for (let i=0; i < scores.length; i++) {
    let color = colors[i%colors.length];

    let bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.width = scores[i][2] / topscore * 100 + '%';
    bar.style.backgroundColor = color;
    document.getElementById('chart').appendChild(bar);

    let row = document.createElement('tr');
    row.style.color = color;
    row.innerHTML += '<td>' + scores[i][0] + '</td>';
    row.innerHTML += '<td>' + scores[i][1] + '</td>';
    row.innerHTML += '<td>' + scores[i][2] + '</td>';
    document.getElementById('highscores').appendChild(row);
  }
}

// submit button

document.querySelector('#addscore a').addEventListener('click', () => {
  let entry = [
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
    fetch('/scores', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(entry)
    })
    .then(response => response.json())
    .then(data => {
      insertEntry(entry)
    });
  }
});

// load scores

fetch('/scores', { method: 'GET' })
  .then(response => response.json())
  .then(data => {
    for (let i=0; i<data.length; i++) {
      insertEntry([
        data[i][1],
        data[i][2],
        data[i][3]
      ]);
    }
  });

