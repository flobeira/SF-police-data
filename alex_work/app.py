from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import json
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import request


app = Flask(__name__)

mongo1 = PyMongo(app, uri='mongodb://localhost:27017/test_db')

mongo2 = PyMongo(app, uri='mongodb://localhost:27017/police_db')

@app.route('/')

def welcome():
    return(
        f"Welcome to my home page!<br/>"
        f"Available Routes:<br/>"
        f"/mongo1-data<br/>"
        f"/mongo2-data<br/>"
        f"/visual1<br/>"
        f"/visual2<br/>"

    )


# Get Data for Jan 2015 Geo Map
@app.route('/mongo1-data')
def connect():

# Find one record of data from the mongo database
    stop_data = mongo1.db.collection

    db_data = []

    for stop in stop_data.find():
        stop.pop('_id')
        db_data.append(stop)
    
    # Return template and data
    return jsonify(db_data)



# Geo Map with January 2015 Data
@app.route('/visual1')
def show():

 return render_template('visual1.html')



# Get Data from 2015 Data for Bar Plots
@app.route('/mongo2-data')
def testconnect():

# Find one record of data from the mongo database
    stop_data = mongo2.db.collection

    db_data = []

    for stop in stop_data.find():
        stop.pop('_id')
        db_data.append(stop)
    
    # Return template and data
    return jsonify(db_data)




# Potential Interactive Bar Chart
@app.route('/visual2')
def show2():

 return render_template('visual2.html')


# Boiler plate 
if __name__ == "__main__":
    app.run(debug=True)
