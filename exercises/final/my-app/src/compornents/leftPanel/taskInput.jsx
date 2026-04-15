function TaskInput() {
  return (
    <div style={styles.taskInput}>
      <input type="text" placeholder="達成タスク名を入力" />
      <input type="number" placeholder="実績" />
      <button style={styles.button}>達成</button>
    </div>
  )
}

const styles = {
  taskInput: {
    display: "flex",
    gap: "8px",
    padding: "12px",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default TaskInput;