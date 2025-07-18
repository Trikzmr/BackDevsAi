import React, { useState } from 'react';
import {
  Copy,
  ChevronDown,
  ChevronRight,
  Code,
  Book,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

const ApiDocs = () => {
  const [expandedSections, setExpandedSections] = useState(['gettingStarted']);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const toggleSection = (section) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
  };

  const codeExamples = {
    javascript: {
      gettingStarted: `
const response = await fetch('https://backdevsai.onrender.com/api/v1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    instructions: "Get the list of all data",
    key: "YOUR_API_KEY",
    collectionName: "Your_Collection_Schema_Name",
  })
});
const data = await response.json();
console.log(data);`,

      getData: `
const response = await fetch('https://backdevsai.onrender.com/api/v1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    instructions: "get the data where username=MrTrikz",
    key: "YOUR_API_KEY",
    collectionName: "Your_Collection_Schema_Name",
  })
});
const data = await response.json();
console.log(data);`,

      addData: `
const newData = {
  name: "Debabrato Das"
};
const response = await fetch('https://backdevsai.onrender.com/api/v1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    instructions: "add this new data",
    key: "YOUR_API_KEY",
    collectionName: "Your_Collection_Schema_Name",
    data: newData
  })
});
const data = await response.json();
console.log(data);`,

      updateData: `
const newData = {
  name: 'Jane Updated',
  email: 'jane.previous@example.com'
};
const previousData = {
  name: 'Jane Previous',
  email: 'jane.updated@example.com'
};
const response = await fetch('https://backdevsai.onrender.com/api/v1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    instructions: "update the old data with new data",
    key: "YOUR_API_KEY",
    collectionName: "Application",
    data: newData,
    oldData: previousData
  })
});
const data = await response.json();
console.log(data);`,

      deleteData: `
const response = await fetch('https://backdevsai.onrender.com/api/v1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    instructions: "delete the data where username=MrTrikz",
    key: "YOUR_API_KEY",
    collectionName: "Your_Collection_Schema_Name",
  })
});
const data = await response.json();
console.log(data);`
    }
  };

  const sections = [
  {
    id: 'gettingStarted',
    title: 'Getting Started',
    description: 'Basic setup to authenticate and connect with BackDevsAI API',
    extraInfo: 'This section guides you through the initial steps of integrating with the BackDevsAI API. It demonstrates how to send a basic POST request containing essential fields such as your API key, collection name, and instruction. This universal endpoint supports all actions—retrieving, updating, deleting, and adding data—based on the instruction you provide. It’s the one-stop entry point to interact with your database programmatically using simple JSON payloads.',
    endpoints: [
      {
        method: 'POST',
        path: 'https://backdevsai.onrender.com/api/v1',
        description: 'Single API Which Does Everything'
      }
    ]
  },
  {
    id: 'getData',
    title: 'Get Data from Database',
    description: 'Learn how to retrieve data from the database',
    extraInfo: 'To retrieve data, you simply pass a readable instruction like "get all data" or a filtered query such as "where username=MrTrikz". The API processes your instruction, finds matching documents in the specified collection, and returns them as a JSON array. This method eliminates the need for traditional query parameters, making data fetching intuitive, human-readable, and flexible without compromising on control or specificity.',
  },
  {
    id: 'addData',
    title: 'Add Data to Database',
    description: 'Add new records to your database using our API',
    extraInfo: 'Adding new data is as simple as sending a JSON object in the `data` field, along with your API key and collection name. The instruction "add this new data" tells the API to insert your provided object into the MongoDB collection. You don’t need to worry about schema enforcement here—just match the structure of your existing collection, and the API will handle insertion safely and efficiently.',
  },
  {
    id: 'updateData',
    title: 'Update Data in Database',
    description: 'Update existing records in your database',
    extraInfo: 'Updating data involves passing both the `oldData` (the current state of the document you want to find) and the `data` (the new values you want to replace it with). The API matches the document using `oldData` and applies the update accordingly. This operation ensures you only modify exact records you intend to, maintaining accuracy and preventing unintended overwrites or changes across other documents.',
  },
  {
    id: 'deleteData',
    title: 'Delete Data from Database',
    description: 'Remove unwanted records from the database',
    extraInfo: 'To delete a document, you need to provide a clear instruction, such as "delete the data where username=MrTrikz", along with your API key and the relevant collection name. The API interprets the instruction, identifies the record(s), and removes them from your MongoDB database. It is safe, targeted, and respects your filtering conditions to ensure only the intended data is deleted without affecting anything else.',
  }
];


  const getMethodColor = (method) => {
    switch (method) {
      case 'GET':
        return 'bg-green-500/20 text-green-400';
      case 'POST':
        return 'bg-blue-500/20 text-blue-400';
      case 'PUT':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'DELETE':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">API Documentation</h2>
          <p className="text-[#9ca3af]">Complete guide to integrating with BackDevsAI API</p>
        </div>


        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
          >
            <option value="javascript">JavaScript</option>
          </select>
          <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open API
          </button>
        </div>
      </div>
              <div className="bg-[rgba(255,255,255,0.03)] p-6 rounded-xl border border-[#1f2937] space-y-4 text-[#9ca3af]">
  <p>
    While it is possible to perform search, create, update, and delete operations by simply writing the appropriate instruction, it is highly recommended to follow a standardized format. Using a consistent structure not only ensures better accuracy and reliability but also makes the code more readable and maintainable. This becomes especially important when scaling your application or collaborating with others, as a well-defined format helps avoid misinterpretations and reduces the likelihood of errors during API interactions.
  </p>
  <p>
    <span className="font-semibold text-white">Note:</span> This API is currently in <span className="italic">beta</span>. For safety and stability, we suggest using it with <span className="italic">test databases</span> only. We’re actively working to improve and prepare it for production environments.
  </p>
</div>
 {/* Quick Start */}
      <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-6">
        <div className="flex items-center mb-4">
          <CheckCircle className="w-5 h-5 text-[#3b82f6] mr-2" />
          <h3 className="text-xl font-semibold">Quick Start</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
            <div className="font-semibold mb-2">1. Get API Key</div>
            <p className="text-[#9ca3af]">Create an API key from your dashboard</p>
          </div>
          <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
            <div className="font-semibold mb-2">2. Make Request</div>
            <p className="text-[#9ca3af]">Include your API key in the Authorization header</p>
          </div>
          <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
            <div className="font-semibold mb-2">3. Handle Response</div>
            <p className="text-[#9ca3af]">Process the JSON response from the API</p>
          </div>
        </div>
      </div>

      {/* API Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-6 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                  <p className="text-[#9ca3af]">{section.description}</p>
                </div>
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="w-5 h-5 text-[#9ca3af]" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-[#9ca3af]" />
                )}
              </div>
            </button>

            {expandedSections.includes(section.id) && (
              <div className="border-t border-[#1f2937] p-6 space-y-6">
                
                {section.extraInfo && (
                  <div className="text-sm text-[#d1d5db]">{section.extraInfo}</div>
                )}

                {/* Endpoints */}
                {section.endpoints && section.endpoints.length > 0 && (
                  <>
                    <h4 className="font-semibold mb-4">Endpoints</h4>
                    <div className="space-y-3">
                      {section.endpoints.map((endpoint, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.05)] rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                              {endpoint.method}
                            </span>
                            <code className="text-sm">{endpoint.path}</code>
                          </div>
                          <span className="text-sm text-[#9ca3af]">{endpoint.description}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Code Example */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Example Code</h4>
                    <button
                      onClick={() => copyCode(codeExamples[selectedLanguage][section.id])}
                      className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-[#e5e5e5] whitespace-pre-wrap">
                      {codeExamples[selectedLanguage][section.id]}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Support */}
      <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-6">
        <div className="flex items-center mb-4">
          <Book className="w-5 h-5 text-[#3b82f6] mr-2" />
          <h3 className="text-xl font-semibold">Need Help?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Documentation</h4>
            <p className="text-[#9ca3af] text-sm mb-3">
              Check out our comprehensive guides and tutorials
            </p>
            <a href="#" className="text-[#3b82f6] hover:text-[#2563eb] text-sm font-medium">
              Visit Docs →
            </a>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <p className="text-[#9ca3af] text-sm mb-3">
              Get help from our development team
            </p>
            <a href="#" className="text-[#3b82f6] hover:text-[#2563eb] text-sm font-medium">
              Contact Support →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
