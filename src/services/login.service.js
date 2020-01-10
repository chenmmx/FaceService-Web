import handleService from './common.service';

const prefix = '/api/Authenticate';

const url = {
  login: `${prefix}/Login`
};

export default {
  login(data) {
    return handleService(url.login, data, 'POST');
  }
};
