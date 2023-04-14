-- Table: public.air_pollution

-- DROP TABLE IF EXISTS public.air_pollution;

CREATE TABLE IF NOT EXISTS public.air_pollution
(
    date timestamp without time zone,
    longitude double precision,
    latitude double precision,
    city character varying(50) COLLATE pg_catalog."default",
    population bigint,
    aqi integer,
    co double precision,
    no double precision,
    no2 double precision,
    o3 double precision,
    so2 double precision,
    pm2_5 double precision,
    pm10 double precision,
    nh3 double precision,
    temperature_2m_deg_c double precision,
    relativehumidity_2m_perc integer,
    precipitation_mm double precision,
    rain_mm double precision,
    cloudcover_perc double precision,
    cloudcover_low_perc double precision,
    cloudcover_mid_perc double precision,
    cloudcover_high_perc double precision,
    windspeed_10m_kmh double precision,
    windspeed_100m_kmh double precision,
    winddirection_10m_deg integer,
    winddirection_100m_deg integer,
    windgusts_10m_kmh double precision,
    elevation integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.air_pollution
    OWNER to postgres;