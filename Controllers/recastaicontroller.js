'use strict';

const configs = require('../configs');
const recastai = require('recastai');

//cd973b470a75d81dd8da60c9b20f3bd2

function testRecast(msg){
    //call recast ->>
    // var request = new recastai.request(configs.recastconfig)
    // console.log(request)

    var build = new recastai.build(configs.recastconfig, 'en')
    return build.dialog({ type: 'text', content: msg})
    
}


module.exports = {
    recastAI: testRecast
}