import React,{useEffect,useState,useRef} from 'react'
import './invoice.css';
import logo from '../assets/logo.png';
import phoneicon from '../assets/phone.png';
import adressicon from '../assets/adress.png';
import whatsappicon from '../assets/whatsapp.png'


import { useReactToPrint } from 'react-to-print';




  const PrintPage =  React.forwardRef((props, ref) => {

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var minutes = new Date().getMinutes(); //Current Hours
    var seconds = new Date().getSeconds(); //Current Hours
    if(seconds<10){
        seconds = "0"+seconds;
    }  

    const [receivedData, setreceivedData] = useState({})
    const [tdlist, settdlist] = useState([])


    console.log("receivedData from local storage:--------",receivedData);
    // receivedData
    useEffect(() => {
        var retrievedObject = localStorage.getItem('data');
        var clientInfo = localStorage.getItem('clientInfo')
        var grandTotal =localStorage.getItem('grandTotal')
        var finaltotal =localStorage.getItem('finaltotal')
        setreceivedData({
                ...receivedData,
                retrievedObject: JSON.parse(retrievedObject),
                clientInfo : JSON.parse(clientInfo),
                grandTotal : JSON.parse(grandTotal),
                finaltotal : JSON.parse(finaltotal)
        })

    }, [])

    
    const printokay = ()=>{
        // console.log("okay i am printing paper");
        window.print()        
    }
    useEffect(() => {
    
       if(receivedData.retrievedObject !== undefined){
        //    console.log("--------=====----=====-====3333333",receivedData.retrievedObject);
        //    console.log("receivedData not undefined", receivedData.retrievedObject);
           var tableRow = Object.values(receivedData.retrievedObject).map((v,i)=>{
               
                delete v.childData.item
                // console.log("shan ------- shaikh ----- 0000000", v,"---0---",i)
               
                Object.values(v).map((v2,i2)=>{
                    // console.log("====v2====",v2,"=====i2===",i2);
                })

                return(
                    <tr key={i}>
                        {
                            Object.values(v.childData).map((values,index)=>{   
                            
                                
                                if(index == 3){
                                    return(<td key={index}>{v.wastageValue}</td>)
                                }else{
                                    return(<td key={index}>{values}</td>)
                                }
                            
                            // console.log("---------------------------------------------------",index,values);
                            
                            })
                        }
                    </tr>
                )
            })
            settdlist(tableRow)
                
                
            }else {
                console.log("receivedData is undefined", receivedData.retrievedObject);
            }
            
            
    }, [receivedData.retrievedObject])
 
   
        var getcontact
        var getName
        if (receivedData.clientInfo){
            getcontact= receivedData.clientInfo.clientContact
            getName= receivedData.clientInfo.clientName
        }
        var discount;
        var advance;
        var grandTotalFinal;
        if(receivedData.hasOwnProperty("finaltotal")){
            discount = receivedData.finaltotal.discount
            advance = receivedData.finaltotal.advance
            grandTotalFinal =  receivedData.finaltotal.grandTotalFinal
        }
        



        const  makeid =(length)=> {
            var first = "";
            var second = "";
            var halflength = length / 2;
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var charactersLength = characters.length;
            var number = "0123456789";
            var numberlength = number.length;
            for (var i = 0; i < halflength; i++) {
              first += characters.charAt(Math.floor(Math.random() * charactersLength));
              second += number.charAt(Math.floor(Math.random() * numberlength));
            }
          
            return first.toUpperCase() + second;
        }     
      
       
    return (
        <>
        <style type="text/css" media="print">{"\
            @page {\ size: landscape;\ }\
        "}</style>
          
        <div className="printing-container" ref={ref}> 
            <div className="header">
                <div className="header-sub-container">
                    <img className="logo" src={logo} alt="logo img" />
                    <p className="header-invoice">sales invoice</p>
                </div>
            </div>
            <div className="pg-body">
{/*                          customer names info container start */}
                <div className="info-tab">
                    <div className="buyer-info">
                        <p className="customer-name">Customer Name: {getName} </p>
                        <p className="customer-contact">Customer Contact: {getcontact} </p>
                    </div>

                    <div className="day-info">
                        <p className="invoice-id">invoice: { makeid(8)}</p>
                        <p className="current-date">Date: {`${date} / ${month} / ${year}`} </p>
                        <p className="current-time">Time: {`${hours} : ${minutes} : ${seconds}`} </p>
                    </div>
                </div>
{/*                          customer names info container end */}
{/*                          prize table contaienr start */}
                <div className="table-container">
                    <table >
                       <thead>
                           <th className="td-itemDescript">Items Description</th>
                           <th>Pcs</th>
                           <th>Net Weight</th>
                           <th>Wstg</th>
                           <th>Gross Weight</th>
                           <th>Per Gram Rate</th>
                           <th>Gold Amount</th>
                           <th>Making Charges</th>
                           <th>Stone/Bds Charges</th>                           
                           <th>Total Amount</th>
                       </thead>
                       <tbody>
                            {tdlist}

                                           
                       </tbody>
                    </table>
                </div>
                {/*                          customer names info container end */}
                <div className="total-amount-container">
                    <div className="blank-div">
                    <div className="important-note">
                    <p className="fontb s16">IMPORTANT NOTE:</p>
                    <ol>
                        <li>
                            We are not responsible for Damaged, Broken and Missing Stones for any kind of jewelery.
                        </li>
                        <li>
                            Customer should provide bill at the time of selling otherwise, It will not be considered of Al Mateen Jewellers Product.
                        </li>
                        <li>
                            All the return and exchange policy is based on Net Weight.
                        </li>
                        <li>
                            Al-Mateen Jewellers reserve the right to change, alter or modify the buy back policy and no action shall lie against the Al-Mateen Jewellers.
                        </li>
                    </ol>
                </div>
                    </div>
                    <div className="grand-total-container">
                        <div className="sub-total flex jc-sb fontl p5">
                            <p>Sub Total: </p>
                            <p> {receivedData.grandTotal} </p>
                        </div>
                        <div className="discount flex jc-sb fontl p5">
                            <p>Discount/Round Off: </p>
                            <p> {discount} </p>
                            
                        </div>
                        <div className="advance flex jc-sb fontl p5">
                            <p>Advance: </p>
                            <p> {advance} </p>
                        </div>
                        <div className="grand-total flex jc-sb fontl p5">
                            <p>Grand Total: </p>
                            <p> {grandTotalFinal} </p>
                            
                        </div>
                    </div>
                </div>
                {/* <div className="important-note">
                    <p className="fontb s18">IMPORTANT NOTE:</p>
                    <ol>
                        <li>
                            We are not responsible for Damaged, Broken and Missing Stones for any kind of jewelery.
                        </li>
                        <li>
                            Customer should provide bill at the time of selling otherwise, It will not be considered of Al Mateen Jewellers Product.
                        </li>
                        <li>
                            All the return and exchange policy is based on Net Weight.
                        </li>
                        <li>
                            Al-Mateen Jewellers reserve the right to change, alter or modify the buy back policy and no action shall lie against the Al-Mateen Jewellers.
                        </li>
                    </ol>
                </div> */}
            </div>
            <div className="footer">
                <div className="sub-footer flex jc-sb">
                    <div className="adress">
                        <p> <img className="adressicon" src={adressicon} alt="adressicon"/> <span>Al-Mateen Jewellers, Resham Bazar Hyderabad.</span> </p>
                    </div>
                    <div className="contactme">
                        <p><img className="whatsappicon" src={whatsappicon} alt="whatsappicon"/> <span>0306-1309349</span> </p>
                        <p><img className="phoneicon" src={phoneicon} alt="phoneicon"/> <span>022-2103535</span> </p>
                    </div>
                </div>
                <div className="copyright">
                    <p>Developed by: shanshaikh +923362101523</p>
                </div>
            </div>
        </div>
     </>   
    )
});


const Invoice = (props) => {

    var clientInfo = JSON.parse(localStorage.getItem('clientInfo'));
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth(); //Current Month
    var year = new Date().getFullYear(); //Current Year
    var months = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']
   
    var fullDAte = months[month]+'-'+date+'-'+year
    // console.log("printing forr ----------->================", fullDAte );
    var docTitle = clientInfo.clientName +'_Date-' +fullDAte
    
    const componentRef = useRef();    
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: docTitle,

    });
   
    return (
      <div class="printBtn-container">
        <PrintPage ref={componentRef} />
        <div className="printBtnStyling">
        <button className="printBtn" onClick={handlePrint}>Print this out!</button>
        <button className="printBtn" onClick={()=>{props.history.goBack()}}>Make New Invoice</button>
        </div>
      </div>
    );
  };

export default Invoice
