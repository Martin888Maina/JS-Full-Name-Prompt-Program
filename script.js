/**
 * Full Name Input Application
 *
 * Handles user input for first and last names with real-time validation and formatted output.
 */

document.addEventListener('DOMContentLoaded', function () {

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const submitButton = document.getElementById('submitBtn');
    const resetButton = document.getElementById('resetBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultNameElement = document.getElementById('resultName');
    const form = document.getElementById('nameForm');

    /**
     * Validates a name input to ensure it contains only letters and spaces
     *
     * @param {string} name - The name string to validate
     * @returns {boolean} - True if name is valid, false otherwise
     */
    function validateName(name) {
        if (!name || name.trim().length === 0) {
            return false;
        }

        // À-ÿ range covers Latin extended characters for international name support
        const namePattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
        return namePattern.test(name);
    }

    /**
     * Displays visual feedback for input validation errors
     *
     * @param {HTMLElement} inputElement - The input field to mark as invalid
     * @param {string} message - Error message to display
     */
    function showError(inputElement, message) {
        inputElement.classList.add('error');
        inputElement.classList.remove('success');

        let errorElement = inputElement.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            inputElement.parentElement.appendChild(errorElement);
        }

        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    /**
     * Clears error state and marks the input as valid
     *
     * @param {HTMLElement} inputElement - The input field to mark as valid
     */
    function showSuccess(inputElement) {
        inputElement.classList.remove('error');
        inputElement.classList.add('success');

        const errorElement = inputElement.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    /**
     * Capitalizes the first letter of each word in a name
     * Ensures consistent formatting regardless of how users type their names
     *
     * @param {string} name - The name to format
     * @returns {string} - Properly capitalized name
     */
    function capitalizeName(name) {
        return name
            .trim()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    firstNameInput.addEventListener('input', function () {
        const value = this.value;

        if (value.length === 0) {
            this.classList.remove('error', 'success');
            const errorElement = this.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        } else if (validateName(value)) {
            showSuccess(this);
        } else {
            showError(this, 'Please enter a valid first name (letters only)');
        }
    });

    lastNameInput.addEventListener('input', function () {
        const value = this.value;

        if (value.length === 0) {
            this.classList.remove('error', 'success');
            const errorElement = this.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        } else if (validateName(value)) {
            showSuccess(this);
        } else {
            showError(this, 'Please enter a valid last name (letters only)');
        }
    });

    /**
     * Handle form submission
     * Validates all inputs and displays the formatted full name
     */
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;

        let isValid = true;

        if (!validateName(firstName)) {
            showError(firstNameInput, 'Please enter a valid first name');
            isValid = false;
        } else {
            showSuccess(firstNameInput);
        }

        if (!validateName(lastName)) {
            showError(lastNameInput, 'Please enter a valid last name');
            isValid = false;
        } else {
            showSuccess(lastNameInput);
        }

        if (isValid) {
            const formattedFirstName = capitalizeName(firstName);
            const formattedLastName = capitalizeName(lastName);
            const fullName = `${formattedFirstName} ${formattedLastName}`;

            submitButton.classList.add('loading');
            submitButton.textContent = 'Processing...';

            // Brief delay prevents an abrupt UI state change
            setTimeout(() => {
                resultNameElement.textContent = fullName;
                resultContainer.classList.add('show');

                submitButton.classList.remove('loading');
                submitButton.textContent = 'Submit';

                resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 500);
        }
    });

    /** Enables keyboard-only form navigation and submission via Enter key */
    firstNameInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            lastNameInput.focus();
        }
    });

    lastNameInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });

    resetButton.addEventListener('click', function () {
        firstNameInput.value = '';
        lastNameInput.value = '';

        firstNameInput.classList.remove('error', 'success');
        lastNameInput.classList.remove('error', 'success');

        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.classList.remove('show'));

        resultContainer.classList.remove('show');

        firstNameInput.focus();
    });
});
