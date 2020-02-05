const { Pool } = require('pg');

var db = new Pool({
  host: 'ec2-54-195-252-243.eu-west-1.compute.amazonaws.com',
  port: 5432,
  database: 'd367uoep7tcs6t',
  user: "gcqszkocfozibm",
  password: "8e854f60170bf13c3592eb47a0ddbee4910fe66cf05fb1cb380e427cce151657",
});

module.exports = db