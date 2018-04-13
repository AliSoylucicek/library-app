import React, { Component } from 'react'
import { Sidebar, Container, Menu, Icon, Label } from 'semantic-ui-react'

import NavigationItem from '../NavigationItem/NavigationItem';
import './SideToolbar.css';

class SideToolbar extends Component {
  state = {
    visible: false,
    style: {
      overflow: "auto",
      position: "static"
    }
  }

  handlePusherClick = () => {
    if (this.state.visible) this.setState({
      visible: false,
      style: {
        overflow: "auto",
        position: "static"
      }
    })
  }

  toggleVisibility = () => this.setState({
    visible: !this.state.visible,
    style: {
      overflow: "hidden",
      position: "fixed"
    }
  })

  render() {
    const { visible } = this.state

    return (
      <Sidebar.Pushable as={Container} style={this.state.style}>
        
        <Sidebar as={Menu} animation='overlay' width='very thin' visible={visible} icon='labeled' vertical inverted >
          <NavigationItem onClick={this.handlePusherClick} link="/" name="Home" exact></NavigationItem>
          <NavigationItem onClick={this.handlePusherClick} link="/store" name="Store" exact></NavigationItem>
          <NavigationItem onClick={this.handlePusherClick} link="/myBooks" name="My Books" exact></NavigationItem>
        </Sidebar>
        
        <Sidebar.Pusher dimmed={this.state.visible} onClick={this.handlePusherClick}>
          <Menu inverted attached="bottom" size="massive">
            <Label onClick={this.toggleVisibility} className="sideToggle">
              <Icon name='sidebar' size="big" inverted fitted />
            </Label>
            <Icon name="book" size="big" inverted style={{ position: "absolute", left: "50%", marginTop: "5px" }} />
            <Menu.Menu position="right">
              <NavigationItem link="/cart" icon="shopping bag" exact></NavigationItem>
            </Menu.Menu>
          </Menu>
          {this.props.children}
        </Sidebar.Pusher>

      </Sidebar.Pushable>
    )
  }
}

export default SideToolbar;