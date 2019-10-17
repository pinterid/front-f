// Dummy structure file
var dummy = require('./dummy.json');

// Loads the dummy data into local storage
export const load = () => {
    window.localStorage.setItem('DUMMY_DATA', JSON.stringify(dummy));
}