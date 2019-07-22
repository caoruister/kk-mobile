import { Toast } from 'antd-mobile';

export const URL_PREFIX = process.env.REACT_APP_URL_PREFIX;
export const FILE_URL_PREFIX = process.env.REACT_APP_FILE_URL_PREFIX;
export const WEB_CONTEXT = process.env.REACT_APP_WEB_CONTEXT;
export const LOGIN_TYPE = process.env.REACT_APP_LOGIN_TYPE;

export const _setButtonVisible = function(buttonName, isVisible, pageInstance) {
  var buttons = pageInstance.state.buttons;
  buttons &&
    buttons.forEach(button => {
      if (buttonName == button.name) {
        button.visible = isVisible;

        pageInstance.setState({
          buttons: buttons
        });
      }
    });
};

export const _betweenDays = (sdate, edate) => {
  return (+edate - +sdate) / (1000 * 60 * 60 * 24);
};

const WEEK_DAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export const _getWeekDay = date => {
  return WEEK_DAYS[date.getDay()];
};

export const _formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('-');
};

export const _formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('-') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

export const _isWeiXinEnv = () => {
  return window.__wxjs_environment === 'miniprogram';
};

export const _setTitle = (title, isTabBar) => {
  if (!isTabBar && _isWeiXinEnv()) {
    document.title = '';
  } else {
    document.title = title;
  }
};

export const _success = (content, duration, onClick) => {
  Toast.success(content, duration, onClick);
};

export const _fail = (content, duration, onClick) => {
  Toast.fail(content, duration, onClick);
};

export const _info = (content, duration, onClick) => {
  Toast.info(content, duration, onClick);
};
