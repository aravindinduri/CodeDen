# CODEDEN

**CodeDen** is an AI-powered coding assistant that helps developers generate React components. Built with **Next.js**, **MongoDB**, and powered by **Gemini 2.0**, 

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

#### Refrence code used

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