import React from 'react';

import { Button,WingBlank } from 'antd-mobile';

class ButtonTemplate extends React.Component {
    state = {
        "buttons": [
            {
                "standard": false,
                "custom": true,
                "methodName": "onClick1",
                "id": "C032F30F3B2D48EEB86FDC49A88408FB",
                "text": "申请检测"
            }
        ]
    }
    onClickOfButton = (e) => {
    }
    render() {
        const templates = this.props.data.map((button, idx)=>
                <Button key={button.id} type="primary" inline size="small" style={{ marginRight: '4px' }} data-method-name={ button.methodName } onClick={this.onClickOfButton}>{ button.text }</Button>
        );

        return (
            <WingBlank>
                {templates}
            </WingBlank>
        );
    }
}

export default ButtonTemplate;