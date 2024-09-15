// services/checkInvitationCode.js

export const checkInvitationCode = async (code) => {
    // Replace with your actual API endpoint or logic
    const response = await fetch(`/api/checkInvitationCode?code=${code}`);
    if (response.status === 200) {
      return {
        isValid: true,
        studentID: await response.text(),
      };
    } else {
      return {
        isValid: false,
        studentID: await response.text(),
      };
    }
  };
  