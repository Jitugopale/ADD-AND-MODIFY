import express from "express";
import connectToMongo from "./db/db.js";
import cors from "cors";
import router from "./routes/authroutes.js"
import KYC from './models/kycSchema.js'; // Assuming you have a KYC model
const app = express();
const JWT_SECRET ='Romanisagood$boy';
import jwt from 'jsonwebtoken';  // Assuming you're using JWT for authentication
import qs from 'qs';  // Import qs to handle query string serialization
import axios from 'axios';


// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'auth-token', 'token','authtoken','authToken'], 
}));
app.use(express.json());

// Connect to MongoDB
connectToMongo();

// Proxy route to handle the login request


app.post("/login", async (req, res) => {
    try {
      const { UserName, Password } = req.body;
  
      const queryParams = qs.stringify({
        UserName,
        Password,
      });
  
      const response = await axios.get(`http://192.168.20.151:90/7064/login1.aspx?${queryParams}`);
  
      if (response.data) {
        const { Agent_No, Agent_Name, BankCode, BankName, Branch, BranchName } = response.data;
  
        let kyc = await KYC.findOne({ Agent_No });
  
        if (!kyc) {
          kyc = new KYC({
            Agent_No,
            Agent_Name,
            BankCode,
            BankName,
            Branch,
            BranchName,
          });
  
          await kyc.save();
        }
  
        // Create a JWT token after login
        const authToken = jwt.sign({ Agent_No }, JWT_SECRET, { expiresIn: '1h' });
  
        // Send token to frontend
        res.json({ message: "Login successful", authToken });
      } else {
        res.status(400).json({ error: "Invalid credentials" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to login", details: err.message });
    }
  });
  

  app.get("/getdata", async (req, res) => {
    try {
        console.log("Request Headers:", req.headers);  // Log headers to see if authToken is being sent

      // Extract the token from the custom header 'authToken'
      const authToken = req.headers.authtoken;
  
      if (!authToken) {
        return res.status(403).json({ error: "No token provided" });
      }
  
      // Verify the JWT token to get the user data
      const decoded = jwt.verify(authToken, JWT_SECRET);
  
      // Assuming the decoded token contains the Agent_No (or similar identifier)
      const { Agent_No } = decoded;
  
      // Fetch the KYC record for the logged-in user using the Agent_No
      const kycData = await KYC.findOne({ Agent_No });
  
      if (!kycData) {
        return res.status(404).json({ error: "User data not found" });
      }
  
      // Send the individual KYC data for the logged-in user
      res.json(kycData);
    } catch (err) {
      console.error("Error retrieving KYC data:", err);  // Log the error for debugging
      res.status(500).json({ error: "Failed to retrieve KYC data", details: err.message });
    }
  });
  

// Use routes
app.use("/api/auth", router);
app.use("/api/data", router);
app.use("/api/count", router);

app.get('/', (req, res) => {
  res.send('<h1>Server is running</h1>');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
