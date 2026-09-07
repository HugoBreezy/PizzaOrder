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

    const handleUpdate = async (id) => {

        try {

            await updateOrderStatus(
                id,
                selectedStatus[id]
            );

            toast.success("Order status updated successfully!");

            loadOrders();

        } catch (error) {

            console.log(error);

            toast.error("Failed to update order status.");

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this order?"
        );

        if (!confirmDelete) return;

        try {

            await deleteOrder(id);

            toast.success("Order deleted successfully!");

            loadOrders();

        }
        catch (error) {

    console.log(error);

    const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "";

    if (message.includes("Delivered")) {

        toast.warning(message);

    }

    else if (message.includes("Paid")) {

        toast.warning(message);

    }

    else {

        toast.error(message || "Failed to delete order.");

    }

}

    };

    return (

        <div
            className="d-flex"
            style={{
                minHeight: "100vh",
                backgroundColor: "#F8F4F0",
            }}
        >

            <AdminSidebar />

            <div className="flex-grow-1">

                <AdminTopbar />

                <div className="container-fluid p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h2
                            className="fw-bold"
                            style={{
                                color: "#8B0000",
                            }}
                        >
                            Manage Orders
                        </h2>

                    </div>

                    <div className="card shadow border-0">

                        <div
                            className="card-header text-white"
                            style={{
                                backgroundColor: "#8B0000",
                            }}
                        >

                            <h5 className="mb-0">
                                Orders List
                            </h5>

                        </div>

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead>

                                    <tr>

                                        <th>ID</th>
                                        <th>Customer</th>
                                        <th>Pizza</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {orders.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="8"
                                                className="text-center fw-bold"
                                            >
                                                No Orders Found
                                            </td>

                                        </tr>

                                    ) : (                                        orders.map((order) => (

                                            <tr key={order.id}>

                                                <td>{order.id}</td>

                                                <td>
                                                    {order.user?.fullName}
                                                </td>

                                                <td>

                                                    {order.orderItems?.map((item) => (

                                                        <div key={item.id}>
                                                            {item.pizza?.pizzaName}
                                                        </div>

                                                    ))}

                                                </td>

                                                <td>

                                                    {order.orderItems?.map((item) => (

                                                        <div key={item.id}>
                                                            {item.quantity}
                                                        </div>

                                                    ))}

                                                </td>

                                                <td>

                                                    TZS {Number(order.totalAmount).toLocaleString()}

                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${
                                                            order.status === "PENDING"
                                                                ? "bg-warning text-dark"
                                                                : order.status === "PREPARING"
                                                                ? "bg-primary"
                                                                : order.status === "ON_DELIVERY"
                                                                ? "bg-info text-dark"
                                                                : "bg-success"
                                                        }`}
                                                    >

                                                        {order.status}

                                                    </span>

                                                </td>

                                                <td>

                                                    {new Date(order.orderDate).toLocaleString()}

                                                </td>

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={selectedStatus[order.id] || order.status}
                                                            onChange={(e) =>
                                                                setSelectedStatus({
                                                                    ...selectedStatus,
                                                                    [order.id]: e.target.value,
                                                                })
                                                            }
                                                        >

                                                            <option value="PENDING">PENDING</option>
                                                            <option value="PREPARING">PREPARING</option>
                                                            <option value="ON_DELIVERY">ON DELIVERY</option>
                                                            <option value="DELIVERED">DELIVERED</option>

                                                        </select>

                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            onClick={() =>
                                                                handleUpdate(order.id)
                                                            }
                                                        >

                                                            Update

                                                        </button>

                                                       {order.status === "DELIVERED" ? (
                                                        <button
                                                            className="btn btn-secondary btn-sm"
                                                            disabled
                                                        >
                                                            Completed
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDelete(order.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    )}

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>

                        <div className="d-flex justify-content-between align-items-center p-3">

                            <button
                                className="btn btn-outline-secondary"
                                disabled={page === 0}
                                onClick={() => setPage(page - 1)}
                            >

                                Previous

                            </button>

                            <div>

                                {[...Array(totalPages)].map((_, index) => (

                                    <button
                                        key={index}
                                        className={`btn mx-1 ${
                                            page === index
                                                ? "btn-danger"
                                                : "btn-outline-danger"
                                        }`}
                                        onClick={() => setPage(index)}
                                    >

                                        {index + 1}

                                    </button>

                                ))}

                            </div>

                            <button
                                className="btn btn-outline-secondary"
                                disabled={page === totalPages - 1 || totalPages === 0}
                                onClick={() => setPage(page + 1)}
                            >

                                Next

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminOrders;