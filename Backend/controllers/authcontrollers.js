import qs from 'qs';  // Import qs to handle query string serialization
import axios from 'axios';
import DATA from '../models/UserData.js'; // Assuming you have a KYC model
import VerificationCount from "../models/VerificationCount.js"
// export const kycUserdata = async (req, res) => {
//   const { CUSTNO } = req.body;

//   if (!CUSTNO) {
//       return res.status(400).json({ error: 'CUSTNO is required' });
//   }

//   // Build query parameters
//   const queryParams = qs.stringify({ CUSTNO });

//   // Check if KYC data already exists in the database
//   const existingUser = await DATA.findOne({ CUSTNO });
//   if (existingUser) {
//       return res.status(200).json({
//           status: 'success',
//           message: 'Already KYC details fetched and saved successfully.',
//           verifiedData: existingUser.verifiedData, // Returning existing verified data
//       });
//   }

//   try {
//       const response = await axios.get(
//           `http://192.168.20.151:90/7064/frmkycdetails.aspx?${queryParams}`
//       );

//       const formatDateAndTime = (isoString) => {
//         const date = new Date(isoString);

//         // Format the date as "DD-MM-YYYY"
//         const formattedDate = date.toLocaleDateString('en-GB', {
//           day: '2-digit',
//           month: '2-digit',
//           year: 'numeric',
//         });

//         // Format the time as "hh:mm AM/PM"
//         const formattedTime = date.toLocaleTimeString('en-US', {
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: true,
//         });

//         return { formattedDate, formattedTime };
//       };

//       // Get the current date and time
//       const currentDateTime = new Date();
//       const { formattedDate, formattedTime } = formatDateAndTime(currentDateTime);

//       // Save the verified PAN details to the database
//       const newUser = new DATA({
//         CUSTNO,
//         createdAt: currentDateTime, // ISO timestamp
//         formattedDate, // "DD-MM-YYYY"
//         formattedTime, // "hh:mm AM/PM"
//         verifiedData: response.data, // Store response data in verifiedData field
//       });

//       // Save user to the database
//       await newUser.save();

//       // Send response after saving data
//       res.status(200).json({
//         status: 'success',
//         message: 'KYC details fetched and saved successfully.',
//         verifiedData: response.data, // Returning the fetched data
//       });

//       // Update the verification count for Voter card in the database
//       await updateVerificationCount('user');

//   } catch (error) {
//       console.error('Error verifying User KYC:', error.message);

//       if (error.response) {
//           // Handle response error from external API
//           res.status(error.response.status).json(error.response.data); 
//       } else {
//           // Internal error
//           res.status(500).json({ error: 'Internal Server Error' }); 
//       }
//   }
// };

//Already Exists
// export const kycUserdata = async (req, res) => {
//   try {
//     const { CUSTNO } = req.body;

//     // Build query parameters
//     const queryParams = qs.stringify({ CUSTNO });

//     // Make API request
//     const response = await axios.get(`http://192.168.20.151:90/7064/frmkycdetails.aspx?${queryParams}`);
//     const custno = req.body.CUSTNO;
//     // await updateVerificationCount('user');

//     // Check if the data exists
//     if (response.data && Array.isArray(response.data) && response.data.length > 0) {
//       const {
//         NAME,
//         DOB,
//         MOBNO,
//         UID,
//         HOUSE,
//         LOC,
//         VTC,
//         District,
//         City,
//         Pin,
//         StateCode,
//         FatherName,
//         GENDER,
//         DateOfApplication,
//         PAN,
//         RELADDLINE1,
//         RELADDLINE2,
//         RELADDLINE3,
//         RELDistrict,
//         RELCity,
//         RELPin,
//         RELStateCode,
//         Type,
//         RegiCerti,
//         Certi_Inco
//       } = response.data[0];  // Assuming data is an array and we're interested in the first object

//       // Check if this record already exists in the database using CUSTNO
//       let UserData = await DATA.findOne({ custno });

//       if (UserData) {
//         // If user exists, return the existing user data with a message
//         return res.json({ message: "User already exists", UserData });
//       }

//       // If no existing record, create a new UserData entry
//       UserData = new DATA({
//         custno,
//         NAME,
//         DOB,
//         MOBNO,
//         UID,
//         HOUSE,
//         LOC,
//         VTC,
//         District,
//         City,
//         Pin,
//         StateCode,
//         FatherName,
//         GENDER,
//         DateOfApplication,
//         PAN,
//         RELADDLINE1,
//         RELADDLINE2,
//         RELADDLINE3,
//         RELDistrict,
//         RELCity,
//         RELPin,
//         RELStateCode,
//         Type,
//         RegiCerti,
//         Certi_Inco
//       });

//       // Save the new document to the database
//       await UserData.save();

//       // Send the response after saving the data
//       res.json({ message: "KYC details fetched and saved successfully", UserData });

//     } else {
//       // Handle error if no data is returned or the format is incorrect
//       res.status(400).json({ error: "Invalid or missing data from the API response" });
//     }

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch KYC details", details: err.message });
//   }
// }
//Main
// export const kycUserdata = async (req,res) => {
//   try {
//     const { CUSTNO } = req.body;

//     // Build query parameters
//     const queryParams = qs.stringify({ CUSTNO });

//     // Make API request
//     const response = await axios.get(`http://192.168.20.151:90/7064/frmkycdetails.aspx?${queryParams}`);
//     const custno = req.body.CUSTNO

//     // Check if the data exists
//     if (response.data && Array.isArray(response.data) && response.data.length > 0) {
//       const {
//         NAME,
//         DOB,
//         MOBNO,
//         UID,
//         HOUSE,
//         LOC,
//         VTC,
//         District,
//         City,
//         Pin,
//         StateCode,
//         FatherName,
//         GENDER,
//         DateOfApplication,
//         PAN,
//         RELADDLINE1,
//         RELADDLINE2,
//         RELADDLINE3,
//         RELDistrict,
//         RELCity,
//         RELPin,
//         RELStateCode,
//         Type,
//         RegiCerti,
//         Certi_Inco
//       } = response.data[0];  // Assuming data is an array and we're interested in the first object

//       // Check if this record already exists in the database using CUSTNO
//       let UserData = await DATA.findOne({ custno });

//       if (!UserData) {
//         // If no existing record, create a new UserData entry
//         UserData = new DATA({
//           custno,
//           NAME,
//           DOB,
//           MOBNO,
//           UID,
//           HOUSE,
//           LOC,
//           VTC,
//           District,
//           City,
//           Pin,
//           StateCode,
//           FatherName,
//           GENDER,
//           DateOfApplication,
//           PAN,
//           RELADDLINE1,
//           RELADDLINE2,
//           RELADDLINE3,
//           RELDistrict,
//           RELCity,
//           RELPin,
//           RELStateCode,
//           Type,
//           RegiCerti,
//           Certi_Inco
//         });

//         // Save the new document to the database
//         await UserData.save();
//       }

//       // Send the response after saving the data
//       res.json({ message: "KYC details fetched and saved successfully", UserData });

//     } else {
//       // Handle error if no data is returned or the format is incorrect
//       res.status(400).json({ error: "Invalid or missing data from the API response" });
//     }

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch KYC details", details: err.message });
//   }
// }

export const kycUserdata = async (req, res) => {
  try {
    const { CUSTNO } = req.body;

    // Build query parameters for both API calls
    const queryParams = qs.stringify({ CUSTNO });

    // Call both APIs concurrently using Promise.all
    const [apiResponse1, apiResponse2] = await Promise.all([
      axios.get(`http://192.168.20.151:90/7064/frmkycdetails.aspx?${queryParams}`),
      axios.get(`http://192.168.20.151:90/7064/FrmShowUploadedImg.aspx?${queryParams}`) // Second API endpoint
    ]);

    // Process the first API response
    const response1Data = apiResponse1.data;
    // Process the second API response
    const response2Data = apiResponse2.data;

    const custno = req.body.CUSTNO;
    await updateVerificationCount('user');

    // Check if the data exists from the first API
    if (response1Data && Array.isArray(response1Data) && response1Data.length > 0) {
      const {
        NAME,
        DOB,
        MOBNO,
        UID,
        HOUSE,
        LOC,
        VTC,
        District,
        City,
        Pin,
        StateCode,
        FatherName,
        GENDER,
        DateOfApplication,
        PAN,
        RELADDLINE1,
        RELADDLINE2,
        RELADDLINE3,
        RELDistrict,
        RELCity,
        RELPin,
        RELStateCode,
        Type,
        RegiCerti,
        Certi_Inco
      } = response1Data[0];  // Assuming data is an array and we're interested in the first object

      // Check if this record already exists in the database using CUSTNO
      let UserData = await DATA.findOne({ custno });

      // if (UserData) {
      //   // If user exists, return the existing user data with a message
      //   return res.json({ message: "User already exists", UserData });
      // }
      if (!UserData) {

      // If no existing record, create a new UserData entry
      UserData = new DATA({
        custno,
        NAME,
        DOB,
        MOBNO,
        UID,
        HOUSE,
        LOC,
        VTC,
        District,
        City,
        Pin,
        StateCode,
        FatherName,
        GENDER,
        DateOfApplication,
        PAN,
        RELADDLINE1,
        RELADDLINE2,
        RELADDLINE3,
        RELDistrict,
        RELCity,
        RELPin,
        RELStateCode,
        Type,
        RegiCerti,
        Certi_Inco,
        // Add the second API response data to the user data
        Photo: response2Data[0]?.Photo || '',
        Pan: response2Data[0]?.Pan || '',
        Adhar: response2Data[0]?.Adhar || '',
        Inco_Certi: response2Data[0]?.Inco_Certi || '',
        RegiCerti: response2Data[0]?.RegiCerti || ''
      });

      // Save the new document to the database
      await UserData.save();
    }

      // Send the response after saving the data
      res.json({ message: "KYC details fetched and saved successfully", UserData, apiResponse2: response2Data });

    } else {
      // Handle error if no data is returned or the format is incorrect
      res.status(400).json({ error: "Invalid or missing data from the first API response" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch KYC details from both APIs", details: err.message });
  }
}

export const kycUpdatedata = async (req, res) => {
  const { custno, NAME, DOB, MOBNO, UID, HOUSE, LOC, VTC, District, City, Pin, StateCode, FatherName, GENDER, DateOfApplication, PAN, RELADDLINE1, RELADDLINE2, RELADDLINE3, RELDistrict, RELCity, RELPin, RELStateCode, Type, RegiCerti, Certi_Inco } = req.body; 
  try {
      const user = await DATA.findOneAndUpdate(
        { custno },
        {
            NAME, DOB, MOBNO, UID, HOUSE, LOC, VTC, District, City, Pin, StateCode, FatherName, GENDER, DateOfApplication, PAN, RELADDLINE1, RELADDLINE2, RELADDLINE3, RELDistrict, RELCity, RELPin, RELStateCode, Type, RegiCerti, Certi_Inco,
        },
        { new: true, runValidators: true }
      );
      if (user) {
          res.status(200).json({ success: true, data: user });
      } else {
          res.status(404).json({ success: false, message: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
}


export const updateVerificationCount = async (verificationType) => {
  try {
    // Fetch the current verification count data from the database
    const countData = await VerificationCount.findOne();

    if (!countData) {
      // If no count data exists, create a new one with the given verification type
      const newCountData = new VerificationCount({
        [verificationType]: 1,
      });
      await newCountData.save();
    } else {
      // If the count data exists, increment the count for the specified verification type
      countData[verificationType] += 1;
      await countData.save();
    }
  } catch (error) {
    console.error('Error updating verification count:', error.message);
  }
};
