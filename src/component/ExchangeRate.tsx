import React, { useEffect,useState } from 'react';
import * as api from '../api';
import './ExchangeRate.css';
import { ExchangeRateResponse } from '../models/exchageRateResponse';

export default function ExchangeRate() {

    const [exchangeRateData, setExchangeRateData] = useState(new Array<ExchangeRateResponse>);
  
    const getexchangeRateData = async () => {
        try {
            api.getexchangeRateData()
            .then(res => {
                if(res.status == 200){
                    let negativeChange= res.data.ExchangeRates.ExchangeRateResponseDTO.filter((r: ExchangeRateResponse)=>r.CurrentChange<0)
                    setExchangeRateData(negativeChange)
                }
            })
            .catch(err => {
                console.log(err)
            })
  
        } catch (err) {
            console.log(err)
         }}
    useEffect(() => {
        getexchangeRateData();
    });
 
  return (
    <div className="exchange-rate">
        <div className='title'>Exchange Rates</div>
        <div className="table">
            <table>
                <tr>
                <th>CurrentChange</th>
                <th>CurrentExchangeRate</th>
                <th>LastUpdate</th>
                <th>Key</th>
                <th>Unit</th>
                </tr>
                {exchangeRateData.map((val, key) => {
                return (
                    <tr key={key}>
                    <td>{val.CurrentChange}</td>
                    <td>{val.CurrentExchangeRate}</td>
                    <td>{`${val.LastUpdate ? new Date(val.LastUpdate).toLocaleString() : ""}`}</td>
                    <td>{val.Key}</td>
                    <td>{val.Unit}</td>
                    </tr>
                )
                })}
            </table>
        </div>
    </div>
  );
}