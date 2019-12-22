import React, { Component } from 'react';
import { connect } from 'react-redux'

class ShoppingList extends Component {

    

    render() {
        return (
            <div>
                <div>

                </div>
            </div>
        );
    }
}

  
    const mapStateToProps = (state) => ({
        list: state.partyList
    })

export default connect(mapStateToProps)(ShoppingList);