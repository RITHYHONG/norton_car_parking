export const credentials = {
      username: "admin",
      password: "password123",
    };
    
    export const authenticate = (inputUsername: string, inputPassword: string) => {
      return (
        inputUsername === credentials.username &&
        inputPassword === credentials.password
      );
    };
    
    