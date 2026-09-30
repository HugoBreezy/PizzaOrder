import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    getAllOrders,
    getPaymentByOrder,
    confirmPayment,
    updateOrderStatus,
} from "../services/api";

function DeliveryDashboard() {

    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState({});
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);

            const response = await getAllOrders();

            const deliveryOrders = response.data.filter(
                (order) => order.status === "ON_DELIVERY"
            );

            setOrders(deliveryOrders);

            const paymentData = {};

            for (const order of deliveryOrders) {
                try {
                    const paymentResponse =
                        await getPaymentByOrder(order.id);

                    paymentData[order.id] = paymentResponse.data;
                } catch (error) {
                    console.log(
                        `Payment not found for order ${order.id}`
                    );
                }
            }

            setPayments(paymentData);

        } catch (error) {
            console.log(error);
            toast.error("Failed to load deliveries.");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmCash = async (orderId) => {

        try {

            setProcessing(orderId);

            await confirmPayment(orderId);

            toast.success("Cash payment confirmed successfully!");

            await loadOrders();

        } catch (error) {

            console.log(error);

            const message =
                error.response?.data ||
                "Failed to confirm payment.";

            toast.error(message);

        } finally {
            setProcessing(null);
        }
    };

    const handleMarkDelivered = async (orderId) => {

        try {

            setProcessing(orderId);

            const payment = payments[orderId];

            if (!payment || payment.paymentStatus !== "PAID") {
                toast.error(
                    "Please confirm cash payment before marking the order as delivered."
                );
                return;
            }

            await updateOrderStatus(
                orderId,
                "DELIVERED"
            );

            toast.success("Order marked as delivered!");

            await loadOrders();

        } catch (error) {

            console.log(error);

            const message =
                error.response?.data ||
                "Failed to mark order as delivered.";

            toast.error(message);

        } finally {
            setProcessing(null);
        }
    };

    const totalDeliveries = orders.length;

    const paidDeliveries = orders.filter(
        (order) =>
            payments[order.id]?.paymentStatus === "PAID"
    ).length;

    const pendingPayments = orders.filter(
        (order) =>
            payments[order.id]?.paymentStatus !== "PAID"
    ).length;

    return (

        <div
            className="d-flex"
            style={{
                minHeight: "100vh",
                backgroundColor: "#F8F4F0"
            }}
        >

            {/* ================= SIDEBAR ================= */}

            <div
                style={{
                    width: "275px",
                    backgroundColor: "#8B0000",
                    color: "white",
                    minHeight: "100vh"
                }}
            >

                {/* Logo / Brand */}

                <div
                    className="text-center"
                    style={{
                        padding: "28px 15px",
                        borderBottom: "1px solid rgba(255,255,255,0.2)"
                    }}
                >

                    <div
                        className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                        style={{
                            width: "95px",
                            height: "95px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            fontSize: "45px"
                        }}
                    >
                        🚴
                    </div>

                    <h3 className="fw-bold mb-1">
                        Delivery
                    </h3>

                    <small>
                        Delivery Management
                    </small>

                </div>


                {/* Navigation */}

                <div className="p-3">

                    <div
                        className="d-flex align-items-center gap-3 p-3 rounded"
                        style={{
                            backgroundColor: "white",
                            color: "#8B0000",
                            fontWeight: "600"
                        }}
                    >
                        <span style={{ fontSize: "20px" }}>
                            📊
                        </span>

                        Dashboard
                    </div>


                    <div
                        className="d-flex align-items-center gap-3 p-3 mt-2"
                        style={{
                            color: "white",
                            fontWeight: "600"
                        }}
                    >
                        <span style={{ fontSize: "20px" }}>
                            🚴
                        </span>

                        My Deliveries
                    </div>

                </div>

            </div>


            {/* ================= MAIN CONTENT ================= */}

            <div className="flex-grow-1">

                {/* ================= TOPBAR ================= */}

                <div
                    className="d-flex justify-content-between align-items-center"
                    style={{
                        height: "105px",
                        backgroundColor: "white",
                        borderBottom: "2px solid #8B0000",
                        padding: "0 30px"
                    }}
                >

                    <div>

                        <h2
                            className="fw-bold mb-1"
                            style={{ color: "#8B0000" }}
                        >
                            Delivery Dashboard
                        </h2>

                        <span className="text-muted">
                            Welcome back,{" "}
                            <strong>
                                {user?.fullName || "Delivery Guy"}
                            </strong>{" "}
                            🚴
                        </span>

                    </div>


                    <div className="d-flex align-items-center gap-3">

                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: "#8B0000",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "18px"
                            }}
                        >
                            {user?.fullName
                                ? user.fullName
                                      .charAt(0)
                                      .toUpperCase()
                                : "D"}
                        </div>

                        <div>

                            <strong>
                                {user?.fullName || "Delivery Guy"}
                            </strong>

                            <div
                                className="text-muted"
                                style={{ fontSize: "13px" }}
                            >
                                DELIVERY
                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= PAGE BODY ================= */}

                <div className="container-fluid p-4">

                    {/* TITLE */}

                    <div className="mb-4">

                        <h2
                            className="fw-bold"
                            style={{ color: "#8B0000" }}
                        >
                            My Deliveries
                        </h2>

                        <p className="text-muted mb-0">
                            Manage orders that are ready for delivery.
                        </p>

                    </div>


                    {/* ================= STATISTICS ================= */}

                    <div className="row g-4 mb-4">

                        {/* Total */}

                        <div className="col-md-4">

                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "15px"
                                }}
                            >

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between">

                                        <div>

                                            <p className="text-muted mb-1">
                                                My Deliveries
                                            </p>

                                            <h2 className="fw-bold mb-0">
                                                {totalDeliveries}
                                            </h2>

                                        </div>

                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                width: "55px",
                                                height: "55px",
                                                backgroundColor: "#FDECEC",
                                                fontSize: "25px"
                                            }}
                                        >
                                            🚴
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Paid */}

                        <div className="col-md-4">

                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "15px"
                                }}
                            >

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between">

                                        <div>

                                            <p className="text-muted mb-1">
                                                Payment Confirmed
                                            </p>

                                            <h2 className="fw-bold text-success mb-0">
                                                {paidDeliveries}
                                            </h2>

                                        </div>

                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                width: "55px",
                                                height: "55px",
                                                backgroundColor: "#E8F8EE",
                                                fontSize: "25px"
                                            }}
                                        >
                                            💰
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Pending */}

                        <div className="col-md-4">

                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "15px"
                                }}
                            >

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between">

                                        <div>

                                            <p className="text-muted mb-1">
                                                Payment Pending
                                            </p>

                                            <h2 className="fw-bold text-warning mb-0">
                                                {pendingPayments}
                                            </h2>

                                        </div>

                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                width: "55px",
                                                height: "55px",
                                                backgroundColor: "#FFF7D6",
                                                fontSize: "25px"
                                            }}
                                        >
                                            ⏳
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================= ORDERS ================= */}

                    <div
                        className="card border-0 shadow"
                        style={{
                            borderRadius: "15px"
                        }}
                    >

                        <div
                            className="card-header text-white d-flex justify-content-between align-items-center"
                            style={{
                                backgroundColor: "#8B0000",
                                borderRadius: "15px 15px 0 0"
                            }}
                        >

                            <h5 className="mb-0 fw-bold">
                                Orders Ready for Delivery
                            </h5>

                            <button
                                className="btn btn-light btn-sm"
                                onClick={loadOrders}
                            >
                                🔄 Refresh
                            </button>

                        </div>


                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead>

                                    <tr>

                                        <th className="px-4">
                                            Order
                                        </th>

                                        <th>
                                            Customer
                                        </th>

                                        <th>
                                            Phone
                                        </th>

                                        <th>
                                            Address
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Payment
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {loading ? (

                                        <tr>

                                            <td
                                                colSpan="8"
                                                className="text-center py-5"
                                            >

                                                <div
                                                    className="spinner-border"
                                                    style={{
                                                        color: "#8B0000"
                                                    }}
                                                ></div>

                                                <div className="mt-2 text-muted">
                                                    Loading deliveries...
                                                </div>

                                            </td>

                                        </tr>

                                    ) : orders.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="8"
                                                className="text-center py-5"
                                            >

                                                <div
                                                    style={{
                                                        fontSize: "45px"
                                                    }}
                                                >
                                                    📦
                                                </div>

                                                <h5 className="fw-bold mt-2">
                                                    No Deliveries
                                                </h5>

                                                <p className="text-muted">
                                                    There are currently no orders
                                                    ready for delivery.
                                                </p>

                                            </td>

                                        </tr>

                                    ) : (

                                        orders.map((order) => {

                                            const payment =
                                                payments[order.id];

                                            const isPaid =
                                                payment?.paymentStatus ===
                                                "PAID";

                                            const isProcessing =
                                                processing === order.id;

                                            return (

                                                <tr key={order.id}>

                                                    <td className="px-4">

                                                        <strong>
                                                            #{order.id}
                                                        </strong>

                                                    </td>


                                                    <td>

                                                        {order.user?.fullName ||
                                                            "N/A"}

                                                    </td>


                                                    <td>

                                                        {order.user?.phone ||
                                                            "N/A"}

                                                    </td>


                                                    <td>

                                                        {order.user?.address ||
                                                            "N/A"}

                                                    </td>


                                                    <td>

                                                        <strong>
                                                            TZS{" "}
                                                            {Number(
                                                                order.totalAmount
                                                            ).toLocaleString()}
                                                        </strong>

                                                    </td>


                                                    <td>

                                                        {isPaid ? (

                                                            <span className="badge bg-success">
                                                                PAID
                                                            </span>

                                                        ) : (

                                                            <span className="badge bg-warning text-dark">
                                                                PENDING
                                                            </span>

                                                        )}

                                                    </td>


                                                    <td>

                                                        <span className="badge bg-primary">
                                                            ON DELIVERY
                                                        </span>

                                                    </td>


                                                    <td>

                                                        <div className="d-flex gap-2">

                                                            {!isPaid && (

                                                                <button
                                                                    className="btn btn-warning btn-sm"
                                                                    disabled={
                                                                        isProcessing
                                                                    }
                                                                    onClick={() =>
                                                                        handleConfirmCash(
                                                                            order.id
                                                                        )
                                                                    }
                                                                >

                                                                    {isProcessing
                                                                        ? "Processing..."
                                                                        : "💵 Confirm Cash"}

                                                                </button>

                                                            )}


                                                            {isPaid && (

                                                                <button
                                                                    className="btn btn-success btn-sm"
                                                                    disabled={
                                                                        isProcessing
                                                                    }
                                                                    onClick={() =>
                                                                        handleMarkDelivered(
                                                                            order.id
                                                                        )
                                                                    }
                                                                >

                                                                    {isProcessing
                                                                        ? "Processing..."
                                                                        : "✓ Mark Delivered"}

                                                                </button>

                                                            )}

                                                        </div>

                                                    </td>

                                                </tr>

                                            );

                                        })

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default DeliveryDashboard;