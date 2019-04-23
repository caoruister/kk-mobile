//export const URL_PREFIX = 'http://api.kz-info.cn:9002/kkdev-xcx/';

//export const URL_PREFIX = 'https://h109208.kz-info.cn:9243/xcx/'
//export const FILE_URL_PREFIX = 'https://h109208.kz-info.cn:9243/file/'
export const URL_PREFIX = 'https://h109208.kz-info.cn:9243/xcx2c/';
export const FILE_URL_PREFIX = 'https://h109208.kz-info.cn:9243/file/';
export const WEB_CONTEXT = '';

export const setFieldValue = function (fieldName, value, pageInstance) {
	var sections = pageInstance.state.sections;
	for (var i = 0; i < sections.length; i++) {
		let section = sections[i];
		let fields = section.fields;
		for (var k = 0; k < fields.length; k++) {
			let field = fields[k];

			if (field.name == fieldName) {
				console.log(value);
				if (field.type == 'Y') {
					field.value2 = (value != null ? value.name : null);
				}  else if (field.type == 'IMG') {
					let tempValue = JSON.parse(value);
					//
					if (tempValue.length > 0) {
						let temp = tempValue[0];
						let item = null;
						if (typeof (temp) == 'string') {
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
}

export const getFieldValue = function (fieldName, pageInstance) {
	var sections = pageInstance.state.sections;
	for (var i = 0; i < sections.length; i++) {
		let section = sections[i];
		let fields = section.fields;
		for (var k = 0; k < fields.length; k++) {
			let field = fields[k];

			if (field.name == fieldName) {
				return field.value //
			}
		}
	}
}

export const formatDate = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()

	return [year, month, day].map(formatNumber).join('-');
}

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
