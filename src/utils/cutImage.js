/*
裁剪照片
*/
let imgWidth = '';
let imgHeight = '';
let colorFace = '';
let img = new Image();
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
// 获取画布图片
const toColor = () => {
  let imageData = context.getImageData(0, 0, imgWidth, imgHeight);
  return imageData;
};
// 检测是否为ie浏览器
const isIE = () => {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return true;
  }
  return false;
};
  // 文件转为base64
const base64ToFile = (base64) => {
  let arr = base64.split(',');
  let mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
  // 去掉url头，转换为byte
  let bytes = atob(arr[1]);
  // 处理异常，将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  // 生成视图，8位无符号整数，长度1个字节
  let ia = new Uint8Array(ab);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  if (isIE()) {
    return new Blob([ab], `${new Date().getTime()}.jpeg`, {
      type: mime
    });
  }
  return new File([ab], `${new Date().getTime()}.jpeg`, {
    type: mime
  });
};
  // 剪切有颜色的脸
const cutColorFace = (x, y, width, height) => {
  let rWidth = width * 1.4;
  let rHeight = height * 1.4;
  let rX = x - width * 0.2;
  let rY = y - height * 0.2;
  let dCanvas = document.createElement('canvas');
  dCanvas.width = imgWidth;
  dCanvas.height = imgHeight;
  dCanvas.getContext('2d').putImageData(colorFace, 0, 0);
  let imageData = dCanvas
    .getContext('2d')
    .getImageData(rX, rY, rWidth, rHeight);
  dCanvas.width = rWidth;
  dCanvas.height = rHeight;
  dCanvas.getContext('2d').putImageData(imageData, 0, 0);
  let image = dCanvas.toDataURL('image/jpeg', 0.96);
  let file = base64ToFile(image);
  let data = {
    file
  };
  return data;
};
// 图片转换成base64
const toBase64 = (file) => new Promise((resolve, reject) => {
  let reader = new FileReader();

  reader.onload = (e) => {
    resolve(e.target.result);
  };

  reader.onerror = (e) => {
    reject(e);
  };

  reader.readAsDataURL(file);
});

/*
{x:"检测X坐标", y, :"检测Y坐标",width:"检测width", height:"height", file:"裁剪前图片文件", cb:"裁剪后图片文件回调"}
*/
const getCutImg = async (x, y, width, height, file, cb) => {
  let baseFile = await toBase64(file);
  img.src = baseFile;
  img.onload = () => {
    imgWidth = img.width;
    imgHeight = img.height;
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    context.drawImage(img, 0, 0, imgWidth, imgHeight);
    colorFace = toColor();
    let res = cutColorFace(x, y, width, height);
    cb(res);
  };
};

export default getCutImg;
