// @flow
import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import {
  Button,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

async function httpRequest(query) {
  const response = await fetch(`/search?q=${query}`);
  const json = await response.json();
  return json;
}

const ResultItem = ({ item }) =>
  <div className="result-item">
    <div className="result-item-name">{item.name}</div>
    {item.website &&
     <div className="result-item-website">
       <a href={item.website}>website</a>
     </div>}
    <div className="result-item-description">{item.description}</div>
  </div>;

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      isLoading: false,
      firstSearch: true,
      results: [],
    };
  }

  async search() {
    this.setState({ isLoading: true });
    const output = await httpRequest(this.state.value);
    this.setState({
      isLoading: false,
      results: output,
      firstSearch: false,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.search();
  }

  renderResults() {
    return (
      <ul className="result-list">
        {this.state.results.map((item, index) =>
          <li key={index}><ResultItem item={item} /></li>)}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="searchText" >
	    <FormControl
	      type="text"
	      value={this.state.value}
	      onChange={(e) => this.setState({ value: e.target.value })} />
          </FormGroup>
          <Button bsStyle="primary" block onClick={this.search.bind(this)}>
            Search for a collective
          </Button>
        </form>

        {this.state.results.length > 0 && this.renderResults()}

        {(this.state.results.length == 0 && !this.state.firstSearch) &&
         <strong>No results found </strong>}
      </div>
    );
  }
}
