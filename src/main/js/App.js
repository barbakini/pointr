'use strict';
import 'regenerator-runtime/runtime'
const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {cities: []};
    }

    async componentDidMount() {
        const resp = await axios.get("api/cities");
        console.log(resp);
        this.setState({cities: resp.data._embedded.cities});
    }

    render() {
        const cities = this.state.cities.map(city => <h1>{city.name}</h1>);
        return (
            <div>
                {cities}
            </div>

        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
)
