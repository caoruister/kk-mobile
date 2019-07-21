import React from 'react';
import { TextareaItem, Calendar, List, Button, Stepper } from 'antd-mobile';
import { createForm } from 'rc-form';

import CustomNavBar from 'components/CustomNavBar';

import {
  _formatDate,
  _getWeekDay,
  _betweenDays,
  _setTitle
} from '../common/Utils';

import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';

import cat from 'assets/images/cat.jpg';

const extra = {};

const now = new Date();
const nextMonthToday = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate()
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
            color: '#cc9e48'
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
            padding: '13px 17px',
            backgroundColor: '#fff',
            color: '#cc9e48',
            borderRadius: '5px',
            marginLeft: '20px',
            border: 'solid 1px #cc9e48',
            cursor: 'pointer'
          },
          selected: {
            padding: '13px 17px',
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

class ReserveRoom extends React.Component {
  originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;

  constructor(props) {
    super(props);
    this.state = {
      startTime: _formatDate(now),
      startWeekDay: _getWeekDay(now),
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
      adultTips: '最多入住2名成人',
      children: 0,
      childrenTips: '最多入住一名儿童（16周岁以下）',
      needCarService: false
    };
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
      //startTime: null,
      //startWeekDay: null,
      //endTime: null,
      //endWeekDay: null,
    });
  };

  getDateExtra = date => extra[+date];

  /**
   * 入住成人
   * @param val
   */
  onChangeAdult = val => {
    // console.log(val);
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

  cancel = () => {};

  reserve = () => {
    this.props.history.push('/ReserveDetail');
  };

  render() {
    const { getFieldProps } = this.props.form;

    return (
      <div>
        <CustomNavBar navTitle="住房预定" />
        <div style={styles.body}>
          <img src={cat} style={styles.body.roomImg} />
          <div style={styles.body.detail}>
            <div style={styles.body.detail.style}>
              <div>海南 白金湾养生谷公寓 一房一厅</div>
            </div>
            <div style={styles.body.detail.address}>
              <div>海南省琼海市博鳌镇滨海大道东侧 鹏欣 白金湾</div>
            </div>
            <div style={styles.body.detail.tags}>
              <div style={styles.body.detail.tags.tag}>会员尊享</div>
              <div style={styles.body.detail.tags.tag}>约52~66m²</div>
            </div>
          </div>
          <div style={styles.body.checkin}>
            <div style={styles.body.checkin.person}>
              <div>持卡人</div>
              <div style={styles.body.checkin.person.name}>周春来</div>
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
                  {this.state.adultTips}
                </span>
              </div>
              <div style={styles.body.numbers.adult.stepper}>
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  max={2}
                  min={1}
                  value={this.state.adult}
                  onChange={this.onChangeAdult}
                />
              </div>
            </div>
            <div style={styles.body.numbers.line} />
            <div style={styles.body.numbers.children}>
              <div>
                儿童
                <span style={styles.body.numbers.children.tip}>
                  {this.state.childrenTips}
                </span>
              </div>
              <div style={styles.body.numbers.children.stepper}>
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  max={1}
                  min={0}
                  value={this.state.children}
                  onChange={this.onChangeChildren}
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
                  {...getFieldProps('remark', {
                    initialValue: '',
                    onChange() {}
                  })}
                  count={46}
                />
              </div>
            </div>
          </div>
          <div style={styles.body.introduce}>
            <img src={cat} style={styles.body.roomImg} />
          </div>
          <div style={styles.body.actions}>
            <Button
              inline
              style={styles.body.actions.contact}
              block="true"
              onClick={this.contact}
            >
              联系客服
            </Button>
            <Button
              inline
              style={styles.body.actions.reserve}
              block="true"
              onClick={this.reserve}
            >
              立即预定
            </Button>
          </div>

          <Calendar
            {...this.state.config}
            visible={this.state.show}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            onSelectHasDisableDate={this.onSelectHasDisableDate}
            getDateExtra={this.getDateExtra}
            defaultDate={now}
            minDate={new Date(+now)}
            maxDate={new Date(+now + 31536000000)}
          />
        </div>
      </div>
    );
  }
}

export default createForm()(ReserveRoom);
