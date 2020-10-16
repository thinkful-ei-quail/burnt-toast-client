import React, { Component } from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import BurntToastContext from '../../contexts/BurntToastContext';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import BurntToastService from '../../services/burnt-toast-api-service';

class SearchRoute extends Component {

  state = {
    searchTerm: '',
    searchCategory: '',
    searchService: '',
    skills: [],
    services: []
  };

  static contextType = BurntToastContext;

  componentDidMount() {
    BurntToastService.getAllServices()
    .then(res=>
      this.setState({
        services: res
      })
    )
  }

  handleSearch(e) {
    e.preventDefault();
    // fetch(`BASE_URL/skills?${this.state.searchTerm}`)
    //   .then(res => res.json())
    //   .then(result => this.setState({skills: result}));
  }

  handleSearchTerm(e) {
    console.log(this.state.searchTerm);
    this.setState({
      searchTerm: e.target.value
    });
  }

  renderSearchBar() {
    return (
      <form id="search-bar" onSubmit={e => this.handleSearch(e)}>
        <label htmlFor="search"></label>
        <input
          name="search" type="text" placeholder="🔍 Search"
          onChange={e => this.handleSearchTerm(e)}>
        </input>
        <label htmlFor="categories"></label>
        <CategorySelect />
        <button type="submit">Search</button>
      </form>
    );
  }

  renderServiceCards() {
    let services = this.state.services
    return services.map((service, i) =>
      <li key={i}>
        <ServiceCard
          id={service.id}
          service={service.skill_name}
          description={service.skill_desc}
        />
      </li>
    );
  }

  render() {
    return (
      <>
        <div className="SearchRoute">
          {this.renderSearchBar()}
          <ul className="SearchRoute-services-list">
          {this.renderServiceCards()}
          </ul>
        </div>
      </>
    );
  };
}

export default SearchRoute;