import cameraService from '@/services/camera.service';

const actionName = 'camera';

export const GET_CAMERA_LIST = 'GET_CAMERA_LIST';

export const getCameraListAction = (data) => ({
  type: GET_CAMERA_LIST,
  actionName,
  data
});

// 获取摄像机列表
export const getCameraList = (formData) => async (dispatch) => {
  const {
    pageIndex, pageSize, applyId, name
  } = formData;
  let res = await cameraService.getListByPage({
    pageIndex, pageSize, applyId, name
  });
  if (res.status === 0) {
    dispatch(getCameraListAction(res.result));
  } else {
    console.log('error', res.errorMsg);
  }
};
