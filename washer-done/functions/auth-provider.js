
import util from 'util';

import express from 'express';
import fetch  from 'node-fetch';
import http from 'http';
// const admin = require('firebase-admin');
 
// const { TuyaContext  } = require('@tuya/tuya-connector-nodejs');
//  // Initialize Firebase
//  admin.initializeApp();
//  //const firebaseRef = admin.database().ref('/');
//  // Initialize Homegraph
//  const auth = new google.auth.GoogleAuth({
//    keyFilename: 'smart-home-key.json',
//    scopes: ['https://www.googleapis.com/auth/homegraph'],
//  });
//  const homegraph = google.homegraph({
//    version: 'v1',
//    auth: auth,
//  });
/**
 * A function that gets the user id from an access token.
 * Replace this functionality with your own OAuth provider.
 *
 * @param headers HTTP request headers
 * @return The user id
 */


const app = express();

let user = {
    username: null,
    password: null
  }
  
// app.get('/login', (request, res) => {
//     res.send(`<html>
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <body>
//       <form action="/login" method="post">
//         <input type="hidden"
//           name="responseurl" value="${request.query.responseurl}" />
//           <input  
//           name="username"  value="${request.query.username}" />
//           <input  
//           name="password"  value="${request.query.password}" />
//         <button type="submit" style="font-size:14pt">
//           Link this service to Google
//         </button>
//       </form>
//     </body>
//   </html>
//   `);
// });

// app.post('/login', async (request, response) => {
//     console.log('POST requests ...',request.query);
//     console.log('POST body ...',request.body);
//      user.username = request.body.username;
//      user.password = request.body.password;
//      const responseurl = decodeURIComponent(request.body.responseurl);
//      console.log(`Redirect to ${responseurl}`);
//      console.log('USER +++++++++++++++',user);
//      return response.redirect(responseurl);
// });

// app.all('/fakeauth*', function(request, response) {
//   console.log('Intercepting requests ...',request.query);
//   console.log('Intercepting body ...',request.body);
//   console.log('Intercepting header ...',request.headers);

//   const responseurl = util.format('%s?code=%s&state=%s',
//   decodeURIComponent(request.query.redirect_uri ), 'xxxxxx',
//   request.query.state);
//   console.log(`Set redirect as ${responseurl}`);
//   return response.redirect(
//   `/login?responseurl=${encodeURIComponent(responseurl)}`);

// });

app.all('/login*', function(request, response) {
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
          <button type="submit" style="font-size:14pt">
            Link this service to Google
          </button>
        </form>
      </body>
    </html>
  `);
  } else if (request.method === 'POST') {
    // Here, you should validate the user account.
    // In this sample, we do not do that.
    const responseurl = decodeURIComponent(request.body.responseurl);
    console.log(`Redirect to ${responseurl}`);
    return response.redirect(responseurl);
  } else {
    // Unsupported method
    response.send(405, 'Method Not Allowed');
  }

});


app.all('/fakeauth*', function(request, response) {
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


app.all('/faketoken*', function(request, response) {

  console.log('Intercepting requests ...',request.query);
  console.log('Intercepting body ...',request.body);
  console.log('Intercepting header ...',request.headers);

  const grantType = request.query.grant_type ?
    request.query.grant_type : request.body.grant_type;
  const secondsInDay = 86400; // 60 * 60 * 24
  const HTTP_STATUS_OK = 200;
  console.log(`Grant type ${grantType}`);

  let obj;
  if (grantType === 'authorization_code') {
    obj = {
      token_type: 'bearer',
      access_token: '123access',
      refresh_token: '123refresh',
      expires_in: secondsInDay,
    };
  } else if (grantType === 'refresh_token') {
    obj = {
      token_type: 'bearer',
      access_token: '123access',
      expires_in: secondsInDay,
    };
  }
  response.status(HTTP_STATUS_OK)
      .json(obj);
  
    // console.log('Intercepting requests ...',request.query);
    // console.log('Intercepting body ...',request.body);
    // console.log('Intercepting header ...',request.headers);
  
    // const grantType = request.query.grant_type ?
    //   request.query.grant_type : request.body.grant_type;
    // const secondsInDay = 86400; // 60 * 60 * 24
    // const HTTP_STATUS_OK = 200;
    // console.log(`Grant type ${grantType}`);
    // var loginbody = {
    //  userNameOrEmailAddress : user.username,
    //  password: user.password,
    //  rememberClient: true
    // }
    
    
  //  fetch("http://103.229.41.59/api/TokenAuth/Authenticate", {
  //  "headers": {
  //    "accept": "text/plain",
  //    "accept-language": "vi",
  //    "authorization": "null",
  //    "content-type": "application/json-patch+json",
    
  //    "Referrer-Policy": "strict-origin-when-cross-origin"
  //  },
  //  "body": JSON.stringify(loginbody),
  //  "method": "POST"
  //  }) .then(res => res.text())
  //  .then(text => {
  //    console.log("Fetch =======================",text);
  //    text = JSON.parse(text);
  //   let obj;
  //   if (grantType === 'authorization_code') {
  //     obj = {
  //       token_type: 'bearer',
  //       access_token: text.result.accessToken,
  //       refresh_token: '123refresh',
  //       expires_in: secondsInDay,
  //     };
  //    } else if (grantType === 'refresh_token') {
  //     obj = {
  //       token_type: 'bearer',
  //       access_token: text.result.accessToken,
  //       expires_in: secondsInDay,
  //      };
  //    }
  //    response.status(HTTP_STATUS_OK)
  //       .json(obj);
  //  });
});

 
app.all('/requestsync*', async function(request, response) {
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

app.all('/*', function(req, res, next) {
  console.error('Intercepting requests ...',req.query);
  console.error('Intercepting body ...',req.body);
  console.error('Intercepting header ...',req.headers);
  next();  // call next() here to move on to next middleware/router
});

var httpServer = http.createServer(app);
httpServer.listen(8080);