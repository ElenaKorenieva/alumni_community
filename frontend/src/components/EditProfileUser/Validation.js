const validation = (values) => {
  let errors = {};

  if (!values.email.includes("@")) {
    errors.email = "Enter valid email";
  }

  if (values.password) {
    if (values.password.length < 8) {
      errors.password = "Password must be at least 8 char";
    }
  }

  return errors;
};

export default validation;
