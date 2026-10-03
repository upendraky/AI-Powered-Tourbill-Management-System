# 🚀 AI-Powered Tourbill Management System

An intelligent enterprise-grade **Tourbill & Travel Expense Management Platform** that automates employee tourbill processing using **Document AI, OCR, RAG, Machine Learning, Anomaly Detection, Predictive Analytics, Explainable AI, and Agentic AI**.

The system is designed to digitize and automate the complete lifecycle of employee travel claims — from receipt upload and data extraction to policy verification, anomaly detection, approval, reimbursement analysis, and financial forecasting.

---

## 🧠 Project Overview

Traditional tourbill processing involves manually reviewing receipts, checking company policies, validating expenses, detecting duplicate claims, calculating reimbursements, and approving bills.

This project transforms that workflow into an intelligent AI-assisted system.

### Traditional Workflow

```text
Employee
   ↓
Paper / PDF Receipts
   ↓
Manual Data Entry
   ↓
Manual Policy Checking
   ↓
Manual Verification
   ↓
Manager Approval
   ↓
Finance Processing
```

### AI-Powered Workflow

```text
Employee
   ↓
Upload Tourbill + Receipts
   ↓
Document AI / OCR
   ↓
Automatic Expense Extraction
   ↓
Policy RAG Engine
   ↓
AI Compliance Verification
   ↓
ML Anomaly Detection
   ↓
Risk Scoring
   ↓
Explainable AI
   ↓
Human Review
   ↓
Approval / Rejection
   ↓
Reimbursement Analytics
   ↓
Predictive Budget Forecasting
```

---

# ✨ Key Features

## 1. 👤 Role-Based Enterprise Access

The platform supports multiple organizational roles:

* Employee
* Manager
* Finance Officer
* Auditor
* Administrator

Each role receives a dedicated dashboard and permission set.

---

## 2. 🧾 Digital Tourbill Submission

Employees can submit complete travel reimbursement claims.

### Supported information

* Employee details
* Department
* Tour destination
* Travel dates
* Tour purpose
* Transportation
* Hotel expenses
* Food expenses
* Local transportation
* Other eligible expenses
* Receipts and supporting documents

---

# 3. 📄 AI Document Intelligence

Employees can upload:

* PDF invoices
* Hotel receipts
* Train tickets
* Flight tickets
* Taxi receipts
* Restaurant bills
* Scanned documents
* Images

The system automatically processes uploaded documents.

```text
Document
   ↓
Classification
   ↓
OCR
   ↓
Text Extraction
   ↓
Field Extraction
   ↓
Validation
   ↓
Structured Expense
```

Example:

```json
{
  "vendor": "Hotel XYZ",
  "invoice_number": "INV-92821",
  "date": "2026-09-20",
  "amount": 4500,
  "tax": 686,
  "currency": "INR",
  "category": "HOTEL"
}
```

---

# 4. 🔍 Automatic Policy Verification

The system automatically checks expenses against organizational travel policies.

Examples:

```text
Hotel Claim: ₹6,500

Allowed Limit: ₹5,000

Result:
⚠ ₹1,500 exceeds the permitted limit
```

The system can verify:

* Hotel limits
* Food limits
* Travel class
* Transportation limits
* Eligible expense categories
* Tour dates
* Department-specific rules
* Employee grade-based limits

---

# 5. 📚 RAG-Based Policy Intelligence

Organizational policies are converted into a searchable knowledge base.

```text
Travel Policy
Hotel Policy
Food Policy
Transport Policy
Reimbursement Policy
Department Rules
        ↓
Document Processing
        ↓
Chunking
        ↓
Embeddings
        ↓
Vector Database
        ↓
RAG Retrieval
```

The AI can answer questions such as:

> "Is a ₹5,800 hotel expense eligible for this employee?"

The system retrieves the relevant policy section before generating the answer.

This reduces dependency on manually hard-coded business rules.

---

# 6. 🤖 AI Expense Verification Agent

An agentic AI workflow coordinates multiple tools.

```text
                Verification Agent
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
   Policy Tool    Expense Tool    Document Tool
        ↓              ↓              ↓
      RAG          ML Models        OCR
        │              │              │
        └──────────────┼──────────────┘
                       ↓
                Final Assessment
```

The agent can:

* Retrieve employee information
* Retrieve tour information
* Search company policies
* Analyze receipts
* Check historical claims
* Detect duplicates
* Run anomaly models
* Calculate eligible reimbursement
* Generate explanations
* Create human-review tasks

---

# 7. 🚨 AI Anomaly & Fraud Detection

The system uses Machine Learning to identify unusual expenses.

### Example signals

* Unusually high expense
* Duplicate receipt
* Unusual vendor
* Date mismatch
* Expense outside tour duration
* Repeated claims
* Abnormal employee spending
* Department-level spending anomaly
* Policy-limit violations

Example output:

```json
{
  "risk_score": 0.91,
  "risk_level": "HIGH",
  "reasons": [
    "Expense is 2.4x employee average",
    "Possible duplicate receipt",
    "Receipt date does not match tour period"
  ]
}
```

---

# 8. 📊 Explainable AI

AI decisions are not presented as unexplained black-box predictions.

Every risk score includes contributing factors.

Example:

```text
Risk Score: 91%

Amount anomaly              +32
Duplicate similarity        +25
Date mismatch               +19
Vendor anomaly              +15
                             ───
                             91%
```

Machine-learning explanations can be generated using **SHAP**.

---

# 9. 🔄 Human-in-the-Loop Approval

The AI assists financial officers instead of blindly making financial decisions.

Example workflow:

```text
Low Risk
   ↓
Automatic Processing

Medium Risk
   ↓
Human Review

High Risk
   ↓
Manual Investigation
```

Finance officers can:

* Approve
* Reject
* Request clarification
* Override AI recommendation
* Add comments
* View supporting evidence

Every manual override is recorded in the audit system.

---

# 10. 📈 Predictive Travel Budget Analytics

Historical reimbursement data is used to forecast future expenditure.

The system can predict:

* Monthly travel expenditure
* Quarterly expenditure
* Department spending
* Employee travel expenditure
* Expected reimbursement requirements

Example:

```text
Current Monthly Spending

₹18.4 Lakhs

Predicted Next Month

₹21.7 Lakhs

Expected Change

+17.9%
```

---

# 11. 💬 AI Analytics Assistant

The system includes a natural-language analytics assistant.

Users can ask:

> "Show my pending tourbills."

> "Why was my reimbursement flagged?"

> "Which department spent the most on travel this quarter?"

> "Show high-risk claims from this month."

> "Predict next quarter's travel expenditure."

The AI converts natural-language requests into controlled application tools and database queries.

---

# 12. 🏢 Enterprise Dashboards

## Employee Dashboard

```text
My Tours
My Tourbills
Pending Claims
Approved Claims
Rejected Claims
Reimbursement Status
```

## Finance Dashboard

```text
Total Claims
Pending Verification
High-Risk Claims
Policy Violations
Duplicate Claims
Department Spending
```

## Management Dashboard

```text
Total Travel Spending
Department Trends
Monthly Forecast
Risk Distribution
AI Detection Statistics
Budget Forecast
```

## Auditor Dashboard

```text
Audit Logs
AI Decisions
Manual Overrides
Policy Violations
Approval History
Risk Analysis
```

---

# 13. 🧾 Automated Reimbursement Calculation

The system calculates the eligible reimbursement amount based on:

```text
Claimed Amount
       ↓
Policy Rules
       ↓
Eligible Amount
       ↓
Deductions
       ↓
Final Reimbursement
```

Example:

```text
Hotel Claimed       ₹6,500
Policy Limit        ₹5,000

Eligible Amount     ₹5,000
Non-Eligible        ₹1,500
```

---

# 14. 🔐 Authentication & RBAC

Secure authentication with role-based authorization.

```text
Employee
Manager
Finance Officer
Auditor
Admin
```

API endpoints and dashboards are protected according to user permissions.

---

# 15. 📝 Complete Audit Trail

Every important action is recorded.

```text
User
Action
Timestamp
Claim ID
Previous State
New State
AI Risk Score
Decision
Reason
```

This provides traceability for financial and administrative workflows.

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │     Next.js Web     │
                         │   React + TypeScript│
                         └──────────┬──────────┘
                                    │
                                    ↓
                         ┌─────────────────────┐
                         │      FastAPI        │
                         │     REST APIs       │
                         └──────────┬──────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
                ↓                   ↓                   ↓
        ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
        │ PostgreSQL   │    │    Redis     │    │  File/Object │
        │ + pgvector   │    │    Cache     │    │   Storage    │
        └──────────────┘    └──────────────┘    └──────────────┘
                                    │
                                    ↓
                         ┌─────────────────────┐
                         │   AI Orchestration  │
                         │     LangGraph       │
                         └──────────┬──────────┘
                                    │
            ┌───────────────────────┼────────────────────────┐
            │                       │                        │
            ↓                       ↓                        ↓
    ┌───────────────┐      ┌────────────────┐       ┌───────────────┐
    │ Document AI   │      │   RAG Engine   │       │   ML Engine   │
    │ OCR + Vision  │      │ Policy Search  │       │ Anomaly Model │
    └───────────────┘      └────────────────┘       └───────────────┘
            │                       │                        │
            └───────────────────────┼────────────────────────┘
                                    ↓
                         ┌─────────────────────┐
                         │ Verification Agent │
                         └──────────┬──────────┘
                                    ↓
                         ┌─────────────────────┐
                         │ Human Review Queue  │
                         └──────────┬──────────┘
                                    ↓
                         ┌─────────────────────┐
                         │ Approval / Reject   │
                         └─────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* React Hook Form
* Zod
* Recharts
* Framer Motion
* Lucide Icons

## Backend

* Python
* FastAPI
* Pydantic
* SQLAlchemy
* Alembic

## Database

* PostgreSQL
* pgvector

## AI / LLM

* OpenAI / Gemini / Groq
* LangChain
* LangGraph
* Embedding Models

## Machine Learning

* Python
* scikit-learn
* XGBoost
* LightGBM
* SHAP

## Document Intelligence

* OCR
* PaddleOCR / Tesseract
* PyMuPDF
* OpenCV

## Infrastructure

* Redis
* Celery
* Docker
* Docker Compose
* GitHub Actions

## Testing

* Pytest
* Playwright
* API Testing

## Monitoring & Experiment Tracking

* MLflow
* Structured Logging

---

# 📁 Project Structure

```text
AI-Powered-Tourbill-Management-System/

├── client/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   └── types/
│
├── server/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── agents/
│   │   ├── rag/
│   │   ├── ml/
│   │   ├── document_ai/
│   │   └── utils/
│   │
│   ├── tests/
│   └── main.py
│
├── data/
│   ├── raw/
│   ├── processed/
│   └── policies/
│
├── ml/
│   ├── notebooks/
│   ├── training/
│   ├── models/
│   └── evaluation/
│
├── docker/
│
├── docs/
│
├── docker-compose.yml
├── .env.example
├── README.md
└── LICENSE
```

---

# 🔬 AI Pipeline

The complete AI processing pipeline:

```text
Receipt
  ↓
Document Classification
  ↓
OCR
  ↓
Information Extraction
  ↓
Data Validation
  ↓
Policy Retrieval
  ↓
RAG Analysis
  ↓
Rule Engine
  ↓
ML Anomaly Detection
  ↓
Risk Scoring
  ↓
SHAP Explanation
  ↓
AI Verification Agent
  ↓
Human Review
  ↓
Final Decision
```

---

# 📊 Machine Learning Pipeline

```text
Historical Tourbill Data
          ↓
Data Cleaning
          ↓
Feature Engineering
          ↓
Exploratory Data Analysis
          ↓
Train / Validation / Test
          ↓
Model Training
          ↓
Hyperparameter Tuning
          ↓
Model Evaluation
          ↓
Explainability
          ↓
Model Registry
          ↓
Production API
```

---

# 🎯 Model Evaluation

The project evaluates models using appropriate metrics.

### Anomaly Detection

* Precision
* Recall
* F1 Score
* ROC-AUC
* PR-AUC

### Forecasting

* MAE
* RMSE
* MAPE

### Document Extraction

* Field-level accuracy
* Precision
* Recall
* F1

### RAG

* Retrieval precision
* Retrieval recall
* Context relevance
* Faithfulness
* Answer correctness

---

# 🔒 Security Considerations

The system is designed with enterprise security principles.

* JWT authentication
* Role-based authorization
* Input validation
* API authorization
* Secure file upload
* File-type validation
* Environment-based secrets
* Audit logging
* Database constraints
* Protection against unauthorized access
* Controlled AI tool execution

---

# 🧪 Testing Strategy

```text
Unit Tests
     ↓
Integration Tests
     ↓
API Tests
     ↓
ML Evaluation
     ↓
RAG Evaluation
     ↓
End-to-End Tests
     ↓
Production Validation
```

---

# 🚀 Deployment Architecture

```text
                 Internet
                    │
                    ↓
              Reverse Proxy
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
     Next.js App          FastAPI
                              │
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
         PostgreSQL         Redis          Object Storage
              │
              ↓
           pgvector
              │
              ↓
        AI / ML Services
```

The application can be containerized using Docker and deployed using cloud infrastructure.

---

# 📈 Future Improvements

Potential future capabilities include:

* Multilingual receipt processing
* Voice-based expense submission
* Advanced computer vision for forged receipts
* Graph-based fraud detection
* Enterprise SSO
* Email-based claim submission
* Mobile application
* Real-time financial alerts
* Advanced department-level forecasting
* Model drift monitoring
* Automated policy updates
* Multi-organization support

---

# 💡 Business Impact

The system is designed to reduce:

* Manual data entry
* Processing time
* Policy violations
* Duplicate reimbursements
* Human verification workload
* Financial leakage

while improving:

* Expense visibility
* Auditability
* Policy compliance
* Fraud/anomaly detection
* Reimbursement transparency
* Financial forecasting

---

# 🧑‍💻 Engineering Highlights

This project demonstrates practical experience across:

* Full-stack development
* REST API design
* Database architecture
* Document AI
* OCR
* Retrieval-Augmented Generation
* Agentic AI
* Machine Learning
* Anomaly Detection
* Predictive Analytics
* Explainable AI
* Human-in-the-loop AI
* RBAC
* Enterprise workflow automation
* MLOps
* Docker
* CI/CD

---

# 🏆 Project Classification

**Project:** Mark IV — AI-Powered Tourbill Management System

**Domain:** Enterprise AI / FinTech / Expense Management

**Primary AI Areas:**

```text
Document Intelligence
RAG
Agentic AI
Machine Learning
Anomaly Detection
Predictive Analytics
Explainable AI
```

**Development Type:**

```text
Full-Stack + AI/ML + Enterprise Automation
```

---

# 👨‍💻 Author

**Upendra Kumar Yadav**

AI Engineer | Data Scientist | Data Analyst

GitHub: https://github.com/upendraky

---

# ⭐ Project Vision

> Build an intelligent enterprise reimbursement platform where AI doesn't simply generate text — it understands documents, retrieves policies, analyzes financial behavior, detects anomalies, explains its decisions, and assists humans throughout the complete reimbursement workflow.

---

## 📌 Status

🚧 **Under Active Development**

### Planned Completion

```text
Frontend                  █████████░ 90%
Backend                   ░░░░░░░░░░  0%
Database                  ░░░░░░░░░░  0%
Document AI               ░░░░░░░░░░  0%
RAG                       ░░░░░░░░░░  0%
Anomaly Detection        ░░░░░░░░░░  0%
AI Agent                 ░░░░░░░░░░  0%
Predictive Analytics     ░░░░░░░░░░  0%
Explainable AI           ░░░░░░░░░░  0%
Testing                  ░░░░░░░░░░  0%
Deployment               ░░░░░░░░░░  0%
```

**Overall:** 🚧 Foundation / Frontend Stage
