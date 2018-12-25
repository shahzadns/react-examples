(function () {


  /* general functions */
  // React components (and their lifecycle hooks) don't get know if they are destroyed outside of react. e.g. jquery.
  //window.destroyApps = function () {
  //  document.getElementById('AllApps').innerHTML = '';
  //};

  /* app - sample - starts */
  //class SampleApp extends React.Component {
  //  constructor(props) {
  //    super(props);
  //  }
  //
  //  render() {
  //    return (
  //      <React.Fragment>
  //        <h3>Sample App</h3>
  //      </React.Fragment>
  //    );
  //  }
  //}
  //
  //const mountNode = document.getElementById('SampleApp');
  //ReactDOM.render(
  //  <SampleApp />,
  //  mountNode
  //);
  /* app - sample - ends */

  /* app - hello world - starts */
  (function () {

    class FooApp extends React.Component {

      // to be called when component is initialized in app
      render() {
        console.log('FooApp: render:');
        return (
          <div>
            <span>{this.props.message}</span>
            <h1>hello</h1> {this.props.getName()} !
          </div>
        );
      }
    }

    // general references outside the app
    const name = 'John Doe';
    const getBossName = function () {
      return name;
    };

    const mountNode = document.getElementById('HelloWorldApp');
    ReactDOM.render(
      <FooApp message="Greetings !" getName={getBossName}/>,
      mountNode
    );
  })();
  /* app - hello world - ends */

  /* app - Timer - starts */
  (function () {

    class TimerApp extends React.Component {
      // intervalId = null;
      // property2 = 'some value';

      // to be called when component is initialized in app
      constructor(props) {
        console.log('TimerApp: constructor');

        // call constructor of React.Component class
        super(props);

        this.state = {
          seconds: 5
        };
      }

      tick() {
        console.log('TimerApp: tick and then render gets called.');

        this.setState((state) => ({
          seconds: state.seconds + 1
        }));

        //this.setState(function (state) {
        //  return {
        //    seconds: state.seconds + 1
        //  };
        //});
      }

      // to be called after view has been rendered into DOM
      componentDidMount() {
        console.log('TimerApp: componentDidMount: rendered markup available:', !!document.getElementById('wrapper'));
        this.intervalId = setInterval(() => this.tick(), 1000);
      }

      // to be called before component gets destroyed
      componentWillUnMount() {
        console.log('TimerApp: componentWillUnMount');
        clearInterval(this.intervalId);
      }

      render() {
        //console.log('TimerApp: render:');

        return (
          <div id="wrapper">
            <h3>Tick App:</h3>
            Seconds: <span class="tick-app-ticks">{this.state.seconds}</span>
          </div>
        );
      }
    }

    const mountNode = document.getElementById('TimerApp');
    ReactDOM.render(
      <TimerApp />,
      mountNode
    );

  })();

  /* app - Timer - ends */

  /* app - todoList - starts */
  (function () {

    class TodoListApp extends React.Component {

      constructor(props) {
        super(props);
        console.log('TodoListApp: constructor:');

        // initial state of the component.
        this.state = {
          items: [],
          newTodoText: ''
        };

        // perform the bindings
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      render() {
        console.log('TodoListApp: render:');

        return (
          <div>
            <h3>TodoListApp</h3>

            <TodoList items={this.state.items}/>

            <form onSubmit={this.handleSubmit}>

              <label htmlFor="TodoListApp_newTodoText">What needs to be done ?</label><br/>
              <input type="text"
                     id="TodoListApp_newTodoText"
                     onChange={this.handleChange}
                     value={this.state.newTodoText}/>

              <button type="submit">
                Add # <span>{this.state.items.length + 1}</span>
              </button>
            </form>
          </div>
        );
      }

      handleChange(event) {
        console.log('TodoListApp: handleChange:', event.target.value);

        this.setState({
          newTodoText: event.target.value
        });
      }

      handleSubmit(event) {
        console.log('TodoListApp: handleSubmit:', event);

        // stop browser's default behaviour
        event.preventDefault();

        // validate newTodo model
        if (!this.state.newTodoText.length) {
          return;
        }

        // add new item and publish new state
        this.addAndBuildState();
      }

      generateNewTodo() {
        console.log('TodoListApp: generateNewTodo:');

        return {
          text: this.state.newTodoText,
          timestamp: Date.now()
        };
      }

      addAndBuildState() {
        console.log('TodoListApp: addAndBuildState:');

        // create a new state
        let newState = {};

        // add a new item into the existing list.
        const newTodo = this.generateNewTodo();
        newState.items = this.state.items.concat(newTodo);

        // reset the todoText
        newState.newTodoText = '';

        // publish new state for respective changes
        this.setState(newState);
      }
    }

    class TodoList extends React.Component {

      render() {
        console.log('TodoList: render:');

        return (
          <ul>
            {this.props.items.map(item => {
              return <li key={item.timestamp}>
                <span class="todo--text"> {item.text}</span>
                @
                <span class="todo--date">{new Date(item.timestamp).toLocaleDateString()}</span>
              </li>
            })}
          </ul>
        );
      }
    }

    const mountNode = document.getElementById('TodoListApp');
    ReactDOM.render(
      <TodoListApp />,
      mountNode
    );

  })();

  /* app - todoList - ends */


  /* app - sample - starts */
  class MarkDownEditorApp extends React.Component {
    constructor(props) {
      super(props);

      console.log('MarkDownEditorApp: constructor:');
      this.state = {
        markdownText: 'Hello, **Markdown** !'
      };

      this.md = new Remarkable();

      this.handleChange = this.handleChange.bind(this);
    }

    render() {
      console.log('MarkDownEditorApp: render:');

      return (
        <div>
          <h3>Sample App</h3>

          <h5>Input</h5>
          <label htmlFor="MarkDownEditorApp_markdownText">Enter some markdown</label><br/>
          <textarea type="text"
                 id="MarkDownEditorApp_markdownText"
                 onChange={this.handleChange}
                 defaultValue={this.state.markdownText}/>


          <h5>Output:</h5>
          <div dangerouslySetInnerHTML={this.getRawMarkup()}></div>
        </div>
      );
    }

    handleChange(event) {
      console.log('MarkDownEditorApp: handleChange:', event);
      this.setState({ markdownText: event.target.value });
    }

    getRawMarkup() {
      return { __html: this.md.render(this.state.markdownText) };
    }
  }

  const mountNode = document.getElementById('MarkDownEditorApp');
  ReactDOM.render(
    <MarkDownEditorApp />,
    mountNode
  );
  /* app - sample - ends */

})();