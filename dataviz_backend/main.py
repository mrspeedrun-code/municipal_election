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
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'MunicipalElection'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/MunicipalElection'

mongo = PyMongo(app)

# ressource for get all pollingStation
@app.route('/pollingStation', methods=['GET'])
def get_all_pollingStation():
  pollingStation = mongo.db.PollingStation
  all_seeds = list(pollingStation.find({}))
  return json.dumps(all_seeds, default=json_util.default)

#pollingstation gettotalbyturn
@app.route('/pollingStationTotalByDisctrictAndTurn/<int:district>/<int:turn>', methods=['GET'])
def get_all_pollingStationTotalByDistrictAndTurn(district, turn):
  pollingStation = mongo.db.PollingStation
  all_seeds = list(pollingStation.aggregate([{"$match": {" num_arrond": district, " tour": turn}}, {"$group": {"_id": "$ num_arrond", "procuTotal": {"$sum": "$ nb_procu"}, "inscrTotal": {"$sum": "$ nb_inscr"}, "emargTotal": {"$sum": "$ nb_emarg"}, "votantTotal": {"$sum": "$ nb_votant"}, "blancTotal": {"$sum": "$ nb_blanc"}, "nulTotal": {"$sum": "$ nb_nul"}, "exprimTotal": {"$sum": "$ nb_exprim"}}}]))
  return json.dumps(all_seeds, default=json_util.default)

# ressource for get all candidat
@app.route('/candidat', methods=['GET'])
def get_all_candidat():
  candidat = mongo.db.Candidate
  all_seeds = list(candidat.find({}))
  return json.dumps(all_seeds, default=json_util.default)

# ressource for get candidat list by district and turn
@app.route('/candidatListByDisctrictAndTurn/<int:district>/<int:turn>', methods=['GET'])
def get_candidat_list(district, turn):
  candidat = mongo.db.Candidate
  all_seeds = list(candidat.find({'NUM_ARROND': district, 'TOUR': turn}))
  return json.dumps(all_seeds, default=json_util.default)

# ressource for get distinct candidat list and total vote by district and turn
@app.route('/candidatListDistinctAndTotalVote/<int:district>/<int:turn>', methods=['GET'])
def get_candidat_list_distinct(district, turn):
  candidat = mongo.db.Candidate
  all_seeds = list(candidat.aggregate([{"$match": {"NUM_ARROND": district, "TOUR": turn}}, {"$group": {"_id" : "$CANDIDAT", "Total": {"$sum": "$NB_VOTE"}}}, {"$sort" : {"Total":-1}}]))
  return json.dumps(all_seeds, default=json_util.default)

  # filtre par nom distinct qui a le plus grand nb de vote par arrondissement et par tour
@app.route('/candidatListAndTotalVote/<int:district>/<int:turn>', methods=['GET'])
def get_candidat_list_total(district, turn):
  candidat = mongo.db.Candidate
  all_seeds = list(candidat.aggregate([{"$match": {"NUM_ARROND": district, "TOUR": turn}}, {"$group": {"_id" : "$CANDIDAT", "arr": {"$first" : "$NUM_ARROND"}, "Total": {"$sum": "$NB_VOTE"}}}, {"$sort": {"Total": -1}},{"$limit": 1} ]))
  return json.dumps(all_seeds, default=json_util.default)

if __name__ == "__main__":
  app.run()
