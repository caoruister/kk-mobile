import React from 'react';

import { ImagePicker, WingBlank } from 'antd-mobile';

class Image extends React.Component {
  state = {
    files: data,
    multiple: false
  };
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files
    });
  };
  render() {
    const { files } = this.state;
    return (
      <ImagePicker
        files={files}
        onChange={this.onChange}
        onImageClick={(index, fs) => console.log(index, fs)}
        selectable={files.length < 7}
        multiple={this.state.multiple}
      />
    );
  }
}

export default Image;
