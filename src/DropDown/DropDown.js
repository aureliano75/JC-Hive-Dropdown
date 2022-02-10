import React from "react";
import "./DropDown.css";
class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    //parse API data
    const list = {};
    for (let i = 0; i < props.options.length; i++) {
      list[i] = { index: i, name: props.options[i], selected: false };
    }
    this.state = { open: false, list: list, all: false, single: null };
  }
  //toggle dropdown list open/close
  switchOpen() {
    this.state.open
      ? this.setState({ ...this.state, open: false })
      : this.setState({ ...this.state, open: true });
  }
  //close dropdown list
  switchClose(event) {
    this.setState({
      open: false,
    });
  }
  //render list option for single select
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
  //render list option for multi select
  MultiSelectOption(listItem) {
    return (
      <label className={`container option ${listItem.selected && "selected"}`}>
        {listItem.name}
        <input
          type="checkbox"
          checked={listItem.selected}
          //update in state where key match for the selected list option is found
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
  //select/deselect all options for multi
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
  //triggered when "Clear Field" button is clicked
  async clearField() {
    this.setState({
      list: await this.clearSelected(),
      all: false,
      single: null,
      open: false,
    });
  }
  //set all multi select to !selected when clearField() is called
  clearSelected() {
    let list = this.state.list;
    Object.keys(list).forEach((key) => {
      list[key].selected = false;
    });
    return list;
  }
  //"Select All" checkbox
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
  //handle expand/collapse animation
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
        //constuct list of selected while rendering the list
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
