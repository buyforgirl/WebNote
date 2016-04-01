 var MyComponent = React.createClass({displayName: "MyComponent",
            render: function() {
                return React.createElement("div", null, 
                	React.createElement("h1", null, this.props.text), 
                	React.createElement("p", null)
                )
            }
        });
 React.render(React.createElement("div", null, 
 	React.createElement(MyComponent, {text: "Hello World"}), 
 	React.createElement(MyComponent, {text: "Yuxi, I love you"}), 
 	React.createElement(MyComponent, {text: "Lei love Yuxi"})
 	), document.getElementById('react-container'));