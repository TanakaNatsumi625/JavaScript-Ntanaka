import { useState } from "react";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import Button from "@mui/material/Button";

function TaskInput({onAddTask, onVoiceRecognition}) {
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
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="達成タスク名を入力"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          style={styles.inputName}
          // onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
      </div>
      <input
        type="number"
        placeholder="獲得経験値(分)"
        value={taskTime === 0 ? '' : taskTime}
        onChange={(e) => setTaskTime(Number(e.target.value))}
        style={styles.inputNumber}
        // onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
      />
      <button
        onClick={handleAddTask}
        style={styles.button}
        title="タスクを追加"
      >
        ✓ 達成
      </button>
      <button
        onClick={onVoiceRecognition}
        style={styles.voiceButton}
        title="音声で入力"
      >
        <KeyboardVoiceIcon />
      </button>
    </div>
  )
}

const styles = {
  taskInput: {
    display: "flex",
    gap: "10px",
    padding: "18px",
    borderTop: "3px dashed #e8d5b7",
    backgroundColor: "#fcfaf5",
  },
  inputContainer: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  inputName: {
    // flex: 1,
    minWidth: 0,
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #d4b896",
    borderRadius: "15px",
    outline: "none",
    backgroundColor: "#fff9f0",
    transition: "all 0.2s ease",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.06)",
  },
  inputNumber: {
    width: "120px",
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #d4b896",
    borderRadius: "15px",
    outline: "none",
    backgroundColor: "#fff9f0",
    transition: "all 0.2s ease",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.06)",
  },
  button: {
    padding: "12px 22px",
    background: "linear-gradient(135deg, #ffb88c 0%, #de6262 100%)",
    color: "#fff",
    border: "3px solid #c95555",
    borderRadius: "15px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
    boxShadow: "0 4px 12px rgba(222, 98, 98, 0.3)",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  voiceButton: {
    width: "46px",
    height: "46px",
    padding: "0",
    background: "linear-gradient(135deg, #a8d5e2 0%, #76b6cd 100%)",
    color: "#2d5366",
    border: "3px solid #5a9eb0",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(118, 182, 205, 0.3)",
    transition: "all 0.2s ease",
    flexShrink: 0,
  }
};

export default TaskInput;