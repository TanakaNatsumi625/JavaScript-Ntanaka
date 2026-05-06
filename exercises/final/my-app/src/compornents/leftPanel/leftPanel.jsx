import StatusSection from "./statusSection";
import TaskList from "./taskList";
import TaskInput from "./taskInput";


function LeftPanel({status, tasks, onAddTask}) {
  return (
    <div style={styles.leftPanel}>
      <StatusSection status={status}/>
      <TaskList tasks={tasks}/>
      <TaskInput onAddTask={onAddTask}/>
    </div>
  )
}

const styles = {
  leftPanel: {
    width: "450px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    display: "flex",
    borderRadius: "20px",
    flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
    overflow: "hidden",
  },
};

export default LeftPanel;