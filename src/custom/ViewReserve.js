import React from 'react';
import qs from 'qs';
import { TextareaItem, Calendar, List, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

import CustomNavBar from 'components/CustomNavBar';

import { _callInterface } from 'api/CommonAPI';

var styles = {
  body: {
    roomImg: {
      width: '100%',
      height: '215px'
    },
    detail: {
      padding: '16px 16px 16px 16px',
      backgroundColor: '#fff',
      style: {
        fontSize: '18px',
        color: '#36333a',
        display: 'flex',
        alignItems: 'center'
      },
      address: {
        fontSize: '15px',
        color: '#36333a',
        marginTop: '15px'
      },
      tags: {
        fontSize: '12px',
        color: '#006934',
        marginTop: '15px',
        display: 'flex',
        alignItems: 'center',
        tag: {
          border: '1px solid #f7f7f7',
          borderRadius: '13px',
          padding: '10px 10px',
          marginRight: '12px'
        }
      }
    },
    checkin: {
      fontSize: '16px',
      color: '#6a646d',
      backgroundColor: '#fff',
      marginTop: '5px',
      person: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px 15px',
        name: {
          color: '#36333a'
        }
      },
      line: {
        width: '100%',
        height: '1px',
        backgroundColor: '#dfdfe1'
      },
      reserve: {
        padding: '16px 15px',
        title: {},
        date: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '21px',
          textAlign: 'center',
          color: '#36333a',
          fontSize: '12px',
          in: {
            flex: '1',
            day: {
              color: '#cc9e48',
              fontSize: '18px',
              marginTop: '8px',
              weekday: {
                fontSize: '12px'
              }
            }
          },
          days: {
            padding: '4px 8px',
            backgroundColor: '#cc9e48',
            borderRadius: '10px',
            color: '#fff'
          },
          out: {
            flex: '1',
            day: {
              color: '#cc9e48',
              fontSize: '18px',
              marginTop: '8px',
              weekday: {
                fontSize: '12px'
              }
            }
          }
        }
      }
    },
    numbers: {
      padding: '15px 0 30px 15px',
      fontSize: '16px',
      color: '#6a646d',
      backgroundColor: '#fff',
      marginTop: '5px',
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: '16px',
        text: {
          display: 'flex',
          adult: {
            color: '#cc9e48'
          },
          children: {
            marginLeft: '10px'
          }
        }
      },
      adult: {
        marginTop: '26px',
        paddingRight: '16px',
        tip: {
          marginLeft: '8px',
          fontSize: '16px',
          color: '#838596'
        }
      },
      line: {
        marginTop: '21px',
        width: '100%',
        height: '1px',
        backgroundColor: '#dfdfe1'
      },
      children: {
        marginTop: '21px',
        paddingRight: '16px',
        tip: {
          marginLeft: '8px',
          fontSize: '16px',
          color: '#838596'
        }
      }
    },
    append: {
      backgroundColor: '#fff',
      fontSize: '16px',
      color: '#6a646d',
      marginTop: '5px',
      carservice: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 15px',
        checkbox: {
          color: '#cc9e48',
          display: 'flex',
          yes: {
            padding: '13px 17px',
            backgroundColor: '#fff',
            color: '#cc9e48',
            borderRadius: '5px',
            border: 'solid 1px #cc9e48'
          },
          no: {
            padding: '13px 17px',
            backgroundColor: '#cc9e48',
            color: '#fff',
            borderRadius: '5px',
            marginLeft: '20px',
            border: 'solid 1px #cc9e48'
          }
        }
      },
      line: {
        width: '100%',
        height: '1px',
        backgroundColor: '#dfdfe1'
      },
      remark: {
        padding: '16px 15px',
        textarea: {
          marginTop: '10px'
        }
      }
    },
    introduce: {
      backgroundColor: '#fff',
      marginTop: '5px'
    },
    actions: {
      display: 'flex',
      backgroundColor: '#fff',
      padding: '20px 15px',
      justifyContent: 'space-around',
      fontSize: '18px',
      contact: {
        backgroundColor: '#fff',
        border: 'solid 1px #cc9e48',
        borderRadius: '5px',
        padding: '0 48px',
        fontSize: '19px',
        color: '#cc9e48',
        height: '60px',
        lineHeight: '60px'
      },
      reserve: {
        backgroundColor: '#cc9e48',
        border: 'solid 1px #cc9e48',
        borderRadius: '5px',
        padding: '0 48px',
        fontSize: '19px',
        color: '#fff',
        height: '60px',
        lineHeight: '60px'
      }
    }
  }
};

class ViewReserve extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      startTime: '',
      startWeekDay: '',
      endTime: null,
      endWeekDay: '',
      days: 0,
      adult: 1,
      children: 0,
      needCarService: false,

      holderName: '',
      flatName: '',
      flatType: '',
      flatAddress: '',

      remark: ''
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getData = () => {
    let oThis = this;
    //
    let id = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).id;
    //
    var interfaceName = 'getInfoForOrdingForView'; // 接口名称
    var params = {
      id: id
    }; // 向接口提交的参数
    _callInterface(interfaceName, params).then(res => {
      if (res == null) {
        return;
      }
      //
      console.log('------------data-------------');
      console.log(res);
      //
      oThis.setState({
        startTime: res.dueStartDate,
        endTime: res.dueEndDate,
        adult: res.adultNumber,
        children: res.badyNumber,
        days: res.yyrzts,
        remark: res.remark,
        needCarService: res.pickUpService,
        orderTime: res.createdate,
        orderNum: res.name,
        phone: res.duePhone,
        flatName: res.hName,
        flatType: res.rName,
        holderName: res.mName
      });
    });
  };

  render() {
    return (
      <div>
        <CustomNavBar navTitle="订单详情" />
        <div style={styles.body}>
          <div style={styles.body.detail}>
            <div style={styles.body.detail.style}>
              <div>
                海南 {this.state.flatName} {this.state.flatType}
              </div>
            </div>
            <div style={styles.body.checkin.reserve}>
              <div style={styles.body.checkin.reserve.date}>
                <div style={styles.body.checkin.reserve.date.in}>
                  <div>入住日期</div>
                  <div style={styles.body.checkin.reserve.date.in.day}>
                    {this.state.startTime}
                    <span
                      style={styles.body.checkin.reserve.date.out.day.weekday}
                    >
                      {this.state.startWeekDay}
                    </span>
                  </div>
                </div>
                <div style={styles.body.checkin.reserve.date.days}>
                  {this.state.days}天
                </div>
                <div style={styles.body.checkin.reserve.date.out}>
                  <div>离店日期</div>
                  <div style={styles.body.checkin.reserve.date.out.day}>
                    {this.state.endTime}
                    <span
                      style={styles.body.checkin.reserve.date.out.day.weekday}
                    >
                      {this.state.endWeekDay}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.body.checkin}>
            <div style={styles.body.checkin.person}>
              <div>持卡人</div>
              <div style={styles.body.checkin.person.name}>
                {this.state.holderName}
              </div>
            </div>
            <div style={styles.body.checkin.line} />
            <div style={styles.body.checkin.person}>
              <div>入住人数</div>
              <div style={styles.body.numbers.header.text}>
                <div style={styles.body.numbers.header.text.adult}>
                  {this.state.adult}成人
                </div>
                <div style={styles.body.numbers.header.text.children}>
                  {this.state.children}儿童
                </div>
              </div>
            </div>
            <div style={styles.body.checkin.line} />
            <div style={styles.body.checkin.person}>
              <div>联系手机</div>
              <div>{this.state.phone}</div>
            </div>
            <div style={styles.body.checkin.line} />
            <div style={styles.body.checkin.person}>
              <div>接车服务</div>
              {this.state.needCarService && <div>需要</div>}
              {!this.state.needCarService && <div>不需要</div>}
            </div>
            <div style={styles.body.checkin.line} />
            <div style={styles.body.checkin.person}>
              <div>备注</div>
              <div style={styles.body.append.remark.textarea}>
                {this.state.remark}
              </div>
            </div>
          </div>

          <div style={styles.body.append}>
            <div style={styles.body.append.carservice}>
              <div>订单号</div>
              <div style={styles.body.append.carservice.checkbox}>
                {this.state.orderNum}
              </div>
            </div>
            <div style={styles.body.append.carservice}>
              <div>下单时间</div>
              <div style={styles.body.append.carservice.checkbox}>
                {this.state.orderTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewReserve;
