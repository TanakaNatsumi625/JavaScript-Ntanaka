import StatusSection from "./StatusSection";
import TaskList from "./TaskLists";
import TaskInput from "./TaskInput";


function LeftPanel({status, tasks, onAddTask, onVoiceRecognition}) {
  return (
    <div style={styles.leftPanel}>
      <StatusSection status={status}/>
      <TaskList tasks={tasks}/>
      <TaskInput onAddTask={onAddTask} onVoiceRecognition={onVoiceRecognition}/>
    </div>
  )
}

const styles = {
  leftPanel: {
    width: "550px",
    height: "100%",
    backgroundColor: "#fffef9",
    display: "flex",
    borderRadius: "25px",
    flexDirection: "column",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    border: "3px solid #d6a85d",
    backdropFilter: "blur(10px)",
    overflow: "hidden",
    fontFamily: "'Comic Sans MS', 'Segoe UI Emoji', cursive, sans-serif",
  },
};

export default LeftPanel;