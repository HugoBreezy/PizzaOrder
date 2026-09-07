import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import {
    getAllPayments,
    confirmPayment,
} from "../services/api";

function AdminPayments() {

    const [payments, setPayments] = useState([]);

    useEffect(() => {

        loadPayments();

    }, []);

    const loadPayments = async () => {

        try {

            const response = await getAllPayments();

            setPayments(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load payments.");

        }

    };

    const handleConfirm = async (orderId) => {

        try {

            await confirmPayment(orderId);

            toast.success("Payment confirmed successfully!");

            loadPayments();

        } catch (error) {

            console.log(error);

            toast.error("Failed to confirm payment.");

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

                    <h2
                        className="fw-bold mb-4"
                        style={{
                            color: "#8B0000",
                        }}
                    >
                        Confirm Payments
                    </h2>

                    <div className="card shadow border-0">

                        <div
                            className="card-header text-white"
                            style={{
                                backgroundColor: "#8B0000",
                            }}
                        >

                            <h5 className="mb-0">

                                Payments List

                            </h5>

                        </div>

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead>

                                    <tr>

                                        <th>ID</th>
                                        <th>Customer</th>
                                        <th>Amount</th>
                                        <th>Method</th>
                                        <th>Status</th>
                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {payments.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center fw-bold"
                                            >
                                                No Payments Found
                                            </td>

                                        </tr>

                                    ) : (

                                        payments.map((payment) => (

                                            <tr key={payment.id}>

                                                <td>

                                                    #{payment.order?.id}

                                                </td>

                                                <td>

                                                    {payment.order?.user?.fullName}

                                                </td>

                                                <td>

                                                    TZS {Number(payment.amount).toLocaleString()}

                                                </td>

                                                <td>

                                                    {payment.paymentMethod}

                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${
                                                            payment.paymentStatus === "PAID"
                                                                ? "bg-success"
                                                                : "bg-warning text-dark"
                                                        }`}
                                                    >

                                                        {payment.paymentStatus}

                                                    </span>

                                                </td>

                                                <td>

                                                    {payment.paymentStatus === "PAID" ? (

                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            disabled
                                                        >

                                                            Paid

                                                        </button>

                                                    ) : (

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                handleConfirm(
                                                                    payment.order.id
                                                                )
                                                            }
                                                        >

                                                            Confirm Payment

                                                        </button>

                                                    )}

                                                </td>

                                            </tr>

                                        ))

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

export default AdminPayments;