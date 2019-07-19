import React from 'react';

import HomeSection from './HomeSection';
import ButtonSection from './ButtonSection';
import ReserveRoom from './ReserveRoom';
import ReserveDetail from './ReserveDetail';
import UserInfo from './UserInfo';

class DynamicSection extends React.Component {
  render() {
    let sectionName = this.props.sectionName;
    let section = <ReserveDetail page={this.props.page} />;
    if (
      'DSFF8080816BD45A82016BD47899DF0103_DS011F8316706B4F32BA9D3F72D3CA6CC0' ==
      sectionName
    ) {
      section = <HomeSection page={this.props.page} />;
    }
    if (
      'DSFF8080816BD45A82016BD47899DF0103_DS15A5A7DA2290471897374D754F452205' ==
      sectionName
    ) {
      section = <ButtonSection page={this.props.page} />;
    }

    return <div>{section}</div>;
  }
}

export default DynamicSection;
