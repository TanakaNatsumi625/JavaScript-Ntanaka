// import { useState } from 'react'

import LeftPanel from "./compornents/leftPanel/leftPanel";
import TimeDisplay from "./compornents/TimeDisplay/timeDisplay";

function App() {
  // const [level, setLevel] = useState(3);
  const [exp, setExp] = useState(0); // 0〜100
  // const [tasks, setTasks] = useState([
  //   { id: 1, name: "JS課題", time: 2, done: true },
  //   { id: 2, name: "React復習", time: 1, done: false },
  // ]);
  // const [totalTime, setTotalTime] = useState("12:30");

  const level = 3;
  // const exp = 40;
  const tasks = [
    { id: 1, name: "JS課題", time: 2, done: true },
    { id: 2, name: "React復習", time: 1, done: false },
  ];
  const totalTime = "12:30";

  
  // const addTask = (task) => {
  //   const newTask = {
  //     id: Date.now(),
  //     name: task.name,
  //     time: task.time,
  //     done: true,
  //   };

  //   setTasks([...tasks, newTask]);

  //   // 経験値を増やす（例）
  //   setExp((prev) => Math.min(prev + task.time * 10, 100));
  // };



  return (
    <div style={styles.app}
    >
     <div style={styles.container}>
      <LeftPanel 
        level={level}
        exp={exp}
        tasks={tasks}
        // onAddTask={addTask}
      />
      <TimeDisplay
        time={totalTime}
      />
      </div>
      <button onClick={() => setExp((prev) => Math.min(prev + 10, 100))}>経験値を増やす</button>
    </div>
  )
}


const styles = {
  app: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e0ffff",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    padding: "100px 300px", 
    gap: "40px",
    boxSizing: "border-box",
  },
};


export default App
