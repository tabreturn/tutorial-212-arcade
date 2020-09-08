from flask import Flask, render_template, jsonify, request
import sqlite3
#from flask_cors import CORS

app = Flask(__name__)
#CORS(app)

SCORESDB = 'scores.db'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scores', methods=['GET'])
def scores_list():
    #return 'score'
    #return jsonify('score')
    con = sqlite3.connect(SCORESDB)
    scores = []
    cur = con.execute('SELECT * FROM scores ORDER BY score DESC')

    for row in cur:
        scores.append(list(row))
    con.close()
    return jsonify(scores)

@app.route('/scores', methods=['POST'])
def scores_add():
    entry = request.json
    con = sqlite3.connect(SCORESDB)
    cur = con.execute('INSERT INTO scores(name,date,score) VALUES(?,?,?)', entry)
    con.commit()
    con.close()
    return 'success'
