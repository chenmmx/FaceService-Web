import handleService from './common.service';


const prefix = '/api/Nodes';


export default {
  add(data) {
    return handleService(prefix, data, 'POST');
  },
  update(data) {
    return handleService(prefix, data, 'PUT');
  },
  delete(data) {
    return handleService(prefix, data, 'DELETE');
  },
  getInfo(data, id) {
    return handleService(`${prefix}/${id}`, data);
  },
  getListByPage(data) {
    return handleService(prefix, data);
  }
};
