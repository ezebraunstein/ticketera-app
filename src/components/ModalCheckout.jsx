import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const InputModal = ({ handleModalSubmit }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        email2: "",
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
            <button type="button" class="btnMain" onClick={() => setModalIsOpen(true)}>Comprar</button>
            <Modal
                className="custom-modal"
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Input Modal"
            >

                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            class="form-control"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />
                    </div>
                    <div>
                        <input
                            class="form-control"
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            placeholder="Apellido"
                            required
                        />
                    </div>
                    <div>
                        <input
                            class="form-control"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        <input
                            class="form-control"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email2}
                            onChange={handleChange}
                            placeholder="Repite tu email"
                            required
                        />
                    </div>
                    <div>
                        <input
                            class="form-control"
                            type="text"
                            id="dni"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            placeholder="DNI"
                            required
                        />
                    </div>
                    <br />
                    <div class="btn-container">
                        <button type="button" class="btn-Modal-Back" onClick={() => setModalIsOpen(false)}>Volver Atrás</button>
                        <button class="btn-Modal-Buy" type="submit" disabled={!formData.email || !formData.dni || !formData.name || !formData.surname}>Continuar con el pago</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default InputModal;
