var token = '',
    data = {},
    fetchesDone = 0,
    token = '',
    seed = '',
    lastCLick = 0,
    userLanguage = 'autoDetect';

let DuolingoSection = {
    CTC: {
        htmlSelectors: {
            respondTo: async() => {
                return await Array.from(document.querySelector("#root > div.kPqwA._2kkzG > div._3yE3H > div > div.RMEuZ._1GVfY > div > div > div > div > div._3wqGX.f7WE2._3rat3 > div._3fGax > div._1j5TQ > div > div > div > div").querySelectorAll("._5HFLU"))
                    .map(item => item.innerText)
                    .toString()
                    .replace(/,/g, '');
            },
            answers: async() => {
                return await Array.from(document.querySelector("#root > div.kPqwA._2kkzG > div._3yE3H > div > div.RMEuZ._1GVfY > div > div > div > div > div._3wqGX.f7WE2._3rat3 > div:nth-child(2) > div").querySelectorAll('div')).map(item => {
                    const span = item.querySelector('span:nth-child(2)');
                    return span ? span.innerText : "";
                });
            },
            input: async() => {
                return await Array.from(document.querySelector("#root > div.kPqwA._2kkzG > div._3yE3H > div > div.RMEuZ._1GVfY > div > div > div > div > div._3wqGX.f7WE2._3rat3 > div:nth-child(2) > div").querySelectorAll('div')).map(item => {
                    return item.querySelector('span:nth-child(2)');
                });
            },
        },
        prompt: async function() {
            return `(${userLanguage} to english) Pick the best response to: "${await this.htmlSelectors.respondTo()}" based on this ARRAY: ${await this.htmlSelectors.answers()}. Pick the best possible answer from the array, return only the INDEX of the answer, not answer. INDEX OF THE answer: (0, 1, 2, etc...)`;
        },
    },

    WTI: {
        htmlSelectors: {
            respondTo: async() => {
                return await Array.from(document.querySelector("#root > div.kPqwA._2kkzG > div > div > div.RMEuZ._1GVfY > div > div > div > div > div.iPZZY.UjFh4._3rat3 > div._2w0y3._1dtTU._35mGI > div > div._1tbN5._44BHt > div > div").querySelectorAll("._5HFLU"))
                    .map(item => item.innerText)
                    .toString()
                    .replace(/,/g, '');
            },
            answers: async() => {
                return await Array.from(document.querySelector("#root > div.kPqwA._2kkzG > div > div > div.RMEuZ._1GVfY > div > div > div > div > div.iPZZY.UjFh4._3rat3 > div.u5Wzl._32LPr._3hg-V > div > div > div._1v1Bd > div").querySelectorAll("div")).map(item => {
                    const span = item.querySelector("span");
                    return span ? span.innerText : "";
                });
            },
            input: async() => {
                return await Array.from(document.querySelector("#root > div.kPqwA._2kkzG > div > div > div.RMEuZ._1GVfY > div > div > div > div > div.iPZZY.UjFh4._3rat3 > div.u5Wzl._32LPr._3hg-V > div > div > div._1v1Bd > div").querySelectorAll("div"));
            },
        },
        prompt: async function() {
            return `Translate the sentence "${await this.htmlSelectors.respondTo()}" from ${userLanguage} to English, but **ONLY** use words from the ARRAY: ${await this.htmlSelectors.answers()}. Follow these rules: 1. Do not translate proper names; leave them unchanged. 2. Use the words from ${await this.htmlSelectors.answers()} to form a coherent sentence, even if it is not a 1:1 translation. 3. Instead of returning the translated sentence, output an ARRAY of the original indexes of the words used from ${await this.htmlSelectors.answers()}. 4. Ignore any words in "${await this.htmlSelectors.respondTo()}" that do not exist in ${await this.htmlSelectors.answers()}. 5. The output must be **only** the ARRAY of indexes, with no additional text or explanation.`;
        },
    },

    STCM: {
        htmlSelectors: {
            respondTo: async() => {
                return await document.querySelector("#root > div.kPqwA._2kkzG > div > div > div.RMEuZ._1GVfY > div > div > div > div > div._2hpO2.UjFh4._3rat3 > div._1RjNT._3v0hd > div > div._1tbN5._44BHt > div > div").innerText;
            },
            answers: async() => {
                return await Array.from(document.querySelector("#root > div.kPqwA._2kkzG > div > div > div.RMEuZ._1GVfY > div > div > div > div > div._2hpO2.UjFh4._3rat3 > div.PaKCO._1vQbM._3laLR._32LPr").querySelectorAll("div")).map(item => {
                    const span = item.querySelector('span:nth-child(2)');
                    return span ? span.innerText : "";
                });
            },
            input: async() => {
                return await Array.from(document.querySelector("#root > div.kPqwA._2kkzG > div > div > div.RMEuZ._1GVfY > div > div > div > div > div._2hpO2.UjFh4._3rat3 > div.PaKCO._1vQbM._3laLR._32LPr").querySelectorAll("div")).map(item => item);
            },
        },
        prompt: async function() {
            return `(${userLanguage} to english) Pick the best response to: "${await this.htmlSelectors.respondTo()}" based on this ARRAY: ${await this.htmlSelectors.answers()}. Pick the best possible answer from the array, return only the INDEX of the answer, not answer. INDEX OF THE answer: (0, 1, 2, etc...)`;
        },
    },

    STMP: {
        htmlSelectors: {
            answers: async() => {
                return await  Array.from(document.querySelector("#root > div.kPqwA._2kkzG > div > div > div.RMEuZ._1GVfY > div > div > div > div > div._3X7QY > div").querySelectorAll("._3VyQa")).map(item => {
                    const span = item.querySelector("span:nth-child(3)");
                    return span ? span.innerText : "";
                });
            },
            input: async() => {
                return await Array.from(document.querySelector("#root > div.kPqwA._2kkzG > div > div > div.RMEuZ._1GVfY > div > div > div > div > div._3X7QY > div").querySelectorAll("._3VyQa")).map(item => {
                    return item.querySelector("button");
                });
            },
        },
        prompt: async function() {
            return `(${userLanguage} to english) Take this array: ${await this.htmlSelectors.answers()}, match the translations. This will be all in one array. if index 0, and 5 match return [0, 5 ..continue with next matches] YOU WILL ONLY Return the CORRECT array of indexes. No dialog just ARRAY.`;
        },
    }
};

if (!window.scriptLoaded) {
    window.scriptLoaded = true;

    window.AIFill = async function() {
        if (window.location.href.includes("https://www.duolingo.com/lesson") && Date.now() - lastCLick >= 1000) {
            lastCLick = Date.now();

            let question = '',
                input = null,
                type = null,
                answers = [],
                AIreq = '';

            userLanguage = document.querySelector("head > title").innerText.split(' ').pop()
            question = document.querySelector("#root > div.kPqwA._2kkzG > div._3yE3H > div > div.RMEuZ._1GVfY > div > div > div > div > div.U41Ye > h1 > span").innerHTML;

            if (typeof question == 'string') {
                if (question == "Complete the chat") {
                    type = "CTC";

                    respondTo = await DuolingoSection.CTC.htmlSelectors.respondTo();
                    answers = await DuolingoSection.CTC.htmlSelectors.answers();
                    AIreq = await DuolingoSection.CTC.prompt();
                    input = await DuolingoSection.CTC.htmlSelectors.input();
                } else if (question.includes("Write this in")) {
                    type = "WTI";

                    respondTo = await DuolingoSection.WTI.htmlSelectors.respondTo();
                    answers = await DuolingoSection.WTI.htmlSelectors.answers();
                    AIreq = await DuolingoSection.WTI.prompt();
                    input = await DuolingoSection.WTI.htmlSelectors.input();
                } else if (question == "Select the correct meaning") {
                    type = "STCM";

                    respondTo = await DuolingoSection.STCM.htmlSelectors.respondTo();
                    answers = await DuolingoSection.STCM.htmlSelectors.answers();
                    AIreq = await DuolingoSection.STCM.prompt();
                    input = await DuolingoSection.STCM.htmlSelectors.input();
                } else if (question == "Select the matching pairs") {
                    type = "STMP";

                    answers = await DuolingoSection.STMP.htmlSelectors.answers();
                    AIreq = await DuolingoSection.STMP.prompt();
                    input = await DuolingoSection.STMP.htmlSelectors.input();
                } else if (question == "What do you hear?" || question == "Speak this sentence" || question == "Tap what you hear") {
                    document.querySelector("#session\\/PlayerFooter > div > div._3h0lA > button").click();
                    return false;
                }

                if (type && question && answers && input) {
                    data = {
                        type: type,
                        question: question,
                        answers: answers,
                        input: input,
                        result: ''
                    };
                }

                chrome.runtime.sendMessage({
                    question,
                    answers,
                    AIreq
                });
            }
        }
    }

    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
        if (message.action === "Fill") {
            AIFill();
            return false;
        } else if (message.action == "href?") {
            chrome.runtime.sendMessage({
                action: "href",
                data: window.location.href
            });
        }

        if (!message.result) {
            return false;
        }

        data.result = message.result;

        if (data?.result != undefined) {
            if (data.type == "CTC") {
                data.input[data.result.replace(/\D/g, '')].click();
            } else if (data.type == "STCM") {
                data.input[data.result.replace(/\D/g, '')].click();
            } else if (data.type == "STMP") {
                let arr = JSON.parse(data.result);
                for (const item of arr) {
                    data.input[item].click();
                    await delay(500)
                }
            } else if (data.type == "WTI") {
                let arr = JSON.parse(data.result);
                arr.forEach((item, i) => {
                    data.input[~~item].querySelector("span > button > span:nth-child(2) > span").innerText = i + 1;
                });
            }
        }
    });

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}