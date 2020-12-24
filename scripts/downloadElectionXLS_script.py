#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Download automate XLS.
@author: dle
Started on: 2020-12-23
Last update: 2020-12-23

This script allows the download of data provided by the open data on municipal elections.
"""
try:
    import requests
except Exception as e:
    print("Some Modules are Missing ")

# set of municipal variables
opendata = 'https://parisdata.opendatasoft.com/api/datasets/1.0/elections-municipales-2020-'
tour1 = 'ddct_berp_municipales_2020_tour1_'
tour2 = 'ddct_berp_municipales_2020_tour2_'

# this function allows you to download via a download link pattern
def download_election_municipal_opendata(xls_url, number, round):
    resp = requests.get(xls_url)
    output = open('assets/xls/'+ 'ddct_berp_municipales_2020_' + round + '_ardt_' + number + '.xls', 'wb')
    output.write(resp.content)
    output.close()

# loop to go through the 20 districts of Paris
for x in range (1, 21):
    # if the index is less than 10 then the penultimate character will contain a 0
    number = (('0' + str(x))  if x < 10 else str(x))

    # download an excel list of the first round municipal elections 2020-03-15
    download_election_municipal_opendata(opendata + '-1ertour/attachments/' + tour1 + 'Ardt_' + number + '_20200315_xls/', number, 'tour1')

    # download an excel list of the second round municipal elections 2020-06-28
    download_election_municipal_opendata(opendata + '-2emetour/attachments/' + tour2 + 'ardt_' + number + '_20200628_xls/', number, 'tour2')