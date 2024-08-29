export const APP = {
  data: [],
  init() {
    APP.addListeners();
  },
  addListeners() {
    const form = document.querySelector('#collect form');
    form.addEventListener('submit', APP.saveData);
    document
      .querySelector('table tbody')
  },
  saveData(ev) {
    ev.preventDefault();

    const form = ev.target;
    const formdata = new FormData(form);
    
    // save the data in APP.data
    APP.cacheData(formdata)

    form.reset();
    document.getElementById('numberOfPlayers').focus();
  },
  cacheData(formdata) {
    const startingValues = {
      numberOfPlayers: 9,
      gameDurationHours: 3.5,
      levelDuration: 15,
      startingStack: 100,
      smallestChipValue: 5,
      breakLengthMinutes: 15,
      maxTimeBetweenBreaks: 90,
      startingSmallBlind: 5,
    }
    let userValues = Object.fromEntries(formdata.entries())
    if (userValues.numberOfPlayers == '') {
      userValues.numberOfPlayers = '9';
    }
    if (userValues.gameDurationHours  == '') {
      userValues.gameDurationHours  = '3.5';
    }
    if (userValues.levelDuration == '') {
      userValues.levelDuration = '15';
    }
    if (userValues.startingStack  == '') {
      userValues.startingStack  = '100';
    }
    if (userValues.smallestChipValue  == '') {
      userValues.smallestChipValue  = '5';
    }
    if (userValues.breakLengthMinutes == '') {
      userValues.breakLengthMinutes = '15';
    }
    if (userValues.maxTimeBetweenBreaks  == '') {
      userValues.maxTimeBetweenBreaks  = '90';
    }
    if (userValues.startingSmallBlind  == '') {
      userValues.startingSmallBlind  = userValues.smallestChipValue;
    }
    
    APP.buildTable(userValues.numberOfPlayers, userValues.gameDurationHours, userValues.levelDuration, userValues.startingStack, userValues.smallestChipValue, userValues.breakLengthMinutes, userValues.maxTimeBetweenBreaks, userValues.startingSmallBlind)

  },
  addDummyValues() {
    const userValues = {}
    userValues.numberOfPlayers = '9';
    userValues.gameDurationHours  = '3.5';
    userValues.levelDuration = '15';
    userValues.startingStack  = '100';
    userValues.smallestChipValue  = '5';
    userValues.breakLengthMinutes = '15';
    userValues.maxTimeBetweenBreaks  = '90';
    userValues.startingSmallBlind  = userValues.smallestChipValue;
    
    APP.buildTable(userValues.numberOfPlayers, userValues.gameDurationHours, userValues.levelDuration, userValues.startingStack, userValues.smallestChipValue, userValues.breakLengthMinutes, userValues.maxTimeBetweenBreaks, userValues.startingSmallBlind)

  },
  buildTable(numberOfPlayers, gameDurationHours, levelDuration, startingStack, smallestChipValue, breakLengthMinutes, maxTimeBetweenBreaks, startingSmallBlind) {
    const lastLevelSmallBlind = startingStack * startingSmallBlind * numberOfPlayers / 2;
    const gameDurationMinutes = gameDurationHours * 60;
    const numberOfBreaks = Math.floor(gameDurationMinutes / (Number(maxTimeBetweenBreaks) + Number(breakLengthMinutes)));
    const numberOfLevels = Math.ceil((gameDurationMinutes - numberOfBreaks * breakLengthMinutes) / levelDuration + 1);

    const tableBody = document.getElementById('table-body');

    // Initialise list
    let startingBlindIncrement = 1.1
    let list = "";
    let count = 1;
    
    loopThroughBlinds();

    // Function to loop through blinds looking for correct tempIncrement value
    function loopThroughBlinds() {
      startingBlindIncrement = Math.round(startingBlindIncrement * 100) / 100;
      let x = smallestChipValue;
      let y = x * 2;
      let z = 0;
      let time = 0;
      let hours = 0;
      let minutes = "00";
      let breaks = 0

      tableBody.innerHTML = `
          <tr class="current level">
            <td class="time">0:00</td>
            <td class="levelNumber">1</td>
            <td class="smallBlind">${x}</td>
            <td class="bigBlind">${y}</td>
            <td class="ante">${z}</td>
            <td class="duration">${levelDuration}</td>
          </tr>`
    
      for (let i = 1; i < Number(numberOfLevels); i++) {
        x = Math.ceil((x * Number(startingBlindIncrement)) / 5) * 5;
        if (x > 40) {
          x = Math.ceil(x / 10) * 10
        }
        y = x * 2
        time = time + Number(levelDuration);
        hours = Math.floor(time / 60);
        minutes = time % 60;
        minutes < 10 ? (minutes = "0" + minutes) : minutes;
    
        if (time >= ((gameDurationMinutes + numberOfBreaks * Number(breakLengthMinutes)) / (numberOfBreaks + 1)) * (breaks + 1)) {
          tableBody.innerHTML+= `
          <tr class="break">
            <td class="time">${hours}:${minutes}</td>
            <td class=""></td>
            <td class="">--BREAK--</td>
            <td class=""></td>
            <td class=""></td>
            <td class="duration">${breakLengthMinutes}</td>
          </tr>`
          breaks++;
          time = time + parseInt(breakLengthMinutes);
          minutes = time % 60;
          hours = Math.floor(time / 60);
        }

        tableBody.innerHTML+= `
          <tr class="level">
            <td class="time">${hours}:${minutes}</td>
            <td class="levelNumber">${i + 1}</td>
            <td class="smallBlind">${x}</td>
            <td class="bigBlind">${y}</td>
            <td class="ante">${z}</td>
            <td class="duration">${levelDuration}</td>
          </tr>`
      }
      if (x > lastLevelSmallBlind) {
        return;
      } else {
        startingBlindIncrement += 0.05;
        loopThroughBlinds();
      }
      return;
    }
  }
}

// document.addEventListener('DOMContentLoaded', APP.init);
