import { useState, useRef, useEffect } from "react";
import { usePrevious } from "./utils/hooks";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

const FILTER_MAP = {
	All: () => true,
	Active: (task) => !task.completed,
	Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);
const FILTER_NAMES_TABLE = {
	All: "모든 작업",
	Active: "해야할 작업",
	Completed: "완료된 작업",
};

function App(props) {
	const [tasks, setTasks] = useState(props.tasks);
	const [filter, setFilter] = useState("All");

	function addTask(name) {
		const newTask = { id: `todo-${nanoid()}`, name, completed: false };
		setTasks([...tasks, newTask]);
	}

	function toggleTaskCompleted(id) {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, completed: !task.completed };
			}
			return task;
		})

		setTasks(updatedTasks);
	}

	function editTask(id, newName) {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, name: newName };
			}
			return task;
		})

		setTasks(updatedTasks);
	}

	function deleteTask(id) {
		const remainingTasks = tasks.filter((task) => id !== task.id);
		setTasks(remainingTasks);
	}

	const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
		<Todo
			id={task.id}
			name={task.name}
			completed={task.completed}
			key={task.id}
			toggleTaskCompleted={toggleTaskCompleted}
			editTask={editTask}
			deleteTask={deleteTask}
		/>
	));

	const filterList = FILTER_NAMES.map((name) => (
		<FilterButton 
			key={name} 
			name={name} 
			displayName={FILTER_NAMES_TABLE[name]}
			isPressed={name === filter}
			setFilter={setFilter}
		/>
	));

	const headingText = taskList.length === 0 ? "작업이 없음" : `${taskList.length}개의 작업이 남음`;

	const listHeadingRef = useRef(null);
	const prevTaskLength = usePrevious(tasks.length);

	useEffect(() => {
		if (tasks.length - prevTaskLength === -1) {
			listHeadingRef.current.focus();
		}
	}, [tasks.length, prevTaskLength]);

	return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
		{filterList}
      </div>
      <h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>{headingText}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
	);
}

export default App;

