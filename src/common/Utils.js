
//export const URL_PREFIX = 'http://api.kz-info.cn:9002/kkdev-xcx/';

//export const URL_PREFIX = 'https://h109208.kz-info.cn:9243/xcx/'
//export const FILE_URL_PREFIX = 'https://h109208.kz-info.cn:9243/file/'
export const URL_PREFIX = 'https://h109208.kz-info.cn:9243/xcx2c/';
export const FILE_URL_PREFIX = 'https://h109208.kz-info.cn:9243/file/';
export const WEB_CONTEXT = '';

export const setFormFieldsValue = (getForm, data, stateConfig) => {
	if (data == null) {
		data = {};
	}
	let newData = {};
	for (var key in data) {
		let value = data[key];
		if (value != null) {
			newData[key] = value;
		}
	}
	data = newData;
	//
	var _setFieldsValue = function(getForm, data) {
		if (getForm != null) {
			let form = getForm();
			//
			if (form != null && form.setFieldsValue != null) {
				form.setFieldsValue(data);
				//
				if (form.setState0) {
					if (stateConfig) {
						form.setState0(stateConfig);
					} else {
						form.setState0({});
					}
				}
			} else {
				let timer = setTimeout(function() {
					clearTimeout(timer);
					_setFieldsValue(getForm, data);
				}, 100);
			}
		}
	}
	_setFieldsValue(getForm, data);
};

export const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
