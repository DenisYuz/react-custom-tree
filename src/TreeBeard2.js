import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';

export default class TreeExample2 extends PureComponent {
    
    constructor(props){
        super(props);
        this.state = props.data;
        this.onToggle = this.onToggle.bind(this);
    }

    decorators = {
        Loading: (props) => {
            return (
                <div style={props.style}>
                    loading...
                </div>
            );
        },
        Toggle: (props) => {
            return (
                <div style={props.style}>
                    <svg height={props.height} width={props.width}>
                        // Vector Toggle Here
                    </svg>
                </div>
            );
        },
        Header: (props) => {
            return (
                <div style={props.style}>
                    {props.node.name}
                </div>
            );
        },
        Container: (props) => {
            return (
                <div onClick={props.onClick}>
                    // Hide Toggle When Terminal Here
                    <this.props.decorators.Toggle/>
                    <this.props.decorators.Header/>
                </div>
            );
        }
    };
    
    onToggle(node, toggled){
        const {cursor, data} = this.state;
        if (cursor) {
            this.setState(() => ({cursor, active: false}));
        }
        node.active = true;
        if (node.children) { 
            node.toggled = toggled; 
        }
        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
    }
    
    render(){
        const {data} = this.state;
        return (
            <Treebeard
                data= {this.state}
                onToggle={this.onToggle}
                decorators={this.decorators}
            />
        );
    }
}