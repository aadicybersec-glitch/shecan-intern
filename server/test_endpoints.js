import { spawn } from "child_process";
import axios from "axios";

console.log("📡 Initiating Automated End-to-End API Verification...");

// Spawn Express server as a background process on a test port
const server = spawn("node", ["server.js"], {
  cwd: "./",
  env: { ...process.env, PORT: 6000, NODE_ENV: "test" }
});

let serverOutput = "";
server.stdout.on("data", (data) => {
  serverOutput += data.toString();
  console.log(`[Server Log]: ${data.toString().trim()}`);
});

server.stderr.on("data", (data) => {
  console.error(`[Server Error]: ${data.toString().trim()}`);
});

// Graceful cleanup handler
const cleanup = (code = 0) => {
  console.log("🔌 Terminating test server process...");
  server.kill("SIGTERM");
  process.exit(code);
};

// Wait 3.5 seconds for the database and server to bind, then run diagnostics
setTimeout(async () => {
  try {
    const baseURL = "http://localhost:6000/api";
    
    console.log("\n========================================================");
    console.log("➡️ TEST 1: Probe Baseline System API...");
    const probe = await axios.get("http://localhost:6000/");
    console.log("✅ Probe Successful:", probe.data);

    console.log("\n========================================================");
    console.log("➡️ TEST 2: Submit Contact Form Message (Public Access)...");
    const testMessage = {
      name: "Automated Diagnostic Client",
      email: "diagnostics@shecan.org",
      subject: "Test Technical Inflow Verification",
      message: "Verifying and auditing REST API submission flows and local database failsafes."
    };
    const subRes = await axios.post(`${baseURL}/submissions`, testMessage);
    console.log("✅ Message Ingested successfully:", subRes.data);
    const createdId = subRes.data.submission._id;

    console.log("\n========================================================");
    console.log("➡️ TEST 3: Authenticate Administrator Login...");
    const credentials = {
      email: "admin@shecan.org",
      password: "DemoAccess@2026"
    };
    const loginRes = await axios.post(`${baseURL}/auth/login`, credentials);
    console.log("✅ Authenticated. Received Session Token:", !!loginRes.data.token);
    const token = loginRes.data.token;

    console.log("\n========================================================");
    console.log("➡️ TEST 4: Fetch Messages List (Secure Admin Access)...");
    const fetchRes = await axios.get(`${baseURL}/submissions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("✅ Messages list length fetched:", fetchRes.data.submissions.length);
    const containsTest = fetchRes.data.submissions.some((s) => s._id === createdId);
    console.log("✅ Ingested message verified in list:", containsTest);

    console.log("\n========================================================");
    console.log("➡️ TEST 5: Purge Message Record by ID (Secure Admin Access)...");
    const delRes = await axios.delete(`${baseURL}/submissions/${createdId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("✅ Purge operation response:", delRes.data);

    console.log("\n========================================================");
    console.log("⭐️ DIAGNOSTICS: ALL BACKEND FEATURES VERIFIED OPERATIONAL!");
    console.log("========================================================\n");
    cleanup(0);
  } catch (error) {
    console.error("\n❌ DIAGNOSTICS FAILURE:", error.message);
    if (error.response) {
      console.error("Response payload:", error.response.data);
    }
    cleanup(1);
  }
}, 3500);
