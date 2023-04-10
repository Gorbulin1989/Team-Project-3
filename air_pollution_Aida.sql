-- Delete the table "air_pollution"
DROP TABLE air_pollution;

-- Re-create the table "air_pollution" 
CREATE TABLE air_pollution (
	date TIMESTAMP,
	longitude DOUBLE PRECISION,
	latitude DOUBLE PRECISION,
	city VARCHAR (50),
	population BIGINT,
	AQI INT,
	CO DOUBLE PRECISION,
	NO DOUBLE PRECISION,
	NO2 DOUBLE PRECISION,
	O3 DOUBLE PRECISION,
	SO2 DOUBLE PRECISION,
	PM2_5 DOUBLE PRECISION,
	PM10 DOUBLE PRECISION,
	NH3 DOUBLE PRECISION,
	temperature_2m_deg_C DOUBLE PRECISION,
    relativehumidity_2m_perc INT,
    precipitation_mm DOUBLE PRECISION,
    rain_mm DOUBLE PRECISION,
    cloudcover_perc DOUBLE PRECISION,
    cloudcover_low_perc DOUBLE PRECISION,
    cloudcover_mid_perc DOUBLE PRECISION,
    cloudcover_high_perc DOUBLE PRECISION,
    windspeed_10m_kmh DOUBLE PRECISION,
    windspeed_100m_kmh DOUBLE PRECISION,
    winddirection_10m_deg INT,
    winddirection_100m_deg INT,
    windgusts_10m_kmh DOUBLE PRECISION,
    elevation INT
);

SELECT * FROM air_pollution;



















