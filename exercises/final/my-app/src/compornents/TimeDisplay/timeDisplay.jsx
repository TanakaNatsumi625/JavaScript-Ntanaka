import imageSrc from '../../img/image.png';

function TimeDisplay({ time, showTime }) {
  return (
    <div style={styles.timeDisplay}>
      {showTime ? (
        <div style={styles.time}>{time}</div>
      ) : (
        <img src={imageSrc} alt="Level Up Image" style={styles.image} />
      )}
    </div>
  )
}


const styles = {
  timeDisplay: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
    overflow: "hidden",
  },
  time: {
    fontSize: "180px",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  image: {
    maxWidth: "90%",
    maxHeight: "90%",
    objectFit: "contain",
    borderRadius: "10px",
  },
};

export default TimeDisplay