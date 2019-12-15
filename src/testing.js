import React, { Component } from 'react';
import store from './store';
import { connect } from 'react-redux'


class testing extends Component {

    componentDidMount(){
       console.log(this.props.auth)
        // fetch('http://localhost:3000/profile', {
        //     method: 'GET',
        //     headers: {
        //       Authorization: `Bearer <token>`
        //     }
        //   })
        //   .then(r => r.json())
        //   .then(response => {
        //       console.log(response)
          }


          
    
    render() {
        return (
            <div>
    <h1>{console.log(store.getState())}</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  })

export default connect(mapStateToProps)(testing);