from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import json
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import request


app = Flask(__name__)

mongo = PyMongo(app, uri='mongodb://localhost:27017/police_db')

@app.route('/')

def welcome():
    return(
        f"Welcome to my home page!<br/>"
        f"Available Routes:<br/>"
        f"/read-data<br/>"
        f"/visualize<br/>"

    )



# @app.route('/read-data', methods=['GET','POST'])
@app.route('/read-data')
def connect():

#  # Find one record of data from the mongo database
    stop_data = mongo.db.collection

    db_data = []

    for stop in stop_data.find():
        stop.pop('_id')
        db_data.append(stop)
    
    # Return template and data
    return jsonify(db_data)



@app.route('/visualize')
def show():

 return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
