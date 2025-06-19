// form.js

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const error = params.get("error");
  const success = params.get("success");

  const errorDiv = document.getElementById("form-error");
  const successDiv = document.getElementById("form-success");

  if (error && errorDiv) {
    let message = "There was an error submitting the form. Please try again.";

    if (error === "recaptcha") {
      message = "We could not verify you as a human. Please try again.";
    } else if (error === "required") {
      message = "Please fill in all required fields.";
    } else if (error === "server") {
      message =
        "There was a problem sending your message. Please try again later.";
    } else if (error === "invalid") {
      message =
        "There was an issue with the form. Please refresh and try again.";
    }

    errorDiv.textContent = message;
    errorDiv.style.display = "block";
  }

  if (success && successDiv) {
    successDiv.textContent =
      "Thank you! Your message has been successfully sent. We will get back to you shortly.";
    successDiv.style.display = "block";
  }
});
