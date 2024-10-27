export const extractFullDateTime = (utcString) => {
    // Create a Date object from the UTC string
    const date = new Date(utcString);
  
    // Get the individual components in UTC
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours() + 5).padStart(2, '0'); // Convert to IST by adding 5 hours
    const minutes = String(date.getUTCMinutes() + 30).padStart(2, '0'); // Add 30 minutes
  
    // Handle minute overflow
    let finalHours = hours;
    let finalMinutes = minutes;
  
    if (parseInt(minutes) >= 60) {
      finalMinutes = String(parseInt(minutes) - 60).padStart(2, '0');
      finalHours = String(parseInt(hours) + 1).padStart(2, '0');
    }
  
    // Handle hour overflow
    if (parseInt(finalHours) >= 24) {
      finalHours = String(parseInt(finalHours) - 24).padStart(2, '0');
      // You may want to add logic here if you need to change the date as well.
    }
  
    return `${year}-${month}-${day} ${finalHours}:${finalMinutes}:${date.getUTCSeconds().toString().padStart(2, '0')}`;
  };