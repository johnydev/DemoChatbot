'use strict';

const line = require('@line/bot-sdk');
const lineclient = line.Client;
const config = {
    channelAccessToken: 'JNJUs4whRnPrKjzkywhnkE9CEDpnSMy6QuxMHQJh756kVZFDlSUDr78BWH5QmsYVUelivgwGETbDnJDKl7VjFyrWbV1uuDgu7AXyXtqXyPgH+W7PF6lxfb5av/z8fHgBOAkGv1o+VOUmOB4JZfJzZAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'a1182ee1373b7c0471190d2e2084a7f0',
};
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
    //  return lineclient.replyMessage(event.replyToken, echo);
      return lineclient.pushMessage(event.source.userid,echo);
    }
    
    // listen on port
    // const port = process.env.PORT || 3000;
    // app.listen(port, () => {
    //   console.log(`listening on ${port}`);
    // });


module.exports = {
    webhook: webhookImp
}