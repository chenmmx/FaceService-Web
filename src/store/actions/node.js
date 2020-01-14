import nodeService from '@/services/node.service';

const actionName = 'node';

export const GET_NODE_LIST = 'GET_NODE_LIST';

export const getNodeListAction = (data) => ({
  type: GET_NODE_LIST,
  actionName,
  data
});

// 获取摄像机列表
export const getNodeList = (formData) => async (dispatch) => {
  const {
    pageIndex, pageSize, applyId, name
  } = formData;
  try {
    let res = await nodeService.getListByPage({
      pageIndex, pageSize, applyId, name
    });
    if (res.status === 0) {
      dispatch(getNodeListAction(res.result));
    } else {
      console.log('error', res.errorMsg);
    }
  } catch (error) {
    console.log('error', error);
  }
};
