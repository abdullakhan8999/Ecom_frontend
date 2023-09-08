import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../common/MetaData";
import { FaHome, FaCity, FaMapMarker } from "react-icons/fa";
import { BiMap } from "react-icons/bi";
import { MdPublic } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";
import showNotification from "../../util/showNotification";
import { Country, State } from "country-state-city";
// import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps.jsx";
import { saveShippingDetails } from "../../Actions/cartActions";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation("/login");
    }
  }, [isAuthenticated]);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      showNotification("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingDetails({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNumber,
      })
    );
    navigation("/order_confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />
      <div className="max-w-screen-xl mx-auto p-4 min-h-screen">
        <div className="bg-white shadow-md w-full md:w-80 mx-auto rounded-md p-8">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

          <form onSubmit={shippingSubmit}>
            <div className="mb-4 flex items-center">
              <FaHome className=" absolute translate-x-4 mr-2" />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-2 rounded w-full pl-10"
              />
            </div>

            <div className="mb-4 flex items-center">
              <FaCity className="absolute translate-x-4" />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border p-2 rounded w-full pl-10"
              />
            </div>

            <div className="mb-4 flex items-center">
              <BiMap className="absolute translate-x-4" />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="border p-2 rounded w-full pl-10"
              />
            </div>

            <div className="mb-4 flex items-center">
              <IoMdPhonePortrait className="absolute translate-x-4" />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border p-2 rounded w-full pl-10"
                maxLength={10}
              />
            </div>

            <div className="mb-4 flex items-center">
              <MdPublic className="absolute translate-x-4" />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="border p-2 rounded w-full pl-10"
              >
                <option value="">Country</option>
                {Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {country && (
              <div className="mb-4 flex items-center">
                <FaMapMarker className="absolute translate-x-4" />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="border p-2 rounded w-full pl-10"
                >
                  <option value="">State</option>
                  {State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className={`bg-blue-500 w-full text-white px-4 py-2 rounded ${
                state ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!state}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
