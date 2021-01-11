import React,{useState,useEffect} from 'react'
import './total.css';

function Total({data}) {
    const [grandtotal, setgrandtotal] = useState({ })
    const [total, settotal] = useState(0)

    const[sgtotal,setsgtotal] = useState({
        
        discount:0,
        advance:0,
        grandTotalFinal:0,
    });


   console.log("grandtotal obj",grandtotal);

   useEffect(() => {
    for (const key in data) {
 
          
   
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            console.log("eleemen.childdata",element.childData);
            var temp = element.childData.totalAmount;
            console.log("temps grandtotal",temp);
            var itemid = element.childData.item;
            grandtotal[itemid] = temp;

                const result = Object.values(grandtotal)
                var arrtemp =0;
                result.forEach(element => {
                    arrtemp += element
                });
                settotal(arrtemp);
        
    
        }
 
    }
}, [data,sgtotal,total])
    
    
   


   localStorage.setItem("grandTotal",total)
   localStorage.setItem("finaltotal",JSON.stringify(sgtotal))
   console.log("set local storage grandTotal , finaltotal",total,sgtotal);
   console.log("final result",total);

   const handleChange =(e)=>{
       var {name,value} = e.target
    
    setsgtotal({
        ...sgtotal,
        [name]: parseInt(value)

    })

   }
   if(Number.isNaN(sgtotal.discount)){
        sgtotal.discount = 0;        
    }
    if(Number.isNaN(sgtotal.advance)){
        sgtotal.advance = 0;        
    }
    sgtotal.grandTotalFinal = ((total) - (sgtotal.discount) - (sgtotal.advance)).toFixed(2)

   console.log("sgtotal , typeof = sgtotal.discount  , typeof= sgtotal.advance ",sgtotal, typeof(sgtotal.discount),typeof(sgtotal.advance));
   
    return (
        <div class="total-tab">
            <div className="sub-total1">
                <p>Sub Total: <div className="totalSpan"><p>{total}</p></div></p>
            </div>
            <div className="sub-total1">
                <p>Discount/Round Off:<input type="number" className="roundoff" name="discount" onChange={handleChange}/></p>
            </div>
            <div className="sub-total1">
                <p>Advance:<input type="number" className="roundoff" name="advance" onChange={handleChange}/></p>
            </div>
            <div className="sub-total1">
                <p>Grand Total: <div className="totalSpan"><p>{sgtotal.grandTotalFinal}</p></div></p>
            </div>
        </div>
    )
}

export default Total
