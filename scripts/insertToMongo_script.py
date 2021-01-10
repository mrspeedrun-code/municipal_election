#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Insert to mongo script.
@author: dle
@date_start: 2020-12-23
@last_update: 2020-01-10

This script allows the insertion of a csv file in a mongo database.
"""
try:
    import pymongo
    from pymongo import MongoClient
    import pandas as pd
    import json
except Exception as e:
    print("Some Modules are Missing ")

class MongoDB(object):
    def __init__(self, dBName=None, collectionName=None):
        self.dBName = dBName
        self.collectionName = collectionName
        self.client = MongoClient("localhost", 27017, maxPoolSize=50)
        self.DB = self.client[self.dBName]
        self.collection = self.DB[self.collectionName]

    def InsertData(self, path=None):
        df = pd.read_csv(path)
        data = df.to_dict('records')
        self.collection.insert_many(data, ordered=False)
        print("All the Data has been Exported to MongoDB Server ....")

if __name__ == '__main__':
    print("Insert PollingStation Collection")
    pollingStation = MongoDB(dBName='MunicipalElection', collectionName='PollingStation')
    pollingStation.InsertData(path="assets/csv/pollingStationCollection.csv")

    print("Insert Candidate Collection")
    pollingStation = MongoDB(dBName='MunicipalElection', collectionName='Candidate')
    pollingStation.InsertData(path="assets/csv/candidatCollection.csv")
