/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


 'use strict';

 //const functions = require('firebase-functions');
 const {smarthome, SmartHomeV1ExecuteResponseCommands} = require('actions-on-google');
 
 //const { TuyaContext  } =  require('tuya');
 const {google} = require('googleapis');
 const crypto = require('crypto');
 const axios = require('axios');
 const qs = require('qs');
 const util = require('util');
 const admin = require('firebase-admin');
 
const { TuyaContext  } = require('@tuya/tuya-connector-nodejs');
 // Initialize Firebase
 admin.initializeApp();
 //const firebaseRef = admin.database().ref('/');
 // Initialize Homegraph
 const auth = new google.auth.GoogleAuth({
   keyFilename: 'smart-home-key.json',
   scopes: ['https://www.googleapis.com/auth/homegraph'],
 });
 const homegraph = google.homegraph({
   version: 'v1',
   auth: auth,
 });
 // Hardcoded user ID
 const USER_ID = '123';
 
 var http = require('http');
 var express = require('express');
 var eapp = express();
 eapp.use(express.json())
 eapp.use(express.urlencoded({extended: true}))


  var user = {
    username: null,
    password: null
  }
 
 eapp.all('/login*', function(request, response) {
   console.log('Intercepting requests ...',request.query);
   console.log('Intercepting body ...',request.body);
   console.log('Intercepting header ...',request.headers);
 
   if (request.method === 'GET') {
     console.log('Requesting login page');
     response.send(`
     <html>
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <body>
         <form action="/login" method="post">
           <input type="hidden"
             name="responseurl" value="${request.query.responseurl}" />
             <input  
             name="username"  value="${request.query.username}" />
             <input  
             name="password"  value="${request.query.password}" />
           <button type="submit" style="font-size:14pt">
             Link this service to Google
           </button>
         </form>
       </body>
     </html>
    `);
   } else if (request.method === 'POST') {
    console.log('POST requests ...',request.query);
    console.log('POST body ...',request.body);
     user.username = request.body.username;
     user.password = request.body.password;
     const responseurl = decodeURIComponent(request.body.responseurl);
     console.log(`Redirect to ${responseurl}`);
     console.log('USER +++++++++++++++',user);
     return response.redirect(responseurl);
   } else {
     // Unsupported method
     response.send(405, 'Method Not Allowed');
   }
 
 });
 
 
 eapp.all('/fakeauth*', function(request, response) {
   console.log('Intercepting requests ...',request.query);
   console.log('Intercepting body ...',request.body);
   console.log('Intercepting header ...',request.headers);
 
   const responseurl = util.format('%s?code=%s&state=%s',
   decodeURIComponent(request.query.redirect_uri), 'xxxxxx',
   request.query.state);
   console.log(`Set redirect as ${responseurl}`);
 return response.redirect(
   `/login?responseurl=${encodeURIComponent(responseurl)}`);
 
 });

 
const fetch = require('node-fetch');

 eapp.all('/faketoken*', function(request, response) {
   console.log('Intercepting requests ...',request.query);
   console.log('Intercepting body ...',request.body);
   console.log('Intercepting header ...',request.headers);
 
   const grantType = request.query.grant_type ?
     request.query.grant_type : request.body.grant_type;
   const secondsInDay = 86400; // 60 * 60 * 24
   const HTTP_STATUS_OK = 200;
   console.log(`Grant type ${grantType}`);
   var loginbody = {
    userNameOrEmailAddress : user.username,
    password: user.password,
    rememberClient: true
   }
   
  fetch("http://103.229.41.59/api/TokenAuth/Authenticate", {
  "headers": {
    "accept": "text/plain",
    "accept-language": "vi",
    "authorization": "null",
    "content-type": "application/json-patch+json",
   
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": JSON.stringify(loginbody),
  "method": "POST"
  }) .then(res => res.text())
  .then(text => {
    console.log("Fetch =======================",text);
    text = JSON.parse(text);
   let obj;
   if (grantType === 'authorization_code') {
     obj = {
       token_type: 'bearer',
       access_token: text.result.accessToken,
       refresh_token: '123refresh',
       expires_in: secondsInDay,
     };
    } else if (grantType === 'refresh_token') {
     obj = {
       token_type: 'bearer',
       access_token: text.result.accessToken,
       expires_in: secondsInDay,
      };
    }
    response.status(HTTP_STATUS_OK)
       .json(obj);
  });
   

 
 });
 
 async function fect(body, req)
 {
  let a = {
    requestId: body.requestId,
    payload: {
      agentUserId: USER_ID,
      devices: [],
    },
   };
 
   await fetch("https://imax.accesscam.org/api/services/app/UserSmartHome/GetAllDeviceActions", {
  "headers": {
    "accept": "*/*",
    "accept-language": "vi",
    "authorization": req.authorization,
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Microsoft Edge\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
  })
  .then(x => x.json())
  .then(res => {
    
    console.log("Fetch Onsync =======================",res);
    if(res.result.success && res.result.data !== null ) {
      res.result.data.forEach(element => {
        var dev = {
          id: element.devId,
          type: 'action.devices.types.LIGHT',
          traits: [
            'action.devices.traits.Brightness',
            'action.devices.traits.OnOff',
            'action.devices.traits.ColorSetting'
          ],
          name: {
            defaultNames: [element.name],
            name: element.name,
            nicknames: [element.name]  
          }  
        };
        a.payload.devices.push(dev);
        console.log("Device deva =======================",dev, a);
      });
      }
     });
    console.log("Device Rest=======================",a, JSON.stringify(a));
    return a;
 }
 
 
 const app = smarthome();
 
 app.onSync( async (body, req) =>   {
  console.log('Onsync body==============================', body);
  console.log('Onsync  reqs==============================', req);
  var a = await fect(body, req);
  console.log("return fect =======================",JSON.stringify(a));
  return a;
  });
 
  var storeState = { on: true,
   isPaused: false,
   isRunning: false
 };
 
 
 const queryFirebase = async (deviceId) => {
   // const snapshot = await firebaseRef.child(deviceId).once('value');
   // const snapshotVal = snapshot.val();
   console.log("deviceId--", deviceId);
   return {
     on: storeState.on,
     isPaused: storeState.isPaused,
     isRunning: storeState.isRunning,
   };
 };

 const queryDevice = async (deviceId) => {
   const data = await queryFirebase(deviceId);
   return {
     on: data.on,
     isPaused: data.isPaused,
     isRunning: data.isRunning,
     currentRunCycle: [{
       currentCycle: 'rinse',
       nextCycle: 'spin',
       lang: 'en',
     }],
     currentTotalRemainingTime: 1212,
     currentCycleRemainingTime: 301,
   };
 };
 
 app.onQuery(async (body) => {
   const {requestId} = body;
   const payload = {
     devices: {},
   };
   const queryPromises = [];
   const intent = body.inputs[0];
   for (const device of intent.payload.devices) {
     const deviceId = device.id;
     queryPromises.push(
         queryDevice(deviceId)
             .then((data) => {
               // Add response to device payload
               payload.devices[deviceId] = data;
             }) );
   }
   // Wait for all promises to resolve
   await Promise.all(queryPromises);
   return {
     requestId: requestId,
     payload: payload,
   };
 });
 
 const updateDevice = async (execution, deviceId) => {
   const {params, command} = execution;
   let state; let ref;
   switch (command) {
     case 'action.devices.commands.OnOff':
       state = {on: params.on};
       //ref = firebaseRef.child(deviceId).child('OnOff');
       storeState.on = state.on;
       break;
     case 'action.devices.commands.StartStop':
       state = {isRunning: params.start};
       //ref = firebaseRef.child(deviceId).child('StartStop');
       storeState.isRunning = state.isRunning;
       break;
     case 'action.devices.commands.PauseUnpause':
       state = {isPaused: params.pause};
       //ref = firebaseRef.child(deviceId).child('StartStop');
       storeState.isPaused = state.isPaused;
       break;
   }
 
   // return ref.update(state)
   //     .then(() => state);
   return state;
 };

 
const tuya = new TuyaContext({
  baseUrl: 'https://openapi.tuyaus.com',
  accessKey: 'e4jy8n7vbgyaed6egzyz',
  secretKey: '69e41276e66649d1b2a8a42df3e7ced3',
});

const device =  tuya.device.detail({
  device_id: '4720106698f4abbc86b4'
});

let token = '';

const httpClient = axios.create({
  baseURL: 'https://openapi.tuyaus.com',
  timeout: 5 * 1e3,
});

async function encryptStr(str, secret) {
  return crypto.createHmac('sha256', secret).update(str, 'utf8').digest('hex').toUpperCase();
}

 async function getToken() {
  const method = 'GET';
  const timestamp = Date.now().toString();
  const signUrl = '/v1.0/token?grant_type=1';
  const contentHash = crypto.createHash('sha256').update('').digest('hex');
  const stringToSign = [method, contentHash, '', signUrl].join('\n');
  const signStr = 'e4jy8n7vbgyaed6egzyz' + timestamp + stringToSign;

  const headers = {
    t: timestamp,
    sign_method: 'HMAC-SHA256',
    client_id: 'e4jy8n7vbgyaed6egzyz',
    sign: await encryptStr(signStr, '69e41276e66649d1b2a8a42df3e7ced3'),
  };
  var login = await httpClient.get('/v1.0/token?grant_type=1', { headers });
  if (!login || !login.success) {
    // throw Error(`fetch failed: ${login.msg}`);
  }
  console.log("Login Tuya =========================", login.data);
  token = login.data.result.access_token;
}

async function getRequestSign(
  path,
  method,
  headers = {},
  query = {},
  body = {},
) {
  const t = Date.now().toString();
  const [uri, pathQuery] = path.split('?');
  const queryMerged = Object.assign(query, qs.parse(pathQuery));
  const sortedQuery = {};
  Object.keys(queryMerged)
    .sort()
    .forEach((i) => (sortedQuery[i] = query[i]));

  const querystring = decodeURIComponent(qs.stringify(sortedQuery));
  const url = querystring ? `${uri}?${querystring}` : uri;
  const contentHash = crypto.createHash('sha256').update(JSON.stringify(body)).digest('hex');
  const stringToSign = [method, contentHash, '', url].join('\n');
  const signStr = 'e4jy8n7vbgyaed6egzyz' + token + t + stringToSign;
  return {
    t,
    path: url,
    client_id: 'e4jy8n7vbgyaed6egzyz',
    sign: await encryptStr(signStr, '69e41276e66649d1b2a8a42df3e7ced3'),
    sign_method: 'HMAC-SHA256',
    access_token: token,
  };
}


async function getDeviceInfo(deviceId) {
  const query = {};
  const method = 'GET';
  const url = `/v1.1/iot-03/devices/${deviceId}`;
  const reqHeaders = await getRequestSign(url, method, {}, query);
  console.log("Header tuya =========================", reqHeaders);
  const  data  = await httpClient.request({
    method,
    data: {},
    params: {},
    headers: reqHeaders,
    url: reqHeaders.path,
  });

  console.log("Get device Tuya =========================", data.data);
  
}
 


 app.onExecute(async (body) => {
   const {requestId} = body;
   // Execution results are grouped by status
   //const commands: SmartHomeV1ExecuteResponseCommands[] = [];
   const result = {
     ids: [],
     status: 'SUCCESS',
     states: {
       online: true,
     },
   };

   const xxx = await getToken();
   var devices = await getDeviceInfo('6cd418b92db0844e00us78');
 
/// console.log(JSON.stringify(xxx, null, 2));


   const executePromises = [];
   const intent = body.inputs[0];
   for (const command of intent.payload.commands) {
     for (const device of command.devices) {
       for (const execution of command.execution) {
         executePromises.push(
             updateDevice(execution, device.id)
                 .then((data) => {
                   result.ids.push(device.id);
                   Object.assign(result.states, data);
                 })
                 .catch(() => console.error('EXECUTE', device.id)));
       }
     }
   }
 
   await Promise.all(executePromises);
   return {
     requestId: requestId,
     payload: {
       commands: [result],
     },
   };
 });
 
 app.onDisconnect((body, headers) => {
   console.log('User account unlinked from Google Assistant');
   // Return empty response
   return {};
 });
 

 
 eapp.all('/requestsync*', async function(request, response) {
   response.set('Access-Control-Allow-Origin', '*');
   console.info(`Request SYNC for user ${USER_ID}`);
   try {
     const res = await homegraph.devices.requestSync({
       requestBody: {
         agentUserId: USER_ID,
       },
     });
     console.info('Request sync response:', res.status, res.data);
     response.json(res.data);
   } catch (err) {
     console.error(err);
     response.status(500).send(`Error requesting sync: ${err}`);
   }
 });
 
 eapp.all('/*', function(req, res, next) {
   console.error('Intercepting requests ...',req.query);
   console.error('Intercepting body ...',req.body);
   console.error('Intercepting header ...',req.headers);
   next();  // call next() here to move on to next middleware/router
 });
 
 var httpServer = http.createServer(eapp);
 httpServer.listen(8080);
 
 
 
 
 const express2 = require('express')
 const bodyParser = require('body-parser')
 
 // ... app code here
 
 const expressApp = express2().use(bodyParser.json())

 
 expressApp.all('/*', function(req, res, next) {
   console.error('Intercepting requests ...',req.url);
   console.error('Intercepting requests ...',req.query);
   console.error('Intercepting body ...',JSON.stringify(req.body));
   console.error('Intercepting header ...',req.headers);
   next();  // call next() here to move on to next middleware/router
 });
 
 expressApp.post('/fulfillment', app)
 
 
 
 expressApp.listen(3000)
 
