"use strict";

var request = require("supertest");
var async = require("async");
var fs = require("fs");
var rarity = require("rarity");

module.exports = function(filiere, cb) {
  async.waterfall([
    function LogToCas(cb) { //https://login.cpe.fr/cas/login?service=https%3A%2F%2Fe-campus.cpe.fr%2Flogin%2Findex.php
      request("https://login.cpe.fr")
        .get("/cas/login")
        .redirects(2)
        .end(function(err, res) {
          if(err) {
            return cb(err);
          }
          console.log(res.headers['set-cookie']);
          var cookie = res.headers['set-cookie']
            .map(function(r) {
              return r.replace("; Path=/cas; Secure", "");
            }).join("; ");


          var lt = res.text.match(/<input type="hidden" name="lt" value="([^"]+)" \/>/i)[1];
          var execution = res.text.match(/<input type="hidden" name="execution" value="([^"]+)" \/>/i)[1];
          console.log(res);
          console.log(cookie, lt, execution);
          cb(null, cookie, lt, execution);
        });
    },
    function logIn(cookie, lt, execution, cb) {
      request("https://login.cpe.fr")
        .post("/cas/login;" + cookie.toLowerCase())
        .set('cookie', cookie)
        .redirects(2)
        .send({
          username: 'hugo.duroux@cpe.fr',
          password: 'dceJ86WS',
          lt: lt,
          execution: execution,
          _eventId: 'submit',
          submit: "SE+CONNECTER",
          service: "https%3A%2F%2Fe-campus.cpe.fr%2Flogin%2Findex.php"
        })
        .end(cb);
    },
    function getcookie(res, cb) {
      console.log(res);
      var cookies = res.headers['set-cookie']
        .map(function(r) {
          return r.replace("; path=/; secure", "");
        }).join("; ");

      // seconde solution
      // cookies = res.headers['set-cookie'][0].replace("; path=/; secure","");
      console.log(cookies);
      cb(null, cookies);
    },
    function logIn(cookies, cb) {
      var req = request("https://e-campus.cpe.fr")
       .post("/course/enrol.php");
      req.set('cookie', cookies);
      // .end(rarity.carry[cookie], cb);
      req.expect(200)
        .end(function(err, res) {
          // console.log(err, Object.keys(res));
          console.log(res.headers);
          cb(err, cookies);
        });
    },
    function getXlsx(cookies, cb) {
      console.log("DOWNLOADING");
      var err;
      var stream = fs.createWriteStream('/tmp/test.xlsx');
      stream.on('finish', function() {
        cb(err);
      });

      var req = request("https://e-campus.cpe.fr")
        .get("/file.php/788/Calendriers%20et%20plannings/IRC1417_planning%201415%20du020914.xlsx")
        .redirects(5)
        .set('cookie', cookies);
      req.end().req.once('response', function(res) {
        if(res.statusCode !== 200) {
          err = new Error('Error when downloading file ' + res.statusCode);
          stream.end();
          this.abort();
        }
      });
      req.pipe(stream);
    }
  ], cb);
};

// MoodleSessionTest=jt9uE7NnHO; MoodleSession=tr1bcbaasbkis4kuogfpq987ica98430
// https://e-campus.cpe.fr/file.php/788/Calendriers%20et%20plannings/IRC1417_planning%201415%20du020914.xlsx
