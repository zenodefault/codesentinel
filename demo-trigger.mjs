import "dotenv/config";
import { sendWhatsAppApprovalRequest } from "./src/integrations/whatsapp-twilio.mjs";
    
     // REPLACE WITH YOUR ACTUAL WHATSAPP NUMBER
    const MY_NUMBER = "whatsapp:+919901472918"; 
    
 console.log("🚀 Sending WhatsApp trigger...");

 await sendWhatsAppApprovalRequest({
      to: MY_NUMBER,
      cveId: "CVE-2026-0429",
      dependency: "core-security-lib",
      prNumber: 1, // Any number for the demo
      buildPassed: true,
      licenseWarning: false
 });

   console.log("✅ Check your phone!");