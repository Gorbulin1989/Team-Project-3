from flask import Flask, jsonify
import psycopg2
import json
from flask_cors import CORS

conn = psycopg2.connect (
    dbname = 'team4project3_DB',
    user = 'postgres',
    password = 'postgres',
    host = 'localhost',
    port ='5432'
)

app = Flask(__name__)
CORS(app)
@ app.route('/get_data')
def get_data():
    cur = conn.cursor()
    cur.execute('SELECT * FROM air_pollution LIMIT 100;')
    data = cur.fetchall()
    cur.close()
    headers = [desc[0] for desc in cur.description]
    result = [dict(zip(headers, row)) for row in data]
    print('Data accessed from database:', data)
    return jsonify(result)

@ app.route('/alldaily_avg')
def alldaily_avg():
    cur = conn.cursor()
    cur.execute('SELECT * FROM alldaily_avg LIMIT 100;')
    data = cur.fetchall()
    cur.close()
    headers = [desc[0] for desc in cur.description]
    result = [dict(zip(headers, row)) for row in data]
    print('Data accessed from database:', data)
    return jsonify(result)

@ app.route('/daily_avg')
def daily_avg():
    cur = conn.cursor()
    cur.execute('SELECT * FROM air_pollution_daily;')
    data = cur.fetchall()
    cur.close()
    headers = [desc[0] for desc in cur.description]
    result = [dict(zip(headers, row)) for row in data]
    print('Data accessed from database:', data)
    return jsonify(result)

@ app.route('/feb_avg')
def feb_avg():
    cur = conn.cursor()
    cur.execute('SELECT * FROM feb_avg;')
    data = cur.fetchall()
    cur.close()
    headers = [desc[0] for desc in cur.description]
    result = [dict(zip(headers, row)) for row in data]
    print('Data accessed from database:', data)
    return jsonify(result)

@ app.route('/yearly_avg')
def yearly_avg():
    cur = conn.cursor()
    cur.execute('SELECT * FROM yearly_avg_pollution;')
    data = cur.fetchall()
    cur.close()
    headers = [desc[0] for desc in cur.description]
    result = [dict(zip(headers, row)) for row in data]
    print('Data accessed from database:', data)
    return jsonify(result)

@ app.route('/pollutants/<p>')
def pollutants(p):
    cur = conn.cursor()
    cur.execute('SELECT * FROM pollutant_type WHERE pollutant = \''+p+'\';')
    data = cur.fetchall()
    cur.close()
    headers = [desc[0] for desc in cur.description]
    result = [dict(zip(headers, row)) for row in data]
    print('Data accessed from database:', data)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)