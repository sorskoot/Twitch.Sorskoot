const fs = require('fs');
require('dotenv').config();

const express = require('express');
const router = express.Router();
const followersFile = 'recent_followers.txt'; //'session_followers.txt';
const folder = process.env.MUXY_FOLDER;

/* GET home page. */
router.get('/', async function (req, res, next) {
  let credits = {};

  credits.followers = await readFollowers();

  res.render('endstream-credits', credits);
});

function readFollowers() {
  return new Promise((res, rej) => {
    fs.readFile(`${folder}\\${followersFile}`, 'utf8', (err, followers) => {
      if (!!err) {
        console.log(err);
        rej(err);
      }
      if (followers !== "") {
        res(followers.split(',').map(v => v.trim()));
      } else {
        res([]);
      }
    })
  })
}

module.exports = router;

// const fs = require('fs');

// const file = 'session_most_recent_follower.txt';
// const folder = process.env.MUXY_FOLDER;

// module.exports =
//     (twitchClient, target) => {
//         fs.watchFile(`${folder}\\${file}`, () => {
//             fs.readFile(`${folder}\\${file}`, 'utf8', (err, follower)=> {
//                 if(!!err){
//                     console.log(err);
//                     return;
//                 }
//                 if(follower!==""){
//                     twitchClient.say(target, `Hi @${follower}! Welcome to the coder-sphere.`);
//                 }
//             })           
//         })            
//     }