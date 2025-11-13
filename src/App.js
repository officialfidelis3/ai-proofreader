import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleProofread() {
    setLoading(true);
    setResult("");
    try {
      const response = await fetch("/.netlify/functions/proofread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data.result || "No changes found.");
    } catch (e) {
      setResult("Error: " + e.message);
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 24 }}>
      <h2>AI Proofreader</h2>
      <textarea
        rows={10}
        style={{ width: "100%", fontSize: 16 }}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Paste or type your text here..."
      />
      <br />
      <button disabled={loading || !text} onClick={handleProofread}>
        {loading ? "Proofreading..." : "Proofread"}
      </button>
      {result && (
        <>
          <h3>Corrected output:</h3>
          <div style={{ background: "#f8f8fb", padding: "12px", borderRadius: "6px", whiteSpace: "pre-wrap" }}>
            {result}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
