#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Merge Excel Files to CSV script.
@author: dle
Started on: 2020-12-22
Last update: 2021-01-09

This script allows to convert a set of xls files into a single csv file.
"""
try:
    import pandas as pd
    import glob
    import csv
    import json
    import fileinput
except Exception as e:
    print("Some Modules are Missing ")

# set of variables
excel_files_tour1 = glob.glob('assets/xls/tour1/*.xls')
excel_files_tour2 = glob.glob('assets/xls/tour2/*.xls')

# this function allows you to convert a set of xls files into a singles csv file
def mergeExcelToCSV(fileName, excel_files):
    merging_data = pd.DataFrame()

    for excel in excel_files:
        df = pd.concat(pd.read_excel(excel, sheet_name=None), ignore_index=True, sort=False)
        merging_data = merging_data.append(df, ignore_index=True)
        merging_data.to_csv('assets/csv/' + fileName + '.csv', index=False)

    # remove useless '.' characters
    # for line in fileinput.input('assets/csv/' + fileName + '.csv', inplace=True):
    #     print(line.replace('.', ''), end='')  # not useless linebreak with end settings

# pollingStation Collection
def pollinStationCollection():
    outfile = open('assets/csv/pollingStationCollection.csv', 'w')
    outfile_header = "id_bvote, scrutin, annee, tour, date, num_circ, num_quartier, num_arrond, num_bureau, nb_procu, nb_inscr, nb_emarg, nb_blanc, nb_nul, nb_exprim\n"
    outfile.write(outfile_header)

    with open('assets/csv/tour1.csv', 'r') as infile:
        reader = csv.reader(infile, delimiter=",")
        header = next(reader)
        for row in reader:
            id_bvote = row[0]
            scrutin = row[1]
            annee = row[2]
            tour = row[3]
            date = row[4]
            num_circ = row[5]
            num_quartier = row[6]
            num_arrond = row[7]
            num_bureau = row[8]
            nb_procu = row[9]
            nb_inscr = row[10]
            nb_emarg = row[11]
            nb_blanc = row[12]
            nb_nul = row[13]
            nb_exprim = row[14]
            line_str = "{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}\n"
            line = line_str.format(id_bvote, scrutin, annee, tour, date, num_circ, num_quartier, num_arrond, num_bureau, nb_procu, nb_inscr, nb_emarg, nb_blanc, nb_nul, nb_exprim)
            outfile.write(line)
        outfile.close() ## data manquante à revérifier

# candidate Collection
def candidateCollection():
    data = pd.read_csv('assets/csv/tour1.csv', delimiter=",")

    # drop useless column
    useless_column=['SCRUTIN', 'ANNEE', 'DATE', 'NUM_CIRC', 'NUM_QUARTIER', 'NUM_BUREAU', 'NB_PROCU', 'NB_INSCR', 'NB_EMARG', 'NB_BLANC', 'NB_NUL', 'NB_EXPRIM', 'NB_VOTANT']
    data.drop(columns=useless_column, inplace=True, axis=1)

    # convert column to row
    melt_data = pd.melt(data, id_vars=['ID_BVOTE', 'NUM_ARROND', 'TOUR'],var_name='CANDIDAT', value_name='NB_VOTE')

    melt_data.to_csv('assets/csv/candidatCollection.csv')

candidateCollection()

def main():
    print("Convert a set of excel files into a single csv file")
    mergeExcelToCSV('tour1', excel_files_tour1)
    mergeExcelToCSV('tour2', excel_files_tour2)

    print("Create a dataset for pollingStation")
    pollinStationCollection()

    print("Create a dataset for candidateCollection")
    candidateCollection()

if __name__ == "__main__":
    main()