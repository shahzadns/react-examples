(function () {


  /* general functions */
  // React components (and their lifecycle hooks) don't get know if they are destroyed outside of react. e.g. jquery.
  //window.destroyApps = function () {
  //  document.getElementById('AllApps').innerHTML = '';
  //};

  /* app - hello world - starts */
  (function () {

    class FooApp extends React.Component {

      // to be called when component is initialized in app
      render() {
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
        console.log('constructor');

        // call constructor of React.Component class
        super(props);

        this.state = {
          seconds: 5
        };
      }

      tick() {
        console.log('tick');

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
        console.log('componentDidMount: rendered markup available:', !!document.getElementById('wrapper'));
        this.intervalId = setInterval(() => this.tick(), 1000);
      }

      // to be called before component gets destroyed
      componentWillUnMount() {
        console.log('componentWillUnMount');
        clearInterval(this.intervalId);
      }

      render() {
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

  /* app - hello world - ends */

})();