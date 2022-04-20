import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";
import { IDAContext } from "../../contexts/IDAContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import "../../assets/Batch.css";
import LoadingSpinner from "../LoadingSpinner";

export default  function Batch() {

    return (
        <div className="App">
            <div>
                <br/>
                <br/>
                <br/>
                <h2>Batch Goes Here! </h2>
                <br/>
                <br/>
                <br/>
            </div>
        </div>
    );

}
