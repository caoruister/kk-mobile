
export const URL_PREFIX = 'http://192.168.3.47:8080/xcx2c/';
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
