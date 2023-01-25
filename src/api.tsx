import * as url from './url';
import axios from 'axios';

export async function getexchangeRateData() {
    
    return await axios.get(`${url.GET_EXCHANGE_RATE_DATA}`);
}