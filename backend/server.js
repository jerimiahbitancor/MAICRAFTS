import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "25mb" })); // IMPORTANT for Base64 images

// ========== NODEMAILER SETUP ==========
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "technoerror404@gmail.com",
    pass: "mefu lpsl wlmv bagm",
  },
});

// ========== SEND CHECKOUT ORDER EMAIL ==========
app.post("/send-order", async (req, res) => {
  const { firstName, lastName, email, message, cartItems, totalPrice } = req.body;

  const formattedItems = cartItems
    .map((item) => `• ${item.name} — Qty: ${item.quantity} — ₱${item.price}`)
    .join("\n");

  // -----------------------------
  // EMAIL TO STORE OWNER (YOU)
  // -----------------------------
  const adminMail = {
    from: `"Online Store" <technoerror404@gmail.com>`,
    to: "technoerror404@gmail.com",
    subject: `🛒 New Order from ${firstName} ${lastName}`,
    text: `
New Order Received:

Customer:
Name: ${firstName} ${lastName}
Email: ${email}

Message from customer:
${message || "No message provided"}

-----------------------------------
Order Summary:
${formattedItems}

Total Amount: ₱${totalPrice}
-----------------------------------
    `,
  };

  // -----------------------------
  // EMAIL TO CUSTOMER
  // -----------------------------
  const customerMail = {
    from: `"MAICRAFTS" <technoerror404@gmail.com>`,
    to: email,
    subject: `Thank you for your order, ${firstName}!`,
    html: `
      <h2>Thank you for your order!</h2>
      <p>Hi <strong>${firstName}</strong>,</p>
      <p>We have received your order and will process it shortly.</p>

      <h3>Order Summary</h3>
      <pre style="font-size:14px;">${formattedItems}</pre>

      <p><strong>Total Amount:</strong> ₱${totalPrice}</p>

      <hr/>
      <p>If you have questions, reply to this email anytime.</p>
      <p><strong>MAICRAFTS.PH</strong></p>
    `
  };

  try {
    // Send email to admin
    await transporter.sendMail(adminMail);

     // Log customer email target BEFORE sending
    console.log("Sending to customer:", customerMail.to);

    // Send email to customer
    await transporter.sendMail(customerMail);

    console.log("📧 Order emails sent (admin + customer)");

    res.json({ success: true, message: "Emails sent successfully!" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send emails." });
  }
});


app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
