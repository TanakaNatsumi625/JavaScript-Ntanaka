function TaskList() {
  return (
    <div style={styles.taskList}>
      <h2>TaskList</h2>
    </div>
  )
}

const styles = {
  taskList: {
    flex: 1,                 // ← 残り全部使う
    borderTop: "1px solid #000",
    borderBottom: "1px solid #000",
    overflowY: "auto",       // ← スクロール
  },
};

export default TaskList;