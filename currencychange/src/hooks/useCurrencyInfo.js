import { useEffect, useState } from "react";



function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    useEffect(()=> {
       fetch(`https:cdn.jsdelivr.net/gh/fawazahmad0/currency-api@1/latest/currencies/${currency}.json`)
       .then((res)=>setData(res[currency]))
       console.log(data)
    }, [currency])
    console.log(data)
    return data;
}
export default useCurrencyInfo;