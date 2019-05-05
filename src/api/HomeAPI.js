import axios from 'axios';
import qs from 'qs';
import { Toast } from 'antd-mobile';
import { URL_PREFIX } from '../common/Utils';

export const getHome = params =>
  axios
    .post(
      URL_PREFIX + 'page?op=getPage',
      qs.stringify({
        token: localStorage.getItem('__token__'),
        ...params
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }
    )
    .then(function(response) {
      if (response.data && response.data.success) {
        //
        return response.data;
      } else {
        Toast.fail(response.data.msg);
        return false;
      }
    })
    .catch(function(error) {
      console.log(error);
      Toast.fail('无法访问服务器，请稍后再试');
      return null;
    });
