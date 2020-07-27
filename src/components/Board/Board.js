import React from "react";
import Square from "../Square/Square";
import './Board.css';
import Card from 'react-bootstrap/Card';

export class Board extends React.Component {

    renderSquare(i) {
        let variant;
        if (this.props.winner) {
            variant = this.props.winner.includes(i) ? 'outline-success' : 'outline-secondary';
        }
        else {
            variant = 'outline-secondary';
        }
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            variant={variant}
        />;
    }

    render() {
        return (
            <Card.Body>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </Card.Body>
        );
    }
}
