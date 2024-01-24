const express = require("express");
const pool = require("../modules/pool");
const { default: axios } = require("axios");
const router = express.Router();

router.get("/", (req, res) => {
    const search = req.body.search
  //API call
    axios({
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        params: {
          term: `${search}`,
          locale: 'en-US',
          offset: '0',
          limit: '5'
        },
        headers: {
          'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    })
      .then((response) => {
        console.log("Get to Shazam API success:", response.data);
        res.send(response.data);
      })
      .catch((err) => {
        console.log("Get to Shazam API error:", err);
      });
});

module.exports = router;
