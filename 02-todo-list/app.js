
(function () {

  //Todos list component
  var Todos = React.createClass({
    render: function () {
      var createTodo =  function (todo) {
        return <li key={todo.id}>{todo.text}</li>
      };
    
      return <ul> {this.props.todos.map(createTodo)}</ul>;
    }
  });

  //Main App component
  var App = React.createClass({
    getInitialState: function () {
      return {
        todos: [{
          id: 1,
          text: 'Learn React'
        }, {
          id: 2,
          text: 'Qualify for Facebook'
        }],
        text: ''
      };
    },
    onChange: function (e) {
      this.setState({ text: e.target.value });
    },
    handleSubmit: function (e) {

      //prevent page from reloading
      e.preventDefault();

      //update todos  
      this.setState({
        todos: this.state.todos.concat([{ text: this.state.text, id: Date.now() }]),
        text: '',
      });
    },
    render: function () {
      return (
        <div>
          <h2>Todo List</h2>
          <Todos todos={this.state.todos}/>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.onChange}
                   value={this.state.text} 
                   placeholder="Enter your todo here..."/>
            <button disabled={this.state.text.length < 3 }>Add</button>
          </form>
        </div>
      );
    }
  });

  //Bootstrap App
  ReactDOM.render(<App/>, document.getElementById('app'));

})();