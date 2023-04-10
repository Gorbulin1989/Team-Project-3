import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///team4project3.sql", echo=False)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
Pollution = Base.classes.air_pollution

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/about<br/>"
        f"/api/v1.0/cities<br/>"
        f"/api/v1.0/citysummary"
    )

@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return "This app is looking into air pollution for 10 major cities (by population) across the world from 01-01-2022 to 01-01-2023 in order to assess how it might be affected by population, precipitation and wind speed. We will be focusing on the levels in the air of 8 common pollutants such as: carbon monoxide (CO), nitric oxide (NO), nitrogen dioxide (NO2), trioxygen (O3), sulfur dioxide(SO2), particulate matter 2.5, particulate matter 10 and ammonia (NH3) in each of the top 10 cities in the world, and the weather recorded in those cities at the time of pollution levels collection."


@app.route("/api/v1.0/cities")
def cities():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all cities"""
    # Query all cities
    results = session.query(Pollution.city).distinct().all()

    session.close()

    # Convert list of tuples into normal list
    all_cities = list(np.ravel(results))

    return jsonify(all_cities)


@app.route("/api/v1.0/citysummary")
def citysummary():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of city data including the city, poulation, aqi and elevation of each city"""
    # Query summry info of all cities
    results = session.query(Pollution.city, Pollution.population, Pollution.aqi, Pollution.elevation).all()

    session.close()

    # Create a dictionary from the row data and append to a list of citysummary
    citysummary = []
    for city, population, aqi, elevation in results:
        citysummary_dict = {}
        citysummary_dict["city"] = city
        citysummary_dict["population"] = population
        citysummary_dict["aqi"] = aqi
        citysummary_dict["elevation"] = elevation

        citysummary.append(citysummary_dict)

    return jsonify(citysummary)


if __name__ == '__main__':
    app.run(debug=True)
