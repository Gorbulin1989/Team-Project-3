-- Table: public.air_pollution_daily

-- DROP TABLE IF EXISTS public.air_pollution_daily;

CREATE TABLE IF NOT EXISTS public.air_pollution_daily
(
    date date,
    longitude double precision,
    latitude double precision,
    city character varying(30) COLLATE pg_catalog."default",
    aqi double precision,
    co double precision,
    no double precision,
    no2 double precision,
    o3 double precision,
    so2 double precision,
    pm2_5 double precision,
    pm10 double precision,
    nh3 double precision,
    temperature_2m double precision,
    relativehumidity_2m double precision,
    precipitation double precision,
    rain double precision,
    cloudcover_perc double precision,
    cloudcover_low double precision,
    cloudcover_mid double precision,
    cloudcover_high double precision,
    windspeed_10m double precision,
    windspeed_100m double precision,
    winddirection_10m double precision,
    winddirection_100m double precision,
    windgusts_10m double precision,
    elevation double precision
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.air_pollution_daily
    OWNER to postgres;