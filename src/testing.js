import React, { Component } from 'react';

class testing extends Component {

    componentDidMount(){
        fetch('http://localhost:3000/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer <token>`
            }
          })
          .then(r => r.json())
          .then(response => {
              console.log(response)
          })


          
    }
    render() {
        return (
            <div>
                <h1>HELLO</h1>
            </div>
        );
    }
}

export default testing;