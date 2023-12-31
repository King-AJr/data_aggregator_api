const mock_data = [
  {
    "id": 1,
    "name": "Laptop",
    "category": "e-commerce",
    "description": "High-performance laptop with a powerful processor and ample storage.",
    "price": 999.99,
    "brand": "TechCo",
    "availability": "In Stock"
  },
  {
    "id": 2,
    "name": "Smartphone",
    "category": "e-commerce",
    "description": "Latest smartphone model with a stunning display and dual-camera system.",
    "price": 699.99,
    "brand": "MobileTech",
    "availability": "In Stock"
  },
  {
    "id": 3,
    "name": "Headphones",
    "category": "e-commerce",
    "description": "Wireless over-ear headphones with noise-canceling technology.",
    "price": 199.99,
    "brand": "AudioWave",
    "availability": "Out of Stock"
  },
  {
    "id": 4,
    "name": "Tablet",
    "category": "e-commerce",
    "description": "Slim and lightweight tablet for entertainment and productivity.",
    "price": 349.99,
    "brand": "TechTab",
    "availability": "In Stock"
  },
  {
    "id": 5,
    "name": "Gaming Console",
    "category": "e-commerce",
    "description": "Next-gen gaming console with 4K graphics and immersive gameplay.",
    "price": 499.99,
    "brand": "GameZone",
    "availability": "In Stock"
  },
  {
    "id": 6,
    "name": "Smartwatch",
    "category": "e-commerce",
    "description": "Feature-packed smartwatch with fitness tracking and notifications.",
    "price": 249.99,
    "brand": "WristTech",
    "availability": "In Stock"
  },
  {
    "id": 7,
    "name": "Laptop",
    "category": "e-commerce",
    "description": "Budget-friendly laptop with reliable performance for everyday tasks.",
    "price": 499.99,
    "brand": "ValueTech",
    "availability": "In Stock"
  },
  {
    "id": 8,
    "name": "Tablet",
    "category": "e-commerce",
    "description": "High-end tablet with a stunning display and stylus support.",
    "price": 799.99,
    "brand": "TabPro",
    "availability": "Out of Stock"
  },
  {
    "id": 9,
    "name": "Smartphone",
    "category": "e-commerce",
    "description": "Flagship smartphone with advanced camera features and 5G connectivity.",
    "price": 899.99,
    "brand": "TechMaster",
    "availability": "In Stock"
  },
  {
    "id": 10,
    "name": "Wireless Earbuds",
    "category": "e-commerce",
    "description": "True wireless earbuds with long battery life and great sound quality.",
    "price": 129.99,
    "brand": "AudioBliss",
    "availability": "In Stock"
  },
  {
    "id": 11,
    "name": "Gaming Laptop",
    "category": "e-commerce",
    "description": "Powerful gaming laptop with a high-refresh-rate display and RGB keyboard.",
    "price": 1499.99,
    "brand": "GameTech",
    "availability": "In Stock"
  },
  {
    "id": 12,
    "name": "Desktop Computer",
    "category": "e-commerce",
    "description": "Customizable desktop PC for gaming and content creation.",
    "price": 1299.99,
    "brand": "TechStation",
    "availability": "In Stock"
  },
  {
    "id": 13,
    "name": "Smart TV",
    "category": "e-commerce",
    "description": "Large smart TV with 4K resolution and streaming capabilities.",
    "price": 799.99,
    "brand": "VisionView",
    "availability": "Out of Stock"
  },
  {
    "id": 14,
    "name": "Digital Camera",
    "category": "e-commerce",
    "description": "High-quality digital camera with interchangeable lenses.",
    "price": 699.99,
    "brand": "PhotoPro",
    "availability": "In Stock"
  },
  {
    "id": 15,
    "name": "Laptop",
    "category": "e-commerce",
    "description": "Ultra-thin and lightweight laptop with a premium metal build.",
    "price": 1099.99,
    "brand": "UltraBook",
    "availability": "In Stock"
  },
    {
      "id": 1,
      "name": "Software Engineer - Full Stack",
      "category": "job",
      "description": "Seeking a full-stack software engineer with experience in web and mobile development.",
      "location": "San Francisco, CA",
      "company": "TechCo",
      "salary": "$100,000 - $130,000 per year",
      "postedDate": "2023-10-10"
    },
    {
      "id": 2,
      "name": "Senior Software Engineer",
      "category": "job",
      "description": "Looking for a senior software engineer with expertise in cloud computing and distributed systems.",
      "location": "Seattle, WA",
      "company": "CloudTech",
      "salary": "$120,000 - $150,000 per year",
      "postedDate": "2023-10-09"
    },
    {
      "id": 3,
      "name": "Software Engineer - Machine Learning",
      "category": "job",
      "description": "Hiring a machine learning software engineer to work on cutting-edge AI projects.",
      "location": "New York, NY",
      "company": "AI Innovations",
      "salary": "$110,000 - $140,000 per year",
      "postedDate": "2023-10-08"
    },
    {
      "id": 4,
      "name": "Software Engineer - Mobile App Development",
      "category": "job",
      "description": "Seeking a mobile app developer with experience in iOS and Android platforms.",
      "location": "Los Angeles, CA",
      "company": "AppTech",
      "salary": "$90,000 - $120,000 per year",
      "postedDate": "2023-10-07"
    },
    {
      "id": 5,
      "name": "Junior Software Engineer",
      "category": "job",
      "description": "Entry-level position for a junior software engineer to join our dynamic team.",
      "location": "Austin, TX",
      "company": "TechStart",
      "salary": "$70,000 - $90,000 per year",
      "postedDate": "2023-10-06"
    },
      {
        "id": 6,
        "name": "Frontend Web Developer - React",
        "category": "job",
        "description": "Looking for a frontend developer with expertise in React.js for building interactive web applications.",
        "location": "San Francisco, CA",
        "company": "WebTech",
        "salary": "$90,000 - $120,000 per year",
        "postedDate": "2023-10-10"
      },
      {
        "id": 7,
        "name": "Senior Frontend Developer",
        "category": "job",
        "description": "Seeking a senior frontend developer to lead the UI/UX design and development team.",
        "location": "New York, NY",
        "company": "DesignCraft",
        "salary": "$110,000 - $140,000 per year",
        "postedDate": "2023-10-09"
      },
      {
        "id": 8,
        "name": "Frontend Developer - Angular",
        "category": "job",
        "description": "Hiring a frontend developer with strong skills in Angular for building modern web applications.",
        "location": "Los Angeles, CA",
        "company": "WebWorks",
        "salary": "$85,000 - $110,000 per year",
        "postedDate": "2023-10-08"
      },
      {
        "id": 9,
        "name": "Frontend Web Developer - Vue.js",
        "category": "job",
        "description": "Join our Vue.js development team to create sleek and responsive web interfaces.",
        "location": "Seattle, WA",
        "company": "VueTech",
        "salary": "$80,000 - $105,000 per year",
        "postedDate": "2023-10-07"
      },
      {
        "id": 10,
        "name": "Junior Frontend Developer",
        "category": "job",
        "description": "Entry-level position for a junior frontend developer to learn and grow in a supportive environment.",
        "location": "Austin, TX",
        "company": "WebStart",
        "salary": "$60,000 - $80,000 per year",
        "postedDate": "2023-10-06"
      },
        {
          "id": 11,
          "name": "Backend Web Developer - Node.js",
          "category": "job",
          "description": "Join our backend development team with a focus on Node.js and API development.",
          "location": "San Francisco, CA",
          "company": "NodeTech",
          "salary": "$95,000 - $125,000 per year",
          "postedDate": "2023-10-10"
        },
        {
          "id": 12,
          "name": "Senior Backend Developer - Python",
          "category": "job",
          "description": "Experienced Python developer needed to lead the backend team in data processing and server development.",
          "location": "New York, NY",
          "company": "PyWeb",
          "salary": "$115,000 - $145,000 per year",
          "postedDate": "2023-10-09"
        },
        {
          "id": 13,
          "name": "Backend Developer - Ruby on Rails",
          "category": "job",
          "description": "Hiring a backend developer with expertise in Ruby on Rails for building scalable web applications.",
          "location": "Los Angeles, CA",
          "company": "RailsTech",
          "salary": "$90,000 - $115,000 per year",
          "postedDate": "2023-10-08"
        },
          {
            "id": 14,
            "name": "Data Analyst - SQL",
            "category": "job",
            "description": "Data analyst position focusing on SQL database analysis and reporting.",
            "location": "Seattle, WA",
            "company": "DataTech",
            "salary": "$70,000 - $95,000 per year",
            "postedDate": "2023-10-10"
          },
          {
            "id": 15,
            "name": "Senior Data Analyst - Python",
            "category": "job",
            "description": "Senior data analyst role with expertise in Python scripting and data visualization.",
            "location": "San Francisco, CA",
            "company": "DataPro",
            "salary": "$90,000 - $120,000 per year",
            "postedDate": "2023-10-09"
          },
          {
            "id": 16,
            "name": "Data Scientist",
            "category": "job",
            "description": "Data scientist position for working on advanced analytics and machine learning projects.",
            "location": "New York, NY",
            "company": "DataScience Co.",
            "salary": "$110,000 - $140,000 per year",
            "postedDate": "2023-10-08"
          },
          {
            "id": 17,
            "name": "Business Intelligence Analyst",
            "category": "job",
            "description": "BI analyst role focusing on data-driven insights and decision support.",
            "location": "Los Angeles, CA",
            "company": "BI Insights",
            "salary": "$80,000 - $105,000 per year",
            "postedDate": "2023-10-07"
          },
          {
            "id": 18,
            "name": "Data Analyst - Data Mining",
            "category": "job",
            "description": "Data analyst position specializing in data mining and pattern recognition.",
            "location": "Austin, TX",
            "company": "MineData",
            "salary": "$75,000 - $100,000 per year",
            "postedDate": "2023-10-06"
          }
]

module.exports = mock_data;