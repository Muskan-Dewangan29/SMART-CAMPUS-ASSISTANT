// import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from 'lucide-react';
interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void;
}
const questions = ["What are the college's admission requirements?", "How do I apply for financial aid or scholarships?", "What courses are offered in SSIPMT?", "What are the hostel facilities like?", "How do I contact the placement cell or career services?"];
export function SuggestedQuestions({
  onSelectQuestion
}: SuggestedQuestionsProps) {
  return <div className="space-y-4">
      <div className="flex items-center gap-2 text-slate-600">
        <SparklesIcon className="w-5 h-5" />
        <h3 className="text-sm font-medium">Suggested Questions</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {questions.map((question, index) => <motion.button key={question} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.05
      }} onClick={() => onSelectQuestion(question)} className="text-left p-4 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-sm text-slate-700 hover:text-blue-700">
            {question}
          </motion.button>)}
      </div>
    </div>;
}