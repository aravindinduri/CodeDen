import React from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";

interface PreviewProps {
  code: string;
}

export default function Preview({ code }: PreviewProps) {
  const processCode = (rawCode: string): string => {
    try {
      let cleanCode = rawCode.trim();

      cleanCode = cleanCode.replace(/^```[\w]*\n?/gm, '');
      cleanCode = cleanCode.replace(/^```\n?/gm, '');
      cleanCode = cleanCode.trim();

      cleanCode = cleanCode.replace(/[^\x20-\x7E\n\r\t]/g, '');

      cleanCode = cleanCode.replace(/function\s+([A-Za-z_$][A-Za-z0-9_$]*);/g, 'function $1() {}');
      cleanCode = cleanCode.replace(/>\s*</g, '>\n<');

      if (!cleanCode.includes('export default') && !cleanCode.includes('export {')) {
        if (cleanCode.includes('function App')) {
          cleanCode = cleanCode.replace(/function App/, 'export default function App');
        } else if (cleanCode.includes('const App')) {
          cleanCode = cleanCode.replace(/const App/, 'export default const App');
        } else {
          cleanCode = `import React from 'react';

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Component Preview</h1>
      <pre>${cleanCode}</pre>
    </div>
  );
}`;
        }
      }

      return cleanCode;
    } catch (error) {
      return "error";
    }
  };

  const processedCode = processCode(code);

  return (
    <div className="w-full h-full overflow-hidden">
      <Sandpack
        template="react"
        files={{
          "/App.js": processedCode
        }}
        options={{
          showLineNumbers: false,
          showConsole: false,
          editorHeight: 800,
          editorWidthPercentage: 0,
          autorun: true,
          autoReload: true,
        }}
        theme="light"
      />
    </div>
  );
}
