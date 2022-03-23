var my_notes = [];

var Note = React.createClass({ displayName: "Note",
  render: function () {
    var styles = {
      background: this.props.color };

    return /*#__PURE__*/React.createElement("div", { className: "note", style: styles },
    this.props.children, /*#__PURE__*/
    React.createElement("span", { className: "delete_note", onClick: this.props.onDelete }, " x "));

  } });


var NoteEditor = React.createClass({ displayName: "NoteEditor",
  getInitialState: function () {
    return {
      text: '' };

  },
  handleTextChange: function (event) {
    this.setState({
      text: event.target.value });

  },
  handleAddNote: function () {
    var newNote = {
      text: this.state.text,
      id: new Date(),
      color: 'yellow' };

    this.props.onNoteAdd(newNote);
    this.setState({ text: '' });
  },
  render: function () {
    return /*#__PURE__*/(
      React.createElement("div", { className: "noteEditor" }, /*#__PURE__*/
      React.createElement("textarea", {
        placeholder: "Enter your note..",
        rows: 5,
        className: "textarea",
        onChange: this.handleTextChange,
        value: this.state.text }), /*#__PURE__*/

      React.createElement("button", { className: "add_btn", onClick: this.handleAddNote }, "Add")));

  } });


var NotesGrid = React.createClass({ displayName: "NotesGrid",
  componentDidMount: function () {
    var grid = this.refs.notes;
    this.msnry = new Masonry(grid, {
      // options
      itemSelector: '.note',
      columnWidth: 20,
      gutter: 10 });

  },

  componentDidUpdate: function (prevProps) {
    if (this.props.notes.length !== prevProps.notes.length) {
      this.msnry.reloadItems(),
      this.msnry.layout();
    }
  },
  render: function () {
    var onNoteDelete = this.props.onNoteDelete;
    return /*#__PURE__*/(
      React.createElement("div", { className: "notesGrid", ref: "notes" },

      this.props.notes.map(function (note) {
        return /*#__PURE__*/React.createElement(Note, { key: note.id,
          color: note.color,
          onDelete: onNoteDelete.bind(null, note) }, " ",
        note.text, " ");
      })));


  } });


var NotesApp = React.createClass({ displayName: "NotesApp",
  getInitialState: function () {
    return {
      notes: my_notes };

  },
  componentDidMount: function () {
    var localDate = JSON.parse(localStorage.getItem('notes'));
    if (localDate) {
      this.setState({ notes: localDate });
    }
  },
  componentDidUpdate: function () {
    this._updateLocalStorage();
  },
  handleDeleteNote: function (note) {
    var noteId = note.id;
    var newNotes = this.state.notes.filter(function (note) {
      return note.id !== noteId;
    });
    this.setState({ notes: newNotes });
  },
  handleAddNote: function (newNote) {
    var newNotes = this.state.notes.slice();
    newNotes.unshift(newNote);
    this.setState({
      notes: newNotes });

  },
  _updateLocalStorage: function () {
    var notes = JSON.stringify(this.state.notes);
    localStorage.setItem('notes', notes);
  },
  render: function () {
    return /*#__PURE__*/(
      React.createElement("div", { className: "notesApp" }, "Note Application", /*#__PURE__*/

      React.createElement(NoteEditor, { onNoteAdd: this.handleAddNote }), /*#__PURE__*/
      React.createElement(NotesGrid, { notes: this.state.notes, onNoteDelete: this.handleDeleteNote })));


  } });


ReactDOM.render( /*#__PURE__*/React.createElement(NotesApp, null),
document.getElementById('content'));