#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Merge Excel Files to CSV script.
@author: dle
@date_start: 2020-12-22
@last_update: 2020-12-22

This script allows to convert a set of xls files into a single csv file.
"""

import pandas as pd
import glob

filename ="assets/xls" # This is my path for excel files

excel_files = glob.glob(filename+'/*.xls') # assume the path

merging_data = pd.DataFrame()

for excel in excel_files:
    df = pd.concat(pd.read_excel(excel, sheet_name=None), ignore_index=True, sort=False)
    merging_data = merging_data.append(df, ignore_index=True)
    merging_data.to_csv('assets/csv/dataFinal.csv', index=False)
