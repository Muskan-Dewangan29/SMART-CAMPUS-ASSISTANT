import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/admin/data")
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const saveData = async () => {
    await fetch("http://localhost:5000/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert("College data updated successfully!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin – College Data</h2>

      <textarea
        style={{ width: "100%", height: 400 }}
        value={JSON.stringify(data, null, 2)}
        onChange={e => setData(JSON.parse(e.target.value))}
      />

      <button onClick={saveData} style={{ marginTop: 10 }}>
        Save
      </button>
    </div>
  );
}
