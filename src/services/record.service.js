import handleService from './common.service';


const Redpupil = '/api/RedpupilRecord';
const Camera = '/api/CameraRecord';

const url = {
  add: `${Redpupil}/Add`,
  delete: `${Redpupil}/Delete`,
  getListByPage: `${Redpupil}/GetListByPage`
};
const cUrl = {
  add: `${Camera}/Add`,
  delete: `${Camera}/Delete`,
  getListByPage: `${Camera}/GetListByPage`
};

export default {
  // 赤眸记录
  addRedpupil(data) {
    return handleService(url.add, data, 'POST');
  },
  deleteRedpupil(data) {
    return handleService(url.delete, data, 'DELETE');
  },
  getListByPageRedpupil(data) {
    return handleService(url.getListByPage, data);
  },
  // 摄像机记录
  addCamera(data) {
    return handleService(cUrl.add, data, 'POST');
  },
  deleteCamera(data) {
    return handleService(cUrl.delete, data, 'DELETE');
  },
  getListByPageCamera(data) {
    return handleService(cUrl.getListByPage, data);
  }
};
