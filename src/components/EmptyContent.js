import React from 'react';

export class EmptyContent extends React.Component {
    static displayName = 'EmptyContent';

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="empty-content">
                <div style={styles.exceptionContent} className="exception-content">
                    <img
                        src={require('../assets/images/404.png')}
                        style={styles.image}
                        className="imgException"
                        alt="empty"
                        />
                    <div style={styles.prompt}>
                        <h3 style={styles.title} className="title">
                            页面暂无内容
                        </h3>
                        <p style={styles.description} className="description">
                            抱歉，页面暂无内容，请看看其他页面
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
        alignItems: 'center',
    },
    title: {
        color: '#333',
    },
    description: {
        color: '#666',
    },
};

export default EmptyContent;
