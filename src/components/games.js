import React, { Component } from 'react'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import GameComp from './scomponent'
import GameData from './gamedata'

export default class Games extends Component {
  constructor(props){
    super(props)
    this.onChangegame=this.onChangegame.bind(this)
    this.state={searchgame:''}
}
  onChangegame(e){
    this.setState({searchgame:e.target.value})
    }
  render() {
    const {searchgame} = this.state
    const filteredGames=GameData.filter(game=>{return game.title.toLocaleLowerCase().indexOf(searchgame.toLocaleLowerCase())!==-1 || game.age.toLocaleLowerCase().indexOf(searchgame.toLocaleLowerCase())!==-1 || game.brand.toLocaleLowerCase().indexOf(searchgame.toLocaleLowerCase())!==-1 || game.genre.toLocaleLowerCase().indexOf(searchgame.toLocaleLowerCase())!==-1})// Used https://www.youtube.com/watch?v=RM_nXOyHwN0

    return (
      <div>
        <br/>
        <br/>
        <div className="form-group">
                <input onChange={this.onChangegame} value={this.state.searchgame} className="container form-control" type="search" placeholder="Search games, genres, age and brand"/>
                {filteredGames.map(game=><GameComp key={game.id} title={game.title} brand={game.brand} age={game.age} genre={game.genre} simgurl={game.simgurl} limgurl={game.limgurl} id={game.id} price={game.price}/>)}
        </div>
        </div>
    )
  }
}