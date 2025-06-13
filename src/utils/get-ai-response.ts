import {
    GoogleGenAI,
} from '@google/genai';

export async function generateAiResponse({ userQuery }: { userQuery: String }) {
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });
    const config = {
        responseMimeType: 'text/plain',
    };
    const model = 'gemini-2.5-pro-preview-06-05';
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: `You are an expert React component generator. Use React + Tailwind CSS + DaisyUI to build clean, responsive, and accessible components.
  
  Respond in the following JSON format:
  {
    "userQuery": "<original request from the user>",
    "information": "<brief explanation or design breakdown>",
    "reactComponent": "<the complete React component code>",
    "furtherDetails": "<optional: any notes on usage, responsiveness, or customization>"
  }
  
  Rules:
  - Use functional React components (TypeScript optional unless specified).
  - Style with Tailwind CSS, and use DaisyUI elements where suitable.
  - Include props when appropriate to make the component reusable.
  - No unrelated output or commentary. Only return the JSON object.
  - Keep code clean, production-ready, and readable.
  
  Example queries:
  - "Create a login form with email and password inputs"
  - "Build a pricing card with title, price, features, and a CTA button"
  - "I need a sidebar with icons and collapsible sections"
  
  Begin.
  
  `,
                },
            ],
        },
        {
            role: 'model',
            parts: [
                {
                    text: `**Analyzing the Task**
  
  I'm breaking down the request for a "Contact Us" form into its core components. I've identified the need for user input fields, specifically focusing on name (flexible: First, Last, or Full) and the anticipated functionalities. I'm actively considering the data structure, how to handle submission, and what validation steps are necessary.
  
  
  **Constructing the Form**
  
  I've fleshed out the initial structure for the \`ContactForm\` component, including the core HTML elements and their states. I'm focusing now on the  \`handleChange\` and \`handleSubmit\` functions to ensure smooth data flow and proper form handling. My goal is to build a robust, reusable component. The form will take user input and submit it to a given \`onSubmit\` function. It will take a function argument, the same function that would be used when receiving the form object. I need to make sure that the object is not empty.
  
  
  **Refining Form Validation**
  
  I've significantly streamlined the form's structure and introduced basic validation to ensure all required fields are populated before submission. Currently implementing a more sophisticated error display system to guide the user in correcting any invalid input.  This includes handling edge cases to make the component more robust and user-friendly. I'm focusing on providing clear and concise feedback to the user on form errors. I think I'll use inline error messages.
  
  
  **Designing the Layout**
  
  I'm now structuring the form component, focusing on a responsive grid layout using Tailwind CSS and DaisyUI. I'm leveraging DaisyUI's card component for a clean, modern aesthetic. I've decided to employ \`md:grid-cols-2\` to arrange the first and last name fields side-by-side on medium-sized screens and larger. I'm paying close attention to accessibility, ensuring proper label association and screen reader compatibility.
  
  
  **Structuring the Component**
  
  I'm now diving into the React code, establishing the core \`ContactForm\` component and initializing the state management for the form's inputs using \`useState\`. I'm strategically crafting the \`handleChange\` and \`handleSubmit\` functions to ensure they smoothly capture user inputs and handle submissions, readying the component for action. I'm focusing on ensuring it's both reusable and compliant with the given specifications.
  
  
  **Planning the Component Structure**
  
  I'm translating the design blueprint into a React functional component structure, focusing on the \`onSubmit\` prop and initializing the \`formData\` state with \`useState\`. I'm establishing the \`handleChange\` function for dynamic updates and the \`handleSubmit\` function to manage form submission and call the passed \`onSubmit\` function with form data.
  
  
  **Drafting the React Component**
  
  I'm now coding the \`ContactForm\` component, focusing on the JSX structure and data handling.  The aim is to create a responsive layout, with fields stacking on smaller screens. I'm leveraging DaisyUI and Tailwind CSS for seamless styling and user-friendly visual elements.  I'm now focusing on a \`handleSubmit\` function that prevents the default action.
  
  \\n\\n
  \`\`\`json
  {
    "userQuery": "I need a 'Contact Us' form.",
    "information": "This is a responsive contact form component built with React, Tailwind CSS, and DaisyUI. It includes fields for first name, last name, email, subject, and a message. The form is encapsulated in a DaisyUI \`card\` for a clean, modern look. It accepts an \`onSubmit\` prop to handle the form submission logic in the parent component.",
    "reactComponent": "import React, { useState } from 'react';\\n\\nconst ContactForm = ({ onSubmit }) => {\\n  const [formData, setFormData] = useState({\\n    firstName: '',\\n    lastName: '',\\n    email: '',\\n    subject: '',\\n    message: '',\\n  });\\n\\n  const handleChange = (e) => {\\n    const { name, value } = e.target;\\n    setFormData(prevState => ({ ...prevState, [name]: value }));\\n  };\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    onSubmit(formData);\\n    // Optionally reset form after submission\\n    setFormData({\\n      firstName: '',\\n      lastName: '',\\n      email: '',\\n      subject: '',\\n      message: '',\\n    });\\n  };\\n\\n  return (\\n    <div className=\\"w-full max-w-lg\\">\\n      <form onSubmit={handleSubmit} className=\\"card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100\\">\\n        <div className=\\"card-body\\">\\n          <h2 className=\\"card-title text-2xl font-bold\\">Contact Us</h2>\\n          <div className=\\"grid grid-cols-1 md:grid-cols-2 gap-4\\">\\n            <div className=\\"form-control\\">\\n              <label className=\\"label\\" htmlFor=\\"firstName\\">\\n                <span className=\\"label-text\\">First Name</span>\\n              </label>\\n              <input\\n                type=\\"text\\"\\n                name=\\"firstName\\"\\n                id=\\"firstName\\"\\n                value={formData.firstName}\\n                onChange={handleChange}\\n                className=\\"input input-bordered w-full\\"\\n                required\\n              />\\n            </div>\\n            <div className=\\"form-control\\">\\n              <label className=\\"label\\" htmlFor=\\"lastName\\">\\n                <span className=\\"label-text\\">Last Name</span>\\n              </label>\\n              <input\\n                type=\\"text\\"\\n                name=\\"lastName\\"\\n                id=\\"lastName\\"\\n                value={formData.lastName}\\n                onChange={handleChange}\\n                className=\\"input input-bordered w-full\\"\\n                required\\n              />\\n            </div>\\n          </div>\\n          <div className=\\"form-control\\">\\n            <label className=\\"label\\" htmlFor=\\"email\\">\\n              <span className=\\"label-text\\">Email</span>\\n            </label>\\n            <input\\n              type=\\"email\\"\\n              name=\\"email\\"\\n              id=\\"email\\"\\n              value={formData.email}\\n              onChange={handleChange}\\n              className=\\"input input-bordered w-full\\"\\n              required\\n            />\\n          </div>\\n          <div className=\\"form-control\\">\\n            <label className=\\"label\\" htmlFor=\\"subject\\">\\n              <span className=\\"label-text\\">Subject (Optional)</span>\\n            </label>\\n            <input\\n              type=\\"text\\"\\n              name=\\"subject\\"\\n              id=\\"subject\\"\\n              value={formData.subject}\\n              onChange={handleChange}\\n              className=\\"input input-bordered w-full\\"\\n            />\\n          </div>\\n          <div className=\\"form-control\\">\\n            <label className=\\"label\\" htmlFor=\\"message\\">\\n              <span className=\\"label-text\\">Message</span>\\n            </label>\\n            <textarea\\n              name=\\"message\\"\\n              id=\\"message\\"\\n              value={formData.message}\\n              onChange={handleChange}\\n              className=\\"textarea textarea-bordered w-full\\"\\n              required\\n            />\\n          </div>\\n          <div className=\\"form-control mt-6\\">\\n            <button type=\\"submit\\" className=\\"btn
  
  `,
                },
                {
                    text: `\`\`\`json
  {
    "userQuery": "I need a 'Contact Us' form.",
    "information": "This is a responsive and accessible 'Contact Us' form. It is built using a DaisyUI \`card\` component for a clean layout. The form includes fields for first name, last name, email, subject, and a message. It uses a responsive grid to stack fields on mobile and place them side-by-side on larger screens. The component accepts an \`onSubmit\` prop to allow the parent to handle the form data upon submission.",
    "reactComponent": "import React, { useState } from 'react';\\n\\nconst ContactForm = ({ onSubmit }) => {\\n  const [formData, setFormData] = useState({\\n    firstName: '',\\n    lastName: '',\\n    email: '',\\n    subject: '',\\n    message: '',\\n  });\\n\\n  const handleChange = (e) => {\\n    const { name, value } = e.target;\\n    setFormData((prevData) => ({\\n      ...prevData,\\n      [name]: value,\\n    }));\\n  };\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (onSubmit) {\\n      onSubmit(formData);\\n    }\\n    // Optional: Reset form after submission\\n    setFormData({\\n      firstName: '',\\n      lastName: '',\\n      email: '',\\n      subject: '',\\n      message: '',\\n    });\\n  };\\n\\n  return (\\n    <div className=\\"bg-base-200 p-4 sm:p-8 rounded-xl w-full max-w-4xl mx-auto\\">\\n      <div className=\\"card bg-base-100 shadow-xl\\">\\n        <div className=\\"card-body\\">\\n          <h2 className=\\"card-title text-3xl font-bold mb-4\\">Contact Us</h2>\\n          <p className=\\"mb-6 text-base-content/70\\">Have a question or want to work together? Fill out the form below and we'll get back to you as soon as possible.</p>\\n          <form onSubmit={handleSubmit} noValidate>\\n            <div className=\\"grid grid-cols-1 md:grid-cols-2 gap-4\\">\\n              {/* First Name */}\\n              <div className=\\"form-control\\">\\n                <label htmlFor=\\"firstName\\" className=\\"label\\">\\n                  <span className=\\"label-text\\">First Name</span>\\n                </label>\\n                <input\\n                  type=\\"text\\"\\n                  id=\\"firstName\\"\\n                  name=\\"firstName\\"\\n                  placeholder=\\"John\\"\\n                  className=\\"input input-bordered w-full\\"\\n                  value={formData.firstName}\\n                  onChange={handleChange}\\n                  required\\n                />\\n              </div>\\n\\n              {/* Last Name */}\\n              <div className=\\"form-control\\">\\n                <label htmlFor=\\"lastName\\" className=\\"label\\">\\n                  <span className=\\"label-text\\">Last Name</span>\\n                </label>\\n                <input\\n                  type=\\"text\\"\\n                  id=\\"lastName\\"\\n                  name=\\"lastName\\"\\n                  placeholder=\\"Doe\\"\\n                  className=\\"input input-bordered w-full\\"\\n                  value={formData.lastName}\\n                  onChange={handleChange}\\n                  required\\n                />\\n              </div>\\n\\n              {/* Email */}\\n              <div className=\\"form-control md:col-span-2\\">\\n                <label htmlFor=\\"email\\" className=\\"label\\">\\n                  <span className=\\"label-text\\">Email Address</span>\\n                </label>\\n                <input\\n                  type=\\"email\\"\\n                  id=\\"email\\"\\n                  name=\\"email\\"\\n                  placeholder=\\"john.doe@example.com\\"\\n                  className=\\"input input-bordered w-full\\"\\n                  value={formData.email}\\n                  onChange={handleChange}\\n                  required\\n                />\\n              </div>\\n\\n              {/* Subject */}\\n              <div className=\\"form-control md:col-span-2\\">\\n                <label htmlFor=\\"subject\\" className=\\"label\\">\\n                  <span className=\\"label-text\\">Subject</span>\\n                </label>\\n                <input\\n                  type=\\"text\\"\\n                  id=\\"subject\\"\\n                  name=\\"subject\\"\\n                  placeholder=\\"Regarding our new project\\"\\n                  className=\\"input input-bordered w-full\\"\\n                  value={formData.subject}\\n                  onChange={handleChange}\\n                  required\\n                />\\n              </div>\\n\\n              {/* Message */}\\n              <div className=\\"form-control md:col-span-2\\">\\n                <label htmlFor=\\"message\\" className=\\"label\\">\\n                  <span className=\\"label-text\\">Message</span>\\n                </label>\\n                <textarea\\n                  id=\\"message\\"\\n                  name=\\"message\\"\\n                  className=\\"textarea textarea-bordered h-32 w-full\\"\\n                  placeholder=\\"Your message here...\\"\\n                  value={formData.message}\\n                  onChange={handleChange}\\n                  required\\n                ></textarea>\\n              </div>\\n            </div>\\n\\n            <div className=\\"card-actions mt-6\\">\\n              <button type=\\"submit\\" className=\\"btn btn-primary w-full\\">Send Message</button>\\n            </div>\\n          </form>\\n        </div>\\n      </div>\\n    </div>\\n  );\\n};\\n\\nexport default ContactForm;\\n",
    "furtherDetails": "Usage: Import the \`ContactForm\` component and provide an \`onSubmit\` function to handle the form data. \\n\\n\`\`\`jsx\\n// In your parent component (e.g., App.js)\\nimport ContactForm from './ContactForm';\\n\\nfunction App() {\\n  const handleFormSubmit = (data) => {\\n    console.log('Form data submitted:', data);\\n    // Add your logic here to send the data to a server or API\\n    alert('Thank you for your message!');\\n  };\\n\\n  return (\\n    <div className=\\"min-h-screen flex items-center justify-center bg-base-200 p-4\\">\\n      <ContactForm onSubmit={handleFormSubmit} />\\n    </div>\\n  );\\n}\\n\`\`\`\\n\\nCustomization: The component's colors (\`btn-primary\`, \`bg-base-100\`, etc.) are based on your DaisyUI theme and can be easily changed in your \`tailwind.config.js\` file. The form is responsive, with a two-column layout on medium screens and up, and a single-column layout on smaller screens."
  }
  \`\`\``,
                },
            ],
        },
        {
            role: 'user',
            parts: [
                {
                    text: `generate a login form
  `,
                },
            ],
        },
        {
            role: 'model',
            parts: [
                {
                    text: `**Defining the Login Form**
  
  I'm currently fleshing out the structure of a login form component, starting from a user request. I'm focusing on creating a centered, visually appealing form. My plan is to leverage Daisy UI for its clean design and ease of use.
  
  
  **Refining Component Structure**
  
  I'm now refining the login form's React component. I'm focusing on the \`password\` field for now, to implement a "show/hide" toggle for the password visibility. I'm working with the \`useState\` hook and ensuring accessibility standards. I have already included email field with a corresponding label, and have started the card structure of the form with DaisyUI.
  
  
  **Formulating JSON Output**
  
  I'm now in the process of defining the JSON structure for the login form component. It will clearly outline the necessary props and the component's internal structure. I plan to use the \`onSubmit\` prop for handling form submissions, and I'll include detailed instructions on how to incorporate the \`LoginForm\` into other components. I intend to provide a sample JSON output. I'm focusing on defining the nested structure and properties for the \`email\`, \`password\`, submit button, and links.
  
  
  **Crafting JSON Response**
  
  I'm now generating the JSON response for the login form, meticulously reflecting its structure and functionality. The goal is to provide a comprehensive, reusable component. The JSON will define props, nested elements, event handlers, and how it can be integrated into parent components. I'm focusing on clarity to ensure seamless integration and use.
  
  
  **Formulating the Component's Structure**
  
  I'm now detailing the component's internal structure and event handlers. I've designed the email and password fields, including the password visibility toggle using inline SVG icons. The \`handleSubmit\` function will call the \`onSubmit\` prop with the entered credentials. I'm also preparing documentation on incorporating this component into a parent element.
  
  
  **Generating the JSON Structure**
  
  I'm now detailing the component structure into a JSON object. I've designed fields for email, password, and submit, along with styling options. The \`onSubmit\` and documentation will also be included in the JSON output, to ensure clarity and ease of integration into parent components. I've included the React code with inline SVGs.
  
  
  **Generating the Component's Output**
  
  I'm now generating the JSON output, which fully encapsulates the React component's structure, props, and functionality, including event handling, styling options, and accessibility considerations. The output also covers the \`onSubmit\` prop and the password toggle with the inline SVG's. Further documentation and usage examples will also be included in the JSON.
  
  
  **Defining the Component Output**
  
  I'm now generating the JSON output, ready to be presented. It fully encapsulates the React component's structure, props, and functionality, including event handling, styling options, and accessibility considerations. I'm focusing on providing a comprehensive output that's ready to be integrated. The \`LoginForm\` component will be the core of the JSON output. I've focused on clarity and ease of integration in my final product.
  
  **Generating JSON Response**
  
  I've generated the JSON output, including the React component's structure, props, event handlers, and styling. The output includes clear examples of usage and accessibility considerations, particularly the \`onSubmit\` prop for form submission, and the password toggle for enhanced usability. The component is designed for easy integration and customization.
  
  
  **Structuring the JSON Output**
  
  I'm now generating the JSON output, which will provide a complete representation of the login form component. The output will encompass its structure, its properties and how to use them, the necessary props, event handling, and styling options. It will also outline the integration into a parent component, alongside relevant examples. I will focus on clarity, providing a comprehensive user-friendly structure.
  
  
  **Defining the Final Output**
  
  I'm finalizing the JSON response, ensuring it accurately represents the \`LoginForm\` component. It includes all props, events, and styling options for easy use. I've focused on clarity, and have included the React code with inline SVG icons for a self-contained component.
  
  
  **Constructing Final JSON**
  
  I've now generated the final JSON response, encompassing the structure, props, and functionality of the login form component. This detailed output ensures effortless integration. I focused on making it a self-contained unit, with clear usage examples and accessibility considerations, especially the \`onSubmit\` prop for form submission, and the password toggle for usability. I've also incorporated the \`LoginForm\` component.
  
  
  `,
                },
                {
                    text: `\`\`\`json
  {
    "userQuery": "generate a login form",
    "information": "This is a clean, responsive, and accessible login form component. It is built using a DaisyUI \`card\` for a modern look. The form includes fields for email and password, with a convenient toggle to show or hide the password. It also features a 'Forgot Password?' link and a prompt to sign up. The component is designed to be placed anywhere in your application and uses an \`onSubmit\` prop for handling login logic.",
    "reactComponent": "import React, { useState } from 'react';\\n\\n// Internal SVG components for the password visibility toggle\\nconst EyeIcon = () => (\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" className=\\"h-5 w-5\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\" stroke=\\"currentColor\\" strokeWidth={2}>\\n    <path strokeLinecap=\\"round\\" strokeLinejoin=\\"round\\" d=\\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\\" />\\n    <path strokeLinecap=\\"round\\" strokeLinejoin=\\"round\\" d=\\"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z\\" />\\n  </svg>\\n);\\n\\nconst EyeOffIcon = () => (\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" className=\\"h-5 w-5\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\" stroke=\\"currentColor\\" strokeWidth={2}>\\n    <path strokeLinecap=\\"round\\" strokeLinejoin=\\"round\\" d=\\"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411M21 21L12 12\\" />\\n  </svg>\\n);\\n\\nconst LoginForm = ({ onSubmit, title = \\"Login\\" }) => {\\n  const [email, setEmail] = useState('');\\n  const [password, setPassword] = useState('');\\n  const [showPassword, setShowPassword] = useState(false);\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (onSubmit) {\\n      onSubmit({ email, password });\\n    }\\n  };\\n\\n  return (\\n    <div className=\\"card w-full max-w-sm shrink-0 bg-base-100 shadow-xl\\">\\n      <form className=\\"card-body\\" onSubmit={handleSubmit} noValidate>\\n        <h2 className=\\"card-title text-2xl font-bold\\">{title}</h2>\\n        \\n        {/* Email Input */}\\n        <div className=\\"form-control\\">\\n          <label className=\\"label\\" htmlFor=\\"email\\">\\n            <span className=\\"label-text\\">Email</span>\\n          </label>\\n          <input\\n            type=\\"email\\"\\n            id=\\"email\\"\\n            name=\\"email\\"\\n            placeholder=\\"email@example.com\\"\\n            className=\\"input input-bordered\\"\\n            autoComplete=\\"email\\"\\n            value={email}\\n            onChange={(e) => setEmail(e.target.value)}\\n            required\\n          />\\n        </div>\\n\\n        {/* Password Input */}\\n        <div className=\\"form-control\\">\\n          <label className=\\"label\\" htmlFor=\\"password\\">\\n            <span className=\\"label-text\\">Password</span>\\n          </label>\\n          <div className=\\"relative\\">\\n            <input\\n              type={showPassword ? 'text' : 'password'}\\n              id=\\"password\\"\\n              name=\\"password\\"\\n              placeholder=\\"********\\"\\n              className=\\"input input-bordered w-full pr-10\\"\\n              autoComplete=\\"current-password\\"\\n              value={password}\\n              onChange={(e) => setPassword(e.target.value)}\\n              required\\n            />\\n            <button\\n              type=\\"button\\"\\n              onClick={() => setShowPassword(!showPassword)}\\n              className=\\"btn btn-ghost btn-sm absolute top-1/2 right-0 -translate-y-1/2 h-auto px-2\\"\\n              aria-label={showPassword ? 'Hide password' : 'Show password'}\\n            >\\n              {showPassword ? <EyeOffIcon /> : <EyeIcon />}\\n            </button>\\n          </div>\\n          <label className=\\"label\\">\\n            <a href=\\"#\\" className=\\"label-text-alt link link-hover\\">\\n              Forgot password?\\n            </a>\\n          </label>\\n        </div>\\n\\n        {/* Submit Button */}\\n        <div className=\\"form-control mt-6\\">\\n          <button type=\\"submit\\" className=\\"btn btn-primary\\">Login</button>\\n        </div>\\n        \\n        <div className=\\"text-center mt-4\\">\\n          <p className=\\"text-sm text-base-content/80\\">\\n            Don't have an account?{' '}\\n            <a href=\\"#\\" className=\\"link link-primary font-medium\\">\\n              Sign up\\n            </a>\\n          </p>\\n        </div>\\n      </form>\\n    </div>\\n  );\\n};\\n\\nexport default LoginForm;\\n",
    "furtherDetails": "Usage: Import the component and pass an \`onSubmit\` function to handle the form data. You can also customize the main title via the \`title\` prop.\\n\\n\`\`\`jsx\\n// In your parent component (e.g., LoginPage.js)\\nimport LoginForm from './LoginForm';\\n\\nfunction LoginPage() {\\n  const handleLogin = ({ email, password }) => {\\n    console.log('Attempting to log in with:', { email, password });\\n    // Implement your authentication logic here\\n    alert(\`Login submitted for ${email}\`);\\n  };\\n\\n  return (\\n    <div className=\\"min-h-screen bg-base-200 flex items-center justify-center\\">\\n      <LoginForm onSubmit={handleLogin} title=\\"Access Your Account\\" />\\n    </div>\\n  );\\n}\\n\`\`\`\\n\\nThe component is self-contained. Colors like \`btn-primary\`, \`link-primary\`, and \`bg-base-100\` can be customized globally in your \`tailwind.config.js\` DaisyUI theme settings. For accessibility, inputs are correctly linked to labels with \`htmlFor\`, and \`autoComplete\` attributes are used to assist password managers."
  }
  \`\`\``,
                },
            ],
        },
        {
            role: 'user',
            parts: [
                {
                    text: `${userQuery}`,
                },
            ],
        },
    ];

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });
    let fileIndex = 0;
    for await (const chunk of response) {
        console.log(chunk.text);
    }
}

