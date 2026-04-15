function TimeDisplay() {
  return (
    <div style={styles.timeDisplay}>
      12:00
    </div>
  )
}


const styles = {
  timeDisplay: {
    flex: 1,              
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "200px",
    fontWeight: "bold",
    color: "#000",
  },
};

export default TimeDisplay