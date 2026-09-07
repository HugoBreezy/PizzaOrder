import "bootstrap-icons/font/bootstrap-icons.css";

function DashboardCard({
  title,
  value,
  icon,
  bgColor = "#8B0000",
  growth = "+0 This Month",
}) {
  return (
    <div className="col-xl-3 col-lg-6 col-md-6 mb-4">

      <div
        className="card border-0 h-100"
        style={{
          borderRadius: "18px",
          transition: "all .3s ease",
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow =
            "0 15px 35px rgba(0,0,0,.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 8px 20px rgba(0,0,0,.08)";
        }}
      >
        <div className="card-body">

          <div className="d-flex justify-content-between">

            <div>

              <small className="text-muted">
                {title}
              </small>

              <h2
                className="fw-bold mt-2"
                style={{
                  color: "#212529",
                }}
              >
                {value}
              </h2>

              <small
                className="fw-semibold"
                style={{
                  color: "#28a745",
                }}
              >
                {growth}
              </small>

            </div>

            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "65px",
                height: "65px",
                borderRadius: "18px",
                backgroundColor: bgColor,
                color: "white",
                fontSize: "28px",
              }}
            >
              <i className={`bi bi-${icon}`}></i>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardCard;