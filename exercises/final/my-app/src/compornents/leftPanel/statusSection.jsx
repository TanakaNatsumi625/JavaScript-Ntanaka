function StatusSection({status}) {
    const { level, exp } = status;
    console.log('[StatusSection] Rendering with:', { level, exp, fullStatus: status });
    return (
        <div style={styles.status}>
            <div style={styles.levelContainer}>
                <div style={styles.levelLabel}>レベル</div>
                <div style={styles.level}>{level}</div>
            </div>
            <div style={styles.expContainer}>
                <div style={styles.expLabel}>EXP: {exp} / 100</div>
                <div style={styles.bar}>
                    <div style={{ ...styles.fill, width: `${exp}%` }}>
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
        gap: "16px",
        padding: "24px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
    },
    levelContainer: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    levelLabel: {
        fontSize: "14px",
        fontWeight: "600",
        opacity: 0.9,
    },
    level: {
        fontSize: "48px",
        fontWeight: "bold",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    },
    expContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    expLabel: {
        fontSize: "12px",
        fontWeight: "600",
        opacity: 0.9,
    },
    bar: {
        position: "relative",
        height: "28px",
        borderRadius: "14px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        overflow: "hidden",
        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    fill: {
        position: "relative",
        height: "100%",
        background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
        transition: "width 0.5s ease",
        borderRadius: "14px",
        overflow: "hidden",
    },
};

export default StatusSection;