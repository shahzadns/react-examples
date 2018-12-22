(function () {

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

  (function () {

  })();

  /* app - Timer - starts */
  (function () {

    class Timer extends React.Component {
      // interval = null;
      // property2 = 'some value';

      // to be called when component is initialized in app
      constructor(props) {

        // call constructor of React.Component class
        super(props);

        this.state = {seconds: 0};
      }

      tick() {
        this.setState(state => ({
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

        this.interval = setInterval(() => this.tick(), 1000);

        console.log('interval id:', this.interval); //e.g. 12
      }

      // to be called before component gets destroyed
      componentWillUnmount() {
        console.log('componentWillUnmount');
        clearInterval(this.interval);
      }

      render() {
        return (
          <div id="wrapper">
            Seconds: {this.state.seconds}
          </div>
        );
      }
    }

    const mountNode = document.getElementById('TimerApp');
    ReactDOM.render(
      <Timer/>,
      mountNode);

  })();
  /* app - hello world - ends */

})();