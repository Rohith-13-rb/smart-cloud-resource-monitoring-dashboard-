# Smart Cloud Resource Monitoring Dashboard

> **Cloud Computing College Project**  
> A real-time, responsive multi-cloud telemetry and resource monitoring platform built with React, Vite, and Recharts.

---

## 📌 Project Overview

The **Smart Cloud Resource Monitoring Dashboard** is an enterprise-grade cloud telemetry observatory and SRE operations console. It simulates live health metrics, memory/CPU usage spikes, disk IOPS, network ingress/egress, incident triggers, and cost analysis across AWS, Google Cloud Platform (GCP), and Microsoft Azure environments.

---

## 🚀 Key Features

### 1. 🔐 Authentication & Quick Evaluation Access
- Standard secure email/password sign-in.
- **⚡ 1-Click Demo Login** specifically built for college viva and professor demonstrations.
- Persistent session storage in `localStorage`.

### 2. 📊 Executive Cloud Dashboard
- Real-time fleet KPI metrics: Active Compute Nodes, Cluster CPU %, Memory Load %, Storage Usage %, and Est. Monthly Spend ($).
- Live rolling telemetry area charts updated automatically every 3 seconds.
- Multi-cloud infrastructure share (AWS vs GCP vs Azure) distribution pie chart.
- Regional availability zone status (US-East, US-West, Europe, AP-South) with roundtrip ping latency.
- Recent active incidents feed.

### 3. 📈 Resource Telemetry & Observability
- 4 synchronized live telemetry charts:
  - **Cluster CPU Utilization (%)** with critical threshold reference line.
  - **Memory (RAM) Allocation (%)** with live gigabyte memory breakdown.
  - **Network Bandwidth Throughput (Gbps)**.
  - **P99 Edge Roundtrip Latency (ms)**.
- Interval frequency selector (1s High Frequency, 3s Standard, 5s Eco).
- Play/Pause live stream toggle.
- Top resource-consuming instances ranking table with search and quick restart actions.

### 4. ☁️ Cloud Compute Fleet Orchestration
- Provision, Start, Stop, and Restart simulated cloud nodes.
- Horizontal scaling (+ / - instances) with dynamic monthly cost recalculation.
- Filter by service category (Compute, Kubernetes, Databases, Storage, Serverless), provider (AWS, GCP, Azure), or running status.

### 5. 🚨 Incidents & Chaos Engineering
- Real-time incident triage with severity badges: `Critical`, `Warning`, `Info`.
- Interactive `Acknowledge` and `Resolve Incident` workflows.
- **⚡ Chaos Simulation / Inject Load Spike Button**: Injects a 300% load surge across instances, tripping critical threshold alarms for live demonstration.

### 6. 📑 Analytics, SLA Reports & Exports
- Uptime SLA scorecard (99.98% SLA, 0 unplanned downtime).
- Multi-cloud cost breakdown bar chart and weekly load trend lines.
- **📥 Export Telemetry to CSV**: Downloads a clean `.csv` file with time-series data.
- **🖨️ Print / Save PDF Report**: Clean print-formatted report for academic submission.

### 7. ⚙️ System Settings & Alert Policies
- Configurable CPU & Memory critical trigger sliders.
- SRE notification channel toggles (Email, Slack webhooks, Autonomous self-healing).
- Light and Dark cyber-cloud theme switch.
- Cloud administrator profile management.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Charts & Data Visualization**: [Recharts](https://recharts.org/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Effects**: Canvas Confetti
- **Styling**: Modern CSS3 with CSS Variables, Glassmorphism backdrop filters, and responsive grid system

---

## 📂 Project Structure

```
smart-cloud-resource-monitoring-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AlertBadge.jsx          # Severity & status badges
│   │   ├── MetricCard.jsx          # KPI cards with sparkline progress
│   │   ├── Navbar.jsx              # Header with live stream toggle & chaos trigger
│   │   ├── QuickActionsModal.jsx   # Node provisioning & chaos testing
│   │   ├── ServiceCard.jsx         # Cloud instance card with controls
│   │   ├── Sidebar.jsx             # Collapsible navigation sidebar
│   │   └── Toast.jsx               # Floating system notifications
│   ├── context/
│   │   ├── AuthContext.jsx         # User auth & theme management
│   │   └── CloudDataContext.jsx    # Live simulated telemetry & service state
│   ├── pages/
│   │   ├── Alerts.jsx              # Incident response & alarm triage
│   │   ├── CloudServices.jsx       # Multi-cloud fleet orchestration
│   │   ├── Dashboard.jsx           # High-level overview & real-time KPIs
│   │   ├── Login.jsx               # Sign-in & 1-Click Demo portal
│   │   ├── Reports.jsx             # SLA analytics, CSV & PDF export
│   │   ├── ResourceMonitoring.jsx  # Deep-dive 4-chart telemetry
│   │   └── Settings.jsx            # Threshold sliders & notification rules
│   ├── App.jsx                     # Root application wrapper
│   ├── index.css                   # Global cyber-cloud dark theme styling
│   └── main.jsx                    # React entrypoint
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🏃 How to Run the Project Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Launch

1. Open your terminal in the project root folder:
   ```bash
   cd smart-cloud-resource-monitoring-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### 🔑 Demo Credentials
- **Email**: `admin@smartcloud.io`
- **Password**: `demo1234`
- *(Or simply click the **⚡ 1-Click Demo Login** button on the sign-in screen)*

---

## 🎓 College Project Evaluation Highlights

| Feature | Description |
| :--- | :--- |
| **Real-Time Simulation** | Periodic rolling updates simulate live server telemetry without backend setup overhead. |
| **Multi-Cloud Support** | Visualizes workloads across AWS, GCP, and Azure concurrently. |
| **Incident Management** | Implements standard SRE incident lifecycles (Active → Acknowledged → Resolved). |
| **Data Export** | Exports live telemetry directly to standard CSV format. |
| **Responsive Design** | Adapts fluidly across mobile, tablet, and widescreen monitors. |
