/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
let FAQScore = 0;

function computeScore(phrase){
    const yesList1 = ["I", "do", "with", "difficulty","yes","hard", "By", "myself","own",];    //score 1
    const yesList2 = ["yes","I","do","me","myself","alone", "by", "myself", "without"];        //score 1
    const yesList3 = ["yes","do","with", "help","and","helps", "my", "son", "daughter"];       //score 2
    const noList4 = ["no","somebody","does", "for", "me", "my","son","daughter"];              //score 3
    const noList5 = ["never", "hard", "for", "me", "no", "did"];                               //score 1
    const noList6 = ["next","other", "no", "easy", "don't", "do", "not"];                      //score 0

    
    const ScoresVal = [1,1,2,3,1,0];
    let score = 0;
    var Scores = [0,0,0,0,0,0];
    var words = phrase.split(" ");
    for (let j=0; j < words.length; j++){
        var x = words[j]
        for(let h = 0; h < yesList1.length;h++){
            var yes1 = yesList1[h];
            if (x === yes1)
            Scores[0]+=1;
        }
        for(let h = 0; h < yesList2.length;h++){
            var yes2 = yesList2[h];
            if (x === yes2)
            Scores[1]+=1;
        }
        for(let h = 0; h < yesList3.length;h++){
            var yes3 = yesList3[h];
            if (x === yes3)
            Scores[2]+=1;
        }
        for(let h = 0; h < noList4.length;h++){
            var no1 = noList4[h];
            if (x === no1)
            Scores[3]+=1
        }
        for(let h = 0; h < noList5.length;h++){
            var no2 = noList5[h];
            if (x === no2)
            Scores[4]+=1
        }
        for(let h = 0; h < noList6.length;h++){
            var no3 = noList6[h];
            if (x === no3)
            Scores[5]+=1
        }
    }
    const max = Math.max(...Scores);
    const index = Scores.indexOf(max);
    score=ScoresVal[index]+score;
    return score;
        
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = "Welcome to the FAQ Evaluation Survey. To start say Begin Survey.";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard("Welcome to the FAQ Evaluation Survey")
            .reprompt(speakOutput)
            .getResponse();
    }
};

const BeginSurveyIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BeginSurveyIntent';
    },
    handle(handlerInput) {
        const speakOutput = "I will ask you a series of questions. Please answer yes or no followed with details about how you complete each task.";
        
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .addDelegateDirective({
            name: 'QuestionOneIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .withSimpleCard("Do you write checks or pay bills?")
        .getResponse();
    }
};

const QuestionOneIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionOneIntent';
    },
    handle(handlerInput) {
      //  const speakOutput = "I will ask you a series of questions. Answer with details about how you complete each task.";
      let questionOne = Alexa.getSlotValue(handlerInput.requestEnvelope, 'questionOne');
      FAQScore+=computeScore(questionOne);
      
        return handlerInput.responseBuilder
      //  .speak("FAQ Score is " + FAQScore)
        .addDelegateDirective({
            name: 'QuestionTwoIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .withSimpleCard("Do you assemble tax records or other important documents?")
        .getResponse();
    }
};

const QuestionTwoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionTwoIntent';
    },
    handle(handlerInput) {
      //  const speakOutput = "I will ask you a series of questions. Answer with details about how you complete each task.";
      let questionTwo = Alexa.getSlotValue(handlerInput.requestEnvelope, 'questionTwo');
      FAQScore+=computeScore(questionTwo);
        return handlerInput.responseBuilder
       // .speak(speakOutput)
        .addDelegateDirective({
            name: 'QuestionThreeIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .withSimpleCard("Do you shop for clothes, groceries, or other household necessities?")
        .getResponse();
    }
};

const QuestionThreeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionThreeIntent';
    },
    handle(handlerInput) {
      //  const speakOutput = "I will ask you a series of questions. Answer with details about how you complete each task.";
      let questionThree = Alexa.getSlotValue(handlerInput.requestEnvelope, 'questionThree');
      FAQScore+=computeScore(questionThree);
        return handlerInput.responseBuilder
        .addDelegateDirective({
            name: 'QuestionFourIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .withSimpleCard("Do you play games of skill or work on a hobby?")
        .getResponse();
    }
};

const QuestionFourIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionFourIntent';
    },
    handle(handlerInput) {
      //  const speakOutput = "I will ask you a series of questions. Answer with details about how you complete each task.";
      let questionFour = Alexa.getSlotValue(handlerInput.requestEnvelope, 'questionFour');
      FAQScore+=computeScore(questionFour);
      
        return handlerInput.responseBuilder
     //   .speak(questionTwo)
        .addDelegateDirective({
            name: 'QuestionFiveIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .withSimpleCard("Do you prepare tea or coffee?")
        .getResponse();
    }
};

const QuestionFiveIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionFiveIntent';
    },
    handle(handlerInput) {
      //  const speakOutput = "I will ask you a series of questions. Answer with details about how you complete each task.";
      let questionFive = Alexa.getSlotValue(handlerInput.requestEnvelope, 'questionFive');
      FAQScore+=computeScore(questionFive);
      
        return handlerInput.responseBuilder
     //   .speak(questionTwo)
        .addDelegateDirective({
            name: 'QuestionSixIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .withSimpleCard("Do you prepare a balanced meal?")
        .getResponse();
    }
};

const QuestionSixIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionSixIntent';
    },
    handle(handlerInput) {
      //  const speakOutput = "I will ask you a series of questions. Answer with details about how you complete each task.";
      let questionSix = Alexa.getSlotValue(handlerInput.requestEnvelope, 'questionSix');
      FAQScore+=computeScore(questionSix);
      
        return handlerInput.responseBuilder
     //   .speak(questionTwo)
        .addDelegateDirective({
            name: 'QuestionSevenIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .withSimpleCard("Do you keep track of current events?")
        .getResponse();
    }
};

const QuestionSevenIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionSevenIntent';
    },
    handle(handlerInput) {
      //  const speakOutput = "I will ask you a series of questions. Answer with details about how you complete each task.";
      let questionSeven = Alexa.getSlotValue(handlerInput.requestEnvelope, 'questionSeven');
      FAQScore+=computeScore(questionSeven);
      
        return handlerInput.responseBuilder
     //   .speak(questionTwo)
        .addDelegateDirective({
            name: 'QuestionEightIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .withSimpleCard("Do you pay attention to or have discussions about TV, books, or magazines?")
        .getResponse();
    }
};

const QuestionEightIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionEightIntent';
    },
    handle(handlerInput) {
      //  const speakOutput = "I will ask you a series of questions. Answer with details about how you complete each task.";
      let questionEight = Alexa.getSlotValue(handlerInput.requestEnvelope, 'questionEight');
      FAQScore+=computeScore(questionEight);
      
        return handlerInput.responseBuilder
     //   .speak(questionTwo)
        .addDelegateDirective({
            name: 'QuestionNineIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .withSimpleCard("Do you remember things like doctors appointments, family occasions, or taking medication?")
        .getResponse();
    }
};

const QuestionNineIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionNineIntent';
    },
    handle(handlerInput) {
      //  const speakOutput = "I will ask you a series of questions. Answer with details about how you complete each task.";
      let questionNine = Alexa.getSlotValue(handlerInput.requestEnvelope, 'questionNine');
      FAQScore+=computeScore(questionNine);
      
        return handlerInput.responseBuilder
     //   .speak(questionTwo)
        .addDelegateDirective({
            name: 'QuestionTenIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .withSimpleCard("Do you travel outside of your neighborhood?")
        .getResponse();
    }
};

const QuestionTenIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionTenIntent';
    },
    handle(handlerInput) {
      //  const speakOutput = "I will ask you a series of questions. Answer with details about how you complete each task.";
      let questionTen = Alexa.getSlotValue(handlerInput.requestEnvelope, 'questionTen');
      FAQScore+=computeScore(questionTen);
      
        return handlerInput.responseBuilder
        .speak("FAQ Score is " + FAQScore)
       /* .addDelegateDirective({
            name: 'QuestionTenIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })*/
        .withSimpleCard("Your FAQ Score is " + FAQScore)
        .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        BeginSurveyIntentHandler,
        QuestionOneIntentHandler,
        QuestionTwoIntentHandler,
        QuestionThreeIntentHandler,
        QuestionFourIntentHandler,
        QuestionFiveIntentHandler,
        QuestionSixIntentHandler,
        QuestionSevenIntentHandler,
        QuestionEightIntentHandler,
        QuestionNineIntentHandler,
        QuestionTenIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();