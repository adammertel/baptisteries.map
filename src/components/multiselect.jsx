import React from "react";

const defaultProps = {
  defaultOpen: false,
  labelAllSelected: "all options selected",
  labelNothingSelected: "nothing selected",
  unSelectAllOption: true,
  selectAllOption: true,
  maxCharactersInInput: 50,
  longSelectedText: no => no + " options selected"
};

export default class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.defaultOpen || defaultProps.defaultOpen
    };
  }

  _handleToggleOpen() {
    this.setState({ open: !this.state.open });
  }

  _handleCloseOpen() {
    this.setState({ open: false });
  }

  _handleOptionClicked(option) {
    this.props.optionClicked(option);
  }

  _classWrapper() {
    let classNames = ["dropdown", "is-right"];
    if (this.state.open) {
      classNames.push("is-active");
    }
    return classNames.join(" ");
  }

  _renderOption(value, label, active, clickFunction, displayIcon = true) {
    const iconCheck = active ? "fa fa-check-square-o" : "fa fa-square-o";

    return (
      <a className="dropdown-item" key={value} onClick={clickFunction}>
        <label className="checkbox">
          {displayIcon && (
            <span className="icon is-small is-left">
              <i className={iconCheck} />
            </span>
          )}
          <span>{label}</span>
        </label>
      </a>
    );
  }

  _renderSelectAllOption() {
    return this._renderOption(
      "all",
      "select all",
      true,
      this.props.selectAll,
      false
    );
  }
  _renderUnSelectAllOption() {
    return this._renderOption(
      "none",
      "unselect all",
      true,
      this.props.unselectAll,
      false
    );
  }

  _inputValue(props) {
    const selectedOptions = props.options
      .filter(o => o.active)
      .map(o => o.inputLabel);

    const selectedNo = selectedOptions.length;
    const allOptions = props.options.length;

    if (selectedNo === allOptions) {
      return props.labelAllSelected;
    } else if (selectedNo === 0) {
      return props.labelNothingSelected;
    } else {
      const joinedLabel = selectedOptions.join(", ");
      if (joinedLabel.length > props.maxCharactersInInput) {
        return props.longSelectedText(selectedNo);
      } else {
        return joinedLabel;
      }
    }
  }

  render() {
    const props = Object.assign({}, defaultProps, this.props);
    console.log(props);
    return (
      <div className={this._classWrapper()} style={{ width: "100%" }}>
        <div className="dropdown-trigger" style={{ width: "100%" }}>
          <p className="control has-icons-right">
            <input
              className="input"
              type="text"
              onClick={this._handleToggleOpen.bind(this)}
              value={this._inputValue(props)}
              readOnly={true}
              style={{ cursor: "pointer" }}
            />
            {this.props.icon && (
              <span className="icon is-small is-left">
                <i className={"fa fa-" + this.props.icon} />
              </span>
            )}
            <span className="icon is-small is-right">
              <i className="fa fa-angle-down" />
            </span>
          </p>
        </div>
        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
          <div className="dropdown-content">
            {props.selectAllOption && this._renderSelectAllOption()}

            {props.unSelectAllOption && this._renderUnSelectAllOption()}

            {props.options.map(option => {
              return this._renderOption(
                option.value,
                option.label,
                option.active,
                this._handleOptionClicked.bind(this, option)
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
