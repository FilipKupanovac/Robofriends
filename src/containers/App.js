import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import '../containers/App.css'


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots : [],
            searchfield : ''
        }
    } 
    /*smart component: it's called like that
     because it is class containing state*/

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users}))
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }
    /*
    EVERY TIME STATE GETS UPDATED, FILE RE-RENDERS AGAIN
    you can try it with console.log() for each constructor, 
    componentDidMount and render functions
    */
    render(){
        const {robots, searchfield} = this.state;
        const filteredRobots = robots.filter(
            robot => {
                return robot.name.toLowerCase().includes(searchfield.toLowerCase());
            }
            )
        if(!robots.length){
            return <h1 className='tc'>Loading</h1>
        } else{
            return(
                <div className='tc'>
                    <h1 className='f1'>Robofriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <CardList robots = {filteredRobots}/>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;