import handleService from './common.service';


const prefix = '/api/Devices';

const url = {
  add: `${prefix}`,
  update: `${prefix}`,
  delete: `${prefix}`,
  getInfo: `${prefix}`,
  getListByPage: `${prefix}`
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
    return handleService(`${url.getInfo}/${data}`, {});
  },
  getListByPage(data) {
    return handleService(url.getListByPage, data);
  }
};
