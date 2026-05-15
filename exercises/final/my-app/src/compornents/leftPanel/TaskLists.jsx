function TaskList({ tasks }) {
  return (
    <div style={styles.taskList}>
      <div style={styles.header}>達成タスク一覧</div>
      <div style={styles.scrollContainer}>
        {tasks.length === 0 ? (
          <div style={styles.emptyState}>タスクを達成して経験値を上げよう！</div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.taskId}
              style={styles.item}
            >
              <span style={styles.taskName}>{task.taskName}</span>
              <span style={styles.taskTime}>+{task.minutes}exp</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


const styles = {
  taskList: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#fffef9",
  },
  header: {
    padding: "14px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#4a4a4a",
    borderBottom: "3px dashed #e8d5b7",
    backgroundColor: "#fcfaf5",
    textAlign: "center",
    flexShrink: 0,
  },
  scrollContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "12px",
    minHeight: 0,
  },
  emptyState: {
    padding: "40px 20px",
    textAlign: "center",
    color: "#a89f91",
    fontSize: "15px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    marginBottom: "8px",
    borderRadius: "18px",
    backgroundColor: "#fff9f0",
    border: "2px solid #e8d5b7",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  },
  taskName: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#4a4a4a",
  },
  taskTime: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#ff8c42",
    padding: "5px 14px",
    borderRadius: "15px",
    backgroundColor: "rgba(255, 140, 66, 0.15)",
    border: "2px solid rgba(255, 140, 66, 0.3)",
  },
};


export default TaskList;