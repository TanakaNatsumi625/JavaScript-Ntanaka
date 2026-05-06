import { useState } from "react";

function TaskInput({onAddTask}) {
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState(0);

  const handleAddTask = () => {
    if (taskName.trim() === "" || taskTime <= 0) {
      alert("タスク名もしくは時間が空です");
      return;
    }
    onAddTask({ name: taskName, time: taskTime });
    setTaskName("");
    setTaskTime(0);
  };

  return (
    <div style={styles.taskInput}>
      <input
        type="text"
        placeholder="達成タスク名を入力"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        style={styles.inputName}
        // onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
      />
      <input
        type="number"
        placeholder="獲得経験値(分)"
        value={taskTime === 0 ? '' : taskTime}
        onChange={(e) => setTaskTime(Number(e.target.value))}
        style={styles.inputNumber}
        // onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
      />
      <button 
        style={styles.button} 
        onClick={handleAddTask}
      >
        ✓ 達成
      </button>
    </div>
  )
}

const styles = {
  taskInput: {
    display: "flex",
    gap: "8px",
    padding: "16px",
    borderTop: "2px solid #f0f0f0",
    backgroundColor: "#fafafa",
  },
  inputName: {
    flex: 1,
    minWidth: 0,
    padding: "12px 14px",
    fontSize: "14px",
    border: "2px solid #e9ecef",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.2s ease",
  },
  inputNumber: {
    width: "100px",
    padding: "12px 14px",
    fontSize: "14px",
    border: "2px solid #e9ecef",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.2s ease",
  },
  button: {
    padding: "12px 20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
};

export default TaskInput;