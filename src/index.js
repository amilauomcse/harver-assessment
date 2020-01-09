const {getRandomWordSync, getRandomWord} = require('word-maker');
const fs = require('fs');

const numberOfLoops = 100;
const firstDividingNumber = 3;
const secondDividingNumber = 5;
const firstPrintingWord = "Fizz";
const secondPrintingWord = "Buzz";
const textFile = "exerciseData.txt";

function isDividable(number, divider) {
    return number % divider === 0;
}

function findFizzBuzz(number, word) {
    if (isDividable(number, firstDividingNumber * secondDividingNumber)) {
        return `${number} : ${firstPrintingWord}${secondPrintingWord}`;
    } else if (isDividable(number, firstDividingNumber)) {
        return `${number} : ${firstPrintingWord}`;
    } else if (isDividable(number, secondDividingNumber)) {
        return `${number} : ${secondPrintingWord}`;
    } else {
        return `${number} : ${word}`;
    }
}

//Task 1
printRandomWordsSynchronously();

function printRandomWordsSynchronously() {
    let output = `<<<<<<<<<< Starts Printing Random Words Synchronously >>>>>>>>>>>>\n`;

    output += [...Array(numberOfLoops)].map((_, i) => {
        const index = i + 1;
        return `${index} : ${getRandomWordSync()}`;
    }).join('\n');

    output += `\n<<<<<<<<<< Ends Printing Random Words Synchronously >>>>>>>>>>>>\n`;

    console.log(output);
}


//Task 2
setTimeout(printFizzBuzzSynchronously, 1000);

function printFizzBuzzSynchronously() {
    let output = `<<<<<<<<<< Starts Printing FizzBuzz Synchronously >>>>>>>>>>>>\n`;

    output += [...Array(numberOfLoops)].map((_, i) => {
        const index = i + 1;
        return findFizzBuzz(index, getRandomWordSync());
    }).join('\n');

    output += `\n<<<<<<<<<< Ends Printing FizzBuzz Synchronously >>>>>>>>>>>>\n`;

    console.log(output);
}

//Task 3 first part
setTimeout(printRandomWordsAsynchronously, 2000);

function printRandomWordsAsynchronously() {
    let output = `<<<<<<<<<< Starts Printing Random Words Asynchronously >>>>>>>>>>>>\n`;
    let counter = 0;
    [...Array(numberOfLoops)].map((_, i) => {
        const index = i + 1;
        getRandomWord().then(word => {
            output += `${index} : ${word}\n`;
        }).finally(() => {
            counter++;
            if (counter === numberOfLoops) {
                output += `<<<<<<<<<< Ends Printing Random Words Asynchronously >>>>>>>>>>>>\n`;
                console.log(output);
            }
        });
    });

}


//Task 3 second part
setTimeout(printFizzBuzzAsynchronously, 3000);

function printFizzBuzzAsynchronously() {
    let output = `<<<<<<<<<< Starts Printing FizzBuzz Asynchronously >>>>>>>>>>>>\n`;

    let counter = 0;
    [...Array(numberOfLoops)].map((_, i) => {
        const index = i + 1;
        getRandomWord().then(word => {
            output += findFizzBuzz(index, word) + `\n`;
        }).finally(() => {
            counter++;
            if (counter === numberOfLoops) {
                output += `<<<<<<<<<< Ends Printing FizzBuzz Asynchronously >>>>>>>>>>>>\n`;
                console.log(output);
            }
        });
    });
}

//this can be used for both task 4 and 5
function generateFizzBuzzSynchronouslyWithError() {
    return [...Array(numberOfLoops)].map((_, i) => {
        const index = i + 1;
        try {
            const word = getRandomWordSync({withErrors: true});
            return findFizzBuzz(index, word);
        } catch (error) {
            return `${index} : It shouldn't break anything!`;
        }
    }).join('\n');
}

//this can be used for both task 4 and 5
function generateFizzBuzzAsynchronouslyWithError() {
    return ([...Array(numberOfLoops)].map(async (_, i) => {
        let index = i + 1;
        try {
            const word = await getRandomWord({withErrors: true});
            return findFizzBuzz(index, word) + `\n`;
        } catch (error) {
            return `${index}` + ` : It shouldn't break anything!\n`;
        }
    }));
}

//Task 4 first part
setTimeout(printFizzBuzzSynchronouslyWithError, 4000);

function printFizzBuzzSynchronouslyWithError() {
    let output = `<<<<<<<<<< Starts Printing FizzBuzz Synchronously With Error >>>>>>>>>>>>\n`;

    output += generateFizzBuzzSynchronouslyWithError();

    output += `\n<<<<<<<<<< Ends Printing FizzBuzz Synchronously With Error >>>>>>>>>>>>\n`;
    console.log(output);

}

// task 4 second part
setTimeout(printFizzBuzzAsynchronouslyWithError, 5000);

function printFizzBuzzAsynchronouslyWithError() {
    let output = `<<<<<<<<<< Starts Printing FizzBuzz Asynchronously With Error >>>>>>>>>>>>\n`;
    const promiseList = generateFizzBuzzAsynchronouslyWithError();
    let counter = 0;
    promiseList.forEach(promise => {
        promise.then(word => {
            counter++;
            output += word;
            if (counter === numberOfLoops) {
                output += `<<<<<<<<<< Ends Printing FizzBuzz Asynchronously With Error >>>>>>>>>>>>\n`;
                console.log(output);
            }
        })
    });


}

//Task 5 first part
setTimeout(writeFizzBuzzSynchronouslyWithErrorToFile, 6000);

function writeFizzBuzzSynchronouslyWithErrorToFile() {
    console.log(`<<<<<<<<<< Starts Writing FizzBuzz Synchronously to File with Error >>>>>>>>>>>>`);

    let content = "<<<<<<<<<< Starts Writing FizzBuzz Synchronously to File with Error >>>>>>>>>>>>\n\n";
    content += generateFizzBuzzSynchronouslyWithError();

    fs.writeFile(textFile, content, err => {
        if (err) {
            console.error(err);
            return
        }
        console.log(`<<<<<<<<<< Ends Writing FizzBuzz Synchronously to File with Error, find the ${textFile} in root of the project >>>>>>>>>>>>\n`);
    })
}

//Task 5 second part
setTimeout(writeFizzBuzzAsynchronouslyWithErrorToFile, 7000);

function writeFizzBuzzAsynchronouslyWithErrorToFile() {
    console.log(`<<<<<<<<<< Starts Writing FizzBuzz Asynchronously to File with Error >>>>>>>>>>>>`);

    let content = "\n\n<<<<<<<<<< Starts Writing FizzBuzz Asynchronously to File with Error >>>>>>>>>>>>\n\n";

    const promiseList = generateFizzBuzzAsynchronouslyWithError();
    let counter = 0;
    promiseList.forEach(promise => {
        promise.then(word => {
            counter++;
            content += word;
            if (counter === numberOfLoops) {
                fs.writeFile(textFile, content, {flag: 'a'}, err => {
                    if (err) {
                        console.error(err);
                        return
                    }
                    console.log(`<<<<<<<<<< Ends Writing FizzBuzz Asynchronously to File with Error, find the ${textFile} in root of the project >>>>>>>>>>>>\n`);
                })
            }
        })
    });

}


//Bonus Task first part
setTimeout(printFizzBuzzAsynchronouslyInAscendingOrder, 8000);

async function printFizzBuzzAsynchronouslyInAscendingOrder() {
    let output = `<<<<<<<<<< Starts Printing FizzBuzz Asynchronously in Ascending Order >>>>>>>>>>>>\n`;
    const startTime = (new Date()).getTime();
    for (let index = 1; index <= numberOfLoops; index++) {
        const word = await getRandomWord();
        output += findFizzBuzz(index, word) + `\n`;
    }
    const endTime = (new Date()).getTime();
    output += `<<<<<<<<<< Ends Printing FizzBuzz Asynchronously in Ascending Order, Time taken : ${endTime - startTime} ms >>>>>>>>>>>>\n`;
    console.log(output);
}

//Bonus Task second part
setTimeout(printFizzBuzzAsynchronouslyWithSlowOption, 10000);


function printFizzBuzzAsynchronouslyWithSlowOption() {
    let output = `<<<<<<<<<< Starts Printing FizzBuzz Asynchronously with Slow Option >>>>>>>>>>>>\n`;

    let promiseList = [];
    const startTime = (new Date()).getTime();
    [...Array(numberOfLoops)].map(() => {
        promiseList.push(getRandomWord({slow: true}));
    });
    Promise.all(
        promiseList
    ).then(randomWords => {
        randomWords.forEach((word, index) => {
            index = index + 1;
            output += findFizzBuzz(index, word) + `\n`;
        });
        const endTime = (new Date()).getTime();
        output += `<<<<<<<<<< Ends Printing FizzBuzz Asynchronously with Slow Option, Time taken : ${endTime - startTime} ms >>>>>>>>>>>>\n`;
        console.log(output);
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