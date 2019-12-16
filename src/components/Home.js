import React, { Component } from 'react';
import '../style/home.css'
import Recipes from './Recipes'
import { connect } from 'react-redux'

class Home extends Component {




   


    render() {
        return (
            <div>
                <Recipes />
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
  })

export default connect(mapStateToProps)(Home);