## SSH
1. `chmod 400 trump.pem`
2. `ssh -i trump.pem ec2-user@ec2-54-175-100-39.compute-1.amazonaws.com`

## Node Setup
1. Install Node and NPM: http://www.wisdomofjim.com/blog/how-to-install-node-and-npm-on-an-ec2-server

## Upload
1. `cd /home/ec2-user`
2. `touch package.json`
3. `vi package.json`
4. Copy package.json from this folder and paste
5. `:wq!`
6. `npm install`
7. `touch tweets.js`
8. `vi tweets.js`
9. Copy tweets.js from this folder and paste
10. `wq!`

## Add Cronjob
1. `crontab -e`
2. `* * * * * ~/.nvm/versions/node/v6.11.5/bin/node /home/ec2-user/tweets.js`
