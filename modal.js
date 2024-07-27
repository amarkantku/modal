class ModalLibrary {
  constructor() {
    // Create the modal element
    this.modal = document.createElement("div");
    this.modal.className = "modal";
    this.modal.setAttribute("role", "dialog");
    this.modal.setAttribute("aria-hidden", "true");

    // Create the modal content container
    this.modalContent = document.createElement("div");
    this.modalContent.className = "modal-content";

    // Create the modal header
    this.modalHeader = document.createElement("div");
    this.modalHeader.className = "modal-header";

    // Create the modal title
    this.modalTitle = document.createElement("h2");
    this.modalTitle.className = "modal-title";

    // Create the close button
    this.closeButton = document.createElement("button");
    this.closeButton.className = "close-button";
    this.closeButton.setAttribute("aria-label", "Close modal");
    this.closeButton.innerHTML = "&times;";
    this.closeButton.addEventListener("click", this.close.bind(this)); // Bind the close method to this button

    // Append the title and close button to the modal header
    this.modalHeader.appendChild(this.modalTitle);
    this.modalHeader.appendChild(this.closeButton);

    // Create the modal body
    this.modalBody = document.createElement("div");
    this.modalBody.className = "modal-body";

    // Create the modal footer
    this.modalFooter = document.createElement("div");
    this.modalFooter.className = "modal-footer";

    // Create the OK button
    this.okButton = document.createElement("button");
    this.okButton.textContent = "OK";
    this.okButton.addEventListener("click", this.handleOk.bind(this));

    // Create the Cancel button
    this.cancelButton = document.createElement("button");
    this.cancelButton.textContent = "Cancel";
    this.cancelButton.addEventListener("click", this.handleCancel.bind(this));

    // Append the OK and Cancel buttons to the modal footer
    this.modalFooter.appendChild(this.okButton);
    this.modalFooter.appendChild(this.cancelButton);

    // Append the header, body, and footer to the modal content
    this.modalContent.appendChild(this.modalHeader);
    this.modalContent.appendChild(this.modalBody);
    this.modalContent.appendChild(this.modalFooter);

    // Append the modal content to the modal
    this.modal.appendChild(this.modalContent);

    // Append the modal to the body
    document.body.appendChild(this.modal);

    // Create the backdrop element
    this.backdrop = document.createElement("div");
    this.backdrop.className = "backdrop";
    this.backdrop.setAttribute("aria-hidden", "true");
    this.backdrop.addEventListener("click", this.close.bind(this)); // Bind the close method to the backdrop click

    // Append the backdrop to the body
    document.body.appendChild(this.backdrop);

    // Add event listener for the Escape key to close the modal
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        this.modal.getAttribute("aria-hidden") === "false"
      ) {
        this.close();
      }
    });
  }

  // Method to open the modal with specified options
  open(options) {
    // Set the modal title and body content
    this.modalTitle.textContent = options.title || "Modal Title";
    this.modalBody.innerHTML = options.content || "Modal Content";

    const noop = () => {};

    // Store the callback functions for the OK and Cancel buttons
    this.okCallback = options.onOk || noop;
    this.cancelCallback = options.onCancel || noop;

    // Display the modal and backdrop
    this.modal.style.display = "block";
    this.backdrop.style.display = "block";
    // Update ARIA attributes to indicate the modal is visible
    this.modal.setAttribute("aria-hidden", "false");
    this.backdrop.setAttribute("aria-hidden", "false");
  }

  // Method to close the modal
  close() {
    // Hide the modal and backdrop
    this.modal.style.display = "none";
    this.backdrop.style.display = "none";
    // Update ARIA attributes to indicate the modal is hidden
    this.modal.setAttribute("aria-hidden", "true");
    this.backdrop.setAttribute("aria-hidden", "true");
  }

  // Method to handle the OK button click
  handleOk() {
    this.okCallback(true);
    this.close();
  }

  // Method to handle the Cancel button click
  handleCancel() {
    this.cancelCallback(false);
    this.close();
  }
}
