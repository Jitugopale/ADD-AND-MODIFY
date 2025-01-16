import React from "react";
import "./css/style.css";
import "./css/device-only.css";
import logo from "./images/logoss.png";
import profile from "./images/profile.png";
import pan from "./images/pan.jpg";
import adhar from "./images/adhar.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import Logout from "./Logout";

const Dashboard = () => {
  const [kycData, setKycData] = useState(null);
  const [userData, setUserData] = useState({  NAME: "", // Set a default value
  });
  const [custData, setCustData] = useState(null);
  const [error, setError] = useState(null);
  const [addressVisible, setAddressVisible] = useState(false);
  const [panVisible, setPanVisible] = useState(false);
  const [custno, setCustno] = useState("");
  const [message, setMessage] = useState("");
  const [isEditable, setIsEditable] = useState(false); // State to control form editability
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/getdata", {
          headers: {
            authToken: token,
          },
        });
        setKycData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const handleCustData = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error
    setMessage(""); // Clear any previous message

    try {
      const response = await axios.post(
        "http://localhost:5000/api/data/getdata",
        {
          CUSTNO: custno,
        }
      );

      if (
        response.data.message === "KYC details fetched and saved successfully"
      ) {
        setMessage("KYC details fetched successful!");
        setUserData(response.data.UserData); // Update kycData with the UserData object
        console.log(response.data); // Log response data for debugging
      } else {
        setError("Error Data Fetching.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Server not reachable.");
    }
  };

  // const handleInputChange = (e) => {
  //   setUpdatedUserData({ ...updatedUserData, [e.target.name]: e.target.value });
  // };

  // const handleModify = () => {
  //   setIsEditMode(true);
  //   setUpdatedUserData(userData);
  // };

  const handleModifyClick = () => {
    setIsEditMode(true); // Allow user to modify data
    setUserData(userData); // Pre-fill the form with current data
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Only update the NAME field
    if (name === 'NAME') {
      setUserData({
        ...userData,
        NAME: value, // Update only NAME field
      });
    } else {
      setUserData({
        ...userData,
        [name]: value, // Update other fields normally
      });
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked"); // Check if this is logged when you submit
    alert("Submit Clicked");
  
    try {
      await axios.post(
        "http://localhost:5000/api/data/updatedata",
        userData // Use userData instead of updatedUserData
      );
      setUserData(userData); // Update the local state with userData
      console.log(userData); // Log the updated userData
      setIsEditMode(false); // Disable edit mode
      alert("Data updated successfully");
    } catch (err) {
      setError(err.response?.data?.error || "Update failed.");
    }
  };
  
  useEffect(() => {
    // Open the 'Legal' tab by default after the component mounts
    const defaultTab = document.getElementById("defaultOpen");
    if (defaultTab) {
      defaultTab.click(); // Trigger the click event to open the 'Legal' tab
    }
  }, []);

  const openTab = (evt, tabName) => {
    const tabcontents = document.querySelectorAll(".tabcontent");
    const tablinks = document.querySelectorAll(".tablinks");

    tabcontents.forEach((tab) => (tab.style.display = "none")); // Hide all tabs
    tablinks.forEach((link) => link.classList.remove("active")); // Remove active class

    document.getElementById(tabName).style.display = "block"; // Show the selected tab
    evt.currentTarget.classList.add("active"); // Add active class to clicked tab
  };

  // Function to toggle visibility of form-main section
  // const toggleForm = () => {
  //   const formMain = document.querySelector('.form-main');
  //   if (formMain.style.display === 'none' || formMain.style.display === '') {
  //     formMain.style.display = 'block'; // Show the form
  //   } else {
  //     formMain.style.display = 'none'; // Hide the form
  //   }
  // };

  // useEffect to handle default tab open and any necessary setup
  //   useEffect(() => {
  //     const addressBtn = document.querySelector(".addressbtn");
  //     const identityBtn = document.querySelector(".identity");
  //     const addressSection = document.querySelector(".address");
  //     const panSection = document.querySelector(".pan");

  //     addressBtn.addEventListener("click", () => {
  //         panSection.style.display = 'none'; // Hide PAN section
  //         addressSection.style.display = addressSection.style.display === 'none' ? 'block' : 'none'; // Toggle Address section
  //     });

  //     identityBtn.addEventListener("click", () => {
  //         addressSection.style.display = 'none'; // Hide Address section
  //         panSection.style.display = panSection.style.display === 'none' ? 'block' : 'none'; // Toggle PAN section
  //     });

  //     return () => {
  //         addressBtn.removeEventListener("click", () => {});
  //         identityBtn.removeEventListener("click", () => {});
  //     };
  // }, []);

  // Function to handle address button click
  const toggleAddress = () => {
    setPanVisible(false); // Hide PAN section
    setAddressVisible(!addressVisible); // Toggle Address section
  };

  // Function to handle identity button click
  const toggleIdentity = () => {
    setAddressVisible(false); // Hide Address section
    setPanVisible(!panVisible); // Toggle PAN section
  };

  const convertToDateInputFormat = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  // Function to format the date as 'dd-mm-yyyy'
  const getFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      {/* Navbar Section Start  */}
      <header className="mb-5">
        <nav>
          <div className="container">
            <div className="row align-items-center gy-4">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 logo">
                <div className="d-xxl-flex d-xl-flex d-ld-flex d-md-block d-flex align-items-center justify-content-between">
                  <a href="index.html">
                    <img src={logo} alt="profile" />
                  </a>
                  {kycData ? (
                    <>
                      <h5 className="ms-5">{kycData.BankName}</h5>
                      <h5 className="ms-5">{kycData.BranchName}</h5>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-12 ms-auto user">
                <div className="d-xxl-flex d-xl-flex d-ld-flex d-md-block d-flex align-items-center justify-content-between">
                  <ul className="list-inline mb-xxl-0 mb-xl-0 mb-md-0 mb-4">
                    <li>
                      <i className="fa-regular fa-user" /> Welcome{" "}
                      {kycData ? kycData.Agent_Name : "User"}
                    </li>
                    <li>
                      <i className="fa-regular fa-calendar" />{" "}
                      {getFormattedDate()}
                    </li>
                  </ul>
                  <div
                    className="profile"
                    style={{ width: "183px", height: "36px" }}
                  >
                    <span>
                      <img src={profile} alt="profile" />
                    </span>
                    {/* <a href="#" className="btn btn-primary ms-3">Logout</a> */}
                    <Logout />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* legal Customer Search Section Start */}
      <section>
        <div className="container">
          <div className="row gx-4">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Enter Legal Customer No
                </label>
                <div className="search">
                  <input
                    type="text"
                    className="form-control"
                    value={custno}
                    id="custno"
                    onChange={(e) => setCustno(e.target.value)}
                    placeholder="Enter Customer No Search"
                  />
                  <span>
                    <i
                      className="fa-solid fa-magnifying-glass"
                      onClick={handleCustData}
                    />
                  </span>
                </div>
              </div>
              <div className="w-100">
                {userData && <h4 className="mb-4">{userData.NAME}</h4>}
                <div className="row gy-3">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12">
                    <label className="d-block mb-2">Address Proof</label>
                    <button
                      className="btn btn-secondary addressbtn"
                      onClick={toggleAddress}
                    >
                      View Documents
                    </button>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12">
                    <label className="d-block mb-2">ID Proof</label>
                    <button
                      className="btn btn-secondary identity"
                      onClick={toggleIdentity}
                    >
                      View Documents
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-5 proof-wrapper">
                    {addressVisible && userData?.Adhar && (
                      <div className="address">
                        <figure>
                          <img
                            className="img-fluid"
                            src={userData.Adhar}
                            alt="Adhar Image"
                          />
                        </figure>
                      </div>
                    )}

                    {panVisible && userData?.Pan && (
                      <div className="pan">
                        <figure>
                          <img
                            className="img-fluid"
                            src={userData.Pan}
                            alt="PAN Image"
                          />
                        </figure>
                      </div>
                    )}
                  </div>
                  {/* <div className="col-12 mt-5 proof-wrapper">
           {addressVisible && (
          <div className="address">
            <figure>
              <img
                className="img-fluid"
                src={userData?.Adhar || adhar}
                alt="Adhar Image"
              />
            </figure>
          </div>
        )}

        {panVisible && (
          <div className="pan">
            <figure>
              <img
                className="img-fluid"
                src={userData?.Pan || pan}
                alt="PAN Image"
              />
            </figure>
          </div>
        )}
      </div> */}
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mx-auto mb-5">
              <div className="btns mb-4 text-center">
                {/* <a href="#" className="btn btn-primary me-3" onClick="toggleForm()">Add</a> */}
                <a href="#" className="btn btn-primary me-3">
                  Add
                </a>
                {/* <a href="#" className="btn btn-secondary" onClick={handleModify}> */}
                <a href="#" className="btn btn-secondary" onClick={handleModifyClick}>
                  Modify
                </a>
              </div>
              <div className="tab-container">
                <div className="tab-nav">
                  <div className="tab is-desktop">
                    <div className="d-flex align-items-center justify-content-center tab-btn">
                      <button
                        className="tablinks btn"
                        id="defaultOpen"
                        onClick={(e) => openTab(e, "tab1")}
                      >
                        Legal
                      </button>
                      <button
                        className="tablinks btn"
                        onClick={(e) => openTab(e, "tab2")}
                      >
                        Related Person
                      </button>
                    </div>
                  </div>
                  <div className="select">
                    <select
                      className="is-mobile"
                      onChange={(e) => openTab(e, e.target.value)}
                    >
                      <option value="tab1">Legal</option>
                      <option value="tab2">Related Person</option>
                    </select>
                  </div>
                </div>
                {/* {isEditMode && ( */}

                <div id="tab1" className="tabcontent">
                  {/* <form onSubmit={handleSubmit} action> */}
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Cust No"
                          value={userData ? userData.custno : "Cust No"}
                          onChange={handleChange}
                          disabled={!isEditMode} // Disable editing when not in editable mode
                        />
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput2"
                          name="Individualname"
                          disabled={!isEditMode} // Disable editing when not in editable mode
                          value={userData.Individualname}
                          placeholder="Individual Customer"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                        <input
                          type="text"
                          name="Name"
                          disabled={!isEditMode} // Disable editing when not in editable mode
                          value={isEditMode ? userData.Name : (userData ? userData.NAME : "Enter Name")}
                          className="form-control"
                          id="exampleFormControlInput2"
                          placeholder="Enter Name"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="date"
                          className="form-control"
                          id="exampleFormControlInput3"
                          onChange={handleChange}
                          value={
                            userData && userData.DOB
                              ? convertToDateInputFormat(userData.DOB)
                              : "DOB"
                          }
                        />{" "}
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange}
                          id="exampleFormControlInput4"
                          placeholder="UID"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput3"
                          placeholder="Registration Certificate No"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput4"
                          placeholder="Certificate of Incorporation"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput3"
                          placeholder="Mobile Number"
                          onChange={handleChange}
                          value={userData ? userData.MOBNO : "Mobile Number"}
                        />
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput4"
                          placeholder="House"
                          onChange={handleChange}
                          value={userData ? userData.HOUSE : "HOUSE"}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput3"
                          onChange={handleChange}
                          placeholder="LOC"
                          value={userData ? userData.LOC : "LOC"}
                        />
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput4"
                          onChange={handleChange}
                          placeholder="VTC"
                          value={userData ? userData.VTC : "VTC"}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput3"
                          onChange={handleChange}
                          placeholder="District"
                          value={userData ? userData.District : "District"}
                        />
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange}
                          id="exampleFormControlInput4"
                          placeholder="Sub District"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput3"
                          onChange={handleChange}
                          placeholder="State"
                        />
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput4"
                          onChange={handleChange}
                          placeholder="Pin Code"
                          value={userData ? userData.Pin : "Pin Code"}
                        />
                      </div>
                    </div>
                    <div className="row">
                <div className="col-12 text-center mt-3">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </div>
                  </form>
                </div>
                  {/* )} */}
                          {/* {isEditMode && ( */}

                <div id="tab2" className="tabcontent">
                  {/* <form action onSubmit={handleSubmit}> */}
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="ControlInput1"
                          onChange={handleChange}
                          placeholder="Enter Customer No"
                          value={userData ? userData.custno : "Cust No"}
                        />
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="ControlInput2"
                          onChange={handleChange}
                          placeholder="Individual Customer"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="ControlInput3"
                          onChange={handleChange}
                          placeholder="Enter Name"
                          value={userData ? userData.NAME : "Legal Name"}
                        />
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="date"
                          className="form-control"
                          id="ControlInput4"
                          onChange={handleChange}
                          placeholder="Enter Date of Birth"
                          value={
                            userData && userData.DOB
                              ? convertToDateInputFormat(userData.DOB)
                              : "DOB"
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange}
                          id="ControlInput5"
                          placeholder="UID"
                        />
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange}
                          id="ControlInput8"
                          placeholder="Mobile Number"
                          value={userData ? userData.MOBNO : "Mobile Number"}
                        />
                      </div>
                    </div>
                    {/* <div className="row">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                  <input type="text" className="form-control" id="ControlInput7" placeholder="Certificate of Incorporation" />
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                  <input type="text" className="form-control" id="ControlInput8" placeholder="Mobile Number" value={userData ? userData.MOBNO : 'Mobile Number'}/>
                </div>
              </div> */}
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="ControlInput9"
                          placeholder="House"
                          onChange={handleChange}
                          value={userData ? userData.HOUSE : "House"}
                        />
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="ControlInput10"
                          onChange={handleChange}
                          placeholder="LOC"
                          value={userData ? userData.LOC : "LOC"}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="ControlInput11"
                          onChange={handleChange}
                          placeholder="VTC"
                          value={userData ? userData.VTC : "VTC"}
                        />
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="ControlInput12"
                          onChange={handleChange}
                          placeholder="District"
                          value={userData ? userData.District : "District"}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="ControlInput13"
                          onChange={handleChange}
                          placeholder="Sub District"
                        />
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="ControlInput14"
                          onChange={handleChange}
                          placeholder="State"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="ControlInput15"
                          onChange={handleChange}
                          placeholder="Pin Code"
                          value={userData ? userData.RELPin : "Pin Code"}
                        />
                      </div>
                    </div>
                    <div className="row">
                <div className="col-12 text-center mt-3">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </div>
                  </form>
                </div>
                  {/* )} */}
                {/* <div className="row">
                  <div className="col-12 text-center mt-3">
                    <button type="button" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
                       */}

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
