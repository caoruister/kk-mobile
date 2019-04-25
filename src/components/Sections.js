import React from 'react';

import {List, InputItem, WingBlank, ImagePicker, Picker, DatePicker, TextareaItem, Switch, Radio, Flex} from 'antd-mobile';

import { uploadFile } from '../api/EditAPI';
import { WEB_CONTEXT, FILE_URL_PREFIX, formatDate } from '../common/Utils';

class Sections extends React.Component {

    onChangeOfValue(field, value) {
        console.log(field.fieldid + ':' + value);
        field.value = value;
        this.setState({});
    }

    onChangeOfFileValue(field, values, operationType) {
        //console.log(operationType);
        //console.log(values);

        //上传图片
        if (operationType === 'add'){
            let formdata = new FormData();
            let orgid= localStorage.getItem('__orgid__');
            formdata.append("orgid", orgid);

            values && values.forEach((val, idx)=>{
                formdata.append("file", val.file);
            });

            uploadFile(formdata).then((res) => {
                /*
                 res && res.map((img, idx)=>{
                 img.url = FILE_URL_PREFIX + img.url;
                 return img;
                 });*/
                field.value = [...field.value, ...res];
                this.setState({});
            });
        } else if (operationType === 'remove') {
            field.value = values;
            this.setState({});
        }

        console.log(field);
    }

    getImages(images) {
        let absoluteImages = [];
        images && images.forEach((img, idx)=>{

            let url = img.url;
            if (img.url.match(/^file\?getfile.*/g) ) {
                url = FILE_URL_PREFIX + url;
            }

            absoluteImages.push({
                url: url
            });
        });

        console.log(absoluteImages);
        return absoluteImages;
    }

    render() {

        const { getFieldProps } = this.props.form;

        return this.props.sections.map((section, idx1)=>
                <List key={section.key+idx1} renderHeader={section.title}>
                    {
                        section.fields.map((field, idx2)=> {

                            if (field.type === 'S') {
                                return <InputItem
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    type="text"
                                    maxLength={field.length}
                                    disabled={field.readOnly}
                                    onChange={this.onChangeOfValue.bind(this, field)}
                                    id={field.fieldid}
                                    >{field.label}</InputItem>
                            } else if (field.type === 'N') {
                                return <InputItem
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    type="tel"
                                    value={field.value}
                                    disabled={field.readOnly}
                                    onChange={this.onChangeOfValue.bind(this, field)}
                                    maxLength={field.length}
                                    >{field.label}</InputItem>
                            } else if (field.type === 'H') {
                                return <InputItem
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    type="phone"
                                    disabled={field.readOnly}
                                    onChange={this.onChangeOfValue.bind(this, field)}
                                    maxLength={field.length}
                                    >{field.label}</InputItem>
                            } else if (field.type === 'enc') {
                                return <InputItem
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    type="password"
                                    disabled={field.readOnly}
                                    onChange={this.onChangeOfValue.bind(this, field)}
                                    maxLength={field.length}
                                    >{field.label}</InputItem>
                            } else if (field.type === 'L') {
                                let data = field.options.map((option)=> {
                                    return {"label": option.text, "value": option.value}
                                });

                                //console.log(field);
                                if (field.edittype === '1') {
                                    return <Picker
                                        {...getFieldProps(field.fieldid, {
                                            initialValue: field.value
                                        })}
                                        disabled={field.readOnly}
                                        onChange={this.onChangeOfValue.bind(this, field)}
                                        key={field.fieldid+idx2} extra={'请输入'+field.label} data={data} cols={1}>
                                        <List.Item arrow="horizontal">{field.label}</List.Item>
                                    </Picker>
                                } else if (field.edittype === '2') {
                                    return <div key={field.fieldid+idx2}>
                                        <List.Item
                                            {...getFieldProps(field.fieldid, {
                                                initialValue: field.value
                                            })}
                                            >{field.label}</List.Item>
                                        {data.map(i => (
                                            <Radio.RadioItem key={i.value} checked={field.value === i.value} disabled={field.readOnly} onChange={this.onChangeOfValue.bind(this, field, i.value)}>
                                                {i.label}
                                            </Radio.RadioItem>
                                        ))}
                                    </div>
                                }
                            } else if (field.type === 'D' || field.type === 'F') {
                                let mode = field.type === 'D' ? 'date' : 'datetime';

                                return <DatePicker
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    mode={mode}
                                    disabled={field.readOnly}
                                    key={field.fieldid+idx2} extra={'请输入'+field.label}
                                    onChange={this.onChangeOfValue.bind(this, field)}
                                    >
                                    <List.Item arrow="horizontal">{field.label}</List.Item>
                                </DatePicker>
                            } else if (field.type === 'X') {

                                return <TextareaItem
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    title={field.label}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    disabled={field.readOnly}
                                    onChange={this.onChangeOfValue.bind(this, field)}
                                    rows={5}
                                    count={100}
                                    />
                            } else if (field.type === 'A') {

                            } else if (field.type === 'B') {
                                return <List.Item
                                    key={field.fieldid+idx2}
                                    extra={<Switch
                                     {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    color="#108ee9"
                                    disabled={field.readOnly}
                                    checked={field.value}
                                    onChange={this.onChangeOfValue.bind(this, field)}
                                  />}
                                    >{field.label}</List.Item>

                            } else if (field.type === 'IMG') {
                                let imageField = <div key={field.fieldid+idx2}>
                                    <List.Item
                                        >{field.label}</List.Item>
                                    <ImagePicker
                                        {...getFieldProps(field.fieldid, {
                                            initialValue: field.value
                                        })}
                                        files={this.getImages(field.value)}
                                        onChange={this.onChangeOfFileValue.bind(this, field)}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={field.length < 7}
                                        multiple={false}
                                        />
                                </div>;
                                return imageField
                            } else if (field.type === 'Y') {
                                return <List.Item
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    extra={field.value.name}
                                    arrow="horizontal" onClick={()=>{this.props.showLookupModal(field)}}
                                    >{field.label}</List.Item>
                            }
                        })
                    }
                </List>
        )
    }
}

export default Sections;