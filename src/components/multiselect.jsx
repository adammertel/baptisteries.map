import React, { Component } from 'react'

const defaultProps = {
  defaultOpen: false,
  labelAllSelected: 'all options selected',
  unSelectAllOption: true,
  selectAllOption: true
}

export default class MultiSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.defaultOpen || defaultProps.defaultOpen
    }
  }

  _handleToggleOpen() {
    console.log('focusing')
    this.setState({ open: !this.state.open })
  }

  _handleCloseOpen() {
    this.setState({ open: false })
  }

  _handleOptionClicked(option) {
    this.props.optionClicked(option)
  }

  componentDidMount() {}

  _classWrapper() {
    let classNames = ['dropdown', 'is-right']
    if (this.state.open) {
      classNames.push('is-active')
    }
    return classNames.join(' ')
  }

  _renderOption(key, value, label, active, clickFunction) {
    const iconCheck = active
      ? 'fa fa-check-square-o'
      : 'fa fa-square-o'
    return (
      <a className="dropdown-item" key={key} onClick={clickFunction}>
        <label className="checkbox">
          <span className="icon is-small is-left">
            <i className={iconCheck} />
          </span>
          <span>{label}</span>
        </label>
      </a>
    )
  }

  _renderSelectAllOption() {
    return this._renderOption(
      'selectAll',
      'all',
      'select all',
      true,
      this.props.selectAll
    )
  }
  _renderUnSelectAllOption() {
    return this._renderOption(
      'unselectAll',
      'none',
      'unselect all',
      true,
      this.props.selectAll
    )
  }

  render() {
    const props = Object.assign({}, this.props, defaultProps)
    console.log(props)
    return (
      <div className={this._classWrapper()}>
        <div className="dropdown-trigger">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              onClick={this._handleToggleOpen.bind(this)}
              value={props.labelAllSelected}
              readOnly={true}
              style={{ cursor: 'pointer' }}
            />
            {this.props.icon && (
              <span className="icon is-small is-left">
                <i className={'fa fa-' + this.props.icon} />
              </span>
            )}
            <span className="icon is-small is-right">
              <i className="fa fa-angle-down" />
            </span>
          </p>
        </div>
        <div
          className="dropdown-menu"
          id="dropdown-menu3"
          role="menu"
        >
          <div className="dropdown-content">
            {props.selectAllOption && this._renderSelectAllOption()}
            {props.unSelectAllOption &&
              this._renderUnSelectAllOption()}
            {props.options.map(option => {
              return this._renderOption(
                option.value,
                option.value,
                option.label,
                option.active,
                this._handleOptionClicked.bind(this, option)
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
