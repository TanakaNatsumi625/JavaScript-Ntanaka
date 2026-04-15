import StatusSection from "./StatusSection";
import TaskList from "./taskList";
import TaskInput from "./taskInput";


function LeftPanel() {
  return (
    <div style={styles.leftPanel}>
      <StatusSection/>
      <TaskList/>
      <TaskInput/>
    </div>
  )
}

const styles = {
  leftPanel: {
    width: "600px",
    backgroundColor: "#ffffff",
    display: "flex",
    borderRadius: "12px",
    flexDirection: "column",
  },
};

export default LeftPanel;