import React from 'react';

import { Button, WingBlank, Flex, Toast } from 'antd-mobile';

import './ButtonSection.less';

class ButtonSection extends React.Component {
  onClickHandler(onClick) {
    let page = this.props.page;
    console.log(onClick);

    //debugger
    eval(onClick);
  }

  render() {
    let buttons = '';
    if (this.props.buttons.length !== 0) {
      buttons = this.props.buttons.map(
        (button, idx) =>
          button.visible && (
            <Flex.Item key={button.id + idx}>
              <Button
                style={{ marginRight: '4px' }}
                onClick={() => {
                  this.onClickHandler(button.events && button.events.onClick);
                }}
              >
                {button.text}
              </Button>
            </Flex.Item>
          )
      );
    } else if (this.props.useDefault) {
      buttons = (
        <Flex.Item>
          <Button
            className="section-button"
            style={{ marginRight: '4px' }}
            onClick={() => {
              this.props.page.save();
            }}
          >
            确认
          </Button>
        </Flex.Item>
      );
    }

    return (
      <WingBlank>
        <Flex>{buttons}</Flex>
      </WingBlank>
    );
  }
}

export default ButtonSection;
