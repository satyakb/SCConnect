var express = require('express');
var router = express.Router();
var sc = require("soundclouder");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/callback', function(req, res) {
  sc.init('858ef5ad42ec60ae1747c188576c7312', '51e826f3dfa0c55b6101284bab2f006e', 'http://localhost:3000/callback');
  console.log('REQ', req.query);
  sc.auth( req.query.code, function (error, access_token) {
    if(error) {
        console.error(e.message);
    } 
    else {
        console.log('access_token=' + access_token );
    }
  });
  res.render('callback');
});

router.get('/get-token', function(req, res) {
  var token = req.query.access_token;
  console.log(req.hash);
  res.render('token', {access_token: token});
})

module.exports = router;
