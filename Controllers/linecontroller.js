'use strict';

const configs = require('../configs');
const line = require('@line/bot-sdk');
const lineclient = new line.Client(configs.lineconfig);
const M_LineContact = require('../models/M_Linecontact')
const recastai = require('./recastaicontroller')

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
    //const echo = { type: 'text', text: event.message.text };
    // const echo = { type: 'location', 
    //     title: 'Softsq ',
    //     address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
    //     latitude: 35.65910807942215,
    //     longitude: 139.70372892916203
    //  };

    const echo = { type: 'text', text: event.message.text };
    

//}
    //lineclient.pushMessage(event.source.userId, echo);
    console.log('Test UserID');
    console.log(event.source.userId);
    recastai.recastAI(event.message.text)
    .then((result) =>{
        console.log(JSON.stringify(result));
        echo.text = result.nlp.entities;
        lineclient.pushMessage(event.source.userId,echo);
    }).catch((e)=>{
        console.log('error Recast')
        console.log(e.stack);
    })

    lineclient.getProfile(event.source.userId)
        .then((profile) => {
            console.log(profile.displayName);
            console.log(profile.userId);
            console.log(profile.pictureUrl);

           // console.log(profile.statusMessage);
            M_LineContact.findOne({ lineId: event.source.userId })
                .then((result) => {
                    if (!result) {
                        M_LineContact.create({
                            lineId: profile.userId,
                            displayName: profile.displayName,
                            imageProfile: profile.pictureUrl,
                            createdDate: new Date().toJSON(),
                        })
                            .then((result) => {
                               
                            }).catch((e) => {
                                console.log(e);
                            });
                    }
                //     if (event.message.text == 'map') {
                //         const echo = { type: 'location', 
                //         title: 'Soft SQ Co.,Ltd.',
                //         address: 'Central Tower1 Building',
                //         latitude: 13.668498,
                //         longitude: 100.633863
                //         };
                //     }
                //     else {
                //         const echo = { type: 'text', text: event.message.text };
                //     }
                //  lineclient.pushMessage(event.source.userId,echo);
                })
                .catch((err) => {
                    // error handling
                });
        });

}
     // M_LineContact.findOne({ lineId: event.source.userid })
    //  .then((result)=> {
    //    if (!result) {
            // M_LineContact.create({
            //     lineId: event.source.userid,
            //     displayName: event.source.displayName,
            //     imageProfile: event.source.imageProfile,
            //     createdDate: new Date().toJSON(),
            //   })
            //   .then((result) => {
            // lineclient.pushMessage(event.source.userid, echo)
            //   })
      //}
    //}) 
    //     .catch((e) => {
    //     console.log(e);
    //   });
      // use reply API
      //return lineclient.replyMessage(event.replyToken, echo);
    // return lineclient.pushMessage(event.source.userId,echo);
    

// listen on port
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`listening on ${port}`);
// });


module.exports = {
    webhook: webhookImp
}