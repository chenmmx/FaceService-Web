import handleService from './common.service';

const prefix = '/api/Users';

const url = {
  add: `${prefix}/Add`,
  update: `${prefix}/Update`,
  delete: `${prefix}/Delete`,
  getInfo: `${prefix}/Get`,
  getListByPage: `${prefix}/GetListByPage`
};

export default {
  add(data) {
    return handleService(url.add, data, 'POST');
  },
  update(data) {
    handleService(url.update, data, 'PUT');
  },
  delete(data) {
    handleService(url.delete, data, 'DELETE');
  },
  getInfo(data) {
    handleService(url.getInfo, data);
  },
  getListByPage(data) {
    handleService(url.getListByPage, data);
  }
};
