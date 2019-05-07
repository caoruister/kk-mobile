import wx from 'weixin-js-sdk';

//export const URL_PREFIX = 'http://api.kz-info.cn:9002/kkdev-xcx/';

//export const URL_PREFIX = 'https://kkdev.kz-info.cn:9243/kkdev-xcx2c/';
//export const FILE_URL_PREFIX = 'https://kkdev.kz-info.cn:9243/kkdev-file/';
//export const URL_PREFIX = 'https://h109208.kz-info.cn:9243/h5-to-client/';
//export const FILE_URL_PREFIX = 'https://h109208.kz-info.cn:9243/file/';
//export const URL_PREFIX = 'http://192.168.3.56:8080/h5-to-client/';
export const URL_PREFIX = process.env.REACT_APP_URL_PREFIX;
export const FILE_URL_PREFIX = process.env.REACT_APP_FILE_URL_PREFIX;
export const WEB_CONTEXT = process.env.REACT_APP_WEB_CONTEXT;

export const setFieldValue = function(fieldName, value, pageInstance) {
  var sections = pageInstance.state.sections;
  for (var i = 0; i < sections.length; i++) {
    let section = sections[i];
    let fields = section.fields;
    for (var k = 0; k < fields.length; k++) {
      let field = fields[k];

      if (field.name == fieldName) {
        console.log(value);
        if (field.type == 'Y') {
          field.value2 = value != null ? value.name : null;
        } else if (field.type == 'IMG') {
          let tempValue = JSON.parse(value);
          //
          if (tempValue.length > 0) {
            let temp = tempValue[0];
            let item = null;
            if (typeof temp == 'string') {
              item = JSON.parse(temp);
            } else {
              item = temp;
            }
            //
            let thumbnail_url = FILE_URL_PREFIX + item.thumbnail_url;
            field.thumbnail_url = thumbnail_url;
          }
        }
        //
        field.value = value;
        //
        let fieldValues = pageInstance.data.fieldValues;
        fieldValues[field.fieldid] = value;
        //
        pageInstance.setData({
          fieldValues: fieldValues,
          sections: sections
        });
      }
    }
  }
};

export const getFieldValue = function(fieldName, pageInstance) {
  var sections = pageInstance.state.sections;
  for (var i = 0; i < sections.length; i++) {
    let section = sections[i];
    let fields = section.fields;
    for (var k = 0; k < fields.length; k++) {
      let field = fields[k];

      if (field.name == fieldName) {
        return field.value; //
      }
    }
  }
};

export const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('-');
};

export const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('-') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

export const isWeiXinEnv = () => {
  return window.__wxjs_environment === 'miniprogram';
};

export const setTitle = (title, isTabBar) => {
  console.log('setTitle:' + title);
  if (!isTabBar && isWeiXinEnv()) {
    document.title = '';
  } else {
    document.title = title;
  }
};

export const jsSdkConfig = (axios, host) => {
  let u = window.navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  //安卓需要使用当前URL进行微信API注册（即当场调用location.href.split('#')[0]）
  //iOS需要使用进入页面的初始URL进行注册，（即在任何pushstate发生前，调用location.href.split('#')[0]）
  let url = '';
  if (isiOS) {
    url = encodeURIComponent(
      `http://www.qq.com/home/index?op=${window.sessionStorage.getItem(
        'option'
      )}`
    ); //获取初始化的url相关参数
  } else {
    url = encodeURIComponent(window.location.href.split('#')[0]);
  }

  let time = Math.round(new Date().getTime() / 1000); //获取10位时间戳
  // alert(window.location.href.split('#')[0]);
  axios
    .get(
      `${host}/wechat/getJsSDKConfig?timestamp=${time}&nonceStr=nonceStr&url=${url}`
    )
    .then(function(response) {
      if (response.data.state === 0) {
        /*配置微信jssdk*/
        window.wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: response.data.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
          timestamp: response.data.data.timestamp, // 必填，生成签名的时间戳（10位）
          nonceStr: response.data.data.nonceStr, // 必填，生成签名的随机串,注意大小写
          signature: response.data.data.signature, // 必填，签名，见附录1（通过https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign 验证）
          jsApiList: [
            'getLocation',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      }
    })
    .catch(function(errors) {
      console.log('errors', errors);
    });
};
