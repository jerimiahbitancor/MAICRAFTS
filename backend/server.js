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
    user: "plppasig2@gmail.com",
    pass: "YOUR_APP_PASSWORD",
  },
});

// ========== SEND CHECKOUT ORDER EMAIL ==========
app.post("/send-order", async (req, res) => {
  const { firstName, lastName, email, message, cartItems, totalPrice } = req.body;

  const formattedItems = cartItems
    .map(
      (item) => `• ${item.name} — Qty: ${item.quantity} — ₱${item.price}`
    )
    .join("\n");

  const mailOptions = {
    from: `"Online Store" <YOUR_EMAIL@gmail.com>`,
    to: "YOUR_EMAIL@gmail.com",
    subject: `New Order from ${firstName} ${lastName}`,
    text: `
New Order Details:

Customer:
Name: ${firstName} ${lastName}
Email: ${email}

Message:
${message || "No message"}

-----------------------------------
Order Summary:
${formattedItems}

Total Amount: ₱${totalPrice}
-----------------------------------
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email Sent Successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// ========== SEND CUSTOM ORDER EMAIL ==========
app.post("/send-custom-order", async (req, res) => {
  const {
    productType,
    customDescription,
    sizeScale,
    additionalRequests,
    contactNumber,
    uploadedImage, // Base64 image string
  } = req.body;

  const mailOptions = {
    from: `"MAICRAFTS.PH" <YOUR_EMAIL@gmail.com>`,
    to: "YOUR_EMAIL@gmail.com",
    subject: `New Custom Order (${productType})`,
    html: `
      <h2>New Custom Order</h2>

      <p><strong>Product Type:</strong> ${productType}</p>
      <p><strong>Description:</strong> ${customDescription}</p>
      <p><strong>Size Scale:</strong> ${sizeScale}</p>
      <p><strong>Additional Requests:</strong> ${additionalRequests}</p>
      <p><strong>Contact Number:</strong> ${contactNumber}</p>

      <hr />
      <h3>Uploaded Image:</h3>
      ${
        uploadedImage
          ? `<img src="${uploadedImage}" alt="Uploaded Image" style="max-width:300px; border:1px solid #ccc;" />`
          : "<p>No image uploaded.</p>"
      }
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending custom order:", error);
    res.status(500).json({ success: false });
  }
});

// ========== SERVER START ==========
app.listen(4000, () => console.log("Server running on port 4000"));
