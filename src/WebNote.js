 const Note = React.createClass({
 		getInitialState: () => {
 			return {editing: false}
 		},
 		randomBetween: (min, max) => {
 			return (min + Math.ceil(Math.random() * (max - min)));
 		},
 		componentWillMount: () => {
 			this.style = {
 				right: this.randomBetween(0, window.innerWidth - 150) + 'px',
 				top: this.randomBetween(0, window.innerHeight - 150) + 'px',
 				transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
 			}
 		},
 		componentDidMount: () => {
 			$(this.getDOMNode()).draggable();
 		},
 		edit: () => {
 			this.setState({editing: true});
 		},
 		save:() => {
 			this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);	
 			this.setState({editing: false});
 		},
 		remove: () => {
 			this.props.onRemove(this.props.index);
 		},
 		renderDisplay: () => {
 			return (
 				<div className="note" style={this.style}>
                	<p>{this.props.children}</p>
                	<span>
                		<button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil"/>
                		<button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash"/>
                	</span>
                </div>
 				)
 		},
 		renderForm: () => {
 			return (
 				<div className="note" style={this.style}>
 					<textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
 					<button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk"/>
 				</div>
 				)
 		},
        render: () => {
        	if (this.state.editing) {
        		return this.renderForm();
        	} else {
        		return this.renderDisplay();
        	}
    	}
});

const Board = React.createClass({
	propTypes: {
		count: (props, propName) => {
			if (typeof props[propName] !== 'number') {
				return new Error("the count property must be a number");
			} 
			if (props[propName] > 100) {
				return new Error("Creating" + props[propName] + "note is ridiculous")
			}
		}
	},
	getInitialState: () => {
		 return {
		 	notes: []
		 }
	},
	nextId: () => {
		this.uniqueId = this.uniqueId || 0;
		return this.uniqueId++;
	},
	componentWillMount: () => {
		var self = this;
		if (this.props.count) {
			$.getJSON("http://baconipsum.com/api/?type=all-meat&sentences" + 
				this.props.count + "&start-with-lorenm=1&callback=?", function(result){
					result[0].split('. ').forEach(function(sentence) {
						self.add(sentence.substring(0, 40));
					});
				});
		}
	},
	add: (text) => {
		var arr = this.state.notes;
		arr.push({
			id: this.nextId(),
			note: text
		});
		this.setState({notes: arr});
	},
	update: (newText, i) => {
		var arr = this.state.notes;
		arr[i].note = newText;
		this.setState({notes: arr});
	},
	remove: (i) => {
		var arr = this.state.notes;
		arr.splice(i, 1);
		this.setState({notes: arr});
	},
	eachNote: (note, i) => {
		return (
				<Note key={note.id} index={i} onChange={this.update} onRemove={this.remove}>{note.note}</Note>
			);
	},
	render: () => {
		return <div className="board">
			{this.state.notes.map(this.eachNote)}
			<button className='btn btn-sm btn-success glyphicon glyphicon-plus' onClick={this.add.bind(null, "New Note")}/>
		</div>
	}

});

React.render(<Board count={50}/>, document.getElementById('react-container'));