import React, { Component } from 'react';
import store from './store';


class testing extends Component {

    componentDidMount(){
        store.getState()

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
                <h1>{this.props.user}</h1>
            </div>
        );
    }
}

export default testing;