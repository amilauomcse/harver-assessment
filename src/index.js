const {getRandomWordSync, getRandomWord} = require('word-maker');
const promise = require('promise');
const fs = require('fs');
const syncLoop = require('sync-loop');

const startingNumber = 1;
const endingNumber = 100;
const firstDividingNumber = 3;
const secondDividingNumber = 5;
const firstPrintingWord = "Fizz";
const secondPrintingWord = "Buzz";
const textFile = "exerciseData.txt";

//Task 1
printRandomWordsSynchronously();

function printRandomWordsSynchronously() {
    console.log(`<<<<<<<<<< Starts Printing Random Words Synchronously >>>>>>>>>>>>`);
    for (let i = startingNumber; i <= endingNumber; i++) {
        console.log(`${i} : ${getRandomWordSync()}`);
    }
    console.log(`<<<<<<<<<< Ends Printing Random Words Synchronously >>>>>>>>>>>>\n`);
}


//Task 2
setTimeout(printFizzBuzzSynchronously, 1000);

function printFizzBuzzSynchronously() {
    console.log(`<<<<<<<<<< Starts Printing FizzBuzz Synchronously >>>>>>>>>>>>`);
    for (let i = startingNumber; i <= endingNumber; i++) {
        if ((i % firstDividingNumber) === 0 && (i % secondDividingNumber) === 0) {
            console.log(`${i} : ${firstPrintingWord} ${secondPrintingWord}`);
        } else if ((i % firstDividingNumber) === 0) {
            console.log(`${i} : ${firstPrintingWord}`);
        } else if ((i % secondDividingNumber) === 0) {
            console.log(`${i} : ${secondPrintingWord}`);
        } else {
            console.log(`${i} : ${getRandomWordSync()}`);
        }
    }
    console.log(`<<<<<<<<<< Ends Printing FizzBuzz Synchronously >>>>>>>>>>>>\n`);
}

//Task 3 first part
setTimeout(printRandomWordsAsynchronously, 2000);

function printRandomWordsAsynchronously() {
    console.log(`<<<<<<<<<< Starts Printing Random Words Asynchronously >>>>>>>>>>>>`);

    let counter = 0;
    for (let i = startingNumber; i <= endingNumber; i++) {
        getRandomWord().then(word => {
            console.log(`${i} : ${word}`);
        }).finally(() => {
            counter++;
            if (counter === endingNumber) {
                console.log(`<<<<<<<<<< Ends Printing Random Words Asynchronously >>>>>>>>>>>>\n`);
            }
        });
    }

}


//Task 3 second part
setTimeout(printFizzBuzzAsynchronously, 3000);

function printFizzBuzzAsynchronously() {
    console.log(`<<<<<<<<<< Starts Printing FizzBuzz Asynchronously >>>>>>>>>>>>`);

    let counter = 0;
    for (let i = startingNumber; i <= endingNumber; i++) {
        getRandomWord().then(word => {
            if ((i % firstDividingNumber) === 0 && (i % secondDividingNumber) === 0) {
                console.log(`${i} : ${firstPrintingWord} ${secondPrintingWord}`);
            } else if ((i % firstDividingNumber) === 0) {
                console.log(`${i} : ${firstPrintingWord}`);
            } else if ((i % secondDividingNumber) === 0) {
                console.log(`${i} : ${secondPrintingWord}`);
            } else {
                console.log(`${i} : ${word}`);
            }
        }).finally(() => {
            counter++;
            if (counter === endingNumber) {
                console.log(`<<<<<<<<<< Ends Printing FizzBuzz Asynchronously >>>>>>>>>>>>\n`);
            }
        });
    }
}


//Task 4 first part
setTimeout(printFizzBuzzSynchronouslyWithError, 4000);

function printFizzBuzzSynchronouslyWithError() {
    console.log(`<<<<<<<<<< Starts Printing FizzBuzz Synchronously With Error >>>>>>>>>>>>`);

    for (let i = startingNumber; i <= endingNumber; i++) {
        try {
            const word = getRandomWordSync({withErrors: true});
            if ((i % firstDividingNumber) === 0 && (i % secondDividingNumber) === 0) {
                console.log(`${i} : ${firstPrintingWord} ${secondPrintingWord}`);
            } else if ((i % firstDividingNumber) === 0) {
                console.log(`${i} : ${firstPrintingWord}`);
            } else if ((i % secondDividingNumber) === 0) {
                console.log(`${i} : ${secondPrintingWord}`);
            } else {
                console.log(`${i} : ${word}`);
            }
        } catch (error) {
            console.log(`${i}` + " : It shouldn't break anything!");
        }
    }

    console.log(`<<<<<<<<<< Ends Printing FizzBuzz Synchronously With Error >>>>>>>>>>>>\n`);

}

// task 4 second part
setTimeout(printFizzBuzzAsynchronouslyWithError, 5000);

function printFizzBuzzAsynchronouslyWithError() {
    console.log(`<<<<<<<<<< Starts Printing FizzBuzz Asynchronously With Error >>>>>>>>>>>>`);

    let counter = 0;
    for (let i = startingNumber; i <= endingNumber; i++) {
        getRandomWord({withErrors: true}).then(word => {
            if ((i % firstDividingNumber) === 0 && (i % secondDividingNumber) === 0) {
                console.log(`${i} : ${firstPrintingWord} ${secondPrintingWord}`);
            } else if ((i % firstDividingNumber) === 0) {
                console.log(`${i} : ${firstPrintingWord}`);
            } else if ((i % secondDividingNumber) === 0) {
                console.log(`${i} : ${secondPrintingWord}`);
            } else {
                console.log(`${i} : ${word}`);
            }
        }).catch(error => {
            console.log(`${i}` + " : It shouldn't break anything!");
        }).finally(() => {
            counter++;
            if (counter === endingNumber) {
                console.log(`<<<<<<<<<< Ends Printing FizzBuzz Asynchronously With Error >>>>>>>>>>>>\n`);
            }
        })
    }

}

//Task 5
setTimeout(writeFizzBuzzSynchronouslyWithErrorToFile, 6000);

function writeFizzBuzzSynchronouslyWithErrorToFile() {
    console.log(`<<<<<<<<<< Starts Writing FizzBuzz Synchronously to File with Error >>>>>>>>>>>>`);

    let content = "<<<<<<<<<< Starts Writing FizzBuzz Synchronously to File with Error >>>>>>>>>>>>\n\n";
    for (let i = startingNumber; i <= endingNumber; i++) {
        try {
            const word = getRandomWordSync({withErrors: true});
            if ((i % firstDividingNumber) === 0 && (i % secondDividingNumber) === 0) {
                content += `${i} : ${firstPrintingWord} ${secondPrintingWord}\n`;
            } else if ((i % firstDividingNumber) === 0) {
                content += `${i} : ${firstPrintingWord}\n`;
            } else if ((i % secondDividingNumber) === 0) {
                content += `${i} : ${secondPrintingWord}\n`;
            } else {
                content += `${i} : ${word}\n`;
            }
        } catch (error) {
            content += `${i}` + " : It shouldn't break anything!\n";
        }
    }

    fs.writeFile(textFile, content, err => {
        if (err) {
            console.error(err);
            return
        }
        console.log(`<<<<<<<<<< Ends Writing FizzBuzz Synchronously to File with Error, find the ${textFile} in root of the project >>>>>>>>>>>>\n`);
    })
}

setTimeout(writeFizzBuzzAsynchronouslyWithErrorToFile, 7000);

function writeFizzBuzzAsynchronouslyWithErrorToFile() {
    console.log(`<<<<<<<<<< Starts Writing FizzBuzz Asynchronously to File with Error >>>>>>>>>>>>`);

    let content = "\n\n<<<<<<<<<< Starts Writing FizzBuzz Asynchronously to File with Error >>>>>>>>>>>>\n\n";
    let counter = startingNumber - 1;
    for (let i = startingNumber; i <= endingNumber; i++) {
        getRandomWord({withErrors: true}).then(word => {
            if ((i % firstDividingNumber) === 0 && (i % secondDividingNumber) === 0) {
                content += `${i} : ${firstPrintingWord} ${secondPrintingWord}\n`;
            } else if ((i % firstDividingNumber) === 0) {
                content += `${i} : ${firstPrintingWord}\n`;
            } else if ((i % secondDividingNumber) === 0) {
                content += `${i} : ${secondPrintingWord}\n`;
            } else {
                content += `${i} : ${word}\n`;
            }
        }).catch(error => {
            content += `${i}` + " : It shouldn't break anything!\n";
        }).finally(() => {
            counter++;
            if (counter === endingNumber) {
                fs.writeFile(textFile, content, {flag: 'a'}, err => {
                    if (err) {
                        console.error(err);
                        return
                    }
                    console.log(`<<<<<<<<<< Ends Writing FizzBuzz Asynchronously to File with Error, find the ${textFile} in root of the project >>>>>>>>>>>>\n`);
                })
            }
        });
    }

}


//Bonus Task
setTimeout(printFizzBuzzAsynchronouslyInAscendingOrder, 8000);

function printFizzBuzzAsynchronouslyInAscendingOrder() {
    console.log(`<<<<<<<<<< Starts Printing FizzBuzz Asynchronously in Ascending Order >>>>>>>>>>>>`);
    syncLoop(endingNumber, function (loop) {
        let index = loop.iteration() + 1;
        getRandomWord().then(word => {
            if ((index % firstDividingNumber) === 0 && (index % secondDividingNumber) === 0) {
                console.log(`${index} : ${firstPrintingWord} ${secondPrintingWord}`);
            } else if ((index % firstDividingNumber) === 0) {
                console.log(`${index} : ${firstPrintingWord}`);
            } else if ((index % secondDividingNumber) === 0) {
                console.log(`${index} : ${secondPrintingWord}`);
            } else {
                console.log(`${index} : ${word}`);
            }
            loop.next();
        })
    }, function () {
        console.log(`<<<<<<<<<< Ends Printing FizzBuzz Asynchronously in Ascending Order >>>>>>>>>>>>\n`);
    });
}

setTimeout(printFizzBuzzAsynchronouslyWithSlowOption, 10000);


function printFizzBuzzAsynchronouslyWithSlowOption() {
    console.log(`<<<<<<<<<< Starts Printing FizzBuzz Asynchronously with Slow Option >>>>>>>>>>>>`);

    let promiseList = [];
    let startTime = (new Date()).getTime();
    for (let i = startingNumber; i <= endingNumber; i++) {
        promiseList.push(getRandomWord({slow: true}));
    }
    Promise.all(
        promiseList
    ).then(randomWords => {
        randomWords.forEach((word, index) => {
            index = index + 1;
            if ((index % firstDividingNumber) === 0 && (index % secondDividingNumber) === 0) {
                console.log(`${index} : ${firstPrintingWord} ${secondPrintingWord}`);
            } else if ((index % firstDividingNumber) === 0) {
                console.log(`${index} : ${firstPrintingWord}`);
            } else if ((index % secondDividingNumber) === 0) {
                console.log(`${index} : ${secondPrintingWord}`);
            } else {
                console.log(`${index} : ${word}`);
            }
        });
        let endTime = (new Date()).getTime();
        console.log(`<<<<<<<<<< Ends Printing FizzBuzz Asynchronously with Slow Option, Time taken : ${endTime - startTime} ms >>>>>>>>>>>>\n`);
    })
}


module.exports = {
    printRandomWordsSynchronously,
    printFizzBuzzSynchronously,
    printRandomWordsAsynchronously,
    printFizzBuzzAsynchronously,
    printFizzBuzzSynchronouslyWithError,
    printFizzBuzzAsynchronouslyWithError,
    writeFizzBuzzSynchronouslyWithErrorToFile,
    writeFizzBuzzAsynchronouslyWithErrorToFile,
    printFizzBuzzAsynchronouslyInAscendingOrder,
    printFizzBuzzAsynchronouslyWithSlowOption
};