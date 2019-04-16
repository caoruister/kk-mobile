import React from 'react';
import ReactDOM from 'react-dom';

import { ListView,WhiteSpace } from 'antd-mobile';

import { getList } from '../api/ListAPI';
import { WEB_CONTEXT } from '../common/Utils';

import './List.css';

function MyBody(props) {
    return (
        <div class1="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const NUM_SECTIONS = 1;
const NUM_ROWS_PER_SECTION = 10;
let pageIndex = 0;

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

        //const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        //const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            //getRowData,
            //getSectionHeaderData: getSectionData,
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
        };
    }

    componentDidMount() {
        document.title = '列表';
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        this.genData();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.dataBlobs, this.state.sectionIDs, this.state.rowIDs),
            isLoading: false,
            height: hei,
        });
    }

    genData(pIndex = 0) {

        for (let i = 0; i < NUM_SECTIONS; i++) {
            const ii = (pIndex * NUM_SECTIONS) + i;
            const sectionName = `Section ${ii}`;
            this.state.sectionIDs.push(sectionName);
            this.state.dataBlobs[sectionName] = sectionName;
            this.state.rowIDs[ii] = [];

            for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
                const rowName = `S${ii}, R${jj}`;
                this.state.rowIDs[ii].push(rowName);
                this.state.dataBlobs[rowName] = rowName;
            }
        }
        this.state.sectionIDs = [...this.state.sectionIDs];
        this.state.rowIDs = [...this.state.rowIDs];

        getList({
            objid: '2C904B7269D8FEA60169E250612C00FF',
            notNeedLogin: false,
            current: pIndex
        }).then(res => {
            if (res == null || !res) {
                window.location.href = WEB_CONTEXT + '/#/Login';
                return;
            }
            //
            console.log(res);
            let root = res.root;
            let data = this.state.data.concat(root.records);

            this.setState({
                data: data,
                fields: root.showedFields,
                objLabel: root.objLabel,
                objid: root.objid,
                hasMore: data.length < root.total
            });
        });
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
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.state.isLoading = true;
        //this.setState({ isLoading: true });
        this.genData(++pageIndex);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.dataBlobs, this.state.sectionIDs, this.state.rowIDs),
            isLoading: false,
        });
    }

    render() {

        let index = this.state.data.length - 1;
        let row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                return null;
            }

            const record = this.state.data[index--];
            let url = record.canEdit ? '/#/edit?objid='+this.props.match.params.objid+'&id=' + record.id
                : (record.canView ? '/#/view?' + ((this.props.match.params.layoutidOfViewPage !== null && this.props.match.params.layoutidOfViewPage !== '') ? ('layoutid=' + this.props.match.params.layoutidOfViewPage + '&') : '') + 'objid='+this.props.match.params.objid+'&id=' + record.id : '');
            return (
                <a href={url} >
                    <div className="weui-form-preview__bd" style={{backgroundColor:'#fff'}} >
                        <View record={record} fields={this.state.fields}/>
                    </div>
                </a>

            );
        }

        const separator = (sectionID, rowID) => (
            <WhiteSpace key={sectionID+rowID} size="lg" />
        );

        return (
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
        );
    }
}

export default List;