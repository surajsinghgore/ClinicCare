# ClinicCare

ClinicCare is a healthcare platform built using the MERN stack to simplify patient-doctor interactions. It enables patients to search for doctors, book appointments, and navigate clinics using GPS. Doctors can manage treatments, upload e-receipts, and track patient histories. An admin dashboard provides control over users, appointments, and reporting. Integrated with PhonePe, it ensures secure and seamless payments..

## DEMO LINK

LIVE =>
https://cliniccare.surajsingh.online

SOURCE CODE => https://github.com/surajsinghgore/ClinicCare

## Screenshots

![App Screenshot](https://res.cloudinary.com/dnxv21hr0/image/upload/v1732265273/socket.io/clinicCare/d1nd83oapmt6b7apubto.png)
![App Screenshot](https://res.cloudinary.com/dnxv21hr0/image/upload/v1732265276/socket.io/clinicCare/v697eb0cjokkav5bcmos.png)

![App Screenshot](https://res.cloudinary.com/dnxv21hr0/image/upload/v1732265292/socket.io/clinicCare/xnvl79namkmfpdsnjzzt.png)
![App Screenshot](https://res.cloudinary.com/dnxv21hr0/image/upload/v1732265290/socket.io/clinicCare/iquvfmhhsexmrvgiw9il.png)
![App Screenshot](https://res.cloudinary.com/dnxv21hr0/image/upload/v1732265284/socket.io/clinicCare/qp5owkybi8yv8ih19q1a.png)
![App Screenshot](https://res.cloudinary.com/dnxv21hr0/image/upload/v1732265274/socket.io/clinicCare/gihsaoxk6rb6jtttnoic.png)
![App Screenshot](https://res.cloudinary.com/dnxv21hr0/image/upload/v1732265274/socket.io/clinicCare/tdpvpsufkower1ssmk7o.png)
![App Screenshot](https://res.cloudinary.com/dnxv21hr0/image/upload/v1732265272/socket.io/clinicCare/ku6dzfayatummlw7cjkx.png)

## Features

### **For Patients**

- **Doctor Discovery**: Search for nearby doctors and clinics using geolocation.
- **Doctor Profiles**: View profiles, including services, fees, and availability.
- **Appointment Management**: Book, reschedule, or cancel appointments.
- **Secure Authentication**: Login with OTP and email verification.
- **GPS Navigation**: Navigate to clinics using integrated maps.
- **Payment Integration**: Seamless payments via **PhonePe**.
- **Notifications**: Receive appointment confirmations and reminders.

### **For Doctors**

- **Doctor Portal**: Manage profiles, services, and clinic details.
- **Patient Management**: Access patient profiles and treatment histories.
- **Treatment Updates**: Update treatments and upload e-receipts.
- **Document Uploads**: Add clinic photos, licenses, and certifications.

### **For Admins**

- **Admin Dashboard**: Manage users, doctors, appointments, and transactions.
- **Reports and Analytics**: Generate detailed reports.
- **Verification**: Approve and verify doctor registrations.
- **Theme Customization**: Modify application themes and settings.

---

## Security Features

- Regular security checks to prevent breaches.
- Secure login via OTP and email verification.
- Data encryption for sensitive user information.

---

**ClinicCare** ensures a seamless experience for all stakeholders, combining innovative technology with ease of use for the healthcare industry.

## Authors

- [@surajsingh](https://github.com/surajsinghgore)
- [@tusharnegi](https://github.com/tusharn3115)

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: PhonePe
- **Other Features**: GPS navigation, OTP/email authentication, secure e-receipts.

## Installation

Follow these steps to set up and run the **ClinicCare** project locally:

### Prerequisites

1. Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
2. Install [MongoDB](https://www.mongodb.com/) and ensure it is running.

---

### Backend Environment Variables

### Clone the Repository

1. Clone the repository:
   ```bash
   git clone https://github.com/surajsinghgore/ClinicCare.git
   cd ClinicCare
   ```

2.ENV variables

| Variable Name                        | Description                                |
| ------------------------------------ | ------------------------------------------ |
| `MONGODB_URI`                        | Your MongoDB connection string.            |
| `JWT_SECRET`                         | Secret key for JSON Web Tokens.            |
| `CLOUDINARY_CLOUD_NAME`              | Cloudinary cloud name for file uploads.    |
| `CLOUDINARY_API_KEY`                 | Cloudinary API key for authentication.     |
| `CLOUDINARY_API_SECRET`              | Cloudinary API secret for authentication.  |
| `EMAIL_USER`                         | Email address used for application emails. |
| `EMAIL_PASS`                         | Password for the email account.            |
| `BACKEND_URL`                        | Base URL for the backend server.           |
| `PHONE_PAY_SALT_KEY`                 | PhonePe salt key for payment integration.  |
| `PHONE_PAY_MERCHANT_ID`              | PhonePe merchant ID for payments.          |
| `PHONE_PAY_PROD_URL_CREATE`          | PhonePe API URL to create transactions.    |
| `PHONE_PAY_PROD_URL_CREATE_LIVE_URL` | PhonePe API live URL for transactions.     |
| `PHONE_PAY_PROD_URL_VERIFY`          | PhonePe API URL to verify transactions.    |

> **Note:** Replace the placeholder values with your actual credentials during development or deployment. Avoid sharing or committing sensitive information to version control.

3.npm i

4.node index.js

### FRONTEND

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Navigate to the frontend directory:

   ```bash
   npm install

   ```

3. Navigate to the frontend directory:

```bash
REACT_APP_API_URL=your_backend_url
FRONTEND_URL_MAIN=your_frontend_url
```
