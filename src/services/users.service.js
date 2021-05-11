import axios from 'axios';
import AppID from 'ibmcloud-appid-js';

const appID = new AppID();

const getAppID = async () => {
  if (!appID.initialized) {
    await appID.init({
      clientId: 'd6c47e1c-d540-4ea1-a00b-f642da77d426',
      discoveryEndpoint: 'https://us-south.appid.cloud.ibm.com/oauth/v4/463ecc77-cba1-432f-a5ac-a62a9e795cca/.well-known/openid-configuration',
    });
  }
  return appID;
}

const AppIDLogin = () => getAppID().then((api) => api.signin());

const getUser = ({ token }) => getAppID().then((api) => api.getUserInfo(token));

const getUserValues = ({ token }) =>
  axios.get('https://us-south.appid.cloud.ibm.com/api/v1/attributes', {
    headers: { 'Authorization': `Bearer ${token}` },
  });

const service = {
  AppIDLogin,
  getUser,
  getUserValues,
};

export default service;
