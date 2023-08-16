const Yup = require("yup");

const formSchema = Yup.object({
  id: Yup.string()
    .required("ID required")
    .max(5, "ID too long!"),
  password: Yup.string()
    .required("Password required"),
});

const validateForm = (req, res) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch(err => {
      res.status(422).send();
      console.log(err.errors);
    })
    .then(valid => {
      if (valid) {
        console.log("form is good");
      }
    });
};

module.exports = validateForm;
