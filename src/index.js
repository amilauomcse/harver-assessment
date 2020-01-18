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

    output += [...new Array(numberOfLoops)].map((_, index) => {
        return `${index + 1} : ${getRandomWordSync()}`;
    }).join('\n');

    output += `\n<<<<<<<<<< Ends Printing Random Words Synchronously >>>>>>>>>>>>\n`;

    console.log(output);
}


//Task 2
setTimeout(printFizzBuzzSynchronously, 1000);

function printFizzBuzzSynchronously() {
    let output = `<<<<<<<<<< Starts Printing FizzBuzz Synchronously >>>>>>>>>>>>\n`;

    output += [...new Array(numberOfLoops)].map((_, index) => {
        return findFizzBuzz(index + 1, getRandomWordSync());
    }).join('\n');

    output += `\n<<<<<<<<<< Ends Printing FizzBuzz Synchronously >>>>>>>>>>>>\n`;

    console.log(output);
}

//Task 3 first part
setTimeout(printRandomWordsAsynchronously, 2000);

async function printRandomWordsAsynchronously() {
    let output = `<<<<<<<<<< Starts Printing Random Words Asynchronously >>>>>>>>>>>>\n`;

    const randomWords = await Promise.all(
        [...new Array(numberOfLoops)].map(async (_, index) => {
            const word = await getRandomWord();
            return `${index + 1} : ${word}\n`;
        })
    );
    for (const word of randomWords) {
        output += word;
    }

    output += `<<<<<<<<<< Ends Printing Random Words Asynchronously >>>>>>>>>>>>\n`;
    console.log(output);
}


//Task 3 second part
setTimeout(printFizzBuzzAsynchronously, 3000);

async function printFizzBuzzAsynchronously() {
    let output = `<<<<<<<<<< Starts Printing FizzBuzz Asynchronously >>>>>>>>>>>>\n`;

    const randomWords = await Promise.all(
        [...new Array(numberOfLoops)].map(async (_, index) => {
            const word = await getRandomWord();
            return findFizzBuzz(index + 1, word) + `\n`;
        })
    );
    for (const word of randomWords) {
        output += word;
    }

    output += `<<<<<<<<<< Ends Printing FizzBuzz Asynchronously >>>>>>>>>>>>\n`;
    console.log(output);
}

//this can be used for both task 4 and 5
function generateFizzBuzzSynchronouslyWithError() {
    return [...new Array(numberOfLoops)].map((_, index) => {
        try {
            const word = getRandomWordSync({withErrors: true});
            return findFizzBuzz(index + 1, word);
        } catch (error) {
            return `${index + 1} : It shouldn't break anything!`;
        }
    }).join('\n');
}

//this can be used for both task 4 and 5
function generateFizzBuzzAsynchronouslyWithError() {
    return ([...new Array(numberOfLoops)].map(async (_, index) => {
        try {
            const word = await getRandomWord({withErrors: true});
            return findFizzBuzz(index + 1, word) + `\n`;
        } catch (error) {
            return `${index + 1}` + ` : It shouldn't break anything!\n`;
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

async function printFizzBuzzAsynchronouslyWithError() {
    let output = `<<<<<<<<<< Starts Printing FizzBuzz Asynchronously With Error >>>>>>>>>>>>\n`;

    const randomWords = await Promise.all(generateFizzBuzzAsynchronouslyWithError());
    for (const word of randomWords) {
        output += word;
    }

    output += `<<<<<<<<<< Ends Printing FizzBuzz Asynchronously With Error >>>>>>>>>>>>\n`;
    console.log(output);

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

async function writeFizzBuzzAsynchronouslyWithErrorToFile() {
    console.log(`<<<<<<<<<< Starts Writing FizzBuzz Asynchronously to File with Error >>>>>>>>>>>>`);

    let content = "\n\n<<<<<<<<<< Starts Writing FizzBuzz Asynchronously to File with Error >>>>>>>>>>>>\n\n";

    const randomWords = await Promise.all(generateFizzBuzzAsynchronouslyWithError());
    for (const word of randomWords) {
        content += word;
    }
    fs.writeFile(textFile, content, {flag: 'a'}, err => {
        if (err) {
            console.error(err);
            return
        }
        console.log(`<<<<<<<<<< Ends Writing FizzBuzz Asynchronously to File with Error, find the ${textFile} in root of the project >>>>>>>>>>>>\n`);
    })

}

//Bonus Task
setTimeout(printFizzBuzzAsynchronouslyWithSlowOption, 10000);


async function printFizzBuzzAsynchronouslyWithSlowOption() {
    let output = `<<<<<<<<<< Starts Printing FizzBuzz Asynchronously with Slow Option >>>>>>>>>>>>\n`;

    const startTime = (new Date()).getTime();
    const randomWords = await Promise.all(
        [...new Array(numberOfLoops)].map(async () => {
            return await getRandomWord({slow: true})
        })
    );
    for (const [index, word] of randomWords.entries()) {
        output += findFizzBuzz(index + 1, word) + `\n`;
    }
    const endTime = (new Date()).getTime();
    output += `<<<<<<<<<< Ends Printing FizzBuzz Asynchronously with Slow Option, Time taken : ${endTime - startTime} ms >>>>>>>>>>>>\n`;
    console.log(output);
}
