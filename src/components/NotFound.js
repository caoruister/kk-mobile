import React from 'react';

export class NotFound extends React.Component {
  static displayName = 'EmptyContent';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="empty-content">
        <div style={styles.exceptionContent} className="exception-content">
          <div style={styles.prompt}>
            <h3 style={styles.title} className="title">
              页面暂无内容
            </h3>
            <p style={styles.description} className="description">
              抱歉，页面暂无内容，请看看<a href="/#/Home">其他页面</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  exceptionContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#333'
  },
  description: {
    color: '#666'
  }
};

export default NotFound;
