# QuickSTAR Dashboard

Welcome to the **QuickSTAR Dashboard** repository, a unified, intelligent platform that centralizes fragmented DOST STAR teacher data into actionable insights to power strategic decision-making.

---

##  Introduction to the MVP

To empower the DOST STAR Program and create actionable, data-driven insights for educators, our team prioritizes a stack that is optimized for rapid prototyping while not losing out on the performance and scalability aspect. The architecture is designed to handle complex data visualization while maintaining a highly accessible and friendly user interface for teachers, administrators, and common citizens who are interested in analyzing nationwide data.

---

##  Features & Solution
Our solution bridges STEM and sustainability for a better tomorrow through:

- **AI Chatbot**: An integrated assistant for explaining data, inquiring about in-depth details, and providing strategic context.
- **Hoverable Data Visualizations**: Discover demographics per region in the Philippines through interactive charts and map placeholders.
- **Centralized Database Hub**: A single, clean source of truth mapping thousands of STAR teachers nationwide.
- **Data Summary and Actionable Insights**: Automated AI-based suggestions based on what the data is telling us, why the current conditions exist, and how management might resolve regional gaps effectively.

---

##  Technology Stack & System Architecture

### Frontend
Since the user interface is the bridge between the raw data and insightful decisions, we selected a modern, component-driven stack to ensure the dashboard is both responsive and easy to maintain.
- **React**: This is the core library; React allows us to build a highly modular dashboard. Its state management capabilities are crucial for handling dynamic filtering, allowing management to cross-reference data across specific SDOs and Regions, and instantly filter through teacher demographics without expensive page reloads.
- **Vite**: We chose Vite as our build tool because of its fast HMR (Hot Module Replacement) that allows us to iterate on complex UI components instantly. Reducing build times ensures we refine the user experience effectively.
- **Tailwind CSS v4**: To design an intuitive, and accessible interface without the overhead of writing custom stylesheets, we utilized Tailwind’s utility-first framework. Highlights include an integrated multi-theme system (Light/Dark mode) driving a premium visual consistency.

### Data Visualization
In order to transform our core metrics into visual insights, we integrated a specialized charting library optimized for React.
- **Recharts**: We chose Recharts because of its declarative, component-based syntax that is fit to our UI architecture. Composable elements like pie and bar charts cleanly compare teacher qualifications across different regions and sub-categories.

### Backend
For managing the web application’s data inputs and serving analytics to the frontend, we went to an architecture approach that minimizes configuration overhead while ensuring secure and high-speed data delivery.
- **FastAPI**: To connect our frontend with our data layer, we developed a RESTful API using FastAPI. Its asynchronous capabilities allow it to handle concurrent data requests with minimal latency.
- **SQLite**: For the MVP databases, we rely on SQLite. Being serverless and self-contained completely eliminates the latency of setting up a separate database server. It parses CSV structures dynamically on load into a structured table format.

### Deployment 
- **Frontend**: Vercel
- **Backend**: Railway

---

##  Value Proposition: Why the Technology Matters

Our solution consolidates fragmented teacher data into a centralized, intelligent platform that enhances visibility, coordination, and strategic decision-making. Through the integration of an interactive geospatial map and AI-driven analytics, the system identifies underserved regions across the Philippines with precision. This enables the STAR program to transition from intuition-based planning to evidence-based intervention, facilitating the targeted design and efficient delivery of teacher capacity-building initiatives. By optimizing resource allocation and prioritizing areas of greatest need, the platform advances educational equity and drives measurable, data-informed improvements in teacher development outcomes.

---

##  Risk & Security Measures

The system processes sensitive teacher and regional datasets, requiring secure data handling and controlled access. 
- **Mitigation (Auth)**: Role-based access control (RBAC) will be enforced through token-based authentication (e.g., JWT), ensuring that only authorized users can access protected endpoints. All data transmissions between the frontend and backend will be secured using HTTPS/TLS encryption to prevent interception and unauthorized access.
- **Mitigation (Database architecture)**: The use of SQLite presents limitations in handling high concurrency and large-scale data operations. While suitable for rapid development, it may become a bottleneck as user demand increases. To address this, a migration path to a more scalable database system such as PostgreSQL is considered to support improved performance, indexing, and concurrent transactions.
- **Mitigation (Cloud Risks)**: The FastAPI backend and cloud deployment platforms (Vercel and Railway) introduce additional technical risks, including potential API vulnerabilities. These will be mitigated through strict input validation, parameterized queries, rate limiting, monitoring, and regular data backups. 
- **AI Analytics**: AI-generated insights may carry risks related to bias or inaccuracies, so outputs will be positioned as decision-support tools and subject to human validation to ensure reliability and accountability.

---


## UI Screenshot
### Landing Page
<img width="1837" height="873" alt="image" src="https://github.com/user-attachments/assets/50157e0d-f6ce-4a69-a109-a6204ee63685" />


### About Section
<img width="1512" height="850" alt="image" src="https://github.com/user-attachments/assets/abc43466-a88b-4421-a596-eb9684f9ef15" />


### Dashboard Interface



---


##  File Structure

```text
QuickSTAR/
├── api/                           # FastAPI Backend Directory
│   ├── main.py                    # API Endpoints and SQLite ingestion logic
│   └── doststar_..._dataset.csv   # Raw Data Source
├── src/                           # React Frontend Directory
│   ├── components/
│   │   ├── Dashboard.jsx          # Primary analytics and charting UI
│   │   ├── MapPlaceholder.jsx     # Interactive Region mapping
│   │   ├── Chatbot.jsx            # Floating AI insight chatbot
│   │   ├── Login.jsx              # RBAC Mock Terminal Auth (Teacher/Admin)
│   │   └── Signup.jsx             # Registration UI
│   ├── App.jsx                    # Routing & Context Providers
│   ├── IndexPage.jsx              # Landing Page / "What's QuickSTAR" overview
│   ├── index.css                  # Tailwind styles and Theme variables
│   └── main.jsx                   # React root mount
└── package.json                   # Dependencies mapping
```

---

## Setup Instructions

Follow these steps to run the application locally on your machine.

### 1. Backend Setup
Navigate into the `api` folder, setup your environment, and run the server.

```bash
cd api
python -m venv venv
# Activate virtual environment:
# On Windows: .\venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate

pip install fastapi uvicorn pandas python-multipart
uvicorn main:app --reload
```
*Note: Make sure your underlying CSV dataset (`doststar_nationwide_dataset-TEST.csv`) remains inside the API folder so the SQL table seeds correctly on boot!* 

### 2. Frontend Setup
In a new terminal window, navigate to the `QuickSTAR` root folder, install JavaScript dependencies, and start Vite.

```bash
cd QuickSTAR
npm install # Using Node.js
npm run dev
```

The terminal will provide a `localhost` URL (usually `http://localhost:5173`). Open the link in your browser to view the application!
