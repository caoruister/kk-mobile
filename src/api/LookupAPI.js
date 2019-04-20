import axios from 'axios';
import qs from 'qs';
import { Toast } from 'antd-mobile';
import { URL_PREFIX } from '../common/Utils';

export const getLookup = (params) => axios.post(URL_PREFIX + 'record?op=searchRecordsForLookupWindow', qs.stringify({
    token: localStorage.getItem('__token__'),
    objid: params.objid,
    MEMBER_FIELD_NAME: 'auto'
}), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
}).then(function (response) {
    if (response.data && response.data.success) {
        //
        return response.data;
    } else {
        Toast.fail(response.data.msg);
        return false;
    }
}).catch(function (error) {
    console.log(error);
    Toast.fail('无法访问服务器，请稍后再试');
    return null;
});

export const getSelectedFieldValue = (params) => axios.post(URL_PREFIX + 'record?op=getlookupObjShowedFieldValue', qs.stringify({
    token: localStorage.getItem('__token__'),
    objid: params.objid,
    id: params.id,
    lookupObjShowedFieldid: params.lookupObjShowedFieldid,
}), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
}).then(function (response) {
    if (response.data && response.data.success) {
        //
        return response.data;
    } else {
        Toast.fail(response.data.msg);
        return false;
    }
}).catch(function (error) {
    console.log(error);
    Toast.fail('无法访问服务器，请稍后再试');
    return null;
});



