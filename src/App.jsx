// App.jsx

import React, { useEffect, useState } from "react";
import "./App.css"
import BackGroundImg from "./Assets/App background.jpg"
import UpdiseDownArrow from "./Assets/upside down arrow.png"
import { Button, Input, Select } from "antd";

export function App(){
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');

    useEffect(()=>{
        fetch(`https://api.frankfurter.app/currencies`).then(result => result.json()).then(data =>{
            setCurrencyOptions(Object.entries(data));
            setFromCurrency(Object.keys(data)[0]);
            setToCurrency(Object.keys(data)[14]);
        })
    }, []);
    const options = currencyOptions.map(([key, value])=>{
        return <option key={key} value={key}>
            {value}
        </option>
    })

    function conversionResult(){
            if(fromAmount===0){
                setToAmount(0)
            }
            else if(fromAmount===''){
                setToAmount('')
            }
            else if(fromCurrency===toCurrency){
                setToAmount(fromAmount)
            }
            else{
                fetch(`https://api.frankfurter.app/latest?amount=${fromAmount}&from=${fromCurrency}&to=${toCurrency}`).then(result => result.json()).then(data => setToAmount(Object.values(data.rates)))
            }
    }

    useEffect(()=>{
        if(fromAmount===0){
            setToAmount(0)
        }
        else if(fromAmount===''){
            setToAmount('')
        }
        else if(fromCurrency===toCurrency){
            setToAmount(fromAmount)
        }
    }, [fromCurrency, fromAmount, toCurrency])
    return(
        <>
        <div className="container">
            <div className="BackGroundImg-container">
                <img className="BackGroundImg" src={BackGroundImg} alt="" />
            </div>
            <div className="Converter-container">
                <div className="calculator">
                    <h1 className="heading">CURRENCY CONVERTER</h1>
                    <div className="select-container">
                        <div className="from-container">
                            <label htmlFor="from" style={{fontWeight:"bolder", color:"#002258"}}>From</label>
                            <Select dropdownStyle={{ maxHeight: '249.8px', overflowY: 'auto' }} className="ant-select-selection-search" id="from" name="currency" onChange={(e)=>setFromCurrency(e)} value={fromCurrency}>
                                {options}
                            </Select>
                        </div>
                        <img className="upside-down-arrow" src={UpdiseDownArrow} alt="arrow"/>
                        <div className="to-container">
                            <label htmlFor="to" style={{fontWeight:"bolder", color:"#002258"}}>To</label>
                            <Select dropdownStyle={{ maxHeight: '249.8px', msOverflowStyle: 'scroll' }} id="to" name="currency" onChange={(e)=>setToCurrency(e)} value={toCurrency}>
                                {options}
                            </Select>
                        </div>
                    </div>
                    <div className="from-amount-container">
                        <Input addonAfter={fromCurrency} value={fromAmount} type="number" name="countryCurrencyCode" id="amount" placeholder="Amount" onChange={(e)=>{setFromAmount(e.currentTarget.value)}}/>
                    </div>
                    <div className="button-container">
                        <Button className="btn" onClick={()=>{conversionResult()}}>Convert</Button>
                    </div>
                    <div className="to-amount-container">
                            <p style={{fontWeight:"bolder"}}>Result</p>
                            <Input addonAfter={toCurrency} value={toAmount} readOnly type="text" name="result" id="result" placeholder="Amount Conversion"/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}