import React, { Component } from 'react';
import '../style/home.css'
import Recipes from './Recipes'
// import { connect } from 'react-redux'
import NavBar from './NavBar'

class Home extends Component {


   
    

   


    render() {
        return (
            <div>
                <NavBar history={this.props.history} handleRedirect={this.props.handleRedirect}/>
                <Recipes history={this.props.history} />
            </div>
        );
    }
}


// const mapStateToProps = (state) => ({
//     auth: state.auth
//   })

export default Home;