import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import './AddSchedule.css';
import { useNavigate } from "react-router-dom";

const AddSchedule = ({ onSubmit, currentLength, user }) => {

    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showProductDropdown, setShowProductDropdown] = useState(false);

    const [visitType, setVisitType] = useState('Select visit type');
    const [selectedProduct, setSelectedProduct] = useState('Select product');
    const [date, setDate] = useState();
    const [time, setTime] = useState(); //dummy time, can be used as the getClient() input
    const clientPath = '/SimpleScheduling/SimpleDatabase/Client/client.json';
    const productPath = '/SimpleScheduling/SimpleDatabase/Product/product.json';
    const [Client, setClient] = useState();
    const [Product, setProduct] = useState();
    const navigateTo = useNavigate();

    useEffect(() => {

        // Get client data
        fetch(clientPath)
        .then(response => response.text())
        .then(clientString => JSON.parse(clientString))
        .then(client => {
            setClient(client);
        });

        // Get product data
        fetch(productPath)
        .then(response => response.text())
        .then(productString => JSON.parse(productString))
        .then(product => {
            setProduct(product);
        });

    }, []);

    const handleSelectType = (type) => {
        setVisitType(type);
        setShowTypeDropdown(false);
    }

    const handleTypeToggle = (isOpen) => {
        setShowTypeDropdown(isOpen);
    }

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setShowProductDropdown(false);
    }

    const handleSelectProductToggle = (isOpen) => {
        setShowProductDropdown(isOpen);
    }

    const getProduct = () => {
        return(
            Product.map(product => (
                <Dropdown.Item className="AddSchedule__dropdown-item" onClick={() => handleSelectProduct(product.productName)}>{product.productName}</Dropdown.Item>
            ))
        )
    }
    
    const getClient = () => {
        // Random client when there is more than one available client.
        // Math.floor(Math.random() * 2)
        // ...

        // Random unstructured client data
        let currentClient;
        const currentTime = new Date().getHours();
        for (let i = 0; i < Client.length; i++) {
            currentClient = Client[i]
            if (currentTime >= currentClient['availableTimeStart'] && currentTime <= currentClient['availableTimeEnd']) {
                return currentClient.name;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const client = getClient();

        // if (!client) {
        //     alert('Out of service hours!');
        //     return;
        // }

        const currentTime = new Date().getHours();

        const newSchedule = {
            'id': currentLength,
            'District': user.district,
            'Region': user.region,
            'Type': visitType,
            'Date': date,
            'Time of Appointment': currentTime,
            'Client': client,
            'Product': selectedProduct,
            'Approval': 'Not Approved'
        }

        onSubmit(newSchedule);
        navigateTo('/dashboard');
    }

    return (

        <div className="AddSchedule">
            <div className="AddSchedule__container">
                <form onSubmit={handleSubmit} className="AddSchedule__form">
                    <div className="AddSchedule__input-container">
                        <Dropdown show={showTypeDropdown} onToggle={handleTypeToggle} className="AddSchedule__dropdown">
                            <Dropdown.Toggle variant="success" className="AddSchedule__dropdown-selected">
                                {visitType}
                            </Dropdown.Toggle>
                            
                            <Dropdown.Menu className="AddSchedule__dropdown-menu">
                                <Dropdown.Item className="AddSchedule__dropdown-item" onClick={() => handleSelectType('Check Up')}>Check Up</Dropdown.Item>
                                <Dropdown.Item className="AddSchedule__dropdown-item" onClick={() => handleSelectType('Reception')}>Reception</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="AddSchedule__input-container">
                        <label htmlFor="date" className="AddSchedule__input-label">Date of Appointment</label>
                        <input type="date" id="date" className="AddSchedule__input" onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    <div className="AddSchedule__input-container">
                        <label htmlFor="time" className="AddSchedule__input-label">Time of Appointment</label>
                        <input type="time" id="time" className="AddSchedule__input" onChange={(e) => setTime(e.target.value)}/>
                    </div>
                    <div className="AddSchedule__input-container">
                        <Dropdown show={showProductDropdown} onToggle={handleSelectProductToggle} className="AddSchedule__dropdown">
                            <Dropdown.Toggle variant="success" className="AddSchedule__dropdown-selected">
                                {selectedProduct}
                            </Dropdown.Toggle>
                            
                            <Dropdown.Menu className="AddSchedule__dropdown-menu">
                                {Product && getProduct()}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <button type="submit" className="AddSchedule__submit">Add Schedule</button>
                </form>
            </div>
        </div>

    );

}

export default AddSchedule;