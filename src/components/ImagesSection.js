import React from 'react';
import { Link } from "react-router-dom";

import {WingBlank} from 'antd-mobile';

class ImagesSection extends React.Component {

    render() {
        const {data} = this.props;

        let imageJSX = data.map((img, idx)=>{
            return <a key={idx} href={img.path || ''}>
                        <img src={img.imageUrl} style={{width:img.width || '100%', height:img.height}}></img>
                    </a>
        });

        return <div>
            <WingBlank>{imageJSX}</WingBlank>
        </div>
    }
}

export default ImagesSection;