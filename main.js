/*
M O D I - 100727467

Purpose:

6 4 9 - Lottery

It allows user to select their 6 numbers manually of allows computer to autopick. 6 numbers from drawn and 6 numbers from user selected/autopick.
This game also shows the drawn date, day and time as well as number of matches.

*/

window.onload = function(){

    "use strict";

    /* ============================================================ Variable declaration ============================================================ */

    // lotto button variable
    let playLotto = document.getElementById('playLotto');

    // radio button YES variable
    let yesRadio = document.getElementById('radioYes');

    // radio button NO variable
    let noRadio = document.getElementById('radioNo');

    // variable for all checkboxes
    let checkBoxes = document.getElementsByName('checkboxes');

    // variable for table rows
    const NUMROWS = 1;

    // variable for table columns
    const NUMCOLS = 5;

    // variable for table opening tag
    let tableHTML = "<table>";

    // variable for table 1 cells
    let columnsArray1 = document.getElementsByTagName('td');

    // variable for table 2 cells
    let columnsArray2 = document.getElementsByTagName('td');

    // variable to display winning results
    let results;

    // variable to display quick-pick label
    let displayQuickPickSelectedLabel = "<lable>Quick-Pick selected numbers for you: </lable><br>";

    // variable to display user selected numbers label
    let displaySelectedLabel = "<lable>Your selected numbers: </lable><br>";

    /* ============================================================ global functions ============================================================ */

    // remove duplicates from an array
    Array.prototype.removeDuplicates = function() {
        let input = this;
        let hashObject = [];
        
        for (let i = input.length - 1; i >= 1; i--) {
            let currentItem = input[i]; 
        
            if (hashObject[currentItem] === true) {
                input.splice(i,i--, id);
            }
            
            hashObject[currentItem] === true;
        }
        return input;
    } //END removeDuplicates function
    
    // creating random numbers in an array
    function createRandomArray(size, low, high){
        // create array to return
        let randomArray = [];

        // create as many array elements as specified
        for (let i = 0; i < size ; i++){
            //each contains random integer from low to high
            randomArray[i] = (low + Math.floor((high - low + 1) * Math.random()));
            randomArray.removeDuplicates();
        }
        // returns the array
        return randomArray;
        
    } //END createRandomArray function

    // creating random table #1
    function createRandomtable1(tableHTML ,NUMROWS,  NUMCOLS, columnsArray1){  
        let t1;
        // concatenate tr, td and content into tableHTML
        // OUTER loop creates rows
        for (let i = 0; i < NUMROWS; i++){
            

            tableHTML = tableHTML + "<tr>";
            // INNER loop creates columns
            for (let j = 0 ; j <= NUMCOLS ; j++) {
                tableHTML = tableHTML + "<td>" + columnsArray1[j] + "</td>";
            }
            tableHTML = tableHTML + "</tr>";

            // add closing table tag
            tableHTML = tableHTML + "</table>";

            t1 = tableHTML;
        }
        return t1;
    } //END createRandomtable1 function

    // creating random table #2
    function createRandomtable2(tableHTML ,NUMROWS,  NUMCOLS, columnsArray2){
        for (let k = 1; k <= NUMROWS; k++){
            
            let t2;

            tableHTML = tableHTML + "<tr>";
            // INNER loop creates columns
            for (let j = 0 ; j <= NUMCOLS ; j++) {
                tableHTML = tableHTML + "<td>" + columnsArray2[j] + "</td>";
            }
            tableHTML = tableHTML + "</tr>";

            // add closing table tag
            tableHTML = tableHTML + "</table>";

            t2 = tableHTML;

            return t2;
        }
    } //END createRandomtable2 function

    // creating selected numbers table
    function createNumberSelectedtable(tableHTML ,NUMROWS,  NUMCOLS, numbersSelected){
        for (let k = 1; k <= NUMROWS; k++){
            
            let t3;

            tableHTML = tableHTML + "<tr>";
            // INNER loop creates columns
            for (let j = 0 ; j <= NUMCOLS ; j++) {
                tableHTML = tableHTML + "<td>" + numbersSelected[j] + "</td>";
            }
            tableHTML = tableHTML + "</tr>";

            // add closing table tag
            tableHTML = tableHTML + "</table>";

            t3 = tableHTML;

            return t3;
        }  
    } //END createNumberSelectedtable function

    // comparision function to watch for common numbers between 2 tables
    function comparision(columnsArray1, columnsArray2){
        let compare = 0;
        for (let i = 0; i < columnsArray1.length; i++){
            if(columnsArray1.includes(columnsArray2[i])){
                compare++;
            }
        }
        return compare;

    } //END comparision function

    function comparision2(columnsArray1, numbersSelected){
        let compare = 0;
        for (let i in numbersSelected){
            if(columnsArray1.includes(numbersSelected[i]) === true){
                compare++;
            }
        }
        return compare;
    }

    // to get the values of selected checkboxes
    function checked(){
        let numbersSelected = [];
        for(let i = 0; i < checkBoxes.length; i++){
            let checkbox = checkBoxes[i];
            if(checkbox.checked){
                numbersSelected.push(parseFloat(checkbox.value));
            }
        }
        return numbersSelected;
    } //END checked function


    // // for unchecking checkboxes
    // function UnCheckAll(checkBoxes){
    //     for (let i in checkBoxes){
    //         if(checkBoxes[i].type === 'checkbox'){
    //             checkBoxes[i].checked === false ;
    //         }
    //     }
    // } //END unCheckAll function
    
    /* ============================================================ addEventListner event functions ============================================================ */  
    
    // radio button YES click event function
    yesRadio.addEventListener('click',function(){
        // hides result box
        document.getElementById('box2').style.display = "none";
        // hides  checkboxes
        document.getElementById('checkboxes').style.display = "none";
    });

    // radio button NO click event function
    noRadio.addEventListener('click',function(){
        // hides result box
        document.getElementById('box2').style.display = "none";
        // display checkboxes
        document.getElementById('checkboxes').style.display = "flex";
    });

    // button click event
    playLotto.addEventListener('click', run, false);

    // run function contains all code functionality
    function run(){

        // display result box
        document.getElementById('box2').style.display = "block";

        /* ============================================================ get date ============================================================ */

        // craeting variable to get date
        let now = new Date();

        // to get current day
        let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // to get current month
        let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // to get current date
        let today = now.getDate();

        //to add a '0' if value is in 1 degit
        if (today < 10) {
            today = "0" + today;
        }

        // to get current year
        let year = now.getUTCFullYear();

        // to get current hour
        let hours = now.getHours();

        //to add a '0' if value is in 1 degit
        if (hours < 10) {
            hours = "0" + hours;
        }

        // to get current minutes
        let minutes = now.getMinutes();

        //to add a '0' if value is in 1 degit
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        // to get current seconds
        let seconds = now.getSeconds();

        //to add a '0' if value is in 1 degit
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        // declaration of displayDate variable
        let displayDate = "<label>Numbers drawn on " + day[now.getDay()] + ", " + month[now.getMonth()] + " " + today + ", " + year + " @ " + 
        hours + ":" + minutes + ":" + seconds + "<br>";

        /* =================================================================================================================================== */

        // creates first random numbers
        let randomArray1 = createRandomArray(6,1,49);

        // sort method for sorting numbers
        randomArray1.sort(function(a, b){
            return a-b;
        });

        // creates second random numbers
        let randomArray2 = createRandomArray(6,1,49);

        // sort method for sorting numbers
        randomArray2.sort(function(a, b){
            return a-b;
        });

        // assign random numbers #1 to table #1 cells
        columnsArray1 = randomArray1;

        // assign random numbers #2 to table #2 cells
        columnsArray2 = randomArray2;

        // variable for getting values of selected checkboxes
        let numbersSelected = checked();
        
        // variable for comparing 2 random tables 
        let compare = [];
        compare = comparision(columnsArray1 ,columnsArray2);

        // for comparing random and selected table
        let compareSelected = comparision2(columnsArray1, numbersSelected)

        
        // sort method for sorting numbers
        numbersSelected.sort(function(a, b){
            return a-b;
        });
        
        // if statment for radio button NO
        if(noRadio.checked){
            
            //  if selected numbers are less then or greater then 6
            if(numbersSelected.length < 6 || numbersSelected.length > 6){
                alert("Please select 6 numbers");
            }

            else{

                // for displaying appropriate results for number of matches
                switch(compareSelected){

                    case 1 : results = "<span>&#128521;</span>One number Matched. Try again next time!<span>&#128521;</span>"; break;            
                    case 2 : results = "<span>&#129321;</span>Two numbers Matched. Try again next time!<span>&#129321;</span>"; break;            
                    case 3 : results = "<span>&#129322;</span>You matched 3 numbers. You win enough to buy another ticket!<span>&#129322;</span>"; break;            
                    case 4 : results = "<span>&#127867;</span>You matched 4 numbers. Drinks are on you!<span>&#127867;</span>"; break;            
                    case 5 : results = "<span>&#128176;</span>You matched 5 numbers. Time to take that vacation!<span>&#128176;</span>"; break;            
                    case 6 : results = "<span>&#129297;</span>You matched all 6 numbers! Wow!! You are rich!!!<span>&#129297;</span>"; break;            
                    // no match
                    default : results = "<span>&#128542;</span>No number matched. Please try again.<span>&#128542;</span>";
                }

                // variable for creating random table #1
                let randomTable1 = createRandomtable1(tableHTML ,NUMROWS,  NUMCOLS, columnsArray1);

                // variable for creating user selected numbers table
                let selectedTable = createNumberSelectedtable(tableHTML ,NUMROWS,  NUMCOLS, numbersSelected);

                // to display final output into results fox
                document.getElementById('box2').innerHTML = displayDate + randomTable1 + displaySelectedLabel + selectedTable + results;
            } 

        }
        else if(yesRadio.checked){
            
            // for displaying appropriate results for number of matches
            switch(compare){

                case 1 : results = "<span>&#128521;</span>One number Matched. Try again next time!<span>&#128521;</span>"; break;        
                case 2 : results = "<span>&#129321;</span>Two numbers Matched. Try again next time!<span>&#129321;</span>"; break;        
                case 3 : results = "<span>&#129322;</span>You matched 3 numbers. You win enough to buy another ticket!<span>&#129322;</span>"; break;        
                case 4 : results = "<span>&#127867;</span>You matched 4 numbers. Drinks are on you!<span>&#127867;</span>"; break;        
                case 5 : results = "<span>&#128176;</span>You matched 5 numbers. Time to take that vacation!<span>&#128176;</span>"; break;        
                case 6 : results = "<span>&#129297;</span>You matched all 6 numbers! Wow!! You are rich!!!<span>&#129297;</span>"; break;        
                // no match
                default : results = "<span>&#128542;</span>No number matched. Please try again.<span>&#128542;</span>";
            }
            
        
            // variable for creating random table #1
            let randomTable1 = createRandomtable1(tableHTML ,NUMROWS,  NUMCOLS, columnsArray1);
            
            // variable for creating random table #2
            let randomTable2 = createRandomtable2(tableHTML ,NUMROWS,  NUMCOLS, columnsArray2);
            
            // to display final output into results fox
            document.getElementById('box2').innerHTML = displayDate + randomTable1 + displayQuickPickSelectedLabel + randomTable2 + "<br>" + results;
            
        }

        else{
            // dislay alert if no radio buttons are selected
            // not of use but thinking about safe side if someone does changes with html file
            alert("Please select one choice");
        }
    }
}/**END onload function */