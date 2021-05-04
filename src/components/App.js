import { VirtualConsole } from 'jsdom'
import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onFindPetsClick = () => {
    let url = '/api/pets'

    if(this.state.filters.type !== 'all') {
      url += `?type=${this.state.filters.type}`
    }

    fetch(url)
    .then(res=>res.json())
    .then(pets=>this.setState({ pets: pets}))
  }

  onChangeType = ({target : {value} }) => {
    this.setState({filters : {type: value}})
    
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">Allen's Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onFindPetsClick={this.onFindPetsClick}
                onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
