# CODEDEN

**CodeDen** is an AI-powered coding assistant that helps developers generate React components. Built with **Next.js**, **MongoDB**, and powered by **Gemini 2.0**, 


### Project Directory structure :
```
└── aravindinduri-codeden/
    ├── README.md
    ├── components.json
    ├── next.config.ts
    ├── package.json
    ├── postcss.config.mjs
    ├── tsconfig.json
    ├── types.d.ts
    └── src/
        ├── app/
        │   ├── globals.css
        │   ├── layout.tsx
        │   ├── page.tsx
        │   ├── api/
        │   │   └── conversations/
        │   │       ├── route.ts
        │   │       └── [id]/
        │   │           └── route.ts
        │   └── conversations/
        │       ├── layout.tsx
        │       ├── page.tsx
        │       └── [id]/
        │           └── page.tsx
        ├── components/
        │   ├── features/
        │   │   ├── Chat/
        │   │   │   └── ChatInterface.tsx
        │   │   ├── History/
        │   │   │   ├── History.tsx
        │   │   │   └── HistoryList.tsx
        │   │   └── preview/
        │   │       └── Preview.tsx
        │   └── ui/
        │       ├── input.tsx
        │       ├── resizable.tsx
        │       ├── scroll-area.tsx
        │       └── separator.tsx
        ├── config/
        │   └── db.ts
        ├── context/
        │   └── index.tsx
        ├── data/
        │   ├── conversations/
        │   │   └── conversation.ts
        │   └── messages/
        │       └── messages.ts
        ├── lib/
        │   └── utils.ts
        ├── models/
        │   ├── Conversations.ts
        │   └── Message.ts
        ├── types/
        │   └── index.ts
        └── utils/
            └── get-ai-response.ts
```

### Reffered :

**1.Next.js Playlist by chai aur code**

```https://www.youtube.com/watch?v=G9VbtcsPKT0&list=PLu71SKxNbfoBwut0coTT46oHz8q6xl2tO```
  
 - concept of next.js edge connection how it's diffrent from normal Restapi connection

**2.Next.js Repository for refrence**


```https://github.com/hiteshchoudhary/reelspro-imagekit-nextjs```

**3.Video demonstrating Data Acces Layer and its importance**

``` https://youtu.be/G4F73osodzA?feature=shared ```

  ##### Learnings
   - problem with normal folder structures and security concerns
   - Threats using server objects in client components
   -  (ex : middleware bypassing by http method)
   - Data Acces Layer and implementation and servel only tag

**4.Reference for Implenting Layouts in Next.js**

``` https://github.com/nareshbhatia/nextjs-nested-layouts/blob/main/src/app/client-components/layout.tsx ```

**5.popular prompt templates for diffrent usecases**

``` https://github.com/instructa/ai-prompts/tree/main ```


**6.Gemini API docs**

``` https://ai.google.dev/gemini-api/docs/text-generation ```

##### Refrence code used

```
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });

async function main() {
  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const response1 = await chat.sendMessage({
    message: "I have 2 dogs in my house.",
  });
  console.log("Chat response 1:", response1.text);

  const response2 = await chat.sendMessage({
    message: "How many paws are in my house?",
  });
  console.log("Chat response 2:", response2.text);
}

await main();
```
**7.gitingest**

``` https://gitingest.com/```

- used to extract folder structure of the project

### Further Actions Needed :

**Critical Levels**

#### High
**1.Improve Accesibility to Send Button :** 

   whenever user needs to send the message to the chat,needs to move the pointer towards send button evertime a simple Enter Keydown will improve the User Experience.

   ![Add Enter Accesibility](https://i.ibb.co/6cXbKwkM/Screenshot-from-2025-06-17-11-56-14.png)

**2.Remove horizontal scrollbar at the bottom of the chat**
  
  Remove the horizonatal Scroll bar at the bottom of chat.
  fix the overflow content on x-direction.
  
  ![Horizontal Scrollbar](https://i.ibb.co/bRLqHn1G/Screenshot-from-2025-06-17-11-53-05.png)

#### Medium
   
**1.Chat Diffrentation**

   When a user selects a conversation the diffrentation not seen between selected and other chats a slight deep saturation on selected chat will fix the issue.
    
![Chat Diffentation](https://i.ibb.co/WN6t3CdW/Screenshot-from-2025-06-17-11-58-53.png)

   
**2.Enlarge preview Section**

The Preview Section not aligned till the bottom of the page Enlarge the Preview Component.

![Enlarge Preview](https://i.ibb.co/qLtt5ny5/Screenshot-from-2025-06-17-12-02-45.png)


#### Low

**1.Skeleton Loader**
  
  A skeleton loader will the improve the user experience,provides a initimation that current chat is loading.

  ![Enlarge Preview](https://i.ibb.co/MkF3hbGH/Screenshot-from-2025-06-17-12-04-45.png)


**2.Remove the Code Editor**

Code Editor Beside the Preview of the component might cause disturbance while interacting with the previewed component removing the component ensures better Experience.

  ![Remove the Code Editor](https://i.ibb.co/zVy60b4x/Screenshot-from-2025-06-17-12-06-08.png)

