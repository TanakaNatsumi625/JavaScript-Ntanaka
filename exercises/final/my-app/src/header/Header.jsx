import headerImg from "../img/先生ぺんぎん.png";
const Header = () => {
  return (
    <header style={styles.header}> 
        <img src={headerImg} alt="Header Image" style={{ width: "60px", height: "60px", marginRight: "20px" }} />
        <div style={styles.title}>しごと日和 with アレクサ</div>
    </header>
  )
}

const styles = {
  header: {
    padding: "30px 40px",
    backgroundColor: "#a8d5e2",
    color: "#2d5366",
    backdropFilter: "blur(10px)",
    fontFamily: "'Comic Sans MS', 'Segoe UI Emoji', cursive, sans-serif",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
     boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
     borderBottom: "3px solid #76b6cd",
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
      margin: 0,
    }
}

export default Header;