import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { getPizzaById, updatePizza } from "../services/api";

function EditPizza() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [pizza, setPizza] = useState({

        pizzaName: "",
        size: "",
        price: "",
        description: "",
        status: "AVAILABLE",
        image: null

    });

    useEffect(() => {

        loadPizza();

    }, []);

    const loadPizza = async () => {

        try {

            const response = await getPizzaById(id);

            setPizza({

                pizzaName: response.data.pizzaName,
                size: response.data.size,
                price: response.data.price,
                description: response.data.description,
                status: response.data.status,
                image: null

            });

        } catch (error) {

            console.log(error);

            toast.error("Failed to load pizza.");

        }

    };

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        setPizza({

            ...pizza,

            [name]: files ? files[0] : value

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

            if (pizza.image != null) {

                formData.append("image", pizza.image);

            }

            await updatePizza(id, formData);

            toast.success("Pizza Updated Successfully!");

            setTimeout(() => {

                navigate("/admin/pizzas");

            }, 1200);

        } catch (error) {

            console.log(error);

            toast.error("Failed To Update Pizza");

        }

    };

    return (

        <div
            className="d-flex"
            style={{
                minHeight: "100vh",
                backgroundColor: "#F8F4F0"
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
                                        backgroundColor: "#8B0000"
                                    }}
                                >

                                    <h3 className="mb-0">

                                        Edit Pizza

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
                                                    Change Image
                                                </label>

                                                <input
                                                    type="file"
                                                    name="image"
                                                    className="form-control"
                                                    accept="image/*"
                                                    onChange={handleChange}
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
                                            className="btn btn-warning w-100 py-2 mt-3"
                                        >
                                            Update Pizza
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

export default EditPizza;