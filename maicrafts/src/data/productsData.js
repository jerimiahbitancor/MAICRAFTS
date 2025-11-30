// CENTRALIZED PRODUCT STORAGE

export const products = [
    // Regular Gifts
    {
      id: "rainbow-rose-bouquet",
      img: "https://i.imgur.com/9g0h1i2.jpg",
      title: "Rainbow Rose Bouquet",
      price: 799,
      category: "Preserved Flowers",
      occasion: ["Birthday", "Celebration"],
      description:
        "A vibrant bouquet featuring multi-colored rainbow roses. Perfect for celebrations, birthdays, and anyone who loves unique floral arrangements.",
    },
    {
      id: "eternal-rose",
      img: "/flower1.svg",
      title: "Eternal Rose Bouquet",
      price: 159,
      category: "Preserved Flowers",
      occasion: ["Anniversary", "Romantic"],
      description:
        "A preserved eternal rose that lasts years without fading. A timeless symbol of love, ideal for anniversaries and romantic occasions.",
    },
  
    // Crochet (NEW fixed IDs)
    {
      id: "crochet-bunny-v1",
      img: "/crochet1.svg",
      title: "Handmade Crochet Bunny",
      price: 159,
      category: "Crochet Gifts",
      occasion: ["Birthday"],
      description:
        "A soft, adorable crochet bunny crafted with high-quality yarn. A perfect handmade gift for kids, couples, or collectors.",
    },
    {
      id: "24k-rose",
      img: "https://i.imgur.com/2p3q4r5.jpg",
      title: "24K Gold Dipped Rose",
      price: 1299,
      category: "Luxury Gifts",
      occasion: ["Anniversary", "Wedding"],
      description:
        "A real rose preserved and dipped in 24K gold. A luxurious keepsake gift for anniversaries, weddings, or special milestones.",
    },
  
    // Crochet Gifts — FIXED
    {
      id: "crochet-hello-kitty",
      img: new URL("../assets/doll.png", import.meta.url).href,
      title: "Handmade Crochet Hello Kitty",
      price: 100,
      category: "Crochet Gifts",
      occasion: ["Birthday", "Anniversary"],
      description:
        "A charming handmade crochet doll inspired by cute character themes. Soft, durable, and thoughtfully crafted.",
    },
    {
      id: "crochet-bunny-v2",
      img: new URL("../assets/doll2.png", import.meta.url).href,
      title: "Handmade Crochet Bunny v2",
      price: 120,
      category: "Crochet Gifts",
      occasion: ["Birthday"],
      description:
        "A sweet crochet bunny doll made with premium yarn. A perfect meaningful gift for children and loved ones.",
    },
    {
      id: "crochet-dog-v1",
      img: new URL("../assets/doll3.png", import.meta.url).href,
      title: "Handmade Crochet Dog",
      price: 130,
      category: "Crochet Gifts",
      occasion: ["Birthday"],
      description:
        "A cute handmade crochet dog plushie. Lightweight, soft, and perfect as a birthday or friendship gift.",
    },
    {
      id: "crochet-corpse-bride",
      img: new URL("../assets/doll4.png", import.meta.url).href,
      title: "Handmade Crochet Corpse Bride",
      price: 150,
      category: "Crochet Gifts",
      occasion: ["Anniversary", "Collector"],
      description:
        "A themed crochet doll inspired by gothic romance aesthetics. A wonderful gift for collectors and fans.",
    },
    {
      id: "crochet-dog-v2",
      img: new URL("../assets/doll5.png", import.meta.url).href,
      title: "Handmade Crochet Dog v2",
      price: 200,
      category: "Crochet Gifts",
      occasion: ["Birthday"],
      description:
        "A premium crochet dog plush with upgraded detailing and design. A unique handmade keepsake.",
    },
    {
      id: "crochet-couple-dolls",
      img: new URL("../assets/doll6.png", import.meta.url).href,
      title: "Crochet Couple Dolls",
      price: 300,
      category: "Crochet Gifts",
      occasion: ["Valentine's Day", "Anniversary"],
      description:
        "A pair of handmade crochet couple dolls symbolizing love and togetherness. Perfect for anniversaries and romantic gifts.",
    },
  
    // Preserved Flowers — FIXED
    {
      id: "fuzzy-rose-1",
      img: new URL("../assets/flower.png", import.meta.url).href,
      title: "Giant Fuzzy Crochet Rose",
      price: 250,
      category: "Preserved Flowers",
      occasion: ["Valentine's Day", "Mother's Day"],
      description:
        "A large handmade crochet rose featuring soft, fuzzy yarn. A long-lasting floral art piece.",
    },
    {
      id: "fuzzy-rose-2",
      img: new URL("../assets/flower2.png", import.meta.url).href,
      title: "Deluxe Fuzzy Crochet Rose",
      price: 400,
      category: "Preserved Flowers",
      occasion: ["Valentine's Day"],
      description:
        "A deluxe crochet rose with elegant detailing. A unique alternative to real flowers that never fade.",
    },
    {
      id: "fuzzy-rose-3",
      img: new URL("../assets/flower3.png", import.meta.url).href,
      title: "Mother's Day Crochet Rose",
      price: 200,
      category: "Preserved Flowers",
      occasion: ["Mother's Day"],
      description:
        "A soft handcrafted rose designed to express appreciation. Perfect as a Mother's Day gift.",
    },
    {
      id: "fuzzy-rose-4",
      img: new URL("../assets/flower4.png", import.meta.url).href,
      title: "Birthday Crochet Rose",
      price: 300,
      category: "Preserved Flowers",
      occasion: ["Birthday"],
      description:
        "A beautifully detailed crochet rose ideal for birthdays and celebrations.",
    },
    {
      id: "fuzzy-rose-5",
      img: new URL("../assets/flower5.png", import.meta.url).href,
      title: "Anniversary Crochet Rose",
      price: 100,
      category: "Preserved Flowers",
      occasion: ["Anniversary"],
      description:
        "An affordable and charming crocheted rose perfect for an anniversary surprise.",
    },
    {
      id: "fuzzy-rose-6",
      img: new URL("../assets/flower6.png", import.meta.url).href,
      title: "Graduation Crochet Rose",
      price: 140,
      category: "Preserved Flowers",
      occasion: ["Graduation"],
      description:
        "A bright crochet rose designed to celebrate success and new beginnings.",
    },
    {
      id: "fuzzy-rose-7",
      img: new URL("../assets/flower7.png", import.meta.url).href,
      title: "Christmas Crochet Rose",
      price: 160,
      category: "Preserved Flowers",
      occasion: ["Christmas"],
      description:
        "A Christmas-themed crochet rose perfect as a festive, cozy holiday gift.",
    },
  ];
  
  // Related Products
  export const relatedProducts = [
    { id: 1, img: "https://i.imgur.com/9g0h1i2.jpg", title: "Rainbow Rose Bouquet", price: 799 },
    { id: 2, img: "https://i.imgur.com/3j4k5l6.jpg", title: "Eternal Bloom", price: 599 },
    { id: 3, img: "https://i.imgur.com/7m8n9o0.jpg", title: "Crochet Dragon", price: 249 },
    { id: 4, img: "https://i.imgur.com/2p3q4r5.jpg", title: "24K Rose", price: 1299 },
  ];
  
  export const thumbnails = [
    "https://i.imgur.com/9g0h1i2.jpg",
    "https://i.imgur.com/3j4k5l6.jpg",
    "https://i.imgur.com/7m8n9o0.jpg",
    "https://i.imgur.com/2p3q4r5.jpg",
  ];
  