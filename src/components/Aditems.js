import React, { useState, useEffect, useCallback } from "react";
import CreatableSelect from "react-select/creatable";
import "../App.css";

function Aditems(props) {
  var initialStates = {
    itemName: "",
    piece: 1,
    netWeight: NaN,
    wastage: NaN,
    grossWeight: 0,
    gramRate: "",
    goldAmount: 0,
    makingCharges: "",
    stonebdsCharges: "",
    totalAmount: 0,
    item: props.id,
  };

  //  block of code for React select drop down code start from here
  const [OptionValue, setOptionValue] = useState({ value: "", label: "" });
  const initialOptions = [
    { value: "Plan set", label: "Plan set" },
    { value: "Fancy set", label: "Fancy set" },
    { value: "Ring", label: "Ring" },
    { value: "Baby ring", label: "Baby ring" },
    { value: "Name ring", label: "Name ring" },
    { value: "Locket", label: "Locket" },
    { value: "Locek set", label: "Locket set" },
    { value: "Chain", label: "Chain" },
    { value: "Mala chain set", label: "Mala chain set" },
    { value: "Mala chain set without ring", label: "Mala chain set without ring" },
    { value: "Bracelet", label: "Bracelet" },
    { value: "Kara", label: "Kara" },
    { value: "Karay", label: "Karay" },
    { value: "Bangles", label: "Bangles" },
    { value: "Earrings", label: "Earrings" },
    { value: "Bali", label: "Bali" },
    { value: "Nose Pin", label: "Nose Pin" },
    { value: "Half set without ring", label: "Half set without ring" },
    { value: "Nath", label: "Nath" },
    { value: "Tika", label: "Tika" },
    { value: "Jhumar", label: "Jhumar" },
    { value: "3 Sari Dhuri set", label: "3 Sari Dhuri set" },
    { value: "5 Sari Dhuri set", label: "5 Sari Dhuri set" },
    { value: "7 Sari Dhuri set", label: "7 Sari Dhuri set" },
    { value: "Diamond ring", label: "Diamond ring" },
    { value: "Customize name ring", label: "Customize name ring" },
  ];
  const [options, setOptions] = useState(initialOptions);
  //  block of code for React select drop down code end  from here

  const [items, setitem] = useState(initialStates);
  const [wastageValue, setwastageValue] = useState();

  props.callbackfordata(items, props.id, props.itemcount, wastageValue);
  console.log("items obj", items);

  const handleInputChange = (event) => {
    // event.preventDefault();
    var { name, value } = event.target;
    if (name == "itemName") {
      setitem({
        ...items,
        [name]: value,
      });
    } else {
      setitem({
        ...items,
        [name]: parseFloat(value),
      });
    }
  };

  useEffect(() => {
    var tempWastage = (items.netWeight / 100) * items.wastage;

    var add;
    if (Number.isNaN(parseFloat(items.wastage))) {
      add = parseFloat(items.netWeight);
    } else {
      add = 0;
    }
    if (Number.isNaN(parseFloat(items.netWeight))) {
      add = parseFloat(items.wastage);
    } else {
      add = 0;
    }
    if (!Number.isNaN(parseFloat(items.wastage)) && !Number.isNaN(parseFloat(items.netWeight))) {
      add = parseFloat(tempWastage) + parseFloat(items.netWeight);
    } else {
      add = 0;
    }

    var result = add.toFixed(2);

    setitem({
      ...items,
      grossWeight: parseFloat(result),
    });
    setwastageValue(tempWastage.toFixed(2));
  }, [items.wastage, items.netWeight]);
  useEffect(() => {
    var result = (items.grossWeight * items.gramRate).toFixed(2);

    setitem({
      ...items,
      goldAmount: parseFloat(result),
    });
  }, [items.grossWeight, items.gramRate]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    var add;
    if (!Number.isNaN(items.goldAmount) && items.piece > 0) {
      add = items.goldAmount * items.piece;
    } else {
      add = 0;
    }
    if (!Number.isNaN(items.makingCharges) && items.piece > 0) {
      add = (items.goldAmount + items.makingCharges) * items.piece;
    }
    if (
      !Number.isNaN(items.makingCharges) &&
      !Number.isNaN(items.stonebdsCharges) &&
      items.piece > 0
    ) {
      add = (items.goldAmount + items.makingCharges + items.stonebdsCharges) * items.piece;
    }
    //  if(!Number.isNaN(items.makingCharges) && !Number.isNaN(items.stoneCharges) && !Number.isNaN(items.bdsclrCharges) && (items.piece)>0){
    //      add = ((items.goldAmount)+(items.makingCharges)+(items.stoneCharges)+(items.bdsclrCharges))*(items.piece)
    // }
    //  if(!Number.isNaN(items.makingCharges) && !Number.isNaN(items.stoneCharges) && !Number.isNaN(items.bdsclrCharges) && !Number.isNaN(items.diamontCharges) && (items.piece)>0){
    //      add = ((items.goldAmount)+(items.makingCharges)+(items.stoneCharges)+(items.bdsclrCharges)+(items.diamontCharges))*(items.piece)
    // }

    var result = parseFloat(add).toFixed(3);
    var finalResult = parseFloat(result);
    setitem({
      ...items,
      totalAmount: parseFloat(finalResult),
    });
  }, [items.piece, items.goldAmount, items.makingCharges, items.stonebdsCharges]);

  //  block of code for React select drop down code start from here
  const handleChange = useCallback((inputValue) => {
    setOptionValue(inputValue);
    setitem({
      ...items,
      itemName: inputValue.label,
    });
  }, []);
  const handleCreate = useCallback(
    (inputValue) => {
      const newValue = { value: inputValue.toLowerCase(), label: inputValue };
      setOptions([...options, newValue]);
      setOptionValue(newValue);
      setitem({
        ...items,
        itemName: newValue.label,
      });
    },
    [options]
  );
  console.log("opetions selected ---------", OptionValue.label);

  //  block of code for for react select drop down selection is end here

  return (
    // {props.itemcount > 1 ? : }
    <div class="main-cont">
      <div className="item-container">
        <div className="client-details col-12 col-md-12">
          <p className="clientDetails-heading description s20 fontb" id="item-description">
            Item Description {props.itemcount}
          </p>
        </div>
        <div className="form-group">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6"></div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <label htmlFor="item-descriptions">Item Name</label>
            {/* <input
              type="text"
              className="form-control"
              id="item-descriptions"
              name="itemName"
              placeholder="Enter item name"
              value={items.itemName}
              onChange={handleInputChange}
            /> */}
            <CreatableSelect
              isClearable
              value={OptionValue}
              options={options}
              onChange={handleChange}
              onCreateOption={handleCreate}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2 col-sm-3 col-6">
            <label htmlFor="piece">Pcs</label>
            <input
              type="number"
              className="form-control"
              id="piece"
              placeholder="0"
              name="piece"
              value={items.piece}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-2 col-sm-3 col-6">
            <label htmlFor="net-weight">Net Weight</label>
            <input
              type="number"
              className="form-control"
              id="net-weight"
              placeholder="0"
              name="netWeight"
              value={items.netWeight}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-2 col-sm-3 col-6">
            <label htmlFor="wastage">Wastage</label>
            <input
              type="number"
              className="form-control"
              id="wastage"
              placeholder="0"
              name="wastage"
              value={items.wastage}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-2 col-sm-3 col-6">
            <label htmlFor="gross-weight" className="text-nowrap">
              Gross Weight
            </label>
            <input
              type="number"
              className="form-control"
              id="gross-weight"
              placeholder="0"
              readOnly="readonly"
              name="grossWeight"
              value={items.grossWeight}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-2 col-sm-3 col-6">
            <label htmlFor="gram-rate" className="text-nowrap">
              Per Gram Rate
            </label>
            <input
              type="number"
              className="form-control"
              id="gram-rate"
              placeholder="0"
              name="gramRate"
              value={items.gramRate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-2 col-sm-3 col-6">
            <label htmlFor="gold-amount" className="text-nowrap">
              Gold Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="gold-amount"
              placeholder="0"
              readOnly="readonly"
              name="goldAmount"
              value={items.goldAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-2 col-sm-3 col-6">
            <label htmlFor="making-charges" className="text-nowrap">
              Making Charges
            </label>
            <input
              type="number"
              className="form-control"
              id="making-charges"
              placeholder="0"
              name="makingCharges"
              value={items.makingCharges}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-2 col-sm-3 col-6">
            <label htmlFor="stone-charges" className="text-nowrap">
              Stone/Bds Charges
            </label>
            <input
              type="number"
              className="form-control"
              id="stone-charges"
              placeholder="0"
              name="stonebdsCharges"
              value={items.stonebdsCharges}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* <div className="form-row">                 
                    
                        <div className="form-group col-md-2 col-sm-3 col-6">
                            <label htmlFor="bds-clr-charges"  className="text-nowrap">Bds/Clr Charges</label>
                            <input type="number" className="form-control" id="bds-clr-charges" placeholder="0" name="bdsclrCharges" value={items.bdsclrCharges}  onChange={handleInputChange}/>
                        </div>
                        <div className="form-group col-md-2 col-sm-3 col-6">
                            <label htmlFor="diamond-charges"  className="text-nowrap">Diamond Charges</label>
                            <input type="number" className="form-control" id="diamond-charges" placeholder="0" name="diamontCharges" value={items.diamontCharges}  onChange={handleInputChange}/>
                        </div>                   
                
                    </div>        */}

        <div className="form-group">
          <div className="flex aic">
            <label htmlFor="total-amount">Total Amount</label>
            <input
              type="text"
              className="form-control col-md-4 col-sm-3 col-9 ml20"
              id="total-amount"
              placeholder="0"
              readOnly="readonly"
              name="totalAmount"
              value={numberWithCommas(items.totalAmount)}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aditems;
