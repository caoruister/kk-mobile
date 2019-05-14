import React from 'react';

export class NotFound extends React.Component {
  static displayName = 'EmptyContent';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title, description } = this.props;

    if (!title) {
      title = '页面暂无内容';
    }

    if (!description) {
      description = (
        <span>
          抱歉，页面暂无内容，请看看<a href="/#/Home">其他页面</a>
        </span>
      );
    }

    return (
      <div style={styles.exceptionContent}>
        <div style={styles.prompt}>
          <h3 style={styles.title}>{title}</h3>
          <p style={styles.description}>{description}</p>
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
