import "bootstrap-icons/font/bootstrap-icons.css";

function DashboardCard({
  title,
  value,
  icon,
  bgColor = "#8B0000",
  growth = "This Month",
}) {
  return (
    <div
      className="card border-0 h-100"
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        background: "#ffffff",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.07)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 15px 35px rgba(0, 0, 0, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 8px 25px rgba(0, 0, 0, 0.07)";
      }}
    >
      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-start">

          {/* TEXT */}
          <div style={{ minWidth: 0 }}>

            <div
              className="mb-2"
              style={{
                color: "#777",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {title}
            </div>

            <div
              className="fw-bold"
              style={{
                color: "#202020",
                fontSize: "30px",
                lineHeight: "1.2",
                wordBreak: "break-word",
              }}
            >
              {value}
            </div>

            <div
              className="d-flex align-items-center mt-3"
              style={{
                color: "#198754",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              <i className="bi bi-graph-up-arrow me-2"></i>
              {growth}
            </div>

          </div>

          {/* ICON */}
          <div
            className="d-flex justify-content-center align-items-center flex-shrink-0 ms-3"
            style={{
              width: "62px",
              height: "62px",
              borderRadius: "17px",
              background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`,
              color: "#ffffff",
              fontSize: "26px",
              boxShadow: `0 8px 18px ${bgColor}35`,
            }}
          >
            <i className={`bi bi-${icon}`}></i>
          </div>

        </div>

      </div>

      {/* Bottom accent */}
      <div
        style={{
          height: "4px",
          width: "100%",
          background: bgColor,
        }}
      ></div>

    </div>
  );
}

export default DashboardCard;