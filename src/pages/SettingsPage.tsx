import { useState } from "react";
import { motion } from "framer-motion";
import {  MoonIcon, GlobeIcon } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

export function SettingsPage() {
  const [language, setLanguage] = useState("english");

  const { theme, toggleTheme } = useTheme(); // ✅ Dark mode hook

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar
        onNewChat={() => {}}
        onShowChat={() => {}}
      />


      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Settings
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Manage your preferences and  settings
            </p>

            <div className="space-y-6">


              {/* Appearance */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                    <MoonIcon className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Appearance
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Customize how CollegeAssist looks
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      Dark Mode
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Toggle dark theme
                    </p>
                  </div>

                  {/* ✅ WORKING DARK MODE TOGGLE */}
                  <button
                    onClick={toggleTheme}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      theme === "dark" ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  >
                    <motion.div
                      className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"
                      animate={{ x: theme === "dark" ? 24 : 0 }}
                    />
                  </button>
                </div>
              </div>

              {/* Language */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                    <GlobeIcon className="w-5 h-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Language
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Choose your preferred language
                    </p>
                  </div>
                </div>

                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 dark:text-white"
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
