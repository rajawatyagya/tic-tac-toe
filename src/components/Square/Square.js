import React from 'react';
import './Square.css';
import Button from 'react-bootstrap/Button';

function Square(props) {
    return (
        <Button className="square"
                onClick={props.onClick}
                variant={props.variant}
        >
            {props.value}
        </Button>
    );
}

export default Square;
