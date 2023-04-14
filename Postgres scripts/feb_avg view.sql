-- View: public.feb_avg

-- DROP VIEW public.feb_avg;

CREATE OR REPLACE VIEW public.feb_avg
 AS
 SELECT alldaily_avg.year,
    alldaily_avg.month,
    alldaily_avg.day,
    alldaily_avg.city,
    alldaily_avg.population,
    alldaily_avg.avg_aqi,
    alldaily_avg.avg_co,
    alldaily_avg.avg_no,
    alldaily_avg.avg_no2,
    alldaily_avg.avg_o3,
    alldaily_avg.avg_so2,
    alldaily_avg.avg_pm2_5,
    alldaily_avg.avg_pm10,
    alldaily_avg.avg_nh3,
    alldaily_avg.avg_temp,
    alldaily_avg.avg_humidity,
    alldaily_avg.avg_precipitation,
    alldaily_avg.avg_windspeed
   FROM alldaily_avg
  WHERE alldaily_avg.month = 2::double precision;

ALTER TABLE public.feb_avg
    OWNER TO postgres;

