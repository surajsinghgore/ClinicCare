export const extractFullDateTime = (utcString) => {
  // Create a Date object from the UTC string
  const date = new Date(utcString);

  // Get the individual components in UTC
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours() + 5).padStart(2, "0"); // Convert to IST by adding 5 hours
  const minutes = String(date.getUTCMinutes() + 30).padStart(2, "0"); // Add 30 minutes

  // Handle minute overflow
  let finalHours = hours;
  let finalMinutes = minutes;

  if (parseInt(minutes) >= 60) {
    finalMinutes = String(parseInt(minutes) - 60).padStart(2, "0");
    finalHours = String(parseInt(hours) + 1).padStart(2, "0");
  }

  // Handle hour overflow
  if (parseInt(finalHours) >= 24) {
    finalHours = String(parseInt(finalHours) - 24).padStart(2, "0");
    // You may want to add logic here if you need to change the date as well.
  }

  return `${year}-${month}-${day} ${finalHours}:${finalMinutes}:${date.getUTCSeconds().toString().padStart(2, "0")}`;
};

export const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // If the current month is earlier than the birth month, subtract 1 from the age
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};
export const extractFullDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


export const formatTimeTo12Hour = (time) => {
    const [hour, minute] = time.split(":").map(Number); 
    const period = hour >= 12 ? "pm" : "am"; 
    const formattedHour = hour % 12 || 12; 
    return `${formattedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`;
  };