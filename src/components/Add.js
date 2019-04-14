import React from 'react';

import {} from 'antd-mobile';
import Section from './Section';
import ButtonTemplate from './ButtonTemplate';

import { WEB_CONTEXT } from '../common/Utils';

import './Add.css';

class Add extends React.Component {
    state = {
        "sections": [
            {
                "defaultHideInDetailPage": false,
                "defaultHideInEditPage": false,
                "icon": null,
                "name": null,
                "title": "基本信息",
                "fields": [
                    {
                        "length": null,
                        "name": "zzkss",
                        "options": [
                            {
                                "text": "　",
                                "value": ""
                            },
                            {
                                "text": "从不打瞌睡",
                                "value": "从不打瞌睡"
                            },
                            {
                                "text": "轻微瞌睡",
                                "value": "轻微瞌睡"
                            },
                            {
                                "text": "中度瞌睡",
                                "value": "中度瞌睡"
                            },
                            {
                                "text": "重度瞌睡",
                                "value": "重度瞌睡"
                            }
                        ],
                        "readOnly": false,
                        "label": "1、坐着看书时",
                        "type": "L",
                        "key": "2C904B726986BDF70169A466431703D6",
                        "required": false,
                        "fieldid": "2C904B726986BDF70169A466431703D6",
                        "hideLabel": false,
                        "column": true
                    },
                    {
                        "length": null,
                        "name": "kdss",
                        "options": [
                            {
                                "text": "　",
                                "value": ""
                            },
                            {
                                "text": "从不打瞌睡",
                                "value": "从不打瞌睡"
                            },
                            {
                                "text": "轻微瞌睡",
                                "value": "轻微瞌睡"
                            },
                            {
                                "text": "中度瞌睡",
                                "value": "中度瞌睡"
                            },
                            {
                                "text": "重度瞌睡",
                                "value": "重度瞌睡"
                            }
                        ],
                        "readOnly": false,
                        "label": "2、看电视时",
                        "type": "L",
                        "key": "2C904B726986BDF70169A466868D03E0",
                        "required": false,
                        "fieldid": "2C904B726986BDF70169A466868D03E0",
                        "hideLabel": false,
                        "column": true
                    },
                    {
                        "length": null,
                        "name": "zggcsjzslrjyhhy",
                        "options": [
                            {
                                "text": "　",
                                "value": ""
                            },
                            {
                                "text": "从不打瞌睡",
                                "value": "从不打瞌睡"
                            },
                            {
                                "text": "轻微瞌睡",
                                "value": "轻微瞌睡"
                            },
                            {
                                "text": "中度瞌睡",
                                "value": "中度瞌睡"
                            },
                            {
                                "text": "重度瞌睡",
                                "value": "重度瞌睡"
                            }
                        ],
                        "readOnly": false,
                        "label": "3、在公共场所静坐时（例如剧院和会议）",
                        "type": "L",
                        "key": "2C904B726986BDF70169A467516A03EA",
                        "required": false,
                        "fieldid": "2C904B726986BDF70169A467516A03EA",
                        "hideLabel": false,
                        "column": true
                    },
                    {
                        "length": null,
                        "name": "lxccyxsmyxx",
                        "options": [
                            {
                                "text": "　",
                                "value": ""
                            },
                            {
                                "text": "从不打瞌睡",
                                "value": "从不打瞌睡"
                            },
                            {
                                "text": "轻微瞌睡",
                                "value": "轻微瞌睡"
                            },
                            {
                                "text": "中度瞌睡",
                                "value": "中度瞌睡"
                            },
                            {
                                "text": "重度瞌睡",
                                "value": "重度瞌睡"
                            }
                        ],
                        "readOnly": false,
                        "label": "4、连续乘车一小时没有休息",
                        "type": "L",
                        "key": "2C904B726986BDF70169A46CF9C8042E",
                        "required": false,
                        "fieldid": "2C904B726986BDF70169A46CF9C8042E",
                        "hideLabel": false,
                        "column": true
                    },
                    {
                        "length": null,
                        "name": "rghjyxdhwhtxxxs",
                        "options": [
                            {
                                "text": "　",
                                "value": ""
                            },
                            {
                                "text": "从不打瞌睡",
                                "value": "从不打瞌睡"
                            },
                            {
                                "text": "轻微瞌睡",
                                "value": "轻微瞌睡"
                            },
                            {
                                "text": "中度瞌睡",
                                "value": "中度瞌睡"
                            },
                            {
                                "text": "重度瞌睡",
                                "value": "重度瞌睡"
                            }
                        ],
                        "readOnly": false,
                        "label": "5、如果环境允许的话，午后躺下休息时",
                        "type": "L",
                        "key": "2C904B726986BDF70169A46D60D50438",
                        "required": false,
                        "fieldid": "2C904B726986BDF70169A46D60D50438",
                        "hideLabel": false,
                        "column": true
                    },
                    {
                        "length": null,
                        "name": "zzybrths",
                        "options": [
                            {
                                "text": "　",
                                "value": ""
                            },
                            {
                                "text": "从不打瞌睡",
                                "value": "从不打瞌睡"
                            },
                            {
                                "text": "轻微瞌睡",
                                "value": "轻微瞌睡"
                            },
                            {
                                "text": "中度瞌睡",
                                "value": "中度瞌睡"
                            },
                            {
                                "text": "重度瞌睡",
                                "value": "重度瞌睡"
                            }
                        ],
                        "readOnly": false,
                        "label": "6、坐着与别人谈话时",
                        "type": "L",
                        "key": "2C904B726986BDF70169A46DCC500442",
                        "required": false,
                        "fieldid": "2C904B726986BDF70169A46DCC500442",
                        "hideLabel": false,
                        "column": true
                    },
                    {
                        "length": null,
                        "name": "wfbyjhjzs",
                        "options": [
                            {
                                "text": "　",
                                "value": ""
                            },
                            {
                                "text": "从不打瞌睡",
                                "value": "从不打瞌睡"
                            },
                            {
                                "text": "轻微瞌睡",
                                "value": "轻微瞌睡"
                            },
                            {
                                "text": "中度瞌睡",
                                "value": "中度瞌睡"
                            },
                            {
                                "text": "重度瞌睡",
                                "value": "重度瞌睡"
                            }
                        ],
                        "readOnly": false,
                        "label": "7、午饭（不饮酒）后静坐时",
                        "type": "L",
                        "key": "2C904B726986BDF70169A46E5EDE045F",
                        "required": false,
                        "fieldid": "2C904B726986BDF70169A46E5EDE045F",
                        "hideLabel": false,
                        "column": true
                    },
                    {
                        "length": null,
                        "name": "czczcydjtzstcjfzs",
                        "options": [
                            {
                                "text": "　",
                                "value": ""
                            },
                            {
                                "text": "从不打瞌睡",
                                "value": "从不打瞌睡"
                            },
                            {
                                "text": "轻微瞌睡",
                                "value": "轻微瞌睡"
                            },
                            {
                                "text": "中度瞌睡",
                                "value": "中度瞌睡"
                            },
                            {
                                "text": "重度瞌睡",
                                "value": "重度瞌睡"
                            }
                        ],
                        "readOnly": false,
                        "label": "8、乘坐出租车遇到交通阻塞，停车几分钟时",
                        "type": "L",
                        "key": "2C904B726986BDF70169A46EF09F0469",
                        "required": false,
                        "fieldid": "2C904B726986BDF70169A46EF09F0469",
                        "hideLabel": false,
                        "column": true
                    }
                ],
                "titleShowedInEditPage": true,
                "titleShowedInDetailPage": true,
                "key": "2C904B726986BDF70169A45EA3020375"
            }
        ],
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
    componentDidMount() {
        document.title = '新增';

        let token = localStorage.getItem('__token__');
        if (token === null || token === '') {
            window.location.href = WEB_CONTEXT + '/#/Login';
        } else {
            // this.getData(token);
        }
    }
    render() {
        const {buttons,sections} = this.state;

        const sectionsJSX = sections.map((section, idx) =>
                <Section key={section.key} type={'fieldItems'} showSection={true} title={section.title} showTitle={true} data={section.fields} />
        );

        return (
            <div style={{paddingBottom:'80px'}}>
                {sectionsJSX}
                <ButtonTemplate data={buttons}/>
            </div>
        );
    }
}

export default Add;
