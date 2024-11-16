import jsPDF from "jspdf";
import "jspdf-autotable";

export const GenerateTreatmentPdf = (data) => {

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const footerHeight = 30;
  const headerHeight = 30;
  const contentHeightLimit = pageHeight - headerHeight - footerHeight;
  let currentY = headerHeight + 10; // Content starts below header

  // Add Header
  const addHeader = () => {
    doc.setFillColor(36, 114, 205); // #3b98eb
    doc.rect(0, 0, pageWidth, headerHeight, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("Personal Medical Record", pageWidth / 2, 15, { align: "center" });

    doc.setFontSize(10);
    doc.text(`Doctor: ${data.doctor.name}`, 10, 25);
    doc.text(`Specialization: ${data.doctor.specialization}`, 80, 25);
    doc.text(`Date: ${data.appointment.appointmentDate}`, pageWidth - 10, 25, { align: "right" });
  };

  // Add Footer
  const addFooter = () => {
    const footerY = pageHeight - footerHeight;

    doc.setFillColor(36, 114, 205); // #2472cd
    doc.rect(0, footerY, pageWidth, footerHeight, "F");

    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`Prepared by ${data.clinic.name}, ${data.clinic.address}`, 10, footerY + 10);
    doc.text(`Clinic Postcode: ${data.clinic.fullAddress.postcode}`, 10, footerY + 20);

    if (data.doctor.signatureUrl) {
      doc.addImage(data.doctor.signatureUrl, "PNG", pageWidth - 40, footerY + 5, 30, 15);
    }
  };

  // Add Section with Background
  const addSectionTitle = (title) => {
    checkPageSpace(15);
    doc.setFillColor(36, 114, 205); // #125dbc
    doc.rect(10, currentY, pageWidth - 20, 10, "F");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(title, 12, currentY + 7);
    currentY += 20;
  };

  // Add Section Content
  const addContent = (label, value) => {
    checkPageSpace(10);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`${label}:`, 10, currentY);
    doc.setTextColor(59, 152, 235);
    doc.text(value || "N/A", 50, currentY);
    currentY += 10;
  };

  // Check Page Space and Add New Page If Needed
  const checkPageSpace = (requiredSpace) => {
    if (currentY + requiredSpace > contentHeightLimit) {
      doc.addPage();
      currentY = headerHeight + 10;
      addHeader();
      addFooter();
    }
  };

  // Add Patient Information
  const addPatientInfo = () => {
    addSectionTitle("Patient Information");
    addContent("Name", data.user.name);
    addContent("Birthday", data.user.dob.split("T")[0]);
    addContent("Gender", data.user.gender);
    addContent("Email", data.user.email);
    addContent("Phone", data.user.mobile);
  };

  // Add Appointment Details
  const addAppointmentDetails = () => {
    addSectionTitle("Appointment Details");
    addContent("Appointment Number", data.appointment.appointmentNumber.toString());
    addContent("Date", data.appointment.appointmentDate);
    addContent("Time", data.appointment.appointmentTime);
    addContent("Treatment", data.appointment.service.treatmentName);
    addContent("Specialty", data.appointment.service.specialty);
  };

  // Add Transaction Details
  const addTransactionDetails = () => {
    addSectionTitle("Transaction Details");
    addContent("Transaction ID", data.transactionDetails.txnId);
    addContent("Amount", `${(data.transactionDetails.amount / 100).toFixed(2)}`);
    addContent("Platform Fee", ` ${data.transactionDetails.platformFee}`);
    addContent("Total Amount", ` ${data.transactionDetails.totalAmount}`);
    addContent("Payment Status", data.transactionDetails.methodRes.data.responseCode);
  };

  // Add Medical Details
  const addMedicalDetails = () => {
    addSectionTitle("Medical Details");
    addContent("Disease", data.treatmentDetails.diseaseName);
    addContent("Symptoms", data.treatmentDetails.symptoms);
    addContent("Follow-up Date", data.treatmentDetails.followUpDate.split("T")[0]);
    addContent("Notes", data.treatmentDetails.notes || "None");

    addSectionTitle("Medications");
    const medications = data.treatmentDetails.medications.map((med) => [med.name, med.dose, med.routine, `${med.duration} days`]);

    checkPageSpace(40);
    doc.autoTable({
      head: [["Medicine Name", "Dose", "Routine", "Duration"]],
      body: medications,
      startY: currentY,
      styles: { fontSize: 10, cellPadding: 3 },
      didDrawPage: (data) => {
        currentY = data.cursor.y + 10;
      },
    });

    currentY = doc.lastAutoTable.finalY + 10;
  };

  // Add Tests Prescribed at the End
  const addTestsPrescribed = () => {
    addSectionTitle("Tests Prescribed");
    const tests = data.treatmentDetails.testPrescribed;

    if (tests.length > 0) {
      const testsLine = tests.join(", ");
      addContent("Tests", testsLine);
    } else {
      addContent("Tests", "No tests prescribed");
    }
  };

  // Generate PDF Content
  const generatePage = () => {
    addHeader();
    addFooter();
    addPatientInfo();
    addAppointmentDetails();
    addTransactionDetails();
    addMedicalDetails();
    addTestsPrescribed(); // Tests section added at the end
  };

  generatePage();

  // Dynamic File Name
  const fileName = `${data.user.name.replace(/\s+/g, "_")}_${data.appointment.appointmentNumber}.pdf`;
  doc.save(fileName);
};
