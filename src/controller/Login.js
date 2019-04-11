import axios from 'axios';
import qs from 'qs';
import { URL_PREFIX } from '../common/Utils';

const openNotificationWithIcon = (type, description) => {
  // notification[type]({
  //   message: '提示',
  //   description: description,
  // });
  alert(description);
};

export const login = (info) => axios.post(URL_PREFIX + 'login?op=login', qs.stringify({
  info: info,
}), {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	}
}).then(function (response) {
	if (response.data && response.data.success) {
    localStorage.setItem('__token__', response.data.token);
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
  token: localStorage.getItem("__token__"),
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
