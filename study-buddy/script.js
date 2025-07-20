document.addEventListener('DOMContentLoaded', () => {
    const quizBtn = document.getElementById('quiz-btn');
    const homeworkBtn = document.getElementById('homework-btn');
    const testBtn = document.getElementById('test-btn');
    const contentArea = document.getElementById('content-area');

    let apiKey;

    fetch('/api/key')
        .then(response => response.json())
        .then(data => {
            apiKey = data.apiKey;
            
            quizBtn.addEventListener('click', () => {
                loadQuizGenerator();
            });

            homeworkBtn.addEventListener('click', () => {
                loadHomeworkHelper();
            });

            testBtn.addEventListener('click', () => {
                loadMockTestGenerator();
            });
        });

    function loadQuizGenerator() {
        contentArea.innerHTML = `
            <h2>Quiz Generator</h2>
            <textarea id="quiz-topic" placeholder="Enter the topic for the quiz..."></textarea>
            <button id="generate-quiz">Generate</button>
            <div id="quiz-output"></div>
        `;
        document.getElementById('generate-quiz').addEventListener('click', generateQuiz);
    }

    function loadHomeworkHelper() {
        contentArea.innerHTML = `
            <h2>Homework Help</h2>
            <textarea id="homework-problem" placeholder="Enter your homework problem..."></textarea>
            <button id="get-help">Get Help</button>
            <div id="homework-output"></div>
        `;
        document.getElementById('get-help').addEventListener('click', getHomeworkHelp);
    }

    function loadMockTestGenerator() {
        contentArea.innerHTML = `
            <h2>Mock Test Generator</h2>
            <textarea id="test-details" placeholder="Enter topics and format for the mock test..."></textarea>
            <button id="generate-test">Generate</button>
            <div id="test-output"></div>
        `;
        document.getElementById('generate-test').addEventListener('click', generateMockTest);
    }

    async function generateQuiz() {
        const topic = document.getElementById('quiz-topic').value;
        const outputDiv = document.getElementById('quiz-output');
        outputDiv.innerHTML = '<p>Generating quiz...</p>';

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey,
                },
                body: JSON.stringify({
                    "contents": [{
                        "parts": [{
                            "text": `Generate a 5 question multiple choice quiz on the topic of ${topic}. Provide the answer key at the end.`
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.candidates && data.candidates.length > 0) {
                const text = data.candidates[0].content.parts[0].text;
                outputDiv.innerHTML = text.replace(/\n/g, '<br>');
            } else {
                outputDiv.innerHTML = '<p>No response from AI. Please try again.</p>';
            }
        } catch (error) {
            console.error('Error:', error);
            outputDiv.innerHTML = `<p>An error occurred: ${error.message}</p>`;
        }
    }

    async function getHomeworkHelp() {
        const problem = document.getElementById('homework-problem').value;
        const outputDiv = document.getElementById('homework-output');
        outputDiv.innerHTML = '<p>Getting help...</p>';

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey,
                },
                body: JSON.stringify({
                    "contents": [{
                        "parts": [{
                            "text": `Provide a step-by-step explanation for the following problem: ${problem}`
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.candidates && data.candidates.length > 0) {
                const text = data.candidates[0].content.parts[0].text;
                outputDiv.innerHTML = text.replace(/\n/g, '<br>');
            } else {
                outputDiv.innerHTML = '<p>No response from AI. Please try again.</p>';
            }
        } catch (error) {
            console.error('Error:', error);
            outputDiv.innerHTML = `<p>An error occurred: ${error.message}</p>`;
        }
    }

    async function generateMockTest() {
        const details = document.getElementById('test-details').value;
        const outputDiv = document.getElementById('test-output');
        outputDiv.innerHTML = '<p>Generating mock test...</p>';

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey,
                },
                body: JSON.stringify({
                    "contents": [{
                        "parts": [{
                            "text": `Generate a mock test based on the following details: ${details}. Include a variety of question types (multiple choice, short answer, etc.) and an answer key.`
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.candidates && data.candidates.length > 0) {
                const text = data.candidates[0].content.parts[0].text;
                outputDiv.innerHTML = text.replace(/\n/g, '<br>');
            } else {
                outputDiv.innerHTML = '<p>No response from AI. Please try again.</p>';
            }
        } catch (error) {
            console.error('Error:', error);
            outputDiv.innerHTML = `<p>An error occurred: ${error.message}</p>`;
        }
    }
});
