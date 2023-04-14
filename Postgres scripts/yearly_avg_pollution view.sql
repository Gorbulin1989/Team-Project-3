-- View: public.yearly_avg_pollution

-- DROP VIEW public.yearly_avg_pollution;

CREATE OR REPLACE VIEW public.yearly_avg_pollution
 AS
 SELECT air_pollution.city,
    air_pollution.longitude,
    air_pollution.latitude,
    air_pollution.population,
    avg(air_pollution.aqi)::numeric(10,2) AS avg_aqi,
    avg(air_pollution.co)::numeric(10,2) AS avg_co,
    avg(air_pollution.no)::numeric(10,2) AS avg_no,
    avg(air_pollution.no2)::numeric(10,2) AS avg_no2,
    avg(air_pollution.o3)::numeric(10,2) AS avg_o3,
    avg(air_pollution.so2)::numeric(10,2) AS avg_so2,
    avg(air_pollution.pm2_5)::numeric(10,2) AS avg_pm2_5,
    avg(air_pollution.pm10)::numeric(10,2) AS avg_pm10,
    avg(air_pollution.nh3)::numeric(10,2) AS avg_nh3
   FROM air_pollution
  GROUP BY air_pollution.city, air_pollution.longitude, air_pollution.latitude, air_pollution.population
  ORDER BY (avg(air_pollution.aqi)::numeric(10,2)) DESC;

ALTER TABLE public.yearly_avg_pollution
    OWNER TO postgres;

