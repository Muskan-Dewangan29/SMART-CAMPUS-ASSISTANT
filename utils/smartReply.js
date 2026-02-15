export function smartReply(answer, topic = "") {
  if (!answer || answer.toLowerCase().includes("not available")) {
    return "I’m sorry, I couldn’t find official information for this query. You may contact the college administration for accurate details.";
  }

  let enhanced = answer.trim();

  // Capitalize first letter
  enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);

  // Add polite ending based on topic
  if (topic.includes("admission")) {
    enhanced += "\n\nIf you’d like, I can also guide you about eligibility, important dates, or required documents.";
  } 
  else if (topic.includes("library")) {
    enhanced += "\n\nWould you like information about digital resources or borrowing rules?";
  } 
  else if (topic.includes("exam")) {
    enhanced += "\n\nLet me know if you want the exam timetable or result details.";
  } 
  else {
    enhanced += "\n\nFeel free to ask if you need more details.";
  }

  return enhanced;
}
