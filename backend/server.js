import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "25mb" }));

// ========== NODEMAILER SETUP ==========
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "technoerror404@gmail.com",
    pass: "mefu lpsl wlmv bagm",
  },
});

// Store orders in memory (in production, use a database)
let orders = [];
let orderCounter = 1;

// ========== SEND CHECKOUT ORDER EMAIL ==========
app.post("/send-order", async (req, res) => {
  console.log("🔥 /send-order HIT");
  const { firstName, lastName, email, message, address, billingMethod, cartItems, totalPrice } = req.body;

  // Generate order ID
  const orderId = `ORD${Date.now().toString().slice(-8)}`;
  const orderDate = new Date().toLocaleString();

  console.log("📨 Received order data:", {
    orderId, firstName, lastName, email, address, billingMethod, totalPrice
  });

  // Store order in memory
  const newOrder = {
    orderId,
    firstName,
    lastName,
    email,
    message: message || "No message provided",
    address,
    billingMethod,
    cartItems,
    totalPrice,
    status: "Pending",
    orderDate,
    completionDate: null
  };
  
  orders.push(newOrder);

  const formattedItems = cartItems
    .map((item) => {
      let itemText = `• ${item.title} — Qty: ${item.qty} — ₱${item.price}`;
      if (item.flowerQty) itemText += ` — ${item.flowerQty}`;
      if (item.size) itemText += ` — ${item.size}`;
      if (item.addOns) itemText += ` — ${item.addOns}`;
      return itemText;
    })
    .join("\n");

  // -----------------------------
  // EMAIL TO STORE OWNER (YOU) - WITH ADMIN LINK
  // -----------------------------
  const adminMail = {
    from: `"MAICRAFTS Store" <technoerror404@gmail.com>`,
    to: "technoerror404@gmail.com",
    subject: `🛒 New Order #${orderId} from ${firstName} ${lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #462c14;">🛒 New Order Received!</h2>
        
        <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #462c14; margin-top: 0;">Order #${orderId}</h3>
          <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Payment Method:</strong> ${billingMethod}</p>
          <p><strong>Total:</strong> ₱${totalPrice}</p>
          <p><strong>Status:</strong> <span style="color: #ff9900; font-weight: bold;">Pending</span></p>
        </div>

        <div style="background: #f8f8f8; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #462c14; margin-top: 0;">Order Summary</h3>
          <div style="font-size: 14px; line-height: 1.6;">
            ${formattedItems.split('\n').map(item => `<p style="margin: 8px 0;">${item}</p>`).join('')}
          </div>
        </div>

        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #28a745;">
          <h3 style="color: #28a745; margin-top: 0;">📋 Admin Actions</h3>
          <p>When the order is complete, click below to notify the customer:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="http://localhost:5000/complete-order/${orderId}" 
               style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              ✅ Mark Order as Complete
            </a>
          </div>
          <p style="font-size: 12px; color: #666;">
            This link will send a completion email to ${email}
          </p>
        </div>

        <hr style="border: 1px solid #ddd; margin: 25px 0;"/>
        
        <p style="color: #666; font-size: 14px;">
          <strong>Customer Message:</strong><br/>
          ${message || "No message provided"}
        </p>
        
        <p style="margin-top: 30px; color: #888; font-size: 14px;">
          Order Date: ${orderDate}<br/>
          Order ID: ${orderId}
        </p>
      </div>
    `,
    text: `
NEW ORDER RECEIVED!

Order #${orderId}
Customer: ${firstName} ${lastName}
Email: ${email}
Address: ${address}
Payment Method: ${billingMethod}
Total: ₱${totalPrice}
Status: Pending

ORDER SUMMARY:
${formattedItems}

ADMIN ACTION:
When order is complete, use this link to notify customer:
http://localhost:5000/complete-order/${orderId}

CUSTOMER MESSAGE:
${message || "No message provided"}

Order Date: ${orderDate}
    `
  };

  // -----------------------------
  // EMAIL TO CUSTOMER
  // -----------------------------
  const customerMail = {
    from: `"MAICRAFTS" <technoerror404@gmail.com>`,
    to: email,
    subject: `Thank you for your order #${orderId}, ${firstName}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #462c14; border-bottom: 2px solid #ffbd3a; padding-bottom: 10px;">
          Thank you for your order, ${firstName}!
        </h2>
        
        <p>Hi <strong>${firstName} ${lastName}</strong>,</p>
        <p>We have received your order <strong>#${orderId}</strong> and will process it shortly.</p>
        
        <div style="background: #f8f8f8; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffbd3a;">
          <h3 style="color: #462c14; margin-top: 0;">Order Details</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Status:</strong> <span style="color: #ff9900; font-weight: bold;">Pending</span></p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Payment Method:</strong> ${billingMethod}</p>
        </div>

        <div style="background: #f8f8f8; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #28a745;">
          <h3 style="color: #462c14; margin-top: 0;">Order Summary</h3>
          <div style="font-size: 14px; line-height: 1.6;">
            ${formattedItems.split('\n').map(item => `<p style="margin: 8px 0;">${item}</p>`).join('')}
          </div>
          <p style="font-size: 18px; font-weight: bold; color: #28a745; margin-top: 15px;">
            Total Amount: ₱${totalPrice}
          </p>
        </div>

        <div style="background: #fff8e1; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <h4 style="color: #462c14; margin-top: 0;">⏳ What happens next?</h4>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>We'll prepare your order (1-2 days)</li>
            <li>You'll receive another email when it's complete</li>
            <li>Delivery will be scheduled (2-3 days)</li>
            <li>Our team will contact you for delivery details</li>
          </ul>
        </div>

        <hr style="border: 1px solid #ddd; margin: 25px 0;"/>
        
        <p style="color: #666;">
          If you have any questions, reply to this email or contact us.
        </p>
        
        <p style="margin-top: 30px; color: #888; font-size: 14px;">
          <strong>MAICRAFTS.PH</strong><br/>
          Order Date: ${new Date().toLocaleDateString()}
        </p>
      </div>
    `
  };

  try {
    // Send emails
    await transporter.sendMail(adminMail);
    console.log(`📧 Sending confirmation email to: ${email}`);
    await transporter.sendMail(customerMail);

    console.log("✅ Order emails sent successfully!");
    console.log(`📋 Order ID: ${orderId}`);
    console.log(`💰 Payment Method: ${billingMethod}`);

    res.json({ 
      success: true, 
      message: "Emails sent successfully!",
      orderId: orderId 
    });

  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send emails." });
  }
});

// ========== MARK ORDER AS COMPLETE (ADMIN LINK) ==========
app.get("/complete-order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  
  console.log(`🔄 Marking order ${orderId} as complete...`);
  
  // Find the order
  const orderIndex = orders.findIndex(order => order.orderId === orderId);
  
  if (orderIndex === -1) {
    return res.status(404).send(`
      <html>
        <head><title>Order Not Found</title></head>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h2 style="color: #dc3545;">❌ Order Not Found</h2>
          <p>Order #${orderId} was not found in our system.</p>
          <p><a href="/">Go back</a></p>
        </body>
      </html>
    `);
  }

  const order = orders[orderIndex];
  
  // Update order status
  orders[orderIndex].status = "Completed";
  orders[orderIndex].completionDate = new Date().toLocaleString();

  try {
    // Send completion email to customer
    const completionMail = {
      from: `"MAICRAFTS" <technoerror404@gmail.com>`,
      to: order.email,
      subject: `🎉 Your Order #${orderId} is Complete!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #28a745; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
            Your Order is Complete! 🎉
          </h2>
          
          <p>Hi <strong>${order.firstName} ${order.lastName}</strong>,</p>
          <p>Great news! Your order <strong>#${orderId}</strong> has been completed and is ready!</p>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #28a745; margin-top: 0;">✅ Order Status Updated</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">COMPLETED</span></p>
            <p><strong>Completion Date:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #462c14; margin-top: 0;">📦 Delivery Information</h3>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Payment Method:</strong> ${order.billingMethod}</p>
            <p><strong>Total Amount:</strong> ₱${order.totalPrice}</p>
          </div>

          <div style="background: #fff8e1; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #462c14; margin-top: 0;">🚚 What happens next?</h4>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Your order is packed and ready</li>
              <li>Delivery will be scheduled within 24-48 hours</li>
              <li>Our delivery team will contact you shortly</li>
              <li>Please prepare payment if you chose COD</li>
            </ul>
          </div>

          <hr style="border: 1px solid #ddd; margin: 25px 0;"/>
          
          <p style="color: #666;">
            If you have any questions, reply to this email.
          </p>
          
          <p style="margin-top: 30px; color: #888; font-size: 14px;">
            <strong>MAICRAFTS.PH</strong><br/>
            Thank you for your order! ❤️
          </p>
        </div>
      `,
      text: `
🎉 Your Order is Complete!

Hi ${order.firstName} ${order.lastName},

Great news! Your order #${orderId} has been completed and is ready!

✅ ORDER STATUS:
- Order ID: ${orderId}
- Status: COMPLETED
- Completion Date: ${new Date().toLocaleString()}

📦 DELIVERY INFORMATION:
- Address: ${order.address}
- Payment Method: ${order.billingMethod}
- Total Amount: ₱${order.totalPrice}

🚚 WHAT HAPPENS NEXT:
• Your order is packed and ready
• Delivery will be scheduled within 24-48 hours
• Our delivery team will contact you shortly
• Please prepare payment if you chose COD

If you have any questions, reply to this email.

MAICRAFTS.PH
Thank you for your order! ❤️
      `
    };

    // Also notify admin that completion email was sent
    const adminNotification = {
      from: `"MAICRAFTS System" <technoerror404@gmail.com>`,
      to: "technoerror404@gmail.com",
      subject: `✅ Order #${orderId} marked as complete`,
      text: `Order #${orderId} for ${order.firstName} ${order.lastName} has been marked as complete.
      
A completion email has been sent to: ${order.email}
      
Completion time: ${new Date().toLocaleString()}
      `
    };

    await transporter.sendMail(completionMail);
    await transporter.sendMail(adminNotification);

    console.log(`✅ Completion email sent for order ${orderId} to ${order.email}`);

    // Send success response
    res.send(`
      <html>
        <head>
          <title>Order Complete</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f8f9fa; }
            .success-box { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto; }
            .success-icon { font-size: 60px; color: #28a745; margin-bottom: 20px; }
            .order-id { background: #e8f5e8; padding: 10px; border-radius: 5px; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="success-box">
            <div class="success-icon">✅</div>
            <h2 style="color: #28a745;">Order Marked as Complete!</h2>
            <p>Order <strong class="order-id">#${orderId}</strong> has been marked as complete.</p>
            <p>A completion email has been sent to:</p>
            <p><strong>${order.email}</strong></p>
            
            <div style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
              <p><strong>Customer:</strong> ${order.firstName} ${order.lastName}</p>
              <p><strong>Total Amount:</strong> ₱${order.totalPrice}</p>
              <p><strong>Completion Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              You can close this window. The customer has been notified.
            </p>
          </div>
        </body>
      </html>
    `);

  } catch (error) {
    console.error("❌ Error sending completion email:", error);
    res.status(500).send(`
      <html>
        <head><title>Error</title></head>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h2 style="color: #dc3545;">❌ Error</h2>
          <p>Failed to send completion email. Please try again.</p>
          <p>Error: ${error.message}</p>
        </body>
      </html>
    `);
  }
});

// ========== GET ALL ORDERS (FOR ADMIN VIEW) ==========
app.get("/orders", (req, res) => {
  res.json({
    success: true,
    count: orders.length,
    orders: orders.map(order => ({
      orderId: order.orderId,
      customer: `${order.firstName} ${order.lastName}`,
      email: order.email,
      total: order.totalPrice,
      status: order.status,
      orderDate: order.orderDate,
      completionDate: order.completionDate,
      address: order.address,
      billingMethod: order.billingMethod
    }))
  });
});

// ========== GET SINGLE ORDER ==========
app.get("/orders/:orderId", (req, res) => {
  const { orderId } = req.params;
  const order = orders.find(o => o.orderId === orderId);
  
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  
  res.json({ success: true, order });
});

// ========== HOME PAGE ==========
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>MAICRAFTS Order System</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .container { max-width: 600px; margin: 0 auto; }
          .order-link { background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🛍️ MAICRAFTS Order System</h1>
          <p>Total Orders: ${orders.length}</p>
          <div>
            <a href="/orders" class="order-link">View All Orders</a>
            <a href="https://mail.google.com" class="order-link" target="_blank">Check Email</a>
          </div>
        </div>
      </body>
    </html>
  `);
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
  console.log("📧 Admin interface: http://localhost:5000");
  console.log("📋 Orders API: http://localhost:5000/orders");
});