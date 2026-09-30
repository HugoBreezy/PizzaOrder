import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";

import {
    createDeliveryGuy,
    getDeliveryGuys,
    activateCustomer,
    deactivateCustomer,
} from "../services/api";

function AdminDeliveryGuys() {

    const [deliveryGuys, setDeliveryGuys] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [search, setSearch] = useState("");

    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        address: "",
        password: "",
    });

    // ==========================
    // LOAD DELIVERY GUYS
    // ==========================

    useEffect(() => {

        loadDeliveryGuys();

    }, []);

    const loadDeliveryGuys = async () => {

        try {

            setLoading(true);

            const response = await getDeliveryGuys();

            setDeliveryGuys(response.data || []);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load delivery guys.");

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // FORM CHANGE
    // ==========================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    // ==========================
    // CREATE DELIVERY GUY
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !form.fullName ||
            !form.email ||
            !form.phone ||
            !form.password
        ) {

            toast.error("Please fill all required fields.");

            return;

        }

        try {

            setSaving(true);

            await createDeliveryGuy(form);

            toast.success(
                "Delivery Guy created successfully!"
            );

            setForm({
                fullName: "",
                email: "",
                phone: "",
                gender: "",
                address: "",
                password: "",
            });

            setShowModal(false);

            loadDeliveryGuys();

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data ||
                "Failed to create delivery guy."
            );

        } finally {

            setSaving(false);

        }

    };

    // ==========================
    // ACTIVATE / DEACTIVATE
    // ==========================

    const handleStatusChange = async (user) => {

        try {

            if (user.status === "ACTIVE") {

                await deactivateCustomer(user.id);

                toast.success(
                    "Delivery Guy deactivated successfully."
                );

            } else {

                await activateCustomer(user.id);

                toast.success(
                    "Delivery Guy activated successfully."
                );

            }

            loadDeliveryGuys();

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to update delivery guy status."
            );

        }

    };

    // ==========================
    // SEARCH
    // ==========================

    const filteredDeliveryGuys = deliveryGuys.filter((user) => {

        const searchValue = search.toLowerCase();

        return (
            user.fullName?.toLowerCase().includes(searchValue) ||
            user.email?.toLowerCase().includes(searchValue) ||
            user.phone?.toLowerCase().includes(searchValue)
        );

    });

    return (

        <div
            className="d-flex"
            style={{
                minHeight: "100vh",
                backgroundColor: "#F8F4F0",
            }}
        >

            {/* ==========================
                SIDEBAR
            ========================== */}

            <AdminSidebar />


            {/* ==========================
                MAIN CONTENT
            ========================== */}

            <div className="flex-grow-1">

                <AdminTopbar />


                <div className="container-fluid p-4">

                    {/* ==========================
                        PAGE HEADER
                    ========================== */}

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h2
                                className="fw-bold mb-1"
                                style={{
                                    color: "#8B0000",
                                }}
                            >
                                Manage Delivery Guys
                            </h2>

                            <p className="text-muted mb-0">
                                Create and manage delivery staff accounts
                            </p>

                        </div>


                        <button
                            className="btn text-white"
                            onClick={() => setShowModal(true)}
                            style={{
                                backgroundColor: "#8B0000",
                                borderRadius: "8px",
                                padding: "10px 18px",
                                fontWeight: "600",
                            }}
                        >

                            <i className="bi bi-person-plus-fill me-2"></i>

                            Add Delivery Guy

                        </button>

                    </div>


                    {/* ==========================
                        STATISTICS
                    ========================== */}

                    <div className="row g-4 mb-4">

                        {/* TOTAL */}

                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <p className="text-muted mb-2">
                                                Total Delivery Guys
                                            </p>

                                            <h2 className="fw-bold mb-0">
                                                {deliveryGuys.length}
                                            </h2>

                                        </div>

                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "55px",
                                                height: "55px",
                                                borderRadius: "12px",
                                                backgroundColor: "#F8EAEA",
                                                color: "#8B0000",
                                                fontSize: "24px",
                                            }}
                                        >

                                            <i className="bi bi-bicycle"></i>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ACTIVE */}

                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <p className="text-muted mb-2">
                                                Active
                                            </p>

                                            <h2 className="fw-bold text-success mb-0">

                                                {
                                                    deliveryGuys.filter(
                                                        (user) =>
                                                            user.status === "ACTIVE"
                                                    ).length
                                                }

                                            </h2>

                                        </div>

                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "55px",
                                                height: "55px",
                                                borderRadius: "12px",
                                                backgroundColor: "#EAF7EF",
                                                color: "#198754",
                                                fontSize: "24px",
                                            }}
                                        >

                                            <i className="bi bi-person-check-fill"></i>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* INACTIVE */}

                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <p className="text-muted mb-2">
                                                Inactive
                                            </p>

                                            <h2 className="fw-bold text-danger mb-0">

                                                {
                                                    deliveryGuys.filter(
                                                        (user) =>
                                                            user.status === "INACTIVE"
                                                    ).length
                                                }

                                            </h2>

                                        </div>

                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "55px",
                                                height: "55px",
                                                borderRadius: "12px",
                                                backgroundColor: "#FDEAEA",
                                                color: "#DC3545",
                                                fontSize: "24px",
                                            }}
                                        >

                                            <i className="bi bi-person-x-fill"></i>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ==========================
                        SEARCH
                    ========================== */}

                    <div className="card shadow-sm border-0 mb-4">

                        <div className="card-body">

                            <div className="input-group">

                                <span className="input-group-text bg-white">

                                    <i className="bi bi-search"></i>

                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by name, email or phone..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                    </div>


                    {/* ==========================
                        DELIVERY GUYS LIST
                    ========================== */}

                    <div className="card shadow border-0">

                        <div
                            className="card-header text-white"
                            style={{
                                backgroundColor: "#8B0000",
                            }}
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <h5 className="mb-0">
                                    Delivery Guys List
                                </h5>

                                <span>
                                    {filteredDeliveryGuys.length} Staff
                                </span>

                            </div>

                        </div>


                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Delivery Guy</th>

                                        <th>Phone</th>

                                        <th>Gender</th>

                                        <th>Address</th>

                                        <th>Status</th>

                                        <th>Action</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {loading ? (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="text-center py-5"
                                            >

                                                <div
                                                    className="spinner-border"
                                                    style={{
                                                        color: "#8B0000",
                                                    }}
                                                ></div>

                                                <div className="mt-2">
                                                    Loading Delivery Guys...
                                                </div>

                                            </td>

                                        </tr>

                                    ) : filteredDeliveryGuys.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="text-center py-5"
                                            >

                                                <i
                                                    className="bi bi-bicycle"
                                                    style={{
                                                        fontSize: "40px",
                                                        color: "#ccc",
                                                    }}
                                                ></i>

                                                <div className="fw-bold mt-2">
                                                    No Delivery Guys Found
                                                </div>

                                                <div className="text-muted">
                                                    Add a delivery guy to get started.
                                                </div>

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredDeliveryGuys.map((user) => (

                                            <tr key={user.id}>

                                                <td>
                                                    #{user.id}
                                                </td>


                                                <td>

                                                    <div className="d-flex align-items-center">

                                                        <div
                                                            className="d-flex justify-content-center align-items-center me-3"
                                                            style={{
                                                                width: "42px",
                                                                height: "42px",
                                                                borderRadius: "50%",
                                                                backgroundColor: "#F8EAEA",
                                                                color: "#8B0000",
                                                                fontWeight: "bold",
                                                            }}
                                                        >

                                                            {user.fullName
                                                                ?.charAt(0)
                                                                ?.toUpperCase()}

                                                        </div>


                                                        <div>

                                                            <div className="fw-bold">
                                                                {user.fullName}
                                                            </div>

                                                            <small className="text-muted">
                                                                {user.email}
                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>


                                                <td>
                                                    {user.phone || "-"}
                                                </td>


                                                <td>
                                                    {user.gender || "-"}
                                                </td>


                                                <td>
                                                    {user.address || "-"}
                                                </td>


                                                <td>

                                                    <span
                                                        className={`badge ${
                                                            user.status === "ACTIVE"
                                                                ? "bg-success"
                                                                : "bg-danger"
                                                        }`}
                                                    >

                                                        {user.status}

                                                    </span>

                                                </td>


                                                <td>

                                                    <button
                                                        className={`btn btn-sm ${
                                                            user.status === "ACTIVE"
                                                                ? "btn-outline-danger"
                                                                : "btn-outline-success"
                                                        }`}
                                                        onClick={() =>
                                                            handleStatusChange(user)
                                                        }
                                                    >

                                                        <i
                                                            className={`bi ${
                                                                user.status === "ACTIVE"
                                                                    ? "bi-person-dash"
                                                                    : "bi-person-check"
                                                            } me-1`}
                                                        ></i>

                                                        {user.status === "ACTIVE"
                                                            ? "Deactivate"
                                                            : "Activate"}

                                                    </button>

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


            {/* ==========================
                ADD DELIVERY GUY MODAL
            ========================== */}

            {showModal && (

                <div
                    className="modal d-block"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.55)",
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">

                            <div
                                className="modal-header text-white"
                                style={{
                                    backgroundColor: "#8B0000",
                                }}
                            >

                                <h5 className="modal-title">
                                    Add Delivery Guy
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                ></button>

                            </div>


                            <form onSubmit={handleSubmit}>

                                <div className="modal-body">

                                    <div className="row g-3">

                                        <div className="col-12">

                                            <label className="form-label fw-semibold">
                                                Full Name
                                            </label>

                                            <input
                                                type="text"
                                                name="fullName"
                                                className="form-control"
                                                value={form.fullName}
                                                onChange={handleChange}
                                                placeholder="Enter full name"
                                                required
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label className="form-label fw-semibold">
                                                Email
                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                required
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label className="form-label fw-semibold">
                                                Phone
                                            </label>

                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="Phone"
                                                required
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label className="form-label fw-semibold">
                                                Gender
                                            </label>

                                            <select
                                                name="gender"
                                                className="form-select"
                                                value={form.gender}
                                                onChange={handleChange}
                                            >

                                                <option value="">
                                                    Select Gender
                                                </option>

                                                <option value="MALE">
                                                    Male
                                                </option>

                                                <option value="FEMALE">
                                                    Female
                                                </option>

                                            </select>

                                        </div>


                                        <div className="col-md-6">

                                            <label className="form-label fw-semibold">
                                                Password
                                            </label>

                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                value={form.password}
                                                onChange={handleChange}
                                                placeholder="Password"
                                                required
                                            />

                                        </div>


                                        <div className="col-12">

                                            <label className="form-label fw-semibold">
                                                Address
                                            </label>

                                            <textarea
                                                name="address"
                                                className="form-control"
                                                rows="2"
                                                value={form.address}
                                                onChange={handleChange}
                                                placeholder="Enter address"
                                            ></textarea>

                                        </div>

                                    </div>

                                </div>


                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            setShowModal(false)
                                        }
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        className="btn text-white"
                                        disabled={saving}
                                        style={{
                                            backgroundColor: "#8B0000",
                                        }}
                                    >

                                        {saving ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                ></span>

                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-person-plus-fill me-2"></i>

                                                Create Delivery Guy
                                            </>
                                        )}

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default AdminDeliveryGuys;