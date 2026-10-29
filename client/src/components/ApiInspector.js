import React from 'react';

function ApiInspector() {
  return (
    <div className="api-screen">
      <div className="api-toolbar">
        <span>GET http://localhost:5000/api/issues</span>
        <button className="btn-copy">Copy JSON</button>
      </div>
      <pre className="json-dark-box">
{`{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "64ddbc061aacce17fbb8dae1",
      "title": "Poor sanitation in washrooms",
      "category": "Sanitation",
      "description": "The girl's waiting hall in 2nd floor in terms of sanitation is very poor.",
      "status": "pending",
      "priority": "High"
    },
    {
      "_id": "51fbad127a9cb2716a81bbef",
      "title": "Broken AC unit in Lecture Hall 35",
      "category": "Infrastructure",
      "description": "AC unit in lecture hall making loud buzzing noise and not cooling the room.",
      "status": "working",
      "priority": "Medium"
    }
  ]
}`}
      </pre>
    </div>
  );
}

export default ApiInspector;