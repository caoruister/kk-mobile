import React from 'react';

import { ImagePicker, WingBlank } from 'antd-mobile';

function FieldRequired(props) {
    if (props.field.required) {
        return <div className="required">*</div>
    }
    return null;
}

function FieldLabel(props) {
    if (!props.field.hideLabel) {
        return <div className={props.className}><FieldRequired field={props.field}/>{props.field.label}:</div>;
    }
    return null;
}

function FieldReadOnly(props) {
    if (props.field.readOnly) {
        return <img className="image-avatar" alt='' src={props.field.thumbnail_url}
             id={props.field.fieldid}></img>
    } else {
        return props.children;
    }
}

function FieldColumn(props) {
    return <div className="weui-cell weui-cell_input">
                <div className="weui-cell__hd">
                    <FieldLabel field={props.field} className={'weui-label'}/>
                </div>
                <div className="weui-cell__bd">
                    <FieldReadOnly field={props.field}>
                        {props.children}
                    </FieldReadOnly>
                </div>
            </div>
}

function FieldRow(props) {
    return <div>
                <FieldLabel field={props.field} className={'weui-cells__title'}/>
                <div className="weui-cells weui-cells_after-title">
                    <div className="weui-cell weui-cell_input">
                        <div className="weui-cell__bd">
                            <FieldReadOnly field={props.field}>
                                {props.children}
                            </FieldReadOnly>
                        </div>
                    </div>
                </div>
            </div>
}

function FieldLayout(props) {
    if (!props.field.column) {
        return <FieldColumn field={props.field}>
            {props.children}
        </FieldColumn>
    } else {
        return <FieldRow field={props.field}>
            {props.children}
        </FieldRow>
    }
}

class Image extends React.Component {
    state = {
        files: data,
        multiple: false,
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    render() {
        const { files } = this.state;
        return (
            <ImagePicker
                files={files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 7}
                multiple={this.state.multiple}
                />
        );
    }
}

export default Image;