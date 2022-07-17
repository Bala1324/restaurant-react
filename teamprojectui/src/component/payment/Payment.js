import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import 'braintree-web';
import DropIn from "braintree-web-drop-in-react";
import { useNavigate, useLocation } from "react-router-dom";


const Payment = () => {
    const { state } = useLocation();
    console.log("state", state)
    const [value, setvalue] = useState({
        clienttoken: null,
        success: '',
        error: '',
        instance: ""
    })

    const { clienttoken, instance } = value
    console.log("value", value)
    const getClientToken = () => {
        try {
            axios.get("http://192.168.1.6:7000/tokenGeneration"
            ).then(data => {
                console.log("client token")
                console.log(data, "data")
                console.log(data.data.message, "aaaaaaa")
                setvalue({ clienttoken: data.data.message })
            }).catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const saleTransaction = (data) => {
        try {
            instance.requestPaymentMethod().then(nounceData => {
                console.log(nounceData);
                if (nounceData) {
                    console.log("data")
                    let data = {
                        amount: 100,
                        paymentMethodNounce: nounceData.nonce
                    }
                    axios.post("http://192.168.1.6:7000/saleTransaction",
                        {
                            method: "POST",
                            headers: {
                                "content-Type": "application/json",
                                Accept: "application/json"
                            },
                            body: JSON.stringify(data)
                        }
                    ).then(resultData => {

                        console.log(resultData);
                    }).catch((err) => {
                        console.log(err.message)
                    })
                }
            })
        } catch (error) {
            console.log(error.message)
        }

    }
    // const onPurchase=()=>{
    //     instance.requestPaymentMethod().then(data=>{
    //         if(data){
    //             let nonce = data.nonce;
    //             let paymentData={
    //                 payment_method_nonce:nonce,
    //                 amount:100
    //             }
    //             saleTransaction(paymentData).then(Response=>{
    //                 console.log(Response)
    //                setvalue({success:Response.success})
    //             })
    //         }
    //     })
    // }



    useEffect(() => {
        getClientToken()
    }, []);
    return (
        <div>
            <h1>Payment Details</h1>
            {clienttoken && (
                <div>
                    <DropIn
                        options={{ authorization: clienttoken }}
                        onInstance={(instance) => setvalue({ ...value, instance: instance })}
                    />
                    <button onClick={() => saleTransaction()}>Buy</button>
                </div>
            )}
            {!clienttoken && <h1>Loading...</h1>}
        </div>
    )
}


export default Payment;
