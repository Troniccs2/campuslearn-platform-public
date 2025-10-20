/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Chat } from '@google/genai';
import { marked } from 'marked';

let API_KEY = localStorage.getItem('API_KEY');

if (!API_KEY) {
  API_KEY = prompt('Enter your Gemini API key:');
  if (API_KEY) {
    localStorage.setItem('API_KEY', API_KEY);
  }
}

const SYSTEM_INSTRUCTION = `You are Bravo, a friendly and helpful AI assistant for CampusLearn. CampusLearn is an innovative tutor-led learning platform for Belgium Campus students, providing academic support for BCom, BIT, and Diploma modules.

Your primary goal is to assist students by providing information about the CampusLearn platform and answering their academic queries based on the syllabus.

**Platform Information:**

*   **Overview:** CampusLearn connects students with Peer Tutors for flexible academic support.
*   **Student Accounts:**
    *   Registration/Login: Requires a @belgiumcampus.ac.za email.
    *   Features: Students can manage their profile, create help topics, subscribe to topics and tutors, and track interactions.
*   **Tutor & Topic Management:**
    *   Tutors create topics. Students get alerts for new topics.
    *   Tutors get alerts for new student questions in their topics.
    *   Only tutors registered for a module can answer questions in it.
    *   Tutors can upload resources (videos, PDFs, audio).
*   **Public Forum:**
    *   An anonymous forum for all students to ask questions and collaborate.
    *   Features: FAQs, trending topics, upvoting. Admin moderated.
*   **Private Messaging:**
    *   When a student creates a help topic, they are automatically matched with a tutor for a private chat.
    *   Tutors can send learning materials and feedback.
*   **Communication:** The platform uses email, SMS, or WhatsApp for notifications.

**Your Behavior:**

*   Be friendly, encouraging, and professional.
*   If a student asks a question you can't answer from the syllabus or platform information, you MUST state that you need to escalate the matter to a human tutor and that all parties will be notified. Do not invent answers.
*   When asked about tutors, explain their role as described in the "Tutor & Topic Management" section.
*   Always be helpful and guide the student on how to use the CampusLearn platform effectively.`;

async function main() {
  if (!API_KEY) {
    document.body.innerHTML = `
      <div style="padding: 2rem; text-align: center;">
        <h1>Welcome</h1>
        <p>This application requires a Gemini API key. Please configure it in your environment variables as <code>API_KEY</code>.</p>
      </div>`;
    return;
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const chat: Chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  const chatContainer = document.getElementById('chat-container') as HTMLElement;
  const messagesEl = document.getElementById('messages') as HTMLElement;
  const chatForm = document.getElementById('chat-form') as HTMLFormElement;
  const chatInput = document.getElementById('chat-input') as HTMLInputElement;
  const submitButton = chatForm.querySelector('button') as HTMLButtonElement;

  const appendMessage = async (message: string, sender: 'user' | 'model') => {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', `${sender}-message`);
    messageEl.innerHTML = await marked.parse(message);
    messagesEl.appendChild(messageEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return messageEl;
  };

  const showLoadingIndicator = () => {
    const loaderEl = document.createElement('div');
    loaderEl.classList.add('message', 'model-message', 'loading');
    loaderEl.innerHTML = '<div class="loader"></div>';
    messagesEl.appendChild(loaderEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return loaderEl;
  };

  const handleFormSubmit = async (e: Event) => {
    e.preventDefault();
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = '';
    submitButton.disabled = true;
    
    await appendMessage(userMessage, 'user');

    const loader = showLoadingIndicator();

    try {
        const responseStream = await chat.sendMessageStream({ message: userMessage });
        
        let fullResponse = '';
        const modelMessageEl = document.createElement('div');
        modelMessageEl.classList.add('message', 'model-message');
        
        messagesEl.replaceChild(modelMessageEl, loader);

        for await (const chunk of responseStream) {
            fullResponse += chunk.text;
            modelMessageEl.innerHTML = await marked.parse(fullResponse + '▌');
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        
        modelMessageEl.innerHTML = await marked.parse(fullResponse);

    } catch (error) {
        console.error('Gemini API error:', error);
        const errorEl = document.createElement('div');
        errorEl.classList.add('message', 'model-message');
        errorEl.innerHTML = 'Sorry, something went wrong. Please check your API key and network connection, then try again.';
        messagesEl.replaceChild(errorEl, loader);
    } finally {
        submitButton.disabled = false;
        chatInput.focus();
    }
  };

  chatForm.addEventListener('submit', handleFormSubmit);

  await appendMessage("Hello! I am Bravo, your friendly CampusLearn assistant. How can I help you today?", 'model');
}

main().catch(console.error);
