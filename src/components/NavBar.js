import React, { Component } from 'react';
import $ from 'jquery'
import '../style/NavBar.scss'
import { connect } from 'react-redux'
import { logout } from '../actions/auth';

class NavBar extends Component {

   handleClick = () => {
    var $toggleButton = $(".toggle-button"),
    $menuWrap = $(".menu-wrap");
  
  
    $toggleButton.toggleClass("button-open");
    $menuWrap.toggleClass("menu-show");

  
   }

    render() {
        return (
            <div className="navBarDiv">
                <span onClick={this.handleClick} className="toggle-button">
                <div className="menu-bar menu-bar-top"></div>
                <div className="menu-bar menu-bar-middle"></div>
                <div className="menu-bar menu-bar-bottom"></div>
                </span>
                <div className="menu-wrap">
                <ul className={"menu", "navUl"}>
                <li className="navLi"><a className="navA" onClick={() =>this.props.history.push('/')}>Home</a></li>
                <li className="navLi"><a className="navA" onClick={() => this.props.history.push('/account')}>Account</a></li>
                
                </ul>
                <p className="logout" onClick={() =>this.props.logout()}>Logout</p>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  })


const mapDispatchToProps = {
 
    logout
  
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
