 var Note = React.createClass({displayName: "Note",
 		getInitialState: function() {
 			return {editing: false}
 		},
 		edit: function() {
 			this.setState({editing: true});
 		},
 		save: function() {
 			this.props.onChange(this.refs.newText.getDOMNode().value, this,props.index);	
 			this.setState({editing: false});
 		},
 		remove: function() {
 			this.props.onRemove(this.props.index);
 		},
 		renderDisplay: function() {
 			return (
 				React.createElement("div", {className: "note"}, 
                	React.createElement("p", null, this.props.children), 
                	React.createElement("span", null, 
                		React.createElement("button", {onClick: this.edit, className: "btn btn-primary glyphicon glyphicon-pencil"}), 
                		React.createElement("button", {onClick: this.remove, className: "btn btn-danger glyphicon glyphicon-trash"})
                	)
                )
 				)
 		},
 		renderForm: function() {
 			return (
 				React.createElement("div", {className: "note"}, 
 					React.createElement("textarea", {ref: "newText", defaultValue: this.props.children, className: "form-control"}), 
 					React.createElement("button", {onClick: this.save, className: "btn btn-success btn-sm glyphicon glyphicon-floppy-disk"})
 				)
 				)
 		},
        render: function() {
        	if (this.state.editing) {
        		return this.renderForm();
        	} else {
        		return this.renderDisplay();
        	}
    	}
});

var Board = React.createClass({displayName: "Board",
	propTypes: {
		count: function(props, propName) {
			if (typeof props[propName] !== 'number') {
				return new Error("the count property must be a number");
			} 
			if (props[propName] > 100) {
				return new Error("Creating" + props[propName] + "note is ridiculous")
			}
		}
	},
	getInitialState: function() {
		 return {
		 	notes: [
		 		'Call Yuxi',
		 		'Email Lisa',
		 		'zou pi gu',
		 		'send mail'
		 	]
		 }
	},
	update: function(newText, i) {
		var arr = this.state.notes;
		arr[i] = newText;
		this.setState({notes: arr});
	},
	remove: function(i) {
		var arr = this.notes.notes;
		arr.splice(i, 1);
		this.setState({notes: arr});
	},
	eachNote: function(note, i) {
		return (
				React.createElement(Note, {key: i, index: i, onChange: this.update, onRemove: this.remove}, note)
			);
	},
	render: function() {
		return React.createElement("div", {className: "board"}, this.state.notes.map(this.eachNote)
		)
	}

});

React.render(React.createElement(Board, {count: 10}), document.getElementById('react-container'));