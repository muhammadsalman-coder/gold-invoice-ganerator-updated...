import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.png";
import Aditems from "../components/Aditems";
import Invoice from "../components/Invoice";
import Total from "./Total";

function Home() {
  var clientInfoinitial = {
    clientName: "",
    clientContact: "",
  };

  const [clientinfo, setclientinfo] = useState(clientInfoinitial);
  const [count, setcount] = useState(0);
  const [list, setlist] = useState([]);
  var _list = [];
  const [deta, setdeta] = useState({});

  console.log("clientinfo obj", clientinfo);
  localStorage.setItem("clientInfo", JSON.stringify(clientinfo));

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(deta));
    console.log("child data  received in call back", deta);
  }, [deta]);

  const callbackfordata = (childData, itemid, itemcount, wastageValue) => {
    console.log("--------wastage-------wastage------", wastageValue);
    //data recieve in child data parameter
    setdeta((currentItems) => ({
      ...currentItems,
      [itemid]: {
        ...currentItems[itemid],
        childData,
        wastageValue,
      },
    }));
  };

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      _list.push(
        <Aditems
          itemcount={i + 1}
          key={i + 1}
          id={`item${i + 1}`}
          callbackfordata={callbackfordata}
        />
      );
      setlist(_list);
    }
  }, [count]);

  const additemscount = () => {
    setcount(count + 1);
  };

  console.log("count valuje ", count);

  //    console.log("count",count);
  return (
    <React.Fragment>
      <div className="container-fluid main-div">
        <div className="container sub-main">
          <div>
            <img src={logo} width="100" />
            <h4 className="formheading col-md-6 col-sm-6">INVOICE GANERATOR</h4>
          </div>
          <div className="form-row">
            <div className="client-details col-12 col-md-12">
              <p className="clientDetails-heading s20 fontb">Client Details</p>
            </div>

            <div className="form-group col-md-6 col-sm-12 col-12">
              <label htmlFor="inputclient-name">Client Name</label>
              <input
                type="text"
                className="form-control"
                id="inputclient-name"
                placeholder="Enter client name"
                name="clientNAme"
                onChange={(e) => setclientinfo({ ...clientinfo, clientName: e.target.value })}
              />
            </div>
            <div className="form-group col-md-6 col-sm-12 col-12">
              <label htmlFor="client-contact">Client Contact</label>
              <input
                type="number"
                className="form-control"
                id="client-contact"
                placeholder="Enter client contact number"
                name="ClientContact"
                onChange={(e) => setclientinfo({ ...clientinfo, clientContact: e.target.value })}
              />
            </div>
          </div>

          <div className="items-list" id="item-list">
            {list}
          </div>
          <div className="grandTotal-Container">{count > 0 ? <Total data={deta} /> : <p></p>}</div>
          {/**/}
          <Link type="submit" className="btn btn-primary" id="ganerate_invoice" to="/invoice">
            Ganerate Invoice
          </Link>
          <button type="submit" className="btn btn-primary" id="add_items" onClick={additemscount}>
            Add Item
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
