import React from "react";
import "./DropDown.css";
class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    const list = {};
    for (let i = 0; i < props.options.length; i++) {
      list[i] = { index: i, name: props.options[i], selected: false };
    }
    this.state = { open: false, list: list, all: false, single: null };
  }

  switchOpen() {
    this.state.open
      ? this.setState({ ...this.state, open: false })
      : this.setState({ ...this.state, open: true });
  }
  switchClose(event) {
    console.log("run");
    this.setState({
      open: false,
    });
  }

  SingleSelectOption(listItem) {
    return (
      <div
        className="option"
        onClick={() => {
          this.setState({ single: listItem.name, open: !this.state.open });
        }}
      >
        <span>{listItem.name}</span>
      </div>
    );
  }
  MultiSelectOption(listItem) {
    return (
      <label className={`container option ${listItem.selected && "selected"}`}>
        {listItem.name}
        <input
          type="checkbox"
          checked={listItem.selected}
          onClick={() => {
            this.setState({
              list: {
                ...this.state.list,
                [listItem.index]: { ...listItem, selected: !listItem.selected },
              },
            });
          }}
        />
        <span className="checkmark"></span>
      </label>
    );
  }
  toggleSelectAll() {
    let list = this.state.list;
    Object.keys(list).forEach((key) => {
      list[key].selected = !this.state.all;
    });
    this.setState({
      all: !this.state.all,
      list: list,
    });
  }
  async clearField() {
    this.setState({
      list: await this.clearSelected(),
      all: false,
      single: null,
      open: false,
    });
    console.log(this.state);
  }
  clearSelected() {
    let list = this.state.list;
    Object.keys(list).forEach((key) => {
      list[key].selected = false;
    });
    return list;
  }

  SelectAll() {
    return (
      <label className={`container option ${this.state.all && "selected"}`}>
        Select All
        <input
          type="checkbox"
          checked={this.state.all}
          onClick={() => {
            this.toggleSelectAll();
          }}
        />
        <span className="checkmark"></span>
      </label>
    );
  }
  ExpandCollapse(status) {
    if (status == "expand")
      return (
        <span class="material-icons" title="Expand">
          expand_more
        </span>
      );
    if (status == "collapse")
      return (
        <span class="material-icons" title="Collapse">
          expand_less
        </span>
      );
  }
  render() {
    const { id, label, type, options, size } = this.props;
    const { open, list, all, single } = this.state;
    let selected = [];
    let listRender = [];
    let listRenderTemp = null;

    type == "multi" && listRender.push(this.SelectAll());
    Object.keys(list).map((key) => {
      if (list[key].selected) {
        selected.push(list[key].name);
      }
      if (type == "multi") {
        listRenderTemp = this.MultiSelectOption(list[key]);
      }
      if (type == "single") {
        listRenderTemp = this.SingleSelectOption(list[key]);
      }
      listRender.push(listRenderTemp);
    });

    return (
      <div className={`wrapper ${size}`} key={id}>
        <fieldset
          className={`dropdown ${open && "onFocus"}`}
          onClick={() => {
            this.switchOpen();
          }}
        >
          {open || selected.length > 0 || single ? (
            <>
              <legend>{label}</legend>
              <div className="dataDisplay">
                {type == "multi"
                  ? selected.join(", ")
                  : type == "single"
                  ? single
                  : null}
              </div>
              {open && (selected.length > 0 || single)
                ? this.ExpandCollapse("collapse")
                : !open && (selected.length > 0 || single)
                ? this.ExpandCollapse("expand")
                : this.ExpandCollapse("collapse")}
              <span
                title="Clear field"
                onClick={() => {
                  this.clearField();
                }}
                class="material-icons"
              >
                close
              </span>
            </>
          ) : (
            <>
              <div className="placeholder">
                {label}
                {this.ExpandCollapse("expand")}
              </div>
            </>
          )}
        </fieldset>
        {open && (
          <div className={`list  ${size}`}>
            <div>{listRender}</div>
          </div>
        )}
      </div>
    );
  }
}

export default DropDown;
