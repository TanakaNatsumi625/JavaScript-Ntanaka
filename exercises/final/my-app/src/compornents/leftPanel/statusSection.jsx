function StatusSection() {
    return (
        <div style={styles.status}>
            <span style={styles.level}>Lv.3</span>
            <div style={styles.bar}>
                <div style={styles.fill}></div>
            </div>
        </div>
    )
}

const styles = {
    status: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "20px",
    },
    level: {
        fontSize: "18px",
        fontWeight: "bold",
    },
    bar: {
        flex: 1,
        height: "24px",
        border: "3px solid #000",
        backgroundColor: "#fff",
    },
    fill: {
        width: "60%",              // ← ここが経験値
        height: "100%",
        backgroundColor: "#67aef0",
    }
};

export default StatusSection;