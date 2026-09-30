import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";

import {
    getOrdersPage,
    updateOrderStatus,
    deleteOrder,
} from "../services/api";

function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        loadOrders();
    }, [page]);

    // =========================
    // LOAD ORDERS
    // =========================

    const loadOrders = async () => {

        try {

            const response = await getOrdersPage(page);

            setOrders(response.data.content);
            setTotalPages(response.data.totalPages);

            const statusMap = {};

            response.data.content.forEach((order) => {
                statusMap[order.id] = order.status;
            });

            setSelectedStatus(statusMap);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load orders.");

        }
    };

    // =========================
    // UPDATE ORDER STATUS
    // =========================

    const handleUpdate = async (id) => {

        try {

            await updateOrderStatus(
                id,
                selectedStatus[id]
            );

            toast.success(
                "Order status updated successfully!"
            );

            loadOrders();

        } catch (error) {

            console.log(error);

            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "";

            toast.error(
                message || "Failed to update order status."
            );
        }
    };

    // =========================
    // DELETE ORDER
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this order?"
        );

        if (!confirmDelete) return;

        try {

            await deleteOrder(id);

            toast.success(
                "Order deleted successfully!"
            );

            loadOrders();

        } catch (error) {

            console.log(error);

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.response?.data ||
                "";

            if (message.includes("Delivered")) {

                toast.warning(message);

            } else if (message.includes("Paid")) {

                toast.warning(message);

            } else {

                toast.error(
                    message || "Failed to delete order."
                );
            }
        }
    };

    // =========================
    // STATUS STYLE
    // =========================

    const getStatusStyle = (status) => {

        switch (status) {

            case "PENDING":

                return {
                    background: "#fff3cd",
                    color: "#856404",
                };

            case "PREPARING":

                return {
                    background: "#e7f1ff",
                    color: "#0d6efd",
                };

            case "ON_DELIVERY":

                return {
                    background: "#cff4fc",
                    color: "#087990",
                };

            case "DELIVERED":

                return {
                    background: "#d1e7dd",
                    color: "#146c43",
                };

            default:

                return {
                    background: "#e9ecef",
                    color: "#495057",
                };
        }
    };

    // =========================
    // CUSTOMER INITIAL
    // =========================

    const getCustomerInitial = (name) => {

        if (!name) return "U";

        return name
            .charAt(0)
            .toUpperCase();
    };

    // =========================
    // TOTAL QUANTITY
    // =========================

    const getTotalQuantity = (order) => {

        return order.orderItems?.reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        ) || 0;
    };

    return (

        <div
            className="d-flex"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #faf7f4 0%, #f5eeee 50%, #fafafa 100%)",
            }}
        >

            {/* ================= SIDEBAR ================= */}

            <AdminSidebar />


            {/* ================= MAIN CONTENT ================= */}

            <div
                className="flex-grow-1"
                style={{
                    minWidth: 0,
                }}
            >

                <AdminTopbar />


                <main className="container-fluid px-4 py-4">

                    {/* ================= PAGE HEADER ================= */}

                    <div
                        className="d-flex justify-content-between align-items-center mb-4"
                    >

                        <div>

                            <h2
                                className="fw-bold mb-1"
                                style={{
                                    color: "#8B0000",
                                    letterSpacing: "-0.5px",
                                }}
                            >
                                Manage Orders
                            </h2>

                            <p className="text-muted mb-0">
                                View and manage customer orders
                            </p>

                        </div>


                        <div
                            className="d-none d-md-flex align-items-center px-3 py-2"
                            style={{
                                background: "#ffffff",
                                borderRadius: "12px",
                                boxShadow:
                                    "0 5px 20px rgba(0,0,0,0.06)",
                                fontSize: "14px",
                                color: "#666",
                            }}
                        >

                            <i
                                className="bi bi-bag-check-fill me-2"
                                style={{
                                    color: "#8B0000",
                                }}
                            ></i>

                            {orders.length} Orders

                        </div>

                    </div>


                    {/* ================= ORDERS CARD ================= */}

                    <div
                        className="card border-0"
                        style={{
                            borderRadius: "20px",
                            overflow: "hidden",
                            background: "#ffffff",
                            boxShadow:
                                "0 8px 30px rgba(0,0,0,0.07)",
                        }}
                    >

                        {/* ================= HEADER ================= */}

                        <div
                            className="px-4 py-3 d-flex justify-content-between align-items-center"
                            style={{
                                borderBottom:
                                    "1px solid #eeeeee",
                            }}
                        >

                            <div>

                                <h5
                                    className="fw-bold mb-1"
                                    style={{
                                        color: "#222",
                                    }}
                                >
                                    Orders List
                                </h5>

                                <small className="text-muted">
                                    Manage customer orders and delivery status
                                </small>

                            </div>


                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "12px",
                                    background: "#fff1f1",
                                    color: "#8B0000",
                                }}
                            >

                                <i className="bi bi-receipt-cutoff fs-5"></i>

                            </div>

                        </div>


                        {/* ================= TABLE ================= */}

                        <div className="table-responsive">

                            <table
                                className="table align-middle mb-0"
                                style={{
                                    minWidth: "1050px",
                                }}
                            >

                                <thead
                                    style={{
                                        background: "#fafafa",
                                    }}
                                >

                                    <tr>

                                        <th
                                            className="px-4 py-3 text-muted"
                                            style={{
                                                fontSize: "12px",
                                                letterSpacing: "0.5px",
                                            }}
                                        >
                                            ORDER
                                        </th>

                                        <th
                                            className="py-3 text-muted"
                                            style={{
                                                fontSize: "12px",
                                                letterSpacing: "0.5px",
                                            }}
                                        >
                                            CUSTOMER
                                        </th>

                                        <th
                                            className="py-3 text-muted"
                                            style={{
                                                fontSize: "12px",
                                                letterSpacing: "0.5px",
                                            }}
                                        >
                                            PIZZA
                                        </th>

                                        <th
                                            className="py-3 text-muted"
                                            style={{
                                                fontSize: "12px",
                                                letterSpacing: "0.5px",
                                            }}
                                        >
                                            QTY
                                        </th>

                                        <th
                                            className="py-3 text-muted"
                                            style={{
                                                fontSize: "12px",
                                                letterSpacing: "0.5px",
                                            }}
                                        >
                                            TOTAL
                                        </th>

                                        <th
                                            className="py-3 text-muted"
                                            style={{
                                                fontSize: "12px",
                                                letterSpacing: "0.5px",
                                            }}
                                        >
                                            STATUS
                                        </th>

                                        <th
                                            className="py-3 text-muted"
                                            style={{
                                                fontSize: "12px",
                                                letterSpacing: "0.5px",
                                            }}
                                        >
                                            DATE
                                        </th>

                                        <th
                                            className="py-3 text-muted"
                                            style={{
                                                fontSize: "12px",
                                                letterSpacing: "0.5px",
                                            }}
                                        >
                                            ACTION
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {orders.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="8"
                                                className="text-center py-5"
                                            >

                                                <i
                                                    className="bi bi-inbox"
                                                    style={{
                                                        fontSize: "40px",
                                                        color: "#ccc",
                                                    }}
                                                ></i>

                                                <p className="text-muted mt-2 mb-0">
                                                    No Orders Found
                                                </p>

                                            </td>

                                        </tr>

                                    ) : (

                                        orders.map((order) => {

                                            const customerName =
                                                order.user?.fullName ||
                                                "Unknown Customer";

                                            const customerPhone =
                                                order.user?.phone ||
                                                "No phone number";

                                            const statusStyle =
                                                getStatusStyle(
                                                    order.status
                                                );

                                            const isDelivered =
                                                order.status ===
                                                "DELIVERED";

                                            return (

                                                <tr key={order.id}>

                                                    {/* ================= ORDER ================= */}

                                                    <td className="px-4">

                                                        <div
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            style={{
                                                                width: "42px",
                                                                height: "36px",
                                                                borderRadius: "9px",
                                                                background:
                                                                    "#fff1f1",
                                                                color:
                                                                    "#8B0000",
                                                                fontWeight:
                                                                    "700",
                                                                fontSize:
                                                                    "13px",
                                                            }}
                                                        >

                                                            #{order.id}

                                                        </div>

                                                    </td>


                                                    {/* ================= CUSTOMER ================= */}

                                                    <td>

                                                        <div className="d-flex align-items-center">

                                                            <div
                                                                className="d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                                                                style={{
                                                                    width: "36px",
                                                                    height: "36px",
                                                                    borderRadius:
                                                                        "50%",
                                                                    background:
                                                                        "linear-gradient(135deg, #8B0000, #c0392b)",
                                                                    color:
                                                                        "#fff",
                                                                    fontWeight:
                                                                        "700",
                                                                }}
                                                            >

                                                                {getCustomerInitial(
                                                                    customerName
                                                                )}

                                                            </div>


                                                            <div>

                                                                <div
                                                                    className="fw-semibold"
                                                                    style={{
                                                                        color:
                                                                            "#222",
                                                                        fontSize:
                                                                            "14px",
                                                                    }}
                                                                >

                                                                    {
                                                                        customerName
                                                                    }

                                                                </div>

                                                                {/* PHONE NUMBER */}

                                                                <small
                                                                    className="text-muted"
                                                                    style={{
                                                                        fontSize:
                                                                            "12px",
                                                                    }}
                                                                >

                                                                    <i className="bi bi-telephone me-1"></i>

                                                                    {
                                                                        customerPhone
                                                                    }

                                                                </small>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* ================= PIZZA ================= */}

                                                    <td>

                                                        <div
                                                            style={{
                                                                minWidth:
                                                                    "170px",
                                                            }}
                                                        >

                                                            {order.orderItems?.map(
                                                                (item) => (

                                                                    <div
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        className="d-flex align-items-center"
                                                                        style={{
                                                                            lineHeight:
                                                                                "20px",
                                                                        }}
                                                                    >

                                                                        <i
                                                                            className="bi bi-circle-fill me-2"
                                                                            style={{
                                                                                fontSize:
                                                                                    "5px",
                                                                                color:
                                                                                    "#8B0000",
                                                                            }}
                                                                        ></i>

                                                                        <span
                                                                            style={{
                                                                                fontSize:
                                                                                    "13px",
                                                                            }}
                                                                        >

                                                                            {
                                                                                item
                                                                                    .pizza
                                                                                    ?.pizzaName
                                                                            }

                                                                        </span>

                                                                        <span
                                                                            className="ms-2 text-muted"
                                                                            style={{
                                                                                fontSize:
                                                                                    "12px",
                                                                            }}
                                                                        >

                                                                            ×{" "}
                                                                            {
                                                                                item.quantity
                                                                            }

                                                                        </span>

                                                                    </div>

                                                                )
                                                            )}

                                                        </div>

                                                    </td>


                                                    {/* ================= QTY ================= */}

                                                    <td>

                                                        <div
                                                            className="d-flex align-items-center justify-content-center"
                                                            style={{
                                                                width: "34px",
                                                                height: "30px",
                                                                borderRadius:
                                                                    "8px",
                                                                background:
                                                                    "#f5f5f5",
                                                                fontWeight:
                                                                    "700",
                                                                fontSize:
                                                                    "13px",
                                                            }}
                                                        >

                                                            {
                                                                getTotalQuantity(
                                                                    order
                                                                )
                                                            }

                                                        </div>

                                                    </td>


                                                    {/* ================= TOTAL ================= */}

                                                    <td>

                                                        <span
                                                            className="fw-bold"
                                                            style={{
                                                                color:
                                                                    "#222",
                                                                whiteSpace:
                                                                    "nowrap",
                                                                fontSize:
                                                                    "13px",
                                                            }}
                                                        >

                                                            TZS{" "}
                                                            {Number(
                                                                order.totalAmount ||
                                                                    0
                                                            ).toLocaleString()}

                                                        </span>

                                                    </td>


                                                    {/* ================= STATUS ================= */}

                                                    <td>

                                                        <span
                                                            className="badge"
                                                            style={{
                                                                background:
                                                                    statusStyle.background,
                                                                color:
                                                                    statusStyle.color,
                                                                padding:
                                                                    "6px 10px",
                                                                borderRadius:
                                                                    "20px",
                                                                fontSize:
                                                                    "10px",
                                                                fontWeight:
                                                                    "700",
                                                            }}
                                                        >

                                                            {order.status}

                                                        </span>

                                                    </td>


                                                    {/* ================= DATE ================= */}

                                                    <td>

                                                        <div
                                                            style={{
                                                                whiteSpace:
                                                                    "nowrap",
                                                            }}
                                                        >

                                                            <div
                                                                className="fw-semibold"
                                                                style={{
                                                                    fontSize:
                                                                        "12px",
                                                                }}
                                                            >

                                                                {new Date(
                                                                    order.orderDate
                                                                ).toLocaleDateString()}

                                                            </div>

                                                            <small
                                                                className="text-muted"
                                                                style={{
                                                                    fontSize:
                                                                        "11px",
                                                                }}
                                                            >

                                                                {new Date(
                                                                    order.orderDate
                                                                ).toLocaleTimeString(
                                                                    [],
                                                                    {
                                                                        hour:
                                                                            "2-digit",
                                                                        minute:
                                                                            "2-digit",
                                                                    }
                                                                )}

                                                            </small>

                                                        </div>

                                                    </td>


                                                    {/* ================= ACTION ================= */}

                                                    <td>

                                                        <div
                                                            className="d-flex align-items-center gap-1"
                                                            style={{
                                                                minWidth:
                                                                    "285px",
                                                            }}
                                                        >

                                                            {/* ================= STATUS DROPDOWN ================= */}

                                                            <select
                                                                className="form-select form-select-sm"
                                                                disabled={
                                                                    isDelivered
                                                                }
                                                                value={
                                                                    selectedStatus[
                                                                        order.id
                                                                    ] ||
                                                                    order.status
                                                                }
                                                                onChange={(e) =>
                                                                    setSelectedStatus(
                                                                        {
                                                                            ...selectedStatus,
                                                                            [order.id]:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        }
                                                                    )
                                                                }
                                                                style={{
                                                                    width:
                                                                        "115px",
                                                                    height:
                                                                        "34px",
                                                                    borderRadius:
                                                                        "8px",
                                                                    fontSize:
                                                                        "11px",
                                                                    padding:
                                                                        "4px 7px",
                                                                    cursor:
                                                                        isDelivered
                                                                            ? "not-allowed"
                                                                            : "pointer",
                                                                    background:
                                                                        isDelivered
                                                                            ? "#f1f3f5"
                                                                            : "#fff",
                                                                }}
                                                            >

                                                                {/* ADMIN CAN ONLY MOVE TO THESE STATES */}

                                                                <option value="PENDING">
                                                                    PENDING
                                                                </option>

                                                                <option value="PREPARING">
                                                                    PREPARING
                                                                </option>

                                                                <option value="ON_DELIVERY">
                                                                    ON DELIVERY
                                                                </option>

                                                            </select>


                                                            {/* ================= UPDATE ================= */}

                                                            <button
                                                                className="btn btn-sm"
                                                                disabled={
                                                                    isDelivered
                                                                }
                                                                onClick={() =>
                                                                    handleUpdate(
                                                                        order.id
                                                                    )
                                                                }
                                                                style={{
                                                                    background:
                                                                        isDelivered
                                                                            ? "#d8dee3"
                                                                            : "#198754",
                                                                    color:
                                                                        isDelivered
                                                                            ? "#7b858e"
                                                                            : "#fff",
                                                                    borderRadius:
                                                                        "8px",
                                                                    border:
                                                                        "none",
                                                                    height:
                                                                        "34px",
                                                                    padding:
                                                                        "4px 10px",
                                                                    fontWeight:
                                                                        "600",
                                                                    fontSize:
                                                                        "11px",
                                                                }}
                                                            >

                                                                <i className="bi bi-check2 me-1"></i>

                                                                Update

                                                            </button>


                                                            {/* ================= COMPLETED / DELETE ================= */}

                                                            {isDelivered ? (

                                                                <button
                                                                    className="btn btn-sm"
                                                                    disabled
                                                                    style={{
                                                                        background:
                                                                            "#e9ecef",
                                                                        color:
                                                                            "#8a939b",
                                                                        borderRadius:
                                                                            "8px",
                                                                        border:
                                                                            "none",
                                                                        height:
                                                                            "34px",
                                                                        padding:
                                                                            "4px 10px",
                                                                        fontWeight:
                                                                            "600",
                                                                        fontSize:
                                                                            "11px",
                                                                    }}
                                                                >

                                                                    <i className="bi bi-check-circle me-1"></i>

                                                                    Completed

                                                                </button>

                                                            ) : (

                                                                <button
                                                                    className="btn btn-sm"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            order.id
                                                                        )
                                                                    }
                                                                    style={{
                                                                        background:
                                                                            "#dc3545",
                                                                        color:
                                                                            "#fff",
                                                                        borderRadius:
                                                                            "8px",
                                                                        border:
                                                                            "none",
                                                                        height:
                                                                            "34px",
                                                                        padding:
                                                                            "4px 10px",
                                                                        fontWeight:
                                                                            "600",
                                                                        fontSize:
                                                                            "11px",
                                                                    }}
                                                                >

                                                                    <i className="bi bi-trash3 me-1"></i>

                                                                    Delete

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


                        {/* ================= PAGINATION ================= */}

                        <div
                            className="d-flex justify-content-between align-items-center px-4 py-3"
                            style={{
                                borderTop:
                                    "1px solid #eeeeee",
                            }}
                        >

                            <button
                                className="btn btn-sm"
                                disabled={page === 0}
                                onClick={() =>
                                    setPage(page - 1)
                                }
                                style={{
                                    border:
                                        "1px solid #ddd",
                                    borderRadius:
                                        "8px",
                                    background:
                                        "#fff",
                                    color:
                                        "#555",
                                    padding:
                                        "7px 13px",
                                    fontSize:
                                        "12px",
                                }}
                            >

                                <i className="bi bi-chevron-left me-1"></i>

                                Previous

                            </button>


                            <div className="d-flex align-items-center">

                                {[...Array(totalPages)].map(
                                    (_, index) => (

                                        <button
                                            key={index}
                                            onClick={() =>
                                                setPage(index)
                                            }
                                            className="btn btn-sm mx-1"
                                            style={{
                                                width: "34px",
                                                height: "34px",
                                                borderRadius:
                                                    "8px",
                                                border:
                                                    page === index
                                                        ? "none"
                                                        : "1px solid #ddd",
                                                background:
                                                    page === index
                                                        ? "#8B0000"
                                                        : "#fff",
                                                color:
                                                    page === index
                                                        ? "#fff"
                                                        : "#555",
                                                fontWeight:
                                                    "600",
                                                fontSize:
                                                    "12px",
                                            }}
                                        >

                                            {index + 1}

                                        </button>

                                    )
                                )}

                            </div>


                            <button
                                className="btn btn-sm"
                                disabled={
                                    page === totalPages - 1 ||
                                    totalPages === 0
                                }
                                onClick={() =>
                                    setPage(page + 1)
                                }
                                style={{
                                    border:
                                        "1px solid #ddd",
                                    borderRadius:
                                        "8px",
                                    background:
                                        "#fff",
                                    color:
                                        "#555",
                                    padding:
                                        "7px 13px",
                                    fontSize:
                                        "12px",
                                }}
                            >

                                Next

                                <i className="bi bi-chevron-right ms-1"></i>

                            </button>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default AdminOrders;