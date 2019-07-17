import React from 'react';

import MyComponent from './MyComponent';
import ReserveRoom from './ReserveRoom';

class DynamicSection extends React.Component {
  render() {
    let sectionName = this.props.sectionName;
    let section = <MyComponent />;
    return <div>{section}</div>;
  }
}

export default DynamicSection;
