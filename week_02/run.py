from flask import Flask, render_template, jsonify
import sqlite3
#from flask_cors import CORS

app = Flask(__name__)
#CORS(app)

'''
CREATE TABLE scores(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  date TEXT NOT NULL,
  score INTEGER NOT NULL
);
INSERT INTO scores(name,date,score) VALUES('TAB','1993-12-02',4546);
INSERT INTO scores(name,date,score) VALUES('TAB','1993-12-02',946);
INSERT INTO scores(name,date,score) VALUES('JOE','1993-01-08',813);
'''

MENUDB = 'scores.db'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scores', methods=['GET'])
def scores_list():
    #return 'score'
    #return jsonify('score')

    con = sqlite3.connect(MENUDB)
    scores = []
    cur = con.execute('SELECT * FROM scores')
    for row in cur:
        scores.append(list(row))
    con.close()

    return jsonify(scores)

@app.route('/scores', methods=['POST'])
def scores_add():
    #return 'score'
    return jsonify('score')
