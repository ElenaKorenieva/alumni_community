const validation = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Email required";
  }

  if (!values.password) {
    errors.password = "Password required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 char";
  }

  return errors;
};

export default validation;
