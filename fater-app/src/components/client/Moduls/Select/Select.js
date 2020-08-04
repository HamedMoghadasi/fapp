import React, { Component } from "react";
import Select from "react-select";
import "./Select.css";

class SelectModule extends Component {
  groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  formatGroupLabel = (data) => (
    <div style={this.groupStyles}>
      <span>{data.label}</span>
    </div>
  );
  customStyles = {
    option: (provided, state) => ({
      color: "black",
    }),
  };
  render() {
    return (
      <Select
        className="select-module"
        classNamePrefix="react-select"
        defaultValue={this.props.defaultValue}
        options={this.props.options}
        formatGroupLabel={this.formatGroupLabel}
        isRtl={true}
        onChange={this.props.handleChange}
        maxMenuHeight={130}
        styles={this.customStyles}
        noOptionsMessage={() => "موردی یافت نشد."}
      />
    );
  }
}

export default SelectModule;
