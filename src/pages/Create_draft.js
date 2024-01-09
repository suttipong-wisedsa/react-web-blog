import { useState } from "react";
import AddressForm from "../component/AddressForm";
export default function App() {
  //Checkout page functionality
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const onNext = (e) => {
    e.preventDefault();
    console.log(houseNumber, subdistrict, district, province, zipcode);

    if (!houseNumber || !subdistrict || !district || !province || !zipcode) {
      setError("กรอกข้อมูลไม่ครบ");
      return;
    }
    setPage(page + 1);
  };
  //Name and phone
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  //AddressForm state
  const [houseNumber, setHouseNumber] = useState("");
  const [subdistrict, setSubDistrict] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [fullAddress, setFullAddress] = useState({});

  function onSelect(fulladdress) {
    const { subdistrict, district, province, zipcode } = fulladdress;
    console.log(houseNumber);
    setSubDistrict(subdistrict);
    setDistrict(district);
    setProvince(province);
    setZipcode(zipcode);
    setFullAddress([subdistrict, district, province, zipcode]);
    setError("");
    console.log("some fulladdress: ", fullAddress);
  }
  //end AddressForm
  //toggle Sent to others
  const [forOthers, setForOthers] = useState(false);
  //sender info
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  //slipImage
  const deleteLocation = () => {
    setSubDistrict("");
    setDistrict("");
    setProvince("");
    setZipcode("");
    // setFullAddress([]);
  };
  return (
    <div className="App">
      <AddressForm
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        setError={setError}
        houseNumber={houseNumber}
        setHouseNumber={setHouseNumber}
        subdistrict={subdistrict}
        setSubDistrict={setSubDistrict}
        district={district}
        setDistrict={setDistrict}
        province={province}
        setProvince={setProvince}
        zipcode={zipcode}
        setZipcode={setZipcode}
        fullAddress={fullAddress}
        setFullAddress={setFullAddress}
        onSelect={onSelect}
        setForOthers={setForOthers}
        forOthers={forOthers}
        senderName={senderName}
        setSenderName={setSenderName}
        senderPhone={senderPhone}
        setSenderPhone={setSenderPhone}
      />

      <button onClick={() => deleteLocation()}>delete</button>
    </div>
  );
}
