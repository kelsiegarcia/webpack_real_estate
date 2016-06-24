import React from 'react';
import AddBoard from '../components/AddBoard';
import Board from '../components/Board';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boards: [] };
  }

  componentWillMount() {
    $.ajax({
      url: '/api/listings',
      type: 'GET',
      dataType: 'JSON'
    }).done ( boards => {
      this.setState({ boards })
    })
  }

  updateBoard(name) {
    $.ajax({
      url: 'api/listings',
      type: 'POST',
      dataType: 'JSON',
      data: {listing: { name }}
    }).done( result => {
      this.setState({
        boards: [
          { ...result },
          ...this.state.boards
        ]
      })
    })
  }
  

  updateListing(id) {
    $.ajax({
      url: '/api/items/${id}',
      type: 'PUT',
      dataType: 'JSON'
    }).done( listing => {
      let index = this.state.boards.findIndex( i => i.id === item.id )
      let listings = this.state.boards
      this.setState({
        todos: [
          ...listings.slice(0, index),
          {...listings[index], complete: listing.complete},
          ...listings.slice(index + 1, listings.length)
        ]
      })
    })
  }

  deleteBoard(id) {
    $.ajax({
      url: `/api/listings/${id}`,
      type: 'DELETE'
    }).done( () => {
      let index = this.state.boards.findIndex( i => i.id === id )
      let listings = this.state.boards
      this.setState({
        boards: [
          ...listings.slice(0, index),
          ...listings.slice(index + 1, listings.length)
        ]
      })
    })
  }

  render() {
    return (
      <div className="container">
        <AddBoard updateListing={this.updateListing.bind(this)} />
        <Board
          boards={this.state.boards}
          updateBoard={this.updateBoard.bind(this)}
          deleteBoard={this.deleteBoard.bind(this)}
        />
      </div>
    )
  }
}

export default App;

