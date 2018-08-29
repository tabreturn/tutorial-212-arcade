from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/user", methods=["POST"])
def add_user():
    return jsonify('hello')
