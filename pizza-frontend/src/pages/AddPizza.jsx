import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { addPizza } from "../services/api";

function AddPizza() {

    const navigate = useNavigate();

    const [pizza, setPizza] = useState({

        pizzaName: "",
        size: "",
        price: "",
        description: "",
        status: "AVAILABLE",
        image: null,

    });

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        setPizza({

            ...pizza,

            [name]: files ? files[0] : value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("pizzaName", pizza.pizzaName);
            formData.append("size", pizza.size);
            formData.append("price", pizza.price);
            formData.append("description", pizza.description);
            formData.append("status", pizza.status);
            formData.append("image", pizza.image);

            await addPizza(formData);

            toast.success("Pizza Added Successfully!");

            setTimeout(() => {

                navigate("/admin/pizzas");

            }, 1200);

        } catch (error) {

            console.log(error);

            toast.error("Failed To Add Pizza");

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

                <div className="container py-4">

                    <div className="row justify-content-center">

                        <div className="col-lg-8">

                            <div className="card shadow border-0">

                                <div
                                    className="card-header text-white"
                                    style={{
                                        backgroundColor: "#8B0000",
                                    }}
                                >

                                    <h3 className="mb-0">

                                        Add New Pizza

                                    </h3>

                                </div>

                                <div className="card-body">

                                    <form onSubmit={handleSubmit}>

                                        <div className="row">

                                            <div className="col-md-5 mb-3">

                                                <label className="form-label fw-bold">

                                                    Pizza Name

                                                </label>

                                                <input
                                                    type="text"
                                                    name="pizzaName"
                                                    className="form-control"
                                                    value={pizza.pizzaName}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>

                                            <div className="col-md-3 mb-3">

                                                <label className="form-label fw-bold">

                                                    Size

                                                </label>

                                                <select
                                                    name="size"
                                                    className="form-select"
                                                    value={pizza.size}
                                                    onChange={handleChange}
                                                    required
                                                >

                                                    <option value="">Select</option>
                                                    <option value="Small">Small</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Large">Large</option>

                                                </select>

                                            </div>

                                            <div className="col-md-4 mb-3">

                                                <label className="form-label fw-bold">

                                                    Price

                                                </label>

                                                <input
                                                    type="number"
                                                    name="price"
                                                    className="form-control"
                                                    value={pizza.price}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label fw-bold">

                                                Description

                                            </label>

                                            <textarea
                                                rows="3"
                                                name="description"
                                                className="form-control"
                                                value={pizza.description}
                                                onChange={handleChange}
                                                required
                                            ></textarea>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6 mb-3">

                                                <label className="form-label fw-bold">

                                                    Pizza Image

                                                </label>

                                                <input
                                                    type="file"
                                                    name="image"
                                                    className="form-control"
                                                    accept="image/*"
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>

                                            <div className="col-md-6 mb-3">

                                                <label className="form-label fw-bold">

                                                    Status

                                                </label>

                                                <select
                                                    name="status"
                                                    className="form-select"
                                                    value={pizza.status}
                                                    onChange={handleChange}
                                                >

                                                    <option value="AVAILABLE">

                                                        AVAILABLE

                                                    </option>

                                                    <option value="UNAVAILABLE">

                                                        UNAVAILABLE

                                                    </option>

                                                </select>

                                            </div>

                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-danger w-100 py-2 mt-3"
                                        >

                                            Save Pizza

                                        </button>

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddPizza;