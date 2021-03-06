import React from 'react';
import {
  TextareaItem,
  Calendar,
  List,
  Button,
  Stepper,
  InputItem
} from 'antd-mobile';
import { createForm } from 'rc-form';

import CustomNavBar from 'components/CustomNavBar';
import Swiper from 'components/Swiper';

import {
  _formatDate,
  _getWeekDay,
  _betweenDays,
  _setTitle,
  _fail,
  FILE_URL_PREFIX
} from 'common/Utils';

import { _callInterface } from 'api/CommonAPI';

import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';

import addressIcon from 'assets/images/icon_location.png';

//const addressIcon =
//    process.env.REACT_APP_FILE_URL_PREFIX +
//    'file?getfile=402883B86BD1787A016BD1787A120000/mobile/images/icon_location.png';

const extra = {};

const now = new Date();
const nextThirtyDays = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() + 30
);

Object.keys(extra).forEach(key => {
  const info = extra[key];
  const date = new Date(key);
  if (!Number.isNaN(+date) && !extra[+date]) {
    extra[+date] = info;
  }
});

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
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: '15px',
        color: '#36333a',
        marginTop: '15px',
        icon: {
          width: '12px',
          height: '15px'
        },
        text: {
          marginLeft: '11px'
        }
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
                fontSize: '12px',
                marginLeft: '10px'
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
                fontSize: '12px',
                marginLeft: '10px'
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
            //color: '#cc9e48'
          },
          children: {
            marginLeft: '10px'
          }
        }
      },
      adult: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '26px',
        paddingRight: '16px',
        tip: {
          marginLeft: '8px',
          fontSize: '16px',
          color: '#838596'
        },
        stepper: {}
      },
      line: {
        marginTop: '21px',
        width: '100%',
        height: '1px',
        backgroundColor: '#dfdfe1'
      },
      children: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '21px',
        paddingRight: '16px',
        tip: {
          marginLeft: '8px',
          fontSize: '16px',
          color: '#838596'
        }
      }
    },
    person: {
      color: '#6a646d',
      backgroundColor: '#fff',
      marginTop: '5px',
      contact: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 15px'
      },
      mobile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 15px'
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
          noSelected: {
            width: '80px',
            textAlign: 'center',
            padding: '13px 0',
            backgroundColor: '#fff',
            color: '#cc9e48',
            borderRadius: '5px',
            marginLeft: '20px',
            border: 'solid 1px #cc9e48',
            cursor: 'pointer'
          },
          selected: {
            width: '80px',
            textAlign: 'center',
            padding: '13px 0',
            backgroundColor: '#cc9e48',
            color: '#fff',
            borderRadius: '5px',
            marginLeft: '20px',
            border: 'solid 1px #cc9e48',
            cursor: 'pointer'
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
          marginTop: '10px',
          content: {}
        }
      }
    },
    introduce: {
      backgroundColor: '#fff',
      marginTop: '5px',
      image: {
        minHeight: '100px',
        width: '100%'
      }
    },
    actions: {
      display: 'flex',
      backgroundColor: '#fff',
      padding: '20px 15px',
      justifyContent: 'space-between',
      fontSize: '18px',
      contact: {
        textAlign: 'center',
        flex: '1',
        backgroundColor: '#fff',
        border: 'solid 1px #cc9e48',
        borderRadius: '5px',
        //padding: '0 48px',
        fontSize: '19px',
        color: '#cc9e48',
        height: '60px',
        lineHeight: '60px'
      },
      reserve: {
        textAlign: 'center',
        flex: '1',
        backgroundColor: '#cc9e48',
        border: 'solid 1px #cc9e48',
        borderRadius: '5px',
        //padding: '0 48px',
        fontSize: '19px',
        color: '#fff',
        height: '60px',
        lineHeight: '60px',
        marginLeft: '14px'
      }
    }
  }
};

class ReserveRoom extends React.Component {
  originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;

  constructor(props) {
    super(props);
    this.state = {
      startTime: _formatDate(nextThirtyDays),
      startWeekDay: _getWeekDay(nextThirtyDays),
      endTime: null,
      endWeekDay: '',
      days: 0,
      show: false,
      config: {
        locale: zhCN,
        enterDirection: 'horizontal',
        showShortcut: true,
        onSelect: (date, state) => {
          console.log('onSelect', date, state);
        }
      },
      adult: 1,
      children: 0,
      needCarService: false,

      holderName: '',
      flatName: '',
      flatType: '',
      flatAddress: '',
      flatTags: [],
      maxAdult: 0,
      maxChildren: 0,

      remark: '',

      banners: [],
      roomIntroduce: {},

      illustration: '',
      refund: '',
      phone: '',

      contactName: '',
      contactMobile: ''
    };
  }

  componentDidMount() {
    this._isMounted = true;
    let oThis = this;
    //用户回退修改预定信息
    let reservation = JSON.parse(
      sessionStorage.getItem('__reservation__') || '{}'
    );

    this.setState({
      ...reservation
    });

    var interfaceName = 'getInfoForOrding'; // 接口名称
    var params = {}; // 向接口提交的参数
    _callInterface(interfaceName, params).then(res => {
      //
      console.log('------------data-------------');
      console.log(res);

      if (res == null) {
        this.props.history.push('/Login');
        return;
      }

      //房型轮播图
      let banners = (res.rPic || []).map(pic => {
        return {
          imageUrl: FILE_URL_PREFIX + pic,
          webviewUrl: 'javascript:;'
        };
      });

      //房型介绍图
      let roomIntroduce =
        res.fxjs && res.fxjs.length > 0 ? FILE_URL_PREFIX + res.fxjs[0] : '';

      if (oThis._isMounted) {
        oThis.setState({
          flatName: res.hName,
          flatType: res.rName,
          flatAddress: res.address,
          flatTags: res.rTag,
          holderName: res.mName,
          maxAdult: res.crrzsxz,
          maxChildren: res.etrzsxz,
          banners: banners,
          roomIntroduce: roomIntroduce,
          illustration: res.orgRPolicy,
          refund: res.orgCPolicy,
          phone: res.mPhone,
          contactName: res.mName,
          contactMobile: res.mPhone
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSelectHasDisableDate = dates => {
    console.warn('onSelectHasDisableDate', dates);
  };

  onConfirm = (startTime, endTime) => {
    document.getElementsByTagName(
      'body'
    )[0].style.overflowY = this.originbodyScrollY;
    this.setState({
      show: false,
      startTime: _formatDate(startTime),
      startWeekDay: _getWeekDay(startTime),
      endTime: _formatDate(endTime),
      endWeekDay: _getWeekDay(endTime),
      days: _betweenDays(startTime, endTime)
    });
  };

  onCancel = () => {
    document.getElementsByTagName(
      'body'
    )[0].style.overflowY = this.originbodyScrollY;
    this.setState({
      show: false
    });
  };

  getDateExtra = date => extra[+date];

  /**
   * 入住成人
   * @param val
   */
  onChangeAdult = val => {
    //console.log(val);
    this.setState({ adult: val });
  };

  /**
   * 入住儿童
   * @param val
   */
  onChangeChildren = val => {
    // console.log(val);
    this.setState({ children: val });
  };

  /**
   * 备注
   * @param val
   */
  onChangeRemark = val => {
    this.setState({ remark: val });
  };

  cancel = () => {};

  reserve = () => {
    const {
      flatName,
      flatType,
      startTime,
      startWeekDay,
      endTime,
      endWeekDay,
      days,
      holderName,
      adult,
      children,
      needCarService,
      remark,
      illustration,
      refund,
      phone,
      contactName,
      contactMobile
    } = this.state;

    if (!startTime) {
      _fail('请选择入住日期!');
      return;
    } else if (!endTime) {
      _fail('请选择离店日期!');
      return;
    } else if (adult < 1) {
      _fail('请至少选择1名成人!');
      return;
    }

    sessionStorage.setItem(
      '__reservation__',
      JSON.stringify({
        flatName,
        flatType,
        startTime,
        startWeekDay,
        endTime,
        endWeekDay,
        days,
        holderName,
        adult,
        children,
        needCarService,
        remark,
        illustration,
        refund,
        phone,
        contactName,
        contactMobile
      })
    );

    this.props.history.push('/ReserveDetail');
  };

  render() {
    const { getFieldProps } = this.props.form;

    let tags = (this.state.flatTags || []).map((tag, index) => {
      return (
        <div style={styles.body.detail.tags.tag} key={index}>
          {tag}
        </div>
      );
    });

    return (
      <div>
        <CustomNavBar navTitle="住房预定" />
        <div style={styles.body}>
          <Swiper data={this.state.banners} />
          <div style={styles.body.detail}>
            <div style={styles.body.detail.style}>
              <div>
                {this.state.flatName} {this.state.flatType}
              </div>
            </div>
            <div style={styles.body.detail.address}>
              <img src={addressIcon} style={styles.body.detail.address.icon} />
              <div style={styles.body.detail.address.text}>
                {this.state.flatAddress}
              </div>
            </div>
            <div style={styles.body.detail.tags}>{tags}</div>
          </div>
          <div style={styles.body.checkin}>
            <div style={styles.body.checkin.person}>
              <div>持卡人</div>
              <div style={styles.body.checkin.person.name}>
                {this.state.holderName}
              </div>
            </div>
            <div style={styles.body.checkin.line} />
            <div style={styles.body.checkin.reserve}>
              <div style={styles.body.checkin.reserve.title}>预定日期</div>
              <div style={styles.body.checkin.reserve.date}>
                <div style={styles.body.checkin.reserve.date.in}>
                  <div>入住日期</div>
                  <div
                    style={styles.body.checkin.reserve.date.in.day}
                    onClick={() => {
                      document.getElementsByTagName('body')[0].style.overflowY =
                        'hidden';
                      this.setState({
                        show: true
                      });
                    }}
                  >
                    <span>{this.state.startTime || '请选择入住日期'}</span>
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
                  <div
                    style={styles.body.checkin.reserve.date.out.day}
                    onClick={() => {
                      document.getElementsByTagName('body')[0].style.overflowY =
                        'hidden';
                      this.setState({
                        show: true
                      });
                    }}
                  >
                    <span>{this.state.endTime || '请选择离店日期'}</span>
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
          <div style={styles.body.numbers}>
            <div style={styles.body.numbers.header}>
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
            <div style={styles.body.numbers.adult}>
              <div>
                成人
                <span style={styles.body.numbers.adult.tip}>
                  最多入住{this.state.maxAdult}名成人
                </span>
              </div>
              <div style={styles.body.numbers.adult.stepper}>
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  max={this.state.maxAdult}
                  min={1}
                  value={this.state.adult}
                  defaultValue={1}
                  onChange={this.onChangeAdult}
                />
              </div>
            </div>
            <div style={styles.body.numbers.line} />
            <div style={styles.body.numbers.children}>
              <div>
                儿童
                <span style={styles.body.numbers.children.tip}>
                  最多入住{this.state.maxChildren}名儿童（16周岁以下）
                </span>
              </div>
              <div style={styles.body.numbers.children.stepper}>
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  max={this.state.maxChildren}
                  min={0}
                  value={this.state.children}
                  onChange={this.onChangeChildren}
                />
              </div>
            </div>
          </div>

          <div style={styles.body.person}>
            <div style={styles.body.person.contact}>
              <div>联系人</div>
              <div>
                <InputItem
                  placeholder="请输入联系人"
                  className="contact-person"
                  value={this.state.contactName}
                  onChange={v => {
                    this.setState({
                      contactName: v
                    });
                  }}
                />
              </div>
            </div>
            <div style={styles.body.append.line} />
            <div style={styles.body.person.mobile}>
              <div>手机号</div>
              <div>
                <InputItem
                  type="number"
                  maxLength="11"
                  placeholder="请输入手机号"
                  className="contact-person"
                  value={this.state.contactMobile}
                  onChange={v => {
                    this.setState({
                      contactMobile: v
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div style={styles.body.append}>
            <div style={styles.body.append.carservice}>
              <div>接车服务</div>
              <div style={styles.body.append.carservice.checkbox}>
                <div
                  style={
                    this.state.needCarService
                      ? styles.body.append.carservice.checkbox.selected
                      : styles.body.append.carservice.checkbox.noSelected
                  }
                  onClick={() => {
                    this.setState({
                      needCarService: true
                    });
                  }}
                >
                  需要
                </div>
                <div
                  style={
                    this.state.needCarService
                      ? styles.body.append.carservice.checkbox.noSelected
                      : styles.body.append.carservice.checkbox.selected
                  }
                  onClick={() => {
                    this.setState({
                      needCarService: false
                    });
                  }}
                >
                  不需要
                </div>
              </div>
            </div>
            <div style={styles.body.append.line} />
            <div style={styles.body.append.remark}>
              <div>备注</div>
              <div style={styles.body.append.remark.textarea}>
                <TextareaItem
                  onChange={this.onChangeRemark}
                  style={styles.body.append.remark.textarea.content}
                  className="remark-content"
                  placeholder="可输入46个字"
                  value={this.state.remark}
                  rows={2}
                  count={46}
                />
              </div>
            </div>
          </div>
          {this.state.roomIntroduce && (
            <div style={styles.body.introduce}>
              <img
                src={this.state.roomIntroduce}
                style={styles.body.introduce.image}
              />
            </div>
          )}
          <div style={styles.body.actions}>
            <a
              style={styles.body.actions.contact}
              href={'tel:' + this.state.phone}
            >
              联系客服
            </a>
            <a style={styles.body.actions.reserve} onClick={this.reserve}>
              立即预定
            </a>
          </div>

          <Calendar
            {...this.state.config}
            visible={this.state.show}
            showShortcut={false}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            onSelectHasDisableDate={this.onSelectHasDisableDate}
            getDateExtra={this.getDateExtra}
            defaultDate={nextThirtyDays}
            minDate={new Date(+nextThirtyDays)}
            maxDate={new Date(+nextThirtyDays + 1000 * 60 * 60 * 24 * 60)}
          />
        </div>
      </div>
    );
  }
}

export default createForm()(ReserveRoom);
