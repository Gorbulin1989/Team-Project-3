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
    cur.execute('SELECT * FROM air_pollution;')
    data = cur.fetchall()
    cur.close()
    headers = [desc[0] for desc in cur.description]
    result = [dict(zip(headers, row)) for row in data]
    print('Data accessed from database:', data)
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)