import fs from 'fs';
import path from 'path';

import {smarthome} from 'actions-on-google';
import { GoogleCommandExecute, DeviceCommandCodeTuya, GoogleDeviceTraits, GoogleDeviceTypes} from './appConsts.js';
import {getToken, getDeviceInfo, getRequestSign, executeDeviceCommands} from './tuya-rest.js';
 
 
import express2 from 'express';
import bodyParser from  'body-parser';
//const { TuyaContext  } =  require('tuya');
import { google} from 'googleapis';
import crypto from 'crypto';
import axios from 'axios';
import qs from 'qs';
import  util from 'util';
import admin from 'firebase-admin';

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

await getToken();
let USER_ID = 0;

function CheckDevice(element)  {
  switch(element.typeDevice) {
    case 'normor': 
    case 'dimmer':
    case 'color':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.LIGHT,
        traits: [
          GoogleDeviceTraits.Brightness,
          GoogleDeviceTraits.OnOff,
         GoogleDeviceTraits.ColorSetting
        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    case 'ver_curtain':
    case 'hor_curtain':
    case 'hor_curtain_right':
    case 'hor_curtain_left':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.CURTAIN,
        traits: [
          GoogleDeviceTraits.OpenClose
        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    case 'desk_fan':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.FAN,
        traits: [
          GoogleDeviceTraits.FanSpeed,
          GoogleDeviceTraits.OnOff
        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    case 'nebulizer':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.HUMIDIFIER,
        traits: [
          GoogleDeviceTraits.FanSpeed,
          GoogleDeviceTraits.OnOff,
          GoogleDeviceTraits.StartStop,
          GoogleDeviceTraits.HumiditySetting
        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    case 'air_purifier':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.AIRPURIFIER,
        traits: [
          GoogleDeviceTraits.FanSpeed,
          GoogleDeviceTraits.OnOff,
          GoogleDeviceTraits.SensorState
        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    case 'normor_condition':
    case 'cassette_condition':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.AIRCOOLER,
        traits: [
          GoogleDeviceTraits.FanSpeed,
          GoogleDeviceTraits.OnOff,
          GoogleDeviceTraits.TemperatureSetting,
          GoogleDeviceTraits.HumiditySetting
        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    case 'plant_condition':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.AC_UNIT,
        traits: [
          GoogleDeviceTraits.FanSpeed,
          GoogleDeviceTraits.OnOff,
          GoogleDeviceTraits.TemperatureSetting
        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    case 'tivi':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.TV,
        traits: [
          GoogleDeviceTraits.AppSelector,
          GoogleDeviceTraits.InputSelector,
          GoogleDeviceTraits.MediaState,
          GoogleDeviceTraits.OnOff,
          GoogleDeviceTraits.TransportControl,
          GoogleDeviceTraits.Volume,
          GoogleDeviceTraits.Channel
        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    case 'motion_sensor':
    case 'humidity_sensor':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.SENSOR,
        traits: [
          GoogleDeviceTraits.SensorState,
          GoogleDeviceTraits.EnergyStorage
        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    case 'water_heater':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.WATERHEATER,
        traits: [
          GoogleDeviceTraits.TemperatureControl,
          GoogleDeviceTraits.EnergyStorage
        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    // case 'kitchen_hood':
    //   return dev = {
    //     id: element.devId,
    //     type: 'action.devices.types.' + GoogleDeviceTypes.WATERHEATER,
    //     traits: [
    //       GoogleDeviceTraits.TemperatureControl,
    //       GoogleDeviceTraits.EnergyStorage
    //     ],
    //     name: {
    //       defaultNames: [element.name],
    //       name: element.name,
    //       nicknames: [element.name]  
    //     }  
    //   };
    case 'vacuum_cleaner':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.VACUUM,
        traits: [
          GoogleDeviceTraits.StartStop,
          GoogleDeviceTraits.Dock,
          GoogleDeviceTraits.EnergyStorage,
          GoogleDeviceTraits.Locator,
          GoogleDeviceTraits.OnOff,
          GoogleDeviceTraits.RunCycle,
        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    case 'washing_machine':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.WASHER,
        traits: [
          GoogleDeviceTraits.StartStop,
          GoogleDeviceTraits.RunCycle,
          GoogleDeviceTraits.Modes,
          GoogleDeviceTraits.Toggles,
          GoogleDeviceTraits.OnOff
        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    case 'fridge':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.REFRIGERATOR,
        traits: [
          GoogleDeviceTraits.TemperatureControl

        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    case 'balcony_door':
    case 'main_door':
      return dev = {
        id: element.devId,
        type: 'action.devices.types.' + GoogleDeviceTypes.DOOR,
        traits: [
          GoogleDeviceTraits.OpenClose,
          GoogleDeviceTraits.LockUnlock

        ],
        name: {
          defaultNames: [element.name],
          name: element.name,
          nicknames: [element.name]  
        }  
      };
    default:
      return null;
  }
  
  
}


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
    // "authorization": req.authorization,
    "authorization" : "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBhc3BuZXRib2lsZXJwbGF0ZS5jb20iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IjhhMzUzYjk3LWVjY2EtZTk0NS0xY2U1LTM5ZmY5OTFmNTEwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJBZG1pbiIsIkNpdGl6ZW5NYW5hZ2VyIl0sInN1YiI6IjEiLCJqdGkiOiJlOTk1MDA1NS0wMzAzLTQ5ZDMtODdiZC0wMGZiNWI3MWM5MjAiLCJpYXQiOjE2NDk4NDI5NjUsIm5iZiI6MTY0OTg0Mjk2NSwiZXhwIjoxNjQ5OTI5MzY1LCJpc3MiOiJNSFBRIiwiYXVkIjoiTUhQUSJ9.Ca4yNr_TQYBe7feIA2aj9wlg8k-ZAXsrt09I-bchWC0",
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
        var dev = CheckDevice(element);
        if(dev != null) {
          a.payload.devices.push(dev);
        }
      
      });
      }
     });
    console.log("Device Rest=======================", a, JSON.stringify(a));
    return a;
 }
 
 
 const app = smarthome();
 
 app.onSync( async (body, req) =>   {
  // console.log('Onsync body==============================', body);
  // console.log('Onsync  reqs==============================', req);
  // var a = await fect(body, req);
  // console.log("return fect =======================",JSON.stringify(a));
  // return a;
  return {
    requestId: body.requestId,
    payload: {
      agentUserId: USER_ID,
      devices: [{
        id: 'washer',
        type: 'action.devices.types.WASHER',
        traits: [
          'action.devices.traits.OnOff',
          'action.devices.traits.StartStop',
          'action.devices.traits.RunCycle',
        ],
        name: {
          defaultNames: ['My Washer'],
          name: 'Washer',
          nicknames: ['Washer'],
        }
      }, {
        id: 'light',
        type: 'action.devices.types.LIGHT',
        traits: [
          'action.devices.traits.Brightness',
          'action.devices.traits.OnOff',
          'action.devices.traits.ColorSetting'
        ],
        name: {
          defaultNames: [`Smart Lamp`],
          name: 'Smart Lamp',
          nicknames: ['abc']         
        }     
      }],
    },
  };
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

   const comd = {
    commands: [
    ]
  }

  
   
   const executePromises = [];
   const intent = body.inputs[0];
   for (const command of intent.payload.commands) {
     for (const device of command.devices) {
       for (const execution of command.execution) {
          switch(execution.command) {
            case GoogleCommandExecute.OnOff :
              comd.commands.push({
                "code": "switch_led",
                "value": execution.params.on
              })
          }
          var devices = await executeDeviceCommands('vdevo164845359620175',comd);
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
 
