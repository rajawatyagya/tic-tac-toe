import React from 'react';
import './App.css';
import {Game} from './components/Game/Game';
import Card from 'react-bootstrap/Card';

function App() {
    return (
        <div className="App">
            <Card bg="dark" className="text-center">
                <Card.Header >
                    <Card.Title>
                        <h1 style={{fontSize: 65}}>
                            tic-tac-toe
                        </h1>
                    </Card.Title>
                </Card.Header>
                <Game />
            </Card>

        </div>
    );
}

export default App;
