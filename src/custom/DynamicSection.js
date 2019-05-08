import React from 'react';
class DynamicSection extends React.Component {
  render() {
    let sectionName = this.props.sectionName;
    let section = null;
    return <div>{section}</div>;
  }
}

export default DynamicSection;
