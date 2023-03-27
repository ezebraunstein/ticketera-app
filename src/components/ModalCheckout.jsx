import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const InputModal = ({ handleModalSubmit }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        dni: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        handleModalSubmit(formData);
        setModalIsOpen(false);
    };

    return (
        <div>
            <button type="button" class="btn btn-info" onClick={() => setModalIsOpen(true)}>Comprar</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Input Modal"
            >

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nombre:</label>
                        <input
                            class="form-control"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="surname">Apellido:</label>
                        <input
                            class="form-control"
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            class="form-control"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="dni">DNI:</label>
                        <input
                            class="form-control"
                            type="text"
                            id="dni"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div></div>
                    <button type="button" class="btn btn-danger" onClick={() => setModalIsOpen(false)}>Volver Atrás</button>
                    <button class="btn btn-success" type="submit">Continuar con el pago</button>

                </form>
            </Modal>
        </div>
    );
};

export default InputModal;
