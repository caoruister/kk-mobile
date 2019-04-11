import axios from 'axios';
import { notification } from 'antd';
import qs from 'qs';
import cookie from 'react-cookies';
import { URL_PREFIX } from '../common/Utils';

const openNotificationWithIcon = (type, description) => {
  notification[type]({
    message: '提示',
    description: description,
  });
};


export const getLoginHistory = () => axios.post(URL_PREFIX + 'login?op=getLoginHistory', {
}, {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	}
}).then(function (response) {
	// console.debug(response);
  // return {data: response.data.root};

  return {data: [{
      id: '1',
      loginTime: '2018-05-15 07:40:17',
      ip: '180.106.56.28',
      loginType: 'CCWSAPI',
      status: 'SUCCESS',
      browser: 'Chrome58.0.3029.110',
      loginOS: 'Windows',
    }, {
        id: '2',
        loginTime: '2018-05-14 20:55:19',
        ip: '139.129.99.86',
        loginType: 'CCWSAPI',
        status: 'SUCCESS',
        browser: 'HTTP Service',
        loginOS: 'Remote Access',
    }]
  };
}).catch(function (error) {
    console.log(error);
		openNotificationWithIcon('error', '无法访问服务器，请稍后再试');
	  return null;
});

export const getInfoForAppRoot = () => {
  let token = cookie.load("__token__");
  if (token == null || token === '') { // 未登录
    return;
  }
  return axios.post(URL_PREFIX + 'login?op=getInfoForAppRoot', qs.stringify({
    token: token,
  }), {
  	headers: {
  		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  	}
  }).then(function (response) {
    console.debug(response);
    let data = response.data;
    if (data.success) {
      return {
        listOfApps: data.listOfApps,
        listOfTabs: data.listOfTabs,
        menus: data.menus,
        enableMenuGroup: data.enableMenuGroup,
        showAllMenus: data.showAllMenus,
        logo: data.logo,
      };
    } else {
      if (data.msg === '未登录') {
        window.showLoginWindow();
      } else {
        openNotificationWithIcon('error', data.msg);
      }
      return null;
    }
  }).catch(function (error) {
      console.log(error);
  		openNotificationWithIcon('error', '无法访问服务器，请稍后再试');
      return null;
  });
}

export const getAllMenus = () => {
  let token = cookie.load("__token__");
  if (token == null || token === '') { // 未登录
    return;
  }
  return axios.post(URL_PREFIX + 'login?op=getAllMenus', qs.stringify({
    token: token,
  }), {
  	headers: {
  		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  	}
  }).then(function (response) {
    console.debug(response);
    let data = response.data;
    if (data.success) {
      return {
        listOfTabs: data.listOfTabs,
      };
    } else {
      if (data.msg === '未登录') {
        window.showLoginWindow();
      } else {
        openNotificationWithIcon('error', data.msg);
      }
      return null;
    }
  }).catch(function (error) {
      console.log(error);
  		openNotificationWithIcon('error', '无法访问服务器，请稍后再试');
      return null;
  });
}

export const login = (info) => axios.post(URL_PREFIX + 'login?op=login', qs.stringify({
  info: info,
}), {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	}
}).then(function (response) {
	if (response.data && response.data.success) {
    cookie.save('__token__', response.data.token, { path: '/' });
    cookie.save('__token__userName', response.data.name, { path: '/' });
    // 标记 刚刚登陆
    cookie.save('__loginJustNow__', 'true', { path: '/' });
    cookie.save('__orgid__', response.data.orgid, { path: '/' });
    //
    return response.data;
  } else {
    alert(response.data.msg);
    return false;
  }
}).catch(function (error) {
    console.log(error);
		openNotificationWithIcon('error', '无法访问服务器，请稍后再试');
	  return null;
});

export const logout = () => axios.post(URL_PREFIX + 'login?op=logout', qs.stringify({
  token: cookie.load("__token__"),
}), {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	}
}).then(function (response) {
	if (response.data && response.data.success) {
    return true;
  } else {
    return false;
  }
}).catch(function (error) {
    console.log(error);
		openNotificationWithIcon('error', '无法访问服务器，请稍后再试');
	  return null;
});

export const changeCurrentApp = (currentAppId) => axios.post(URL_PREFIX + 'login?op=changeCurrentApp', qs.stringify({
  token: cookie.load("__token__"),
  currentAppId: currentAppId,
}), {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	}
}).then(function (response) {
	if (response.data && response.data.success) {
    return response.data;
  } else {
    return false;
  }
}).catch(function (error) {
    console.log(error);
		openNotificationWithIcon('error', '无法访问服务器，请稍后再试');
	  return null;
});
