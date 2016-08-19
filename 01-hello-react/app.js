console.log('test');

(function(){

  var App = React.createClass({
    render: function() {
      return <h2> Hello {this.props.name} !</h2>
    }
  });

  //Bootstrap App
  ReactDOM.render(<App name="React"/>, document.getElementById('app'));

})();