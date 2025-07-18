import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const instructionSnippets = [
  "Get the List of all users",
  "Get the User data username=Debabrato Das",
  "Get the list of users having role=employee",
  "Add a user with details ${userdetails}",
  "update this details ${oldData} to ${newData}",
  "delete data where username= deb"
];

const baseCodeBeforeInstruction = `fetch("https://api.BackDevsAI.com/v1", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    instructions: \``;

const baseCodeAfterInstruction = `\`,
    key: "your_api_key_here"
    collectionName: "users"
  })
})
  .then(res => res.json())
  .then(data => console.log(data));`;

const ExampleUse = () => {
  const [typedCode, setTypedCode] = useState("");
  const [instructionIndex, setInstructionIndex] = useState(0);
  const [instructionCharIndex, setInstructionCharIndex] = useState(0);
  const [currentInstruction, setCurrentInstruction] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [firstTimeFullTyped, setFirstTimeFullTyped] = useState(false);

  useEffect(() => {
    const fullInstruction = instructionSnippets[instructionIndex];

    const handleTyping = () => {
      if (!firstTimeFullTyped) {
        // Type the full code first time
        const fullCode = baseCodeBeforeInstruction + fullInstruction + baseCodeAfterInstruction;
        if (typedCode.length < fullCode.length) {
          setTypedCode(fullCode.substring(0, typedCode.length + 1));
        } else {
          setFirstTimeFullTyped(true);
        }
        return;
      }

      if (!isDeleting) {
        if (instructionCharIndex < fullInstruction.length) {
          setCurrentInstruction(fullInstruction.substring(0, instructionCharIndex + 1));
          setInstructionCharIndex(instructionCharIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (instructionCharIndex > 0) {
          setCurrentInstruction(fullInstruction.substring(0, instructionCharIndex - 1));
          setInstructionCharIndex(instructionCharIndex - 1);
        } else {
          const nextIndex = (instructionIndex + 1) % instructionSnippets.length;
          setInstructionIndex(nextIndex);
          setIsDeleting(false);
        }
      }
    };

    const timeout = setTimeout(handleTyping, firstTimeFullTyped ? (isDeleting ? 30 : 50) : 20);
    return () => clearTimeout(timeout);
  }, [instructionCharIndex, isDeleting, instructionIndex, typedCode, firstTimeFullTyped]);

  const combinedCode = firstTimeFullTyped
    ? baseCodeBeforeInstruction + currentInstruction + baseCodeAfterInstruction
    : typedCode;

  return (
    <section className="py-24 px-6 lg:px-20 bg-gradient-to-br from-[#0f0f0f] to-[#111827] text-white border-t border-[#1f2937]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="w-6 h-6 text-[#3b82f6] animate-pulse" />
            <h2 className="text-4xl font-bold">Example Use</h2>
          </div>
          <p className="text-[#9ca3af] text-lg mb-6 leading-relaxed">
  <strong>One Universal API. Infinite Backend Logic.</strong><br />
  Ditch the boilerplate — our single intelligent endpoint dynamically interprets your intent and executes backend operations instantly. No frameworks, no scaffolding — just results.
</p>

          <ul className="space-y-3">
  <li className="bg-[#1e293b]/40 px-4 py-3 rounded-lg border border-[#1f2937] hover:border-[#3b82f6]/50 transition">
    • One API to Handle Everything
  </li>
  <li className="bg-[#1e293b]/40 px-4 py-3 rounded-lg border border-[#1f2937] hover:border-[#3b82f6]/50 transition">
    • Integrated Logging and Monitoring Features
  </li>
  <li className="bg-[#1e293b]/40 px-4 py-3 rounded-lg border border-[#1f2937] hover:border-[#3b82f6]/50 transition">
    • Minimizes the Need for Manual Backend Development
  </li>
  <li className="bg-[#1e293b]/40 px-4 py-3 rounded-lg border border-[#1f2937] hover:border-[#3b82f6]/50 transition">
    • Understands and Processes Natural English Instructions
  </li>
</ul>


        </div>

        {/* Right Side - Animated Colorful Code Block */}
        <div className="bg-[#0f172a] rounded-xl border border-[#1f2937] p-6 shadow-xl overflow-auto">
          <SyntaxHighlighter language="javascript" style={atomDark} showLineNumbers>
            {combinedCode || "// Loading code..."}
          </SyntaxHighlighter>
        </div>
      </div>
    </section>
  );
};

export default ExampleUse;
