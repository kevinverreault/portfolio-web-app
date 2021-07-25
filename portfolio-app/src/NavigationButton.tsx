import React from 'react';
import './Header.css';

export default class NavigationButton extends React.Component<any> {
    render() {
        return <button className="entete-bouton entete-bouton-navigation">{this.props.label}</button>
    }
}