export interface Customer {
    customerId: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNo: number;
    gender: string;
    // address: string;  // Make sure this field is included
    district: string;
    state: string;
    zipCode: number;
    emailId: string;
    password: string; // Not needed for update, but might be needed for other operations
    role: string;     // Not needed for update, but might be needed for other operations
  }