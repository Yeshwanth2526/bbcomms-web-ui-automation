const SurveysTest = {
    surveyName: "Automation test Survey",
    surveyName2: "Academia de Inglés 1 y 2 Para los Exámenes Estatales de Tejas",
    surveyName3: "Survey with special characters",
    surveyQuestion1: "Did the Survey Messages Received Correctly ?",
    surveyQuestion2: "Rate the Automation Testing scenario?",
    surveyQuestion3: "Sun rises in the east??",
    surveyQuestion4: "What is the answer for 10 * 5",
    surveyQuestion5: "What is the value of (10+(2*6)+3)",
    surveyQuestion6: "Rivers flowing in North India",
    surveyQuestion7: "Please enter your comments(if any)",
    surveyQuestion8: "¿Se recibieron correctamente los mensajes de la encuesta?",
    surveyQuestion9: "¿Calificar el escenario de pruebas de automatización?",
    surveyQuestion10: "What is the value of (10+(2*6)/3)",
    surveyResponse1: '25\n',
    surveyResponse2: '75\n',
    surveyResponse3: 'Ganga\n',
    surveyResponse4: 'Yamuna\n',
    surveyResponse5: 'Cauvery\n'
};

const generateConfig = () => {
    //const environment = process.env.TEST_ENV === 'staging' ? staging : shared;
    return { ...SurveysTest };
};

export const SurveysTestData = generateConfig();