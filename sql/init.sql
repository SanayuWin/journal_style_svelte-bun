-- init.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS style (
    row_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    num VARCHAR(20) NOT NULL,
    layer VARCHAR(255) NOT NULL,
    height VARCHAR(255) NOT NULL,
    width VARCHAR(255) NOT NULL,
    xAxis VARCHAR(255) NOT NULL,
    yAxis VARCHAR(255) NOT NULL,
    borderWeight VARCHAR(255) NOT NULL,
    borderColor TEXT[] NOT NULL,
    borderRadius VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
);
