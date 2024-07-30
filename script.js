document.addEventListener('DOMContentLoaded', function() {
    const addFormButton = document.getElementById('addFormButton');
    const formContainer = document.querySelector('.form-container');
    let formCount = 5; // Initial number of forms

    addFormButton.addEventListener('click', function() {
        formCount++; // Increment form count

        // Create new form section
        const newFormSection = document.createElement('div');
        newFormSection.classList.add('form-section');
        newFormSection.id = `formSection${formCount}`;

        newFormSection.innerHTML = 
            `<form id="customForm${formCount}">
                <div class="form-tape-name">
                    <label>#</label>
                    <input type="text" name="tape-name" placeholder="Tape Name" required>
                </div>
                <div class="form-center"><input type="text" name="N1" placeholder="N1"></div>
                <div>-------------------------------|</div>
                <div class="form-start-end"><input type="text" name="start" placeholder="Start" required><input type="text" name="end" placeholder="End" required></div>
                <div class="form-center"><input type="text" name="meter" placeholder="Meter" required>m</div>
                <div id="removeButton"><button type="button" class="button removeButton">ー</button></div>
            </form>`;

        formContainer.insertBefore(newFormSection, addFormButton.parentNode); // Insert new form section before the button

        // Add event listener for the new form's remove button
        const removeButton = newFormSection.querySelector('.removeButton');
        removeButton.addEventListener('click', function() {
            formContainer.removeChild(newFormSection);
        });
    });

    // Event listener for generate button
    document.getElementById('generateButton').addEventListener('click', function() {
        const forms = document.querySelectorAll('.form-section form');
        let concatenatedResult = '';
        let totalMeters = 0;
        const outDirection = document.querySelector('input[name="out"]:checked').value;

        // Determine the order of forms based on the selected radio button
        const orderedForms = outDirection === 'Rout' ? Array.from(forms) : Array.from(forms).reverse();

        orderedForms.forEach((form) => {
            const inputs = form.querySelectorAll('input[type="text"]');
            const metal = document.querySelector('input[name="metal"]:checked');

            // Ensure all required fields are filled before proceeding
            if (Array.from(inputs).some(input => input.value.trim() === '' && input.required)) {
                return;
            }

            let formValues = Array.from(inputs).map(input => input.value.trim());

            // Ensure optional formValues[1] is empty if it's not provided
            formValues[1] = formValues[1] || '';
            
            // Append to the result only if required fields are not empty
            if (formValues[0] && formValues[1] && formValues[2] && formValues[3] && formValues[4] && metal) {
                concatenatedResult += `#${formValues[0]} (${formValues[2]}-${formValues[3]}) ${formValues[1]} ${formValues[4]}m ${metal.value} `;
                totalMeters += parseFloat(formValues[4]);
            } else if (formValues[0] && formValues[2] && formValues[3] && formValues[4] && metal) {
                concatenatedResult += `#${formValues[0]} (${formValues[2]}-${formValues[3]}) ${formValues[4]}m ${metal.value} `;
                totalMeters += parseFloat(formValues[4]);
            }
        });

        const generatedResult = document.getElementById('generatedResult');
        generatedResult.value = concatenatedResult.trim();

        // Update total length input field
        const totalLength = document.getElementById('totalLength');
        totalLength.value = `${totalMeters}m`;
    });

    // Event listener for copy button
    document.getElementById('copyButton').addEventListener('click', function() {
        const generatedResult = document.getElementById('generatedResult');
        generatedResult.select();
        document.execCommand('copy');
        alert('Copied to clipboard!');
    });
});
