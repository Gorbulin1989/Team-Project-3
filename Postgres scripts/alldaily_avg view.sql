-- View: public.alldaily_avg

-- DROP VIEW public.alldaily_avg;

CREATE OR REPLACE VIEW public.alldaily_avg
 AS
 SELECT date_part('year'::text, air_pollution.date) AS year,
    date_part('month'::text, air_pollution.date) AS month,
    date_part('day'::text, air_pollution.date) AS day,
    air_pollution.city,
    air_pollution.population,
    avg(air_pollution.aqi)::numeric(10,2) AS avg_aqi,
    avg(air_pollution.co)::numeric(10,2) AS avg_co,
    avg(air_pollution.no)::numeric(10,2) AS avg_no,
    avg(air_pollution.no2)::numeric(10,2) AS avg_no2,
    avg(air_pollution.o3)::numeric(10,2) AS avg_o3,
    avg(air_pollution.so2)::numeric(10,2) AS avg_so2,
    avg(air_pollution.pm2_5)::numeric(10,2) AS avg_pm2_5,
    avg(air_pollution.pm10)::numeric(10,2) AS avg_pm10,
    avg(air_pollution.nh3)::numeric(10,2) AS avg_nh3,
    avg(air_pollution.temperature_2m_deg_c)::numeric(10,2) AS avg_temp,
    avg(air_pollution.relativehumidity_2m_perc)::numeric(10,2) AS avg_humidity,
    avg(air_pollution.precipitation_mm)::numeric(10,2) AS avg_precipitation,
    avg(air_pollution.windspeed_100m_kmh)::numeric(10,2) AS avg_windspeed
   FROM air_pollution
  GROUP BY (date_part('year'::text, air_pollution.date)), (date_part('month'::text, air_pollution.date)), (date_part('day'::text, air_pollution.date)), air_pollution.city, air_pollution.population
  ORDER BY air_pollution.city, (date_part('year'::text, air_pollution.date)), (date_part('month'::text, air_pollution.date)), (date_part('day'::text, air_pollution.date));

ALTER TABLE public.alldaily_avg
    OWNER TO postgres;

