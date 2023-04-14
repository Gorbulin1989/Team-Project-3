-- View: public.pollutant_type

-- DROP VIEW public.pollutant_type;

CREATE OR REPLACE VIEW public.pollutant_type
 AS
 SELECT y.city,
    y.population,
    t.qty,
    t.pollutant
   FROM yearly_avg y
     CROSS JOIN LATERAL ( VALUES (y.avg_aqi,'aqi'::text), (y.avg_co,'co'::text), (y.avg_no,'no'::text), (y.avg_no2,'no2'::text), (y.avg_o3,'o3'::text), (y.avg_so2,'so2'::text), (y.avg_pm2_5,'pm2_5'::text), (y.avg_pm10,'pm10'::text), (y.avg_nh3,'nh3'::text)) t(qty, pollutant)
  ORDER BY y.city, y.population;

ALTER TABLE public.pollutant_type
    OWNER TO postgres;

