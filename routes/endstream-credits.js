const fs = require('fs');
const request = require('request');

require('dotenv').config();

const express = require('express');
const router = express.Router();
const followersFile = 'session_followers.txt'; //'recent_followers.txt';//
const subscriberFile = 'session_subscribers.txt';
const donatorsFile = 'session_donators.txt';
const hostsFile = 'session_hosts.txt';

const folder = process.env.MUXY_FOLDER;

/* GET home page. */
router.get('/', async function (req, res, next) {
  let credits = {};

  credits.followers = await getUserInfo(followersFile);
  credits.subscribers = await getUserInfo(subscriberFile);
  credits.hosts = await getUserInfo(hostsFile);
  credits.donators = await getUserInfo(donatorsFile);

  if (!credits.followers.length &&
    !credits.subscribers.length &&
    !credits.hosts.length &&
    !credits.donators.length) {
    credits.nothing = true;
  }

  res.render('endstream-credits', credits);
});

async function getUserInfo(file) {
  const users = await readFile(file);
  if (users.length) {
    const fullUsers = await getUsers(users);
    return fullUsers.map(u => {
      return {
        display_name: u.display_name,
        profile_image_url: u.profile_image_url
      };
    });
  } else return [];
}

function readFile(file) {
  return new Promise((res, rej) => {
    fs.readFile(`${folder}\\${file}`, 'utf8', (err, names) => {
      if (!!err) {
        console.log(err);
        rej(err);
      }
      if (names !== "") {
        res(names.split(',').map(v => v.trim()));
      } else {
        res([]);
      }
    })
  })
}

module.exports = router;

function getUsers(users) {
  var querystring = users.map(u => `login=${u}`).join('&');
  //GET https://api.twitch.tv/helix/users?id=<user ID>&id=<user ID>
  return new Promise((res, rej) => {
    request.get(`https://api.twitch.tv/helix/users?${querystring}`, {
      headers: {
        'client-id': process.env.TWITCH_CLIENTID
      }
    }, function (error, response, body) {
      if (!!error) {
        rej(error);
      }
      if (response.statusCode != 200) {
        rej(`statuscode: ${response.statusCode}`);
      }
      res(JSON.parse(body).data);
    });
  });
}