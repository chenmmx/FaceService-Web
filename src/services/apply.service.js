import handleService from './common.service';

const prefix = '/api/Apply';

const url = {
  add: `${prefix}/Add`,
  update: `${prefix}/Update`,
  delete: `${prefix}/Delete`,
  getInfo: `${prefix}/Get`,
  getListByPage: `${prefix}/GetListByPage`,
  getCallback: `${prefix}/GetCallback`,
  setCallback: `${prefix}/setCallback`
};

export default {
  add(data) {
    return handleService(url.add, data, 'POST');
  },
  update(data) {
    return handleService(url.update, data, 'PUT');
  },
  delete(data) {
    return handleService(url.delete, data, 'DELETE');
  },
  getInfo(data) {
    return handleService(url.getInfo, data);
  },
  getListByPage(data) {
    return handleService(url.getListByPage, data);
  },
  getCallback(data) {
    return handleService(url.getCallback, data);
  },
  setCallback(data) {
    return handleService(url.setCallback, data, 'XPOST');
  }
};
