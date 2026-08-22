import React, { Component } from 'react'; 
import FilterBar from './FilterBar'; 
import FilterModal from './FilterModal'; 
import PropertyCard from './PropertyCard'; 
import NoProperty from './NoProperty'; 
import { base_path } from './utils.js'; 
 
class App extends Component { 
 
  state = { 
    properties: [], 
    sort: "none", 
    filter: { 
      gender: "none" 
    }, 
    showFilter: false 
  }; 
 
  componentDidMount() { 
    const search = window.location.search; 
    const params = new URLSearchParams(search); 
    const city_name = params.get('city'); 
 
    if (!city_name) { 
      console.log("City name not found in URL."); 
      return; 
    } 
 
    fetch( 
      `${base_path}/api/get_properties_by_city.php?city=${encodeURIComponent(city_name)}` 
    ) 
      .then(response => response.json()) 
      .then(responseData => { 
        if (Array.isArray(responseData)) { 
          this.setState({ 
            properties: responseData 
          }); 
        } else { 
          console.log("API Error:", responseData); 
          this.setState({ 
            properties: [] 
          }); 
        } 
      }) 
      .catch(error => { 
        console.log('Error fetching and parsing data:', error); 
      }); 
  } 
 
  openFilter = () => { 
    this.setState({ 
      showFilter: true 
    }); 
  }; 
 
  closeFilter = () => { 
    this.setState({ 
      showFilter: false 
    }); 
  }; 
 
  toggleInterested = property_id => { 
    fetch( 
      `${base_path}/api/toggle_interested.php?property_id=${property_id}` 
    ) 
      .then(response => response.json()) 
      .then(responseData => { 
 
        if (responseData.success) { 
          this.updateInterested(property_id); 
 
        } else if (!responseData.success && !responseData.is_logged_in) { 
 
          console.log('Not logged in!'); 
 
          if (window.$ && window.$("#login-modal").modal) { 
            window.$("#login-modal").modal("show"); 
          } 
        } 
 
      }) 
      .catch(error => { 
        console.log('Error toggling interested:', error); 
      }); 
  }; 
 
  updateInterested = property_id => { 
 
    let updated_properties = [...this.state.properties]; 
 
    updated_properties.forEach(property => { 
 
      if (property.id === property_id) { 
 
        property.is_interested = !property.is_interested; 
 
        if (property.is_interested) { 
          property.interested_users_count++; 
        } else { 
          property.interested_users_count--; 
        } 
 
      } 
    }); 
 
    this.setState({ 
      properties: updated_properties 
    }); 
  }; 
 
  updateSort = sort => { 
    this.setState({ 
      sort: sort 
    }); 
  }; 
 
  updateFilter = gender => { 
    this.setState({ 
      filter: { 
        gender: gender 
      }, 
      showFilter: false 
    }); 
  }; 
 
  render() { 
 
    let properties = [...this.state.properties]; 
 
    // SORTING 
    if (this.state.sort === "desc") { 
 
      properties.sort((a, b) => { 
        return Number(b.rent) - Number(a.rent); 
      }); 
 
    } else if (this.state.sort === "asc") { 
 
      properties.sort((a, b) => { 
        return Number(a.rent) - Number(b.rent); 
      }); 
 
    } 
 
    // FILTER 
    if (this.state.filter.gender !== "none") { 
 
      properties = properties.filter(property => 
        property.gender === this.state.filter.gender 
      ); 
 
    } 
 
    // PROPERTY CARDS 
    let property_cards; 
 
    if (properties.length > 0) { 
 
      property_cards = properties.map(property => ( 
 
        <PropertyCard 
          key={property.id} 
          property={property} 
          toggleInterested={() => 
            this.toggleInterested(property.id) 
          } 
        /> 
 
      )); 
 
    } else { 
 
      property_cards = <NoProperty />; 
 
    } 
 
    return ( 
      <> 
 
        <div className="page-container"> 
 
          <FilterBar 
            currentSort={this.state.sort} 
            updateSort={this.updateSort} 
            currentFilter={this.state.filter} 
            openFilter={this.openFilter} 
          /> 
 
          {property_cards} 
 
        </div> 
 
        <FilterModal 
          currentFilter={this.state.filter} 
          updateFilter={this.updateFilter} 
          showFilter={this.state.showFilter} 
          closeFilter={this.closeFilter} 
        /> 
 
      </> 
    ); 
  } 
} 
 
export default App;