import React, { Component } from 'react';
import $ from 'jquery'
import '../style/NavBar.scss'

class NavBar extends Component {

   handleClick = () => {
    var $toggleButton = $(".toggle-button"),
    $menuWrap = $(".menu-wrap");
  
  $toggleButton.on("click", function() {
    $(this).toggleClass("button-open");
    $menuWrap.toggleClass("menu-show");
  });
  
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
                <li className="navLi"><a onClick={() =>this.props.history.push('/')}>Home</a></li>
                <li className="navLi"><a onClick={() => this.props.history.push('/account')}>Account</a></li>
                <li className="navLi"><a onClick={() => this.props.history.push('/messages')}>Messages</a></li>
                
                </ul>
            </div>
            </div>
        );
    }
}

export default NavBar;