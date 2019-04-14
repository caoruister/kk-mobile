import React from 'react';
import ReactDOM from 'react-dom';

import { ListView,WhiteSpace } from 'antd-mobile';

import './List.css';

function MyBody(props) {
    return (
        <div class1="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const data = [
        {
            "lastmodifybyid_name": "会员",
            "khmc": null,
            "createdate": "2019-04-03 16:58:11",
            "khid": "KH-20190117001",
            "yhxm_name": "zs",
            "createbyid": "8A8A8A346909C4FB016909CD84120071",
            "ksrq": null,
            "cplx": "1",
            "id": "2C904B7269D8FEA60169E26B85E602BF",
            "qm": null,
            "locked": "0",
            "lastmodifydate": "2019-04-03 16:58:11",
            "shdz": null,
            "sbid": "2C904B726986BDF70169A34E491A0274",
            "ddlx": "购买",
            "createbyid_name": "会员",
            "cpsm": "检测仪",
            "dkjg": null,
            "ownerid": "8A8A8A346909C4FB016909CD84120071",
            "hssd": "上午8:00~10:00",
            "yjjg": 1500,
            "ownerid_name": "会员",
            "name": "DD-20190403028",
            "shr": "2C904B726986BDF7016994E8E0040138",
            "jzrq": null,
            "zffs": null,
            "cpjg": 200000,
            "qmc": null,
            "canEdit": false,
            "shrlxfs": null,
            "canView": true,
            "jcsz": "1天",
            "yhid": "YH-2019000000001",
            "cpmc_name": "检测仪",
            "currency": null,
            "yhdz": "北京路101号",
            "lastmodifybyid": "8A8A8A346909C4FB016909CD84120071",
            "zfzt": "未支付",
            "spzt": "草稿中",
            "sjje": null,
            "shr_name": "叶欢",
            "cpmc": "2C904B726860173301687DCD190102D3",
            "fpz": "已分配设备",
            "sbid_name": "20190322042",
            "deleted": "0",
            "wlzt": null,
            "zdmc": null,
            "yhlxdh": "13800000000",
            "lbsaddress": null,
            "xdsj": "2019-04-03 16:58:11",
            "yhxm": "8A8A8A346909BFF9016909D6F6AE000C"
        },
        {
            "lastmodifybyid_name": "会员",
            "khmc": null,
            "createdate": "2019-04-03 16:59:06",
            "khid": "KH-20190117001",
            "yhxm_name": "zs",
            "createbyid": "8A8A8A346909C4FB016909CD84120071",
            "ksrq": null,
            "cplx": "1",
            "id": "2C904B7269D8FEA60169E26C5F0402CE",
            "qm": null,
            "locked": "0",
            "lastmodifydate": "2019-04-03 16:59:06",
            "shdz": null,
            "sbid": "2C904B726986BDF70169A34E49280275",
            "ddlx": "购买",
            "createbyid_name": "会员",
            "cpsm": "检测仪",
            "dkjg": null,
            "ownerid": "8A8A8A346909C4FB016909CD84120071",
            "hssd": "下午15:00~17:00",
            "yjjg": 1500,
            "ownerid_name": "会员",
            "name": "DD-20190403029",
            "shr": "2C904B726986BDF7016994E8E0040138",
            "jzrq": null,
            "zffs": null,
            "cpjg": 200000,
            "qmc": null,
            "canEdit": false,
            "shrlxfs": null,
            "canView": true,
            "jcsz": "2天",
            "yhid": "YH-2019000000001",
            "cpmc_name": "检测仪",
            "currency": null,
            "yhdz": "北京路101号",
            "lastmodifybyid": "8A8A8A346909C4FB016909CD84120071",
            "zfzt": "未支付",
            "spzt": "草稿中",
            "sjje": null,
            "shr_name": "叶欢",
            "cpmc": "2C904B726860173301687DCD190102D3",
            "fpz": "已分配设备",
            "sbid_name": "20190322043",
            "deleted": "0",
            "wlzt": null,
            "zdmc": null,
            "yhlxdh": "13800000000",
            "lbsaddress": null,
            "xdsj": "2019-04-03 16:59:06",
            "yhxm": "8A8A8A346909BFF9016909D6F6AE000C"
        },
        {
            "lastmodifybyid_name": "会员",
            "khmc": null,
            "createdate": "2019-04-03 23:54:35",
            "khid": "KH-20190117001",
            "yhxm_name": "zs",
            "createbyid": "8A8A8A346909C4FB016909CD84120071",
            "ksrq": "2019-04-03",
            "cplx": "2",
            "id": "2C904B7269D8FEA60169E3E8BF9802F2",
            "qm": null,
            "locked": "0",
            "lastmodifydate": "2019-04-03 23:54:40",
            "shdz": null,
            "sbid": "2C904B726986BDF7016994EA667F014B",
            "ddlx": "购买",
            "createbyid_name": "会员",
            "cpsm": "呼吸机",
            "dkjg": null,
            "ownerid": "8A8A8A346909C4FB016909CD84120071",
            "hssd": null,
            "yjjg": 2435,
            "ownerid_name": "会员",
            "name": "DD-20190403030",
            "shr": "2C904B726986BDF7016994E8E0040138",
            "jzrq": "2020-04-03",
            "zffs": null,
            "cpjg": 3556,
            "qmc": null,
            "canEdit": false,
            "shrlxfs": null,
            "canView": true,
            "jcsz": null,
            "yhid": "YH-2019000000001",
            "cpmc_name": "呼吸机",
            "currency": null,
            "yhdz": "北京路101号",
            "lastmodifybyid": "8A8A8A346909C4FB016909CD84120071",
            "zfzt": "已支付",
            "spzt": "草稿中",
            "sjje": null,
            "shr_name": "叶欢",
            "cpmc": "2C904B7268B173D10168CCDFADAD0331",
            "fpz": "已分配设备",
            "sbid_name": "20190319032",
            "deleted": "0",
            "wlzt": null,
            "zdmc": null,
            "yhlxdh": "13800000000",
            "lbsaddress": null,
            "xdsj": "2019-04-03 23:54:35",
            "yhxm": "8A8A8A346909BFF9016909D6F6AE000C"
        },
        {
            "lastmodifybyid_name": "会员",
            "khmc": null,
            "createdate": "2019-04-04 17:10:09",
            "khid": "KH-20190117001",
            "yhxm_name": "zs",
            "createbyid": "8A8A8A346909C4FB016909CD84120071",
            "ksrq": null,
            "cplx": "1",
            "id": "402883AB69E6B4CD0169E79CD96C01D3",
            "qm": null,
            "locked": "0",
            "lastmodifydate": "2019-04-04 17:10:10",
            "shdz": null,
            "sbid": "2C904B726986BDF70169A34E49360276",
            "ddlx": "购买",
            "createbyid_name": "会员",
            "cpsm": "检测仪",
            "dkjg": null,
            "ownerid": "8A8A8A346909C4FB016909CD84120071",
            "hssd": null,
            "yjjg": 1500,
            "ownerid_name": "会员",
            "name": "DD-20190404031",
            "shr": "2C904B7269D8FEA60169E5D39AA30339",
            "jzrq": null,
            "zffs": null,
            "cpjg": 200000,
            "qmc": null,
            "canEdit": false,
            "shrlxfs": null,
            "canView": true,
            "jcsz": null,
            "yhid": "YH-2019000000001",
            "cpmc_name": "检测仪",
            "currency": null,
            "yhdz": "北京路101号",
            "lastmodifybyid": "8A8A8A346909C4FB016909CD84120071",
            "zfzt": "未支付",
            "spzt": "草稿中",
            "sjje": null,
            "shr_name": "张三",
            "cpmc": "2C904B726860173301687DCD190102D3",
            "fpz": "已分配设备",
            "sbid_name": "20190322044",
            "deleted": "0",
            "wlzt": null,
            "zdmc": null,
            "yhlxdh": "13800000000",
            "lbsaddress": null,
            "xdsj": "2019-04-04 17:10:10",
            "yhxm": "8A8A8A346909BFF9016909D6F6AE000C"
        },
        {
            "lastmodifybyid_name": "会员",
            "khmc": null,
            "createdate": "2019-04-04 17:11:31",
            "khid": "KH-20190117001",
            "yhxm_name": "zs",
            "createbyid": "8A8A8A346909C4FB016909CD84120071",
            "ksrq": null,
            "cplx": "1",
            "id": "402883AB69E6B4CD0169E79E185501DC",
            "qm": null,
            "locked": "0",
            "lastmodifydate": "2019-04-04 17:11:31",
            "shdz": null,
            "sbid": "2C904B726986BDF70169A34E49440277",
            "ddlx": "购买",
            "createbyid_name": "会员",
            "cpsm": "检测仪",
            "dkjg": null,
            "ownerid": "8A8A8A346909C4FB016909CD84120071",
            "hssd": null,
            "yjjg": 1500,
            "ownerid_name": "会员",
            "name": "DD-20190404032",
            "shr": "2C904B7269D8FEA60169E5D39AA30339",
            "jzrq": null,
            "zffs": null,
            "cpjg": 200000,
            "qmc": null,
            "canEdit": false,
            "shrlxfs": null,
            "canView": true,
            "jcsz": null,
            "yhid": "YH-2019000000001",
            "cpmc_name": "检测仪",
            "currency": null,
            "yhdz": "北京路101号",
            "lastmodifybyid": "8A8A8A346909C4FB016909CD84120071",
            "zfzt": "未支付",
            "spzt": "草稿中",
            "sjje": null,
            "shr_name": "张三",
            "cpmc": "2C904B726860173301687DCD190102D3",
            "fpz": "已分配设备",
            "sbid_name": "20190322045",
            "deleted": "0",
            "wlzt": null,
            "zdmc": null,
            "yhlxdh": "13800000000",
            "lbsaddress": null,
            "xdsj": "2019-04-04 17:11:31",
            "yhxm": "8A8A8A346909BFF9016909D6F6AE000C"
        }
];
const NUM_SECTIONS = 10;
const NUM_ROWS_PER_SECTION = 1;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
        rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
            const rowName = `S${ii}, R${jj}`;
            rowIDs[ii].push(rowName);
            dataBlobs[rowName] = rowName;
        }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
}

function View(props) {
    const record = props.record;
    const fields = props.fields.map((field, idx)=>
            <div key={field.fieldid+idx} className="weui-form-preview__item">
                {!field.hideLabel && <div className="weui-form-preview__label">{field.label}:</div>}
                <div className="weui-form-preview__value">
                    <span>{record[field.name] || ' '}&nbsp;</span>
                </div>
            </div>
    );
    return fields;
}

class List extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
            fields: [
                {
                    "name": "name",
                    "objid": "2C904B72686017330168797345410283",
                    "label": "订单编号",
                    "type": "V",
                    "fieldid": "2C904B72686017330168797345BB0284"
                },
                {
                    "name": "xdsj",
                    "objid": "2C904B72686017330168797345410283",
                    "label": "下单时间",
                    "type": "F",
                    "fieldid": "2C904B726860173301687DDBD2FA02FA"
                },
                {
                    "name": "zfzt",
                    "objid": "2C904B72686017330168797345410283",
                    "label": "支付状态",
                    "type": "L",
                    "fieldid": "2C904B726860173301687DDA7EE702F8"
                }
            ]
        };
    }

    componentDidMount() {
        document.title = '列表';
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        // simulate initial Ajax
        this.timeoutId =setTimeout(() => {
            genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
                height: hei,
            });
        }, 600);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
    //     });
    //   }
    // }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        this.timeoutId = setTimeout(() => {
            genData(++pageIndex);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
            });
        }, 1000);
    }

    render() {

        const separator = (sectionID, rowID) => (
            <WhiteSpace key={sectionID+rowID} size="lg" />
        );

        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const record = data[index--];
            let url = record.canEdit ? '/pages/edit/edit?objid='+this.props.objid+'&id=' + record.id
                : (record.canView ? '/pages/view/view?' + ((this.props.layoutidOfViewPage !== null && this.props.layoutidOfViewPage !== '') ? ('layoutid=' + this.props.layoutidOfViewPage + '&') : '') + 'objid='+this.props.objid+'&id=' + record.id : '');
            return (
                <a href={url} >
                    <div className="weui-form-preview__bd" style={{backgroundColor:'#fff'}} >
                        <View record={record} fields={this.state.fields}/>
                    </div>
                </a>

            );
        };

        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
                renderBodyComponent={() => <MyBody />}
                renderRow={row}
                renderSeparator={separator}
                style={{
          height: this.state.height,
          overflow: 'auto',
        }}
                pageSize={10}
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                />
        );
    }
}

export default List;