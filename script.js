// Add input and table into html
const textarea = document.createElement('TEXTAREA');
document.body.appendChild(textarea);

const table = document.createElement('table');
document.body.append(table);

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
    btn.addEventListener('mousedown', () => {
      btn.classList.add('pressed');
    });
    btn.addEventListener('mouseup', () => {
      btn.classList.remove('pressed');
    });
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
    const elem = elements[i];
    elements[i].innerHTML = `${keys[key][status]}`;
    elem.addEventListener('mousedown', () => {
      textarea.append(elem.innerHTML);
    });
    i++;
    textarea.addEventListener('keydown', function(event) {
      if (event.code == key) {
        elem.classList.add('pressed');
      }
    });
    textarea.addEventListener('keyup', function(event) {
      if (event.code == key) {
        elem.classList.remove('pressed');
      }
    });
  }
}

createHorisLayout(14);
createHorisLayout(14);
createHorisLayout(13);
createHorisLayout(13);
createHorisLayout(9);
nameKeys('EngSmall');


