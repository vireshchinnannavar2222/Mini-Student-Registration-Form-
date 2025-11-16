// Get form elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const output = document.getElementById('output');
const jsonOutput = document.getElementById('jsonOutput');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');

// Validation functions
function validateName(name) {
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return 'Name can only contain letters and spaces';
    }
    return '';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        return 'Phone number must be at least 10 digits';
    }
    return '';
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    nameError.textContent = error;
    if (error) {
        nameInput.classList.add('invalid');
    } else {
        nameInput.classList.remove('invalid');
    }
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    emailError.textContent = error;
    if (error) {
        emailInput.classList.add('invalid');
    } else {
        emailInput.classList.remove('invalid');
    }
});

phoneInput.addEventListener('blur', () => {
    const error = validatePhone(phoneInput.value);
    phoneError.textContent = error;
    if (error) {
        phoneInput.classList.add('invalid');
    } else {
        phoneInput.classList.remove('invalid');
    }
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const nameErr = validateName(nameInput.value);
    const emailErr = validateEmail(emailInput.value);
    const phoneErr = validatePhone(phoneInput.value);
    
    // Display errors
    nameError.textContent = nameErr;
    emailError.textContent = emailErr;
    phoneError.textContent = phoneErr;
    
    // Add invalid class if needed
    nameInput.classList.toggle('invalid', !!nameErr);
    emailInput.classList.toggle('invalid', !!emailErr);
    phoneInput.classList.toggle('invalid', !!phoneErr);
    
    // If no errors, convert to JSON and display
    if (!nameErr && !emailErr && !phoneErr) {
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            registrationDate: new Date().toISOString()
        };
        
        // Convert to JSON with formatting
        const jsonString = JSON.stringify(formData, null, 2);
        
        // Display JSON
        jsonOutput.textContent = jsonString;
        output.classList.remove('hidden');
        
        // Scroll to output
        output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
