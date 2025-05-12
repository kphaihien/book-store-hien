const decodeToken = (token) => {
    try {
        const base64Payload = token.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        return payload;
    } catch (error) {
        return null;
    }
  }
export default decodeToken