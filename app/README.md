### ToDo
1. Think of a good way to cache further (as 2018 collection grows, will become pricier)
2. Hosting
3. Recreate app functionality

### Setup
1. Need to use firebase cron to automate tweet collection https://github.com/firebase/functions-cron
2. Function should pull latest 100, and replace any existing ids
3. App will pull latest tweets from 2018
4. App will pull cached tweets from S3 (maybe switch back to C-Panel depending on hosting costs)
5. Add strong cache-controls to static files
