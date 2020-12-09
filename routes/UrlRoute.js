const express = require('express');
const urlService = require('../services/UrlService.js');

const TAG = 'UrlRoute.js';
const app = express();

class UrlRoute {
  createUrl(req, res, next) {
    let input = {};
    input = { ...input, ...req.body };
    console.log(TAG, ' in create url', input);
    urlService.createUrl(input)
      .then(resp => {
        res.statusCode = resp.http_code;
        res.json(resp.message);
      })
      .catch(err => {
        next(err);
      });
  }

  getUrl(req, res, next) {
    const input = {
      id: req.params.id
    };
    console.log(TAG, ' in get url ', input);
    urlService.getUrl(input)
      .then(resp => {
        res.statusCode = resp.http_code;
        res.json(resp.message);
      })
      .catch(err => {
        next(err);
      });
  }
}

const urlRoute = new UrlRoute();
app.post('/api/v1/url', urlRoute.createUrl);
app.get('/api/v1/url/:id', urlRoute.getUrl);
module.exports = app;