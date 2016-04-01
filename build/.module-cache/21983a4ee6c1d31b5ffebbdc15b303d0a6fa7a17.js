var MyComponent = React.createClass({displayName: "MyComponent",
            render: function() {
                return React.createElement("div", null, 
                	React.createElement("h1", null, this.props.text), 
                	React.createElement("p", null, this.props.children)
                )
            }
        });
 React.render(React.createElement("div", null, 
 	React.createElement(MyComponent, {text: "Hello World"}, 
 		"Yuxi is my all world!"
 	), 
 	React.createElement(MyComponent, {text: "Yuxi, I love you"}, 
 		"Yuix & Lei"
 	), 
 	React.createElement(MyComponent, {text: "Lei love Yuxi"}, 
 		"Cat & dog"
 	)
 	), document.getElementById('react-container'));