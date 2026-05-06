function TaskList({ tasks }) {
  console.log("TaskList rendered with tasks:", tasks);
  return (
    <div style={styles.taskList}>
        <div style={styles.header}>達成タスク一覧</div>
        <div style={styles.scrollContainer}>
          {tasks.length === 0 ? (
            <div style={styles.emptyState}>まだタスクがありません</div>
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
  },
  header: {
    padding: "16px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    borderBottom: "2px solid #f0f0f0",
    backgroundColor: "#fafafa",
  },
  scrollContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "12px",
  },
  emptyState: {
    padding: "40px 20px",
    textAlign: "center",
    color: "#999",
    fontSize: "14px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    marginBottom: "8px",
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #e9ecef",
    transition: "all 0.2s ease",
  },
  taskName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },
  taskTime: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#667eea",
    padding: "4px 12px",
    borderRadius: "12px",
    backgroundColor: "rgba(102, 126, 234, 0.1)",
  },
};


export default TaskList;