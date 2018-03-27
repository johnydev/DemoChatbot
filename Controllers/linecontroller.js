'use strict';

const configs = require('../configs');
const line = require('@line/bot-sdk');
const lineclient = new line.Client(configs.lineconfig);

function webhookImp(req, res) {
    Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
}

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
      }
    
      // create a echoing text message
      const echo = { type: 'text', text: event.message.text };
    
      // use reply API
      return lineclient.replyMessage(event.replyToken, echo);
     // return lineclient.pushMessage(event.source.userid,echo);
    }
    
    // listen on port
    // const port = process.env.PORT || 3000;
    // app.listen(port, () => {
    //   console.log(`listening on ${port}`);
    // });


module.exports = {
    webhook: webhookImp
}