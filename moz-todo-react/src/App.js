import logo from './logo.svg';
import './App.css';

function App(props) {
	console.log(props);
	const subject = props.subject
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload by {subject}.
				</p>
			</header>
		</div>
	);
}

export default App;
