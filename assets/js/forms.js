document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form[data-form-type]");

  forms.forEach((form) => {
    const formType = form.getAttribute("data-form-type"); // e.g., "quote" or "contact"
    const errorDiv = form.querySelector(".error-message");
    const successDiv = form.querySelector(".success-message");
    const submitBtn = form.querySelector(".submit-btn");
    const spinner = submitBtn.querySelector(".spinner");
    const btnText = submitBtn.querySelector(".btn-text");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Hide previous messages
      if (errorDiv) errorDiv.style.display = "none";
      if (successDiv) successDiv.style.display = "none";

      // Disable button & show spinner
      submitBtn.disabled = true;
      //   if (spinner) spinner.style.display = "inline-block";

      const formData = new FormData(form);
      formData.append("form_type", formType);

      fetch("submit-form-handler.php", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            if (successDiv) {
              successDiv.textContent =
                data.message || "Form submitted successfully.";
              successDiv.style.display = "block";
            }
            form.reset();
          } else {
            if (errorDiv) {
              errorDiv.textContent =
                data.message || "An error occurred. Please try again.";
              errorDiv.style.display = "block";
            }
          }
        })
        .catch(() => {
          if (errorDiv) {
            errorDiv.textContent =
              "Something went wrong. Please try again later.";
            errorDiv.style.display = "block";
          }
        })
        .finally(() => {
          // Re-enable button & hide spinner
          submitBtn.disabled = false;
          //   if (spinner) spinner.style.display = "none";
        });
    });
  });
});
