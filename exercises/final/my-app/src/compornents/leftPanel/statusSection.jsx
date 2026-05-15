
function StatusSection({ status }) {
    return (
        <div style={styles.status}>
            <div style={styles.levelContainer}>
                <div style={styles.levelLabel}>Lv.</div>
                <div style={styles.level}>{status.level}</div>
            </div>
            <div style={styles.expContainer}>
                <div style={styles.expLabel}>
                    {`EXP: ${status.exp} / 100`}
                </div>
                <div style={styles.bar}>
                    <div style={{ ...styles.fill, width: `${status.exp}%` }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    status: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        padding: "20px",
        background: "linear-gradient(135deg, #a8d5e2 0%, #76b6cd 100%)",
        color: "#2d5366",
        position: "relative",
        flexShrink: 0,
    },
    levelContainer: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    levelLabel: {
        fontSize: "16px",
        fontWeight: "600",
        opacity: 0.85,
    },
    level: {
        fontSize: "46px",
        fontWeight: "bold",
        textShadow: "3px 3px 0px rgba(255, 255, 255, 0.5)",
    },
    expContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    expLabel: {
        fontSize: "13px",
        fontWeight: "600",
        opacity: 0.85,
    },
    bar: {
        position: "relative",
        height: "28px",
        borderRadius: "18px",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        overflow: "hidden",
        border: "2px solid rgba(45, 83, 102, 0.2)",
        boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.08)",
    },
    fill: {
        position: "relative",
        height: "100%",
        background: "linear-gradient(90deg, #ffd89b 0%, #ffb347 100%)",
        transition: "width 0.5s ease",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(255, 179, 71, 0.4)",
    },
};

export default StatusSection;