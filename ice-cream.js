 function addError(field) {
  if (field.previousElementSibling &&
    field.previousElementSibling.className === 'error') {
    // error message already showing
    return;
  }
  const error = document.createElement('div');
  error.innerHTML = '&#x26A1; '
    + field.dataset.errorMsg;
  error.className = 'error';
  field.parentNode.insertBefore(error, field);
}

function removeError(field) {
  if (field.previousElementSibling &&
    field.previousElementSibling.className === 'error') {
    field.previousElementSibling.remove();
  }
}

function checkField(field) {
  if (!field.checkValidity()) {
    addError(field);
  } else {
    removeError(field);
  }
}

function checkSelect(field) {
  if ( field.selectedIndex === 0 ) {
    field.setCustomValidity('Invalid');
    addError(field);
    field.setCustomValidity('Invalid');
  } else {
    removeError(field);
  }
}

function getSelectedRadio(radioArray) {
  for (btn of radioArray) {
    if (btn.checked) {
      return btn;
    }
  }
  return null;
}

function checkWhip(whip) {
  const radioArray = document.querySelectorAll('input[name="container"]');
  const selectedContainer = getSelectedRadio(radioArray);
  if (!selectedContainer) {
    return; //container not selected
  }
  if (whip.checked && selectedContainer.value !== 'cup') {
    addError(whip);
  } else {
    removeError(whip);
  }
}
  
window.addEventListener('load', function(e) {
  const form  = document.getElementById('ice-cream-form');
  const email = form.email;
  email.dataset.errorMsg = 'Invalid Email';
  const phone = form.phone;
  phone.dataset.errorMsg = 'Invalid Phone. Use format: ###-###-####';
  const username = form.username;
  username.dataset.errorMsg = 'Username must be 8 to 25 characters.';
  const container = form.container[0];
  container.dataset.errorMsg = 'Please select a container.';
  const flavor = form.flavor;
  flavor.dataset.errorMsg = 'Please select a flavor.';
  const terms = form.terms;
  terms.dataset.errorMsg = 'You must accept the terms.';
  const requests = form.requests;
  requests.dataset.errorMsg = 'Your comment must be between ' +
    requests.minLength + ' and ' + requests.maxLength + 
    ' characters.';
  const whip = form.whip;
  whip.dataset.errorMsg = 'You cannot have whipped cream on a cone.';

  // Get the input and textarea fields
  const inputFields = document.querySelectorAll('input, textarea');

  // Loop through the input fields, marking them all "untouched"
  for (field of inputFields) {
    field.dataset.status = 'untouched';
  }
  
  // When a user changes the value of a text-like input or textarea,
  //  mark the field "touched"
  //  validate the field
  username.addEventListener("change", function(e) {
    username.dataset.status = 'touched';
    checkField(username);
  });

  // When a user inputs data into a text-like input or textarea
  //  that has been touched, validate the field
  username.addEventListener("input", function(e) {
    if (username.dataset.status === 'touched') {
      checkField(username);
    }
  });
  
  email.addEventListener("change", function(e) {
    email.dataset.status = 'touched';
    checkField(email);
  });
  email.addEventListener("input", function(e) {
    if (email.dataset.status === 'touched') {
      checkField(email);
    }
  });

  phone.addEventListener("change", function(e) {
    phone.dataset.status = 'touched';
    checkField(phone);
  });
  phone.addEventListener("input", function(e) {
    if (phone.dataset.status === 'touched') {
      checkField(phone);
    }
  });

  requests.addEventListener("change", function(e) {
    requests.dataset.status = 'touched';
    checkField(requests);
  });
  requests.addEventListener("input", function(e) {
    if (requests.dataset.status === 'touched') {
      checkField(requests);
    }
  }); 
  
  for (radio of form.container) {
    radio.addEventListener("click", function(e) {
      checkField(container);
      checkWhip(whip);
    });
  }

  flavor.addEventListener("change", function(e) {
    checkSelect(flavor);
  });

  terms.addEventListener("click", function(e) {
    checkField(terms);
  });

  whip.addEventListener("click", function(e) {
    checkWhip(whip);
  });

  form.addEventListener("submit", function(e) {
    // Mark all fields touched
    for (field of inputFields) {
      field.dataset.status = 'touched';
    } 
    // Check errors
    checkField(email);
    checkField(phone);
    checkField(username);
    checkField(container);
    checkSelect(flavor);
    checkField(requests);
    checkField(terms);
    checkWhip(whip);

    // If form is invalid, prevent submission
    if (!form.checkValidity()) {
      e.preventDefault();
      alert('Please fix form errors.');
    }
  });

});