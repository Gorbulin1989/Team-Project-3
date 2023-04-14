-- View: public.daily_avg

-- DROP VIEW public.daily_avg;

CREATE OR REPLACE VIEW public.daily_avg
 AS
 SELECT date_part('year'::text, air_pollution.date) AS year,
    date_part('month'::text, air_pollution.date) AS month,
    date_part('day'::text, air_pollution.date) AS day,
    air_pollution.longitude,
    air_pollution.latitude,
    air_pollution.city,
    air_pollution.population,
    avg(air_pollution.aqi)::numeric(10,2) AS aqi_avg
   FROM air_pollution
  GROUP BY (date_part('year'::text, air_pollution.date)), (date_part('month'::text, air_pollution.date)), (date_part('day'::text, air_pollution.date)), air_pollution.longitude, air_pollution.latitude, air_pollution.city, air_pollution.population
  ORDER BY air_pollution.city, (date_part('year'::text, air_pollution.date)), (date_part('month'::text, air_pollution.date)), (date_part('day'::text, air_pollution.date));

ALTER TABLE public.daily_avg
    OWNER TO postgres;

