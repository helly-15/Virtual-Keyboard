// Add input and table into html
const textarea = document.createElement('TEXTAREA');
document.body.appendChild(textarea);
textarea.autofocus = true;
const table = document.createElement('table');
document.body.append(table);

if (sessionStorage.getItem('langMode')) {
  defaultLang = sessionStorage.getItem('langMode');
} else {
  sessionStorage.setItem('langMode', 'EngSmall');
  defaultLang = sessionStorage.getItem('langMode');
};
createHorisLayout(14);
createHorisLayout(14);
createHorisLayout(13);
createHorisLayout(13);
createHorisLayout(9);
nameKeys(defaultLang);

const allButtonsCollection = document.getElementsByClassName(`button`);
const allButtons = Array.prototype.slice.call( allButtonsCollection );
/**
 * creating buttons
 * @param {int} numOfButtons
 */
function createHorisLayout(numOfButtons) {
  const btnHolder = document.createElement('div');
  table.append(btnHolder);
  btnHolder.classList.add(`btnHolder`);
  for (let i = 0; i < numOfButtons; i++) {
    const btn = document.createElement('BUTTON');
    btnHolder.append(btn);
    btn.classList.add(`button`);
  }
};

/**
 * naming buttons
 * @param {string} status - language mode
 */
function nameKeys(status) {
  const elements = document.getElementsByClassName(`button`);
  let i = 0;
  for (const key in keys) {
    if (keys.hasOwnProperty(key)) {
      elements[i].innerHTML = `${keys[key][status]}`;
      i++;
    }
  }
};
/**
 * insert cursor in correct place in textarea
 * @param {object} myField - textarea
 * @param {string} myValue - text
 */
function insertAtCursor(myField, myValue) {
  // IE support
  if (document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
  } else if (myField.selectionStart || myField.selectionStart == '0') {
    const startPos = myField.selectionStart;
    const endPos = myField.selectionEnd;
    myField.value = myField.value.substring(0, startPos) +
            myValue +
            myField.value.substring(endPos, myField.value.length);

    myField.selectionStart = startPos + myValue.length;
    myField.selectionEnd = startPos + myValue.length;
  } else {
    myField.value += myValue;
  }
}

for (const item of allButtons) {
  item.addEventListener('mousedown', () => {
    textarea.focus();
    item.classList.add('pressed', 'animated');
    insertAtCursor(textarea, item.innerHTML);
    if (item.innerHTML == 'Capslock') {
      switch (defaultLang) {
        case 'EngSmall':
          sessionStorage.setItem('langMode', 'EngBig');
          defaultLang = sessionStorage.getItem('langMode');
          break;
        case 'EngBig':
          sessionStorage.setItem('langMode', 'EngSmall');
          defaultLang = sessionStorage.getItem('langMode');
          break;
        case 'RusBig':
          sessionStorage.setItem('langMode', 'RusSmall');
          defaultLang = sessionStorage.getItem('langMode');
          break;
        case 'RusSmall':
          sessionStorage.setItem('langMode', 'RusBig');
          defaultLang = sessionStorage.getItem('langMode');
          break;
      };
      nameKeys(defaultLang);
    };
  });
  item.addEventListener('mouseup', () => {
    textarea.focus();
    item.classList.remove('pressed', 'animated');
  });
};

for (const item of allButtons) {
  assignExtraCharacteristics(item);
};

textarea.addEventListener('keydown', function(event) {
  textarea.focus();
  const pushedBut = allButtons.find((elem) => elem.innerHTML==event.key );
  pushedBut.classList.add('pressed', 'animated');
  // pushedBut.classList.add('animated');
});

textarea.addEventListener('keyup', function(event) {
  textarea.focus();
  const pushedBut = allButtons.find((elem) => elem.innerHTML==event.key );
  pushedBut.classList.remove('pressed', 'animated');
  // pushedBut.classList.remove('animated');
});


/**
 * working with additional characteristics of ctrl, shift etc
 * @param {object} button - target button
 */
function assignExtraCharacteristics(button) {
  switch (button.innerHTML) {
    case 'Backspace':
      button.classList.add('Backspace');
      break;
    case 'Capslock':
      button.classList.add('Capslock');

      break;
    case 'Control':
      button.classList.add('Ctrl');
      break;
    case 'Space':
      button.classList.add('Space');
      break;
    case 'Shift':
      button.classList.add('Shift');
      break;
    case 'Enter':
      button.classList.add('Enter');
      break;
  }
}
window.addEventListener('keydown', function() {
  textarea.focus();
  if (window.event.shiftKey && window.event.altKey) {
    switch (defaultLang) {
      case 'EngSmall':
        sessionStorage.setItem('langMode', 'RusSmall');
        defaultLang = sessionStorage.getItem('langMode');
        break;
      case 'EngBig':
        sessionStorage.setItem('langMode', 'RusBig');
        defaultLang = sessionStorage.getItem('langMode');
        break;
      case 'RusBig':
        sessionStorage.setItem('langMode', 'EngBig');
        defaultLang = sessionStorage.getItem('langMode');
        break;
      case 'RusSmall':
        sessionStorage.setItem('langMode', 'EngSmall');
        defaultLang = sessionStorage.getItem('langMode');
        break;
    };
  }


  nameKeys(defaultLang);
},
);
