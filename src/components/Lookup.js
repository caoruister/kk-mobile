import React from 'react';
import ReactDOM from 'react-dom';

import { ListView,WhiteSpace } from 'antd-mobile';

import { getLookup, getSelectedFieldValue } from '../api/LookupAPI';
import { WEB_CONTEXT } from '../common/Utils';

import '../assets/weui.css';

function MyBody(props) {
    return (
        <div class1="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const  NUM_ROWS = 10;

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

class Lookup extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            data: [],
            fields: [],
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
            dataBlobs: {},
            sectionIDs: [],
            rowIDs: [],
            pageIndex: 0,
            objid: '',
        };
    }

    componentDidMount() {
        console.log(this.props.objid);

        this._isMounted = true;
        document.title = '请选择';
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        this.props.objid && this.genData().then(()=>{
            if (this._isMounted) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.state.dataBlobs),
                    isLoading: false,
                    height: hei,
                });
            }
        });
    }

    genData(pIndex = 0) {

        for (let i = 0; i < NUM_ROWS; i++) {
            const ii = (pIndex * NUM_ROWS) + i;
            this.state.dataBlobs[`${ii}`] = `row - ${ii}`;
        }

        return getLookup({
            objid: this.props.objid,
            notNeedLogin: false,
            current: pIndex + 1
        }).then(res => {
            if (res == null || !res) {
                window.location.href = WEB_CONTEXT + '/#/Login';
                return;
            }
            //
            console.log(res);
            let root = res.root;
            let data = this.state.data.concat(root.records);

            if (this._isMounted) {
                this.setState({
                    data: data,
                    fields: root.showedFields,
                    objLabel: root.objLabel,
                    objid: root.objid,
                    hasMore: root.records !== 0 && data.length < root.total
                });
            }

        });
    }

    componentWillUnmount() {
        this._isMounted = false;
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
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.state.isLoading = true;
        //this.setState({ isLoading: true });
        this.props.objid && this.genData(++this.state.pageIndex).then(()=>{
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.state.dataBlobs),
                isLoading: false,
            });
        });
    }

    selectRecord(record) {
        getSelectedFieldValue({
            objid: this.props.objid,
            id: record.id,
            lookupObjShowedFieldid: this.props.lookupObjShowedFieldid,
        }).then((res)=>{
            console.log(res);

            this.props.selectLookup({
                id: this.props.lookupObjShowedFieldid,
                name: res.root.lookupObjShowedFieldValue
            });
        })
    }

    render() {

        let length = this.state.data.length - 1;
        let row = (rowData, sectionID, rowID) => {
            if (rowID > length) {
                return null;
            }

            //console.log(rowID);

            const record = this.state.data[rowID];

            //console.log(record);

            //let url = record.canEdit ? '/#/edit/'+this.state.objid+'/'+record.id
            //    : (record.canView ? '/#/view/'+this.state.objid+'/' + record.id + '?layoutid=' + this.props.match.params.layoutidOfViewPage : '#');
            return (
                <a href={'javascript:;'} onClick={()=>{this.selectRecord(record)}}>
                    <div className="weui-form-preview__bd" style={{backgroundColor:'#fff'}} >
                        <View record={record} fields={this.state.fields} />
                    </div>
                </a>

            );
        }

        const separator = (sectionID, rowID) => (
            <WhiteSpace key={sectionID+rowID} size="lg" />
        );

        return (
            <div>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? 'Loading...' : ''}
            </div>)}
                    renderBodyComponent={() => <MyBody />}
                    renderRow={row}
                    renderSeparator={separator}
                    style={{
              height: this.state.height,
              overflow: 'auto',
            }}
                    pageSize={10}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    />

            </div>
        );
    }
}

export default Lookup;