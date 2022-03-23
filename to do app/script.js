class DoneItems extends React.Component {


  removeDoneItem(id) {
    this.props.deleteDoneItem(id);
  }



  render() {
    const completedStyle = {
      color: '#999999',
      textDecoration: "line-through",
      fontWeight: 400 };


    const listItems = this.props.entries.map((doneItems) => /*#__PURE__*/
    React.createElement("div", { className: "field", key: doneItems.id }, /*#__PURE__*/
    React.createElement("h3", null, /*#__PURE__*/
    React.createElement("label", { className: "item", style: completedStyle }, doneItems.text), /*#__PURE__*/
    React.createElement("button", { className: "mini ui icon button", onClick: () => {this.removeDoneItem(doneItems.id);} }, /*#__PURE__*/React.createElement("i", { className: "minus circle icon" })))));




    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", null, listItems)));


  }}



class ToDoItems extends React.Component {

  removeItem(id) {
    this.props.deleteItem(id);
  }

  checkItem(id) {
    this.props.updateCheckedItem(id);
  }


  render() {
    const listItems = this.props.entries.map((item) => /*#__PURE__*/
    React.createElement("div", { className: "field", key: item.id }, /*#__PURE__*/
    React.createElement("div", { className: "ui checkbox" }, /*#__PURE__*/
    React.createElement("input", { type: "checkbox", onChange: () => this.checkItem(item.id) }), /*#__PURE__*/
    React.createElement("label", { className: "item", checked: item.completed }, /*#__PURE__*/React.createElement("h2", null, item.text))), /*#__PURE__*/

    React.createElement("button", { className: "mini ui icon button", onClick: () => {this.removeItem(item.id);} }, /*#__PURE__*/React.createElement("i", { className: "minus circle icon" }))));



    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", null, listItems)));


  }}




class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItem: '',
      doneItems: [],
      weekday: new Date().getDay(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      year: new Date().getFullYear() };


    this.addNewItem = this.addNewItem.bind(this);
    this.newItemBuffer = this.newItemBuffer.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateCheckedItem = this.updateCheckedItem.bind(this);
    this.deleteDoneItem = this.deleteDoneItem.bind(this);


  }


  // adds to state.newItem on add button click
  addNewItem(event) {
    const newItem = { id: this.state.items.length,
      text: this.state.newItem,
      completed: false };


    this.setState(prevState => {
      return {
        items: prevState.items.concat(newItem) };

    });
    this.setState({ newItem: '' });
    console.log(this.state.items);
    event.preventDefault();
  }

  // figures out what's to be added on input update
  newItemBuffer(event) {
    this.setState({ newItem: event.target.value });
  }

  deleteItem(id) {

    const filteredItems = this.state.items.filter(item => {
      return item.id !== id;
    });

    this.setState({ items: filteredItems });


  }

  deleteDoneItem(id) {

    const filteredItems = this.state.doneItems.filter(item => {
      return item.id !== id;
    });

    this.setState({ doneItems: filteredItems });


  }

  updateCheckedItem(id) {

    this.setState(prevState => {
      const updatedTodo = prevState.items.map(item => {
        if (item.id === id)
        {
          item.completed = !item.completed;
        }
        return item;
      });
      return {
        items: updatedTodo };


    });

    const doneItem = this.state.items.filter(item => {
      return item.id === id;
    });


    this.setState(prevState => {
      return {
        doneItems: prevState.doneItems.concat(doneItem) };

    });

    this.deleteItem(id);

  }


  render() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return /*#__PURE__*/(
      React.createElement("div", { className: "ui grid App" }, /*#__PURE__*/
      React.createElement("div", { className: "sixteen wide column" }, /*#__PURE__*/
      React.createElement("h5", null, `${weekdayNames[this.state.weekday]}, ${this.state.day} ${monthNames[this.state.month]} ${this.state.year}`)), /*#__PURE__*/

      React.createElement("div", { className: "sixteen wide column" }, /*#__PURE__*/
      React.createElement("h1", null, "To Do List"), /*#__PURE__*/
      React.createElement(ToDoItems, { entries: this.state.items, deleteItem: this.deleteItem, updateCheckedItem: this.updateCheckedItem })), /*#__PURE__*/


      React.createElement("div", { className: "sixteen wide column" }, /*#__PURE__*/
      React.createElement("form", { onSubmit: this.addNewItem }, /*#__PURE__*/
      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "ui input" }, /*#__PURE__*/
      React.createElement("input", { type: "text", placeholder: "add task...", onChange: this.newItemBuffer, value: this.state.newItem })), /*#__PURE__*/

      React.createElement("button", { className: "ui circular icon button", type: "submit", onClick: this.addNewItem }, /*#__PURE__*/
      React.createElement("i", { className: "plus icon" }))))), /*#__PURE__*/






      React.createElement("div", { className: "sixteen wide column" }, /*#__PURE__*/

      React.createElement(DoneItems, { entries: this.state.doneItems, deleteDoneItem: this.deleteDoneItem }))));




  }}




ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));