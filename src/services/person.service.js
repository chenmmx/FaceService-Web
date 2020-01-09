import handleService from './common.service';


const prefix = '/api/Person';

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
  }
};
