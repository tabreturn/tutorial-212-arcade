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

var topscore = 13000;

// insert entry

function insertEntry(entry) {
  scores.push(entry);

  document.getElementById('highscores').innerHTML = '<tr><th>[NAME]</th><th>[DATE]</th><th>[SCORE]</th></tr>';
  document.getElementById('chart').innerHTML = '';

  for (var i=0; i < scores.length; i++) {
    color = colors[i%colors.length];
    /*
    var bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.width = scores[i][2] / topscore * 100 + '%';
    bar.style.backgroundColor = color;
    document.getElementById('chart').appendChild(bar);
    */
    var bar = document.createElementNS('http://www.w3.org/2000/svg','rect')
    bar.setAttribute('fill', color);
    bar.setAttribute('width', scores[i][2] / topscore * 100 + '%');
    bar.setAttribute('height', 22);
    bar.setAttribute('x', 0);
    bar.setAttribute('y', 22*i);
    document.getElementById('chart').appendChild(bar);
    document.getElementById('chart').setAttribute('height', 22*(i+1));

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
    //insertEntry(entry);
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        insertEntry(entry);
      }
      else {
        console.log(this.readyState, this.status);
      }
    };
    req.open('POST', '/scores', true);
    req.setRequestHeader('Content-type', 'application/json');
    body = JSON.stringify(entry)
    req.send(body);
  }
});

/*
// api test

var req = new XMLHttpRequest();
req.onreadystatechange = function() {
  console.log(this.responseText);
};
req.open('GET', 'https://love-calculator.p.mashape.com/getPercentage?fname=John&sname=Alice');
req.setRequestHeader('X-Mashape-Key','2xW4DcY7V3mshYasWjBGt81Fj0dJp13AK2Ljsnu9H4pjpVFM8J');
req.send();
*/

// load scores

var req = new XMLHttpRequest();
req.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    json = JSON.parse(req.responseText)

    for (var i=0; i<json.length; i++) {
      insertEntry([
        json[i][1],
        json[i][2],
        json[i][3]
      ]);
    }
  }
  else {
    console.log(this.readyState, this.status);
  }
};
req.open('GET', '/scores', true);
req.send();
