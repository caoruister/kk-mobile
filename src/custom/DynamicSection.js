import React from 'react';

// ****************************************************
// import Section1 from './sections/PXXXXXXXXXXXXXXXXXXXXXXXXX/Section1';
// import Section2 from './sections/PXXXXXXXXXXXXXXXXXXXXXXXXX/Section2';
// ****************************************************

class DynamicSection extends React.Component {
  render() {
    let sectionName = this.props.sectionName;
    let section = null;
    //
    // if ('Section1' == sectionName) {section = <Section1 />;}
    // if ('Section2' == sectionName) {section = <Section2 />;}
    return <div>{section}</div>;
  }
}

export default DynamicSection;
