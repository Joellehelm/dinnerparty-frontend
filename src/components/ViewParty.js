import React, { Component } from 'react'
import EditParty from './EditParty'
import { connect } from 'react-redux'
import { partyList } from '../actions/ViewParty'

import '../style/ViewParty.css'


class ViewParty extends Component {
    constructor() {
        super()

        this.state = {
            editing: false,
        }
    }

    componentDidMount = () => {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleEdit = () => {
        this.setState({ editing: !this.state.editing })

    }

    doneEditing = () => {
        this.setState({ editing: !this.state.editing })
    }


    showShoppingList = () => {
        this.props.partyList(this.props.party.id)
        this.props.history.push('/list')
    }


    render() {
        return (

            <div className="viewParty">
                {
                    this.state.editing === true ?
                        <EditParty fetchParties={this.props.fetchParties} sendPartyObj={this.props.sendPartyObj} history={this.props.history} party={this.props.party} doneEditing={this.doneEditing} doneViewing={this.props.doneViewing} handleEdit={this.handleEdit} />
                        :
                        <div className="partyViewDiv">


                            <div className="partyInfoDiv">
                                <p className="party-info-name">{this.props.party.name}</p>
                                <div className="party-inner-info">
                                    <div>
                                    <p className="party-inner-title">Date</p>
                                    <p className="small-details">{this.props.party.date}</p>
                                    </div>
                                    <div>
                                    <p className="party-inner-title">Address</p>
                                    <p className="small-details">{this.props.party.address}</p>
                                    </div>
                                    <div>
                                    <p className="party-inner-title">Details</p>
                                    <p className="party-details">{this.props.party.details}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="party-view-buttons">
                                <button onClick={this.showShoppingList} >Shopping List</button>




                                {this.props.hosting ?
                                    <button onClick={this.handleEdit}>Edit</button>
                                    :
                                    null
                                }
                            </div>
                        </div>
                }

            </div>

        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    list: state.partyList
})

const mapDispatchToProps = {

    partyList

}

export default connect(mapStateToProps, mapDispatchToProps)(ViewParty);