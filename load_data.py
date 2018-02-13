#!/usr/bin/python

import csv
import json
import sqlite3

data_dir = 'data'
stars_file = 'hygdata_v3.csv'
sql_file = 'stars.db'
json_file = 'stars.json'

data_path = data_dir + '/' + stars_file
sql_path = data_dir + '/' + sql_file
json_path = data_dir + '/' + json_file

sql_conn = sqlite3.connect(sql_path)
c = sql_conn.cursor()

c.execute('''CREATE TABLE stars
             (id int, name text, spect text, x real, y floay, z real)''')
count = 0
stars_data = []

with open(data_path, 'rb') as csvfile:
    stars = csv.DictReader(csvfile)
    for star in stars:
        if(count < 1000):
            c.execute("INSERT INTO stars VALUES ({}, '{}', '{}', {}, {}, {})".format(
                star['id'], star['proper'], star['spect'], star['x'], star['y'], star['z']))
            sql_conn.commit()
            count = count + 1
        data = {}
        data['id'] = star['id']
	data['name'] = star['proper']
	data['spect'] = star['spect']
        data['x'] = star['x']
        data['y'] = star['y']
        data['z'] = star['z']
	stars_data.append(data)

sql_conn.close()

json_data = { 'stars': stars_data }

with open(json_path, 'w') as outfile:
    json.dump(json_data, outfile)

