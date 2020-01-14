import redpupilService from '@/services/redpupil.service';

const actionName = 'redpupil';

export const GET_REDPUPIL_LIST = 'GET_REDPUPIL_LIST';

export const getRedpupilListAction = (data) => ({
  type: GET_REDPUPIL_LIST,
  actionName,
  data
});

// 获取赤眸列表
export const getRedpupilList = (formData) => async (dispatch) => {
  const {
    pageIndex, pageSize, applyId, name
  } = formData;
  let res = await redpupilService.getListByPage({
    pageIndex, pageSize, applyId, name
  });
  if (res.status === 0) {
    dispatch(getRedpupilListAction(res.result));
  } else {
    console.log('error', res.errorMsg);
  }
};
