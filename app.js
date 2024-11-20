'use strict';

const express = require('express');
const app = express();

// Exercise 1
app.get('/math/circle/:r', (req, res) => {
  const radius = parseFloat(req.params.r);
  if (isNaN(radius) || radius < 0) {
    return res.status(400).json({ error: 'Invalid radius value' });
  }
  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;
  res.json({
    area: parseFloat(area.toFixed(2)),
    circumference: parseFloat(circumference.toFixed(2))
  });
});

// Exercise 2
app.get('/hello/name', (req, res) => {
  const first = req.query.first;
  const last = req.query.last;
  const missingParams = [];

  if (!first) missingParams.push('first');
  if (!last) missingParams.push('last');

  if (missingParams.length > 0) {
    return res.status(400).send(`Missing Required GET parameters: ${missingParams.join(', ')}`);
  }

  res.send(`Hello ${first} ${last}`);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// node app.js

// Exercise 1 test: http://localhost:8000/math/circle/5
// Exercise 2 test: http://localhost:8000/hello/name?first=John&last=Doe