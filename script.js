/**
 * Full Name Input Application
 * 
 * This application handles user input for first and last names with comprehensive
 * validation and dynamic UI feedback. The code demonstrates modern JavaScript
 * practices including event handling, input validation, and DOM manipulation.
 */

// Wait for DOM to be fully loaded before executing any scripts
// This ensures all HTML elements are available for manipulation
document.addEventListener('DOMContentLoaded', function () {

    // Cache DOM element references for better performance
    // Avoiding repeated DOM queries improves efficiency
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const submitButton = document.getElementById('submitBtn');
    const resetButton = document.getElementById('resetBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultNameElement = document.getElementById('resultName');
    const form = document.getElementById('nameForm');

    /**
     * Validates a name input to ensure it contains only letters and spaces
     * This provides immediate feedback to users about input requirements
     * 
     * @param {string} name - The name string to validate
     * @returns {boolean} - True if name is valid, false otherwise
     */
    function validateName(name) {
        // Check if name is not empty after trimming whitespace
        if (!name || name.trim().length === 0) {
            return false;
        }

        // Regular expression to match only letters (including international characters) and spaces
        // This allows for names from various languages and cultures
        const namePattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
        return namePattern.test(name);
    }

    /**
     * Displays visual feedback for input validation errors
     * Helps users understand what needs to be corrected
     * 
     * @param {HTMLElement} inputElement - The input field to mark as invalid
     * @param {string} message - Error message to display
     */
    function showError(inputElement, message) {
        inputElement.classList.add('error');
        inputElement.classList.remove('success');

        // Find or create error message element
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
     * Displays visual feedback for successful input validation
     * Provides positive reinforcement for correct input
     * 
     * @param {HTMLElement} inputElement - The input field to mark as valid
     */
    function showSuccess(inputElement) {
        inputElement.classList.remove('error');
        inputElement.classList.add('success');

        // Hide any existing error messages
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

    /**
     * Real-time validation for first name input
     * Provides immediate feedback as users type
     */
    firstNameInput.addEventListener('input', function () {
        const value = this.value;

        if (value.length === 0) {
            // Clear validation state when input is empty
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

    /**
     * Real-time validation for last name input
     * Provides immediate feedback as users type
     */
    lastNameInput.addEventListener('input', function () {
        const value = this.value;

        if (value.length === 0) {
            // Clear validation state when input is empty
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
        // Prevent default form submission to handle with JavaScript
        event.preventDefault();

        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;

        // Track whether form is valid
        let isValid = true;

        // Validate first name
        if (!validateName(firstName)) {
            showError(firstNameInput, 'Please enter a valid first name');
            isValid = false;
        } else {
            showSuccess(firstNameInput);
        }

        // Validate last name
        if (!validateName(lastName)) {
            showError(lastNameInput, 'Please enter a valid last name');
            isValid = false;
        } else {
            showSuccess(lastNameInput);
        }

        // Only proceed if both inputs are valid
        if (isValid) {
            // Format the names with proper capitalization
            const formattedFirstName = capitalizeName(firstName);
            const formattedLastName = capitalizeName(lastName);
            const fullName = `${formattedFirstName} ${formattedLastName}`;

            // Add loading state to button for better UX
            submitButton.classList.add('loading');
            submitButton.textContent = 'Processing...';

            // Simulate a brief processing time for smooth transition
            // In a real application, this might be an API call
            setTimeout(() => {
                // Display the result
                resultNameElement.textContent = fullName;
                resultContainer.classList.add('show');

                // Reset button state
                submitButton.classList.remove('loading');
                submitButton.textContent = 'Submit';

                // Scroll result into view smoothly
                resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 500);
        }
    });

    /**
     * Allow form submission with Enter key on both input fields
     * Improves keyboard navigation and user experience
     */
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

    /**
     * Reset button functionality
     * Clears all form inputs and resets validation states
     */
    resetButton.addEventListener('click', function () {
        // Clear all input fields
        firstNameInput.value = '';
        lastNameInput.value = '';

        // Remove validation classes
        firstNameInput.classList.remove('error', 'success');
        lastNameInput.classList.remove('error', 'success');

        // Hide any error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.classList.remove('show'));

        // Hide result container
        resultContainer.classList.remove('show');

        // Focus on first input for better UX
        firstNameInput.focus();
    });
});
