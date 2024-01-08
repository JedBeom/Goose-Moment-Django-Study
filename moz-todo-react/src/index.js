import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const DATA = [
	{ id: "todo-0", name: "Eat", completed: true },
	{ id: "todo-1", name: "Sleep", completed: false },
	{ id: "todo-2", name: "Dance", completed: false },
];

ReactDOM.createRoot(document.getElementById('root')).render(<App tasks={DATA} />);
