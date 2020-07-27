import React from "react";
import {Board} from "../Board/Board";
import './Game.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";

export class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0,
            this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    reset() {
        this.setState({
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                `Go to move # ${move}` :
                'Go to game start';
            return (
                <ListGroup.Item
                    key={move}
                    action
                    onClick={() => this.jumpTo(move)}
                    variant="dark"
                >
                    {desc}
                </ListGroup.Item>
            )
        })

        let status;
        if (winner) {
            status = `The Winner is '${current.squares[winner[0]]}'`;
        } else if (moves.length === 10 && this.state.stepNumber) {
            status = "It's a draw";
        } else {
            status = `Move: Player '${this.state.xIsNext ? 'X' : 'O'}'`;
        }

        return (
            <div>
                <div className="game">
                    <Card bg="dark">
                        <Card.Header className="status">
                            <Card.Title>
                                <h3>
                                    {status}
                                </h3>
                            </Card.Title>
                        </Card.Header>
                        <Board
                            winner={winner}
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </Card>
                    <div className="game-info">
                        <ListGroup>{moves}</ListGroup>
                    </div>
                </div>
                <Card.Footer>
                    <Button
                        variant="outline-danger"
                        onClick={() => this.reset()}
                    >
                        Reset
                    </Button>
                </Card.Footer>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i=0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }
    return null;
}
