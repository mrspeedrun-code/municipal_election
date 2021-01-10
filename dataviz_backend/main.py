#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Merge Excel Files to CSV script.
@author: dle
Started on: 2021-01-10
Last update: 2021-01-10

This script allows to convert a set of xls files into a single csv file.
"""
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import json
from bson import json_util

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'MunicipalElection'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/MunicipalElection'

mongo = PyMongo(app)

@app.route('/pollingStation', methods=['GET'])
def get_all_pollingStation():
  pollingStation = mongo.db.PollingStation
  all_seeds = list(pollingStation.find({}))
  return json.dumps(all_seeds, default=json_util.default)

@app.route('/candidat', methods=['GET'])
def get_all_candidat():
  candidat = mongo.db.Candidat
  all_seeds = list(candidat.find({}))
  return json.dumps(all_seeds, default=json_util.default)

if __name__ == "__main__":
  app.run(debug=True)