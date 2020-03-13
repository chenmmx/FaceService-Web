import handleService from './common.service';


const prefix = '/api/DevicesParame';


export default {
  update(data) {
    return handleService(prefix, data, 'XPUT');
  },
  getInfo(data) {
    return handleService(`${prefix}/deviceid`, data);
  }
};
