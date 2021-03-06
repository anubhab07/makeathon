var Request = require("request");
var request = require('sync-request');
url = 'http://35.196.31.164:8080/api/qa';

exports.validateUser = function(userId) {
    return 'TATA';
}

exports.answerQuestion = function(question) {
    return 'You have 5 leaves';
}
exports.getGkQuestionToken = function(question, context, type=2) {
    let params = {"context":context, "question":question, "type":type};
    var response = request('POST','http://35.196.31.164:8000/api/post-question',{json:params});
    // console.log(response);
    return (JSON.parse(response.body).request_id);
}
exports.getAnswer = function(token) {
    var response = request('GET','http://35.196.31.164:8000/api/get-answer/'+token);
    return (JSON.parse(response.body).answer);
}

exports.testPython = function(question) {
    var response = request('POST','http://35.196.31.164:8080/api/qa');
        // console.log("Status Code (function) : "+response);
        return (JSON.parse(response.body).answer);
}

exports.getAnswerDirectly = function(question, context,twiml, type=2) {
    let params = {"context":context, "question":question, "type":type};
    return new Promise(function(resolve, reject){
        Request.post({
            "headers": { "content-type": "application/json" },
            "url": "http://35.196.31.164:8000/api/qa",
            "body": JSON.stringify(params)
        }
          , function (error, response, body) {
                if (error)  return reject(error);
                try {
                    // JSON.parse() can throw an exception if not valid JSON
                    twiml.say(JSON.parse(body).answer);
                    resolve(JSON.parse(body).answer);
                } catch(e) {
                    reject(e);
                }
        });
    });
}

// function testUser(userId) {
//     var userData = JSON.parse(require('fs').readFileSync('user.json', 'utf8'));
//     return userData
// }

// console.log(testUser(1234))


function testPython2() {
    return Request.post({
        "headers": { "content-type": "application/json" },
        "url": "http://35.196.31.164:8080/api/qa",
        "body": ""
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        // console.dir(JSON.parse(body).answer);
        console.log(response.body)
        return  response.body.answer;
    });
}
function testPython3(question, context, type=2) {
    let params = {"context":context, "question":question, "type":type};
    return new Promise(function(resolve, reject){
        Request.post({
            "headers": { "content-type": "application/json" },
            "url": "http://35.196.31.164:8000/api/qa",
            "body": JSON.stringify(params)
        }
          , function (error, response, body) {
                if (error)  return reject(error);
                try {
                    // JSON.parse() can throw an exception if not valid JSON
                    resolve(JSON.parse(body).answer);
                } catch(e) {
                    reject(e);
                }
        });
    });
}

function tp4(question, context, type=2){
    let params = {"context":context, "question":question, "type":type};
    var response = request('POST','http://35.196.31.164:8000/api/qa',{json:params});
    // console.log("Status Code (function) : "+response);
    console.log(response.statusCode);
    return (JSON.parse(response.body).answer);
}

// console.log(testPython3())
// testPython3().then(function(val){
//     console.log(val);
// }).catch()

// const request = async () => {
//     const resp = await fetch('http://35.196.31.164:8080/api/qa');
//     const json = await resp.json();
//     console.log(json)
// }

// // request();
// testPython3("When did he founded infosys?", "narayana murthy", 2).then(functionn(a) {
//     console.log(a);
// });
// testPython3("When did he founded infosys?", "narayana murthy", 2).then(function(val){
//     console.log(val);
// }).catch()



// console.log(tp4("When did he founded infosys?", "narayana murthy", 2));
// console.log('after');
