from flask import Flask, jsonify
<<<<<<< HEAD
from decimal import Decimal
=======
>>>>>>> 57227346347bb6d5305b6425c58190fbc71f7590
import psycopg2
import json
from flask_cors import CORS

conn = psycopg2.connect (
<<<<<<< HEAD
    dbname = 'AQI',
    user = 'postgres',
    password = 'Gorbulin1989!',
    host = 'localhost',
    port ='5432'
)
app = Flask(__name__)
CORS(app)

@app.route('/get_data')
def get_data():
    cur = conn.cursor()
    cur.execute('SELECT * FROM air_pollution_daily;')
    data = cur.fetchall()
    cur.close()
    headers = [desc[0] for desc in cur.description]
    result = [dict(zip(headers, ((float(i) if isinstance(i, Decimal) else i) for i in row))) for row in data]
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)