import React from 'react';

import {List} from 'antd-mobile';

import { WEB_CONTEXT } from '../common/Utils';

class MessagesSection extends React.Component {

    render() {
        const {data} = this.props;

        let messagesJSX = data.map((message, idx)=>{
            return <List.Item
                arrow="horizontal"
                key={('listItem-' + idx)}
                thumb={message.icon}
                onClick={() => {
						window.location.href = WEB_CONTEXT + message.path;
					}}>{message.label}</List.Item>
        });

        return <List>{messagesJSX}</List>
    }
}

export default MessagesSection;