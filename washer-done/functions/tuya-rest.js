
import {TuyaContext}  from '@tuya/tuya-connector-nodejs';
import crypto from 'crypto';
import axios from 'axios';
import qs from 'qs';
import  util from 'util';

const tuya = new TuyaContext({
    baseUrl: 'https://openapi.tuyaus.com',
    accessKey: 'e4jy8n7vbgyaed6egzyz',
    secretKey: '69e41276e66649d1b2a8a42df3e7ced3',
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
    return data;
    
  }

  async function executeDeviceCommands(deviceId, commands) {
    const query = {};
    const method = 'POST';
    const url = `/v1.0/devices/${deviceId}/commands`;
    const reqHeaders = await getRequestSign(url, method, {}, query);
    console.log("Header tuya =========================", reqHeaders);
    const  data  = await httpClient.request({
      method,
      data: commands,
      params: {},
      headers: reqHeaders,
      url: reqHeaders.path,
    });
  
    console.log("Get device Tuya =========================", data.data);
    
  }
   
  