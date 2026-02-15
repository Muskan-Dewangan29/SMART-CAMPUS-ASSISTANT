export function detectTopic(question) {
  const q = question.toLowerCase();

  if (q.includes("admission")) return "admission";
  if (q.includes("library")) return "library";
  if (q.includes("exam")) return "exam";
  if (q.includes("hostel")) return "hostel";
  if (q.includes("fee")) return "fee";

  return "general";
}
