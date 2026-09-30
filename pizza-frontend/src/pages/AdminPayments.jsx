import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { getAllPayments } from "../services/api";

function AdminPayments() {

    const [payments, setPayments] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {

        try {

            setLoading(true);

            const response = await getAllPayments();

            setPayments(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load payments.");

        } finally {

            setLoading(false);

        }
    };

    // =========================
    // FILTER PAYMENTS
    // =========================

    const filteredPayments = payments.filter((payment) => {

        const customer =
            payment.order?.user?.fullName?.toLowerCase() || "";

        const phone =
            payment.order?.user?.phone?.toLowerCase() || "";

        const orderId =
            payment.order?.id?.toString() || "";

        const method =
            payment.paymentMethod?.toLowerCase() || "";

        const searchText = search.toLowerCase();

        return (
            customer.includes(searchText) ||
            phone.includes(searchText) ||
            orderId.includes(searchText) ||
            method.includes(searchText)
        );
    });

    // =========================
    // STATISTICS
    // =========================

    const totalPayments = payments.length;

    const paidPayments = payments.filter(
        (payment) => payment.paymentStatus === "PAID"
    ).length;

    const pendingPayments = payments.filter(
        (payment) => payment.paymentStatus !== "PAID"
    ).length;

    const totalRevenue = payments
        .filter((payment) => payment.paymentStatus === "PAID")
        .reduce(
            (total, payment) =>
                total + Number(payment.amount || 0),
            0
        );

    return (

        <div
            className="d-flex"
            style={{
                minHeight: "100vh",
                backgroundColor: "#F8F4F0",
            }}
        >

            {/* ================= SIDEBAR ================= */}

            <AdminSidebar />


            {/* ================= MAIN CONTENT ================= */}

            <div className="flex-grow-1">

                <AdminTopbar />

                <div className="container-fluid p-4">

                    {/* ================= HEADER ================= */}

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h2
                                className="fw-bold mb-1"
                                style={{
                                    color: "#8B0000",
                                }}
                            >
                                Payment History
                            </h2>

                            <p className="text-muted mb-0">
                                View all customer payment transactions.
                            </p>

                        </div>

                        <button
                            className="btn btn-outline-danger"
                            onClick={loadPayments}
                            disabled={loading}
                        >
                            🔄 Refresh
                        </button>

                    </div>


                    {/* ================= STATISTICS ================= */}

                    <div className="row g-4 mb-4">

                        {/* TOTAL PAYMENTS */}

                        <div className="col-md-6 col-xl-3">

                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "15px",
                                }}
                            >

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <p className="text-muted mb-1">
                                                Total Payments
                                            </p>

                                            <h3 className="fw-bold mb-0">
                                                {totalPayments}
                                            </h3>

                                        </div>

                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                width: "55px",
                                                height: "55px",
                                                backgroundColor: "#FDECEC",
                                                fontSize: "24px",
                                            }}
                                        >
                                            💳
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* PAID */}

                        <div className="col-md-6 col-xl-3">

                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "15px",
                                }}
                            >

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <p className="text-muted mb-1">
                                                Paid
                                            </p>

                                            <h3
                                                className="fw-bold mb-0"
                                                style={{
                                                    color: "#198754",
                                                }}
                                            >
                                                {paidPayments}
                                            </h3>

                                        </div>

                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                width: "55px",
                                                height: "55px",
                                                backgroundColor: "#E8F8EE",
                                                fontSize: "24px",
                                            }}
                                        >
                                            ✅
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* PENDING */}

                        <div className="col-md-6 col-xl-3">

                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "15px",
                                }}
                            >

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <p className="text-muted mb-1">
                                                Pending
                                            </p>

                                            <h3
                                                className="fw-bold mb-0"
                                                style={{
                                                    color: "#F0A500",
                                                }}
                                            >
                                                {pendingPayments}
                                            </h3>

                                        </div>

                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                width: "55px",
                                                height: "55px",
                                                backgroundColor: "#FFF7D6",
                                                fontSize: "24px",
                                            }}
                                        >
                                            ⏳
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* REVENUE */}

                        <div className="col-md-6 col-xl-3">

                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "15px",
                                }}
                            >

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <p className="text-muted mb-1">
                                                Paid Revenue
                                            </p>

                                            <h5
                                                className="fw-bold mb-0"
                                                style={{
                                                    color: "#8B0000",
                                                }}
                                            >
                                                TZS{" "}
                                                {totalRevenue.toLocaleString()}
                                            </h5>

                                        </div>

                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                width: "55px",
                                                height: "55px",
                                                backgroundColor: "#FDECEC",
                                                fontSize: "24px",
                                            }}
                                        >
                                            💰
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================= PAYMENT TABLE ================= */}

                    <div
                        className="card border-0 shadow-sm"
                        style={{
                            borderRadius: "15px",
                            overflow: "hidden",
                        }}
                    >

                        {/* TABLE HEADER */}

                        <div
                            className="card-header border-0 p-4"
                            style={{
                                backgroundColor: "#8B0000",
                            }}
                        >

                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                                <div>

                                    <h5 className="text-white fw-bold mb-1">
                                        Payment Transactions
                                    </h5>

                                    <small
                                        style={{
                                            color: "rgba(255,255,255,0.75)",
                                        }}
                                    >
                                        Complete payment history
                                    </small>

                                </div>


                                {/* SEARCH */}

                                <div
                                    style={{
                                        minWidth: "280px",
                                        maxWidth: "380px",
                                    }}
                                >

                                    <div className="input-group">

                                        <span className="input-group-text bg-white border-0">
                                            🔍
                                        </span>

                                        <input
                                            type="text"
                                            className="form-control border-0"
                                            placeholder="Search customer, phone, order..."
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* TABLE */}

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead
                                    style={{
                                        backgroundColor: "#F8F4F0",
                                    }}
                                >

                                    <tr>

                                        <th className="px-4 py-3">
                                            Order
                                        </th>

                                        <th className="py-3">
                                            Customer
                                        </th>

                                        <th className="py-3">
                                            Phone
                                        </th>

                                        <th className="py-3">
                                            Amount
                                        </th>

                                        <th className="py-3">
                                            Payment Method
                                        </th>

                                        <th className="py-3">
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {loading ? (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center py-5"
                                            >

                                                <div
                                                    className="spinner-border"
                                                    style={{
                                                        color: "#8B0000",
                                                    }}
                                                ></div>

                                                <div className="text-muted mt-2">
                                                    Loading payments...
                                                </div>

                                            </td>

                                        </tr>

                                    ) : filteredPayments.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center py-5"
                                            >

                                                <div
                                                    style={{
                                                        fontSize: "45px",
                                                    }}
                                                >
                                                    💳
                                                </div>

                                                <h5 className="fw-bold mt-2">
                                                    No Payments Found
                                                </h5>

                                                <p className="text-muted mb-0">
                                                    No payment transactions
                                                    match your search.
                                                </p>

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredPayments.map((payment) => (

                                            <tr key={payment.id}>

                                                {/* ORDER */}

                                                <td className="px-4">

                                                    <span
                                                        className="fw-bold"
                                                        style={{
                                                            color: "#8B0000",
                                                        }}
                                                    >
                                                        #{payment.order?.id}
                                                    </span>

                                                </td>


                                                {/* CUSTOMER */}

                                                <td>

                                                    <div className="d-flex align-items-center gap-2">

                                                        <div
                                                            className="rounded-circle d-flex align-items-center justify-content-center"
                                                            style={{
                                                                width: "38px",
                                                                height: "38px",
                                                                backgroundColor: "#FDECEC",
                                                                color: "#8B0000",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            {payment.order?.user?.fullName
                                                                ?.charAt(0)
                                                                ?.toUpperCase() || "?"}
                                                        </div>

                                                        <span className="fw-semibold">

                                                            {payment.order?.user?.fullName ||
                                                                "N/A"}

                                                        </span>

                                                    </div>

                                                </td>


                                                {/* PHONE */}

                                                <td>

                                                    <span className="text-muted">

                                                        {payment.order?.user?.phone ||
                                                            "N/A"}

                                                    </span>

                                                </td>


                                                {/* AMOUNT */}

                                                <td>

                                                    <span className="fw-bold">

                                                        TZS{" "}
                                                        {Number(
                                                            payment.amount || 0
                                                        ).toLocaleString()}

                                                    </span>

                                                </td>


                                                {/* METHOD */}

                                                <td>

                                                    <span
                                                        className="badge rounded-pill px-3 py-2"
                                                        style={{
                                                            backgroundColor:
                                                                "#F1F1F1",
                                                            color: "#333",
                                                        }}
                                                    >

                                                        {payment.paymentMethod ||
                                                            "N/A"}

                                                    </span>

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    {payment.paymentStatus ===
                                                    "PAID" ? (

                                                        <span className="badge bg-success rounded-pill px-3 py-2">
                                                            ✓ PAID
                                                        </span>

                                                    ) : (

                                                        <span className="badge bg-warning text-dark rounded-pill px-3 py-2">
                                                            ⏳ PENDING
                                                        </span>

                                                    )}

                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>


                        {/* FOOTER */}

                        {!loading && filteredPayments.length > 0 && (

                            <div
                                className="px-4 py-3 border-top d-flex justify-content-between align-items-center"
                                style={{
                                    backgroundColor: "#FAFAFA",
                                }}
                            >

                                <small className="text-muted">

                                    Showing{" "}
                                    <strong>
                                        {filteredPayments.length}
                                    </strong>{" "}
                                    of{" "}
                                    <strong>
                                        {payments.length}
                                    </strong>{" "}
                                    payments

                                </small>

                                <small className="text-muted">

                                    Payment records

                                </small>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminPayments;