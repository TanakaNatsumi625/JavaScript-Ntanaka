import imageSrc from '../../img/alexa_main.png';
import imagePengins from '../../img/応援ペンギン.png';

function TimeDisplay({ time, showTime }) {
  return (
    <div style={styles.timeDisplay}>
      {showTime ? (
        <div style={styles.time}>{time}</div>
      ) : (
        <img src={imageSrc} alt="Level Up Image" style={styles.image} />
        // <img src={imagePengins} alt="Level Up Image" style={styles.image} />
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
    backgroundColor: "#fffef9",
    borderRadius: "25px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
     border: "3px solid #d6a85d",
    backdropFilter: "blur(10px)",
    overflow: "hidden",
    fontFamily: "'Comic Sans MS', 'Segoe UI Emoji', cursive, sans-serif",
  },
  time: {
    fontSize: "160px",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #ffb88c 0%, #de6262 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textShadow: "3px 3px 0px rgba(255, 255, 255, 0.3)",
  },
  image: {
    maxWidth: "90%",
    maxHeight: "90%",
    objectFit: "contain",
    borderRadius: "15px",
  },
};

export default TimeDisplay