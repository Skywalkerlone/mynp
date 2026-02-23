'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Prompts() {
  const { darkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('creative');
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  // SVG Icon Components
  const MessageSquare = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );

  const FileText = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );

  const Zap = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );

  const Brain = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 16.5a9 9 0 0 0-9-9A6.5 6.5 0 0 0 3 10c0 3.6 3.5 6.5 8 6.5a9 9 0 0 0 7-2.5"/>
      <path d="M16 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
    </svg>
  );

  const BookOpen = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );

  const BarChart3 = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 20V10"/>
      <path d="M12 20V4"/>
      <path d="M6 20v-6"/>
    </svg>
  );

  const Lightbulb = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1 3.2.8 1 1.5 1.5 2.6 2"/>
      <path d="M9 18h6"/>
      <path d="M10 22h4"/>
    </svg>
  );

  const ChevronRight = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );

  const ExternalLink = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );

  const Sparkles = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v1M12 20v1M3 12h1M20 12h1"/>
      <path d="M18.364 5.636l-.707.707M5.636 18.364l-.707.707"/>
      <path d="M18.364 18.364l-.707-.707M5.636 5.636l-.707-.707"/>
    </svg>
  );

  const Code = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  );

  // Prompt Library Categories
  const promptCategories = [
    {
      id: 'creative',
      title: 'Creative Text Generation',
      icon: <BookOpen size={20} />,
      description: 'Dynamic content for blogs, stories, and creative writing',
      prompts: [
        {
          title: 'Blog Post Generator',
          prompt: `Generate a comprehensive blog post about [topic]. Include:
1. Catchy title with SEO keywords
2. Engaging introduction with a hook
3. 3-5 main sections with subtitles
4. Practical examples or case studies
5. Actionable takeaways
6. SEO-optimized meta description
Tone: [professional/casual/inspirational]
Target audience: [specify audience]`,
          strategy: 'Structured templates with tone and audience specificity',
          result: 'SEO-optimized, engaging content with clear structure'
        },
        {
          title: 'Story Plot Generator',
          prompt: `Create a compelling story plot with:
1. Protagonist with clear motivation and flaws
2. Central conflict with stakes
3. 3-act structure (Setup, Confrontation, Resolution)
4. Supporting characters with distinct voices
5. Setting that enhances theme
6. Plot twist at midpoint
Genre: [specify genre]
Theme: [specify theme]`,
          strategy: 'Character-driven narrative with structural constraints',
          result: 'Coherent, engaging stories with emotional depth'
        }
      ]
    },
    {
      id: 'qa',
      title: 'Q&A Systems',
      icon: <MessageSquare size={20} />,
      description: 'Enhancing precision and relevance in AI-powered question answering',
      prompts: [
        {
          title: 'Technical Q&A Expert',
          prompt: `You are a [domain] expert. Answer the following question with:
1. Direct, accurate answer first
2. Step-by-step explanation if applicable
3. Relevant code examples or formulas
4. Best practices and common pitfalls
5. Additional resources for learning
Format: Use markdown with code blocks when needed
Question: [user question]`,
          strategy: 'Role specification with structured response format',
          result: 'Comprehensive, actionable technical answers'
        },
        {
          title: 'Context-Aware Assistant',
          prompt: `Based on this context: "[provided context]"
Answer the question: "[user question]"
Requirements:
1. Only use information from the provided context
2. If answer isn't in context, state: "Based on the provided information, I cannot answer this question."
3. Cite specific parts of context when possible
4. Maintain neutral, helpful tone`,
          strategy: 'Context boundaries with fallback mechanisms',
          result: 'Accurate, source-grounded responses'
        }
      ]
    },
    {
      id: 'summarization',
      title: 'Summarization',
      icon: <FileText size={20} />,
      description: 'Creating concise overviews from lengthy texts',
      prompts: [
        {
          title: 'Executive Summary Generator',
          prompt: `Summarize the following text into an executive summary:
Length: [1 paragraph / bullet points / 3 sentences]
Focus on:
1. Key objectives and outcomes
2. Major findings or results
3. Recommendations or next steps
4. Risks or limitations noted
Preserve: Technical accuracy and nuance
Exclude: Minor details, examples, repetitions
Text: [input text]`,
          strategy: 'Hierarchical focus with exclusion criteria',
          result: 'Concise, decision-focused summaries'
        },
        {
          title: 'Academic Paper Digest',
          prompt: `Create a structured digest of this academic paper:
Sections to include:
1. Research Question/Hypothesis
2. Methodology (brief)
3. Key Findings (with data points)
4. Implications/Contributions
5. Limitations
Format: Bullet points with emoji indicators
Tone: Academic but accessible
Length: Maximum 200 words per section`,
          strategy: 'Sectional decomposition with length constraints',
          result: 'Accessible academic insights'
        }
      ]
    },
    {
      id: 'sentiment',
      title: 'Sentiment Analysis',
      icon: <BarChart3 size={20} />,
      description: 'Extracting emotions and opinions from textual data',
      prompts: [
        {
          title: 'Customer Feedback Analyzer',
          prompt: `Analyze this customer feedback for sentiment:
Input: [customer review/feedback]
Analyze for:
1. Overall sentiment (Positive/Negative/Neutral) with confidence score
2. Key emotional tones (Frustration/Excitement/Confusion/etc.)
3. Specific aspects mentioned (Product/Service/Support/etc.)
4. Urgency level (High/Medium/Low)
5. Suggested action items
Format: JSON with scores 0-100 for each category`,
          strategy: 'Multi-dimensional analysis with scoring system',
          result: 'Actionable customer insights'
        },
        {
          title: 'Social Media Pulse Check',
          prompt: `Analyze these social media posts about [brand/topic]:
Posts: [collection of posts]
Provide:
1. Sentiment distribution (% positive/negative/neutral)
2. Top 3 positive themes
3. Top 3 negative themes
4. Influencer impact analysis
5. Trending keywords/hashtags
6. Recommendation for engagement
Timeframe: [specify if applicable]`,
          strategy: 'Aggregate analysis with trend identification',
          result: 'Comprehensive brand sentiment overview'
        }
      ]
    }
  ];

  // Projects showcasing prompt engineering
  const projects = [
    {
      title: 'AI Chatbot',
      description: 'Conversational AI chatbot with natural and user-centric interactions',
      features: [
        'Advanced prompt optimization techniques',
        'Enhanced dialogue coherence',
        'Context-aware responses',
        'Personalization capabilities'
      ],
      icon: <MessageSquare size={24} />
    },
    {
      title: 'Story Generator',
      description: 'Creative story generation tool based on user inputs',
      features: [
        'Dynamic and contextually appropriate storytelling',
        'Character development prompts',
        'Plot structure templates',
        'Genre-specific narrative patterns'
      ],
      icon: <BookOpen size={24} />
    },
    {
      title: 'Resume Analyzer',
      description: 'AI-driven tool to evaluate resumes and provide detailed feedback',
      features: [
        'Tailored prompts for accurate scoring',
        'ATS compatibility analysis',
        'Skills gap identification',
        'Industry-specific recommendations'
      ],
      icon: <FileText size={24} />
    },

  ];

  // Research topics
  const research = [
    {
      title: 'Enhancing AI Efficiency',
      description: 'Investigating the impact of optimized prompts on model performance',
      findings: [
        'Structured prompts improve accuracy by 40%',
        'Context priming reduces hallucination rates',
        'Few-shot examples enhance task understanding',
        'Prompt engineering reduces token consumption'
      ],
      icon: <Zap size={24} />
    },
    {
      title: 'Human-AI Collaboration',
      description: 'Exploring how prompt design bridges human creativity and AI capabilities',
      findings: [
        'Prompt templates democratize AI access',
        'Iterative refinement enhances output quality',
        'Domain-specific prompts improve relevance',
        'Feedback loops accelerate model alignment'
      ],
      icon: <Brain size={24} />
    }
  ];

  // Multi Mango Experience
  const multiMangoExperience = {
    role: 'AI Training Specialist',
    achievements: [
      'Developed and optimized training prompts for conversational AI models',
      'Curated diverse datasets to improve model robustness and reduce bias',
      'Implemented prompt engineering strategies that increased model accuracy by 35%',
      'Collaborated with cross-functional teams to align AI outputs with business objectives',
      'Created comprehensive prompt libraries for various use cases and industries',
      'Conducted A/B testing on prompt variations to identify optimal approaches'
    ],
    skills: [
      'Prompt Engineering & Optimization',
      'LLM Fine-tuning',
      'Data Curation & Annotation',
      'Model Evaluation & Testing',
      'AI Ethics & Bias Mitigation',
      'Cross-functional Collaboration'
    ]
  };

  return (
    <section 
      id="prompts" 
      className={`relative overflow-hidden py-20 transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-900 to-slate-800 border-t border-blue-400' 
          : 'bg-gradient-to-b from-blue-50 to-white border-t border-blue-400'
      }`}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            AI Trainer{' '}
            <span className="bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
              & Data Annotator
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Optimized prompts that transform AI interactions across creative writing, 
            Q&A systems, summarization, and sentiment analysis
          </p>
        </motion.div>

        {/* Multi Mango Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className={`mb-16 p-8 rounded-2xl border border-blue-400 ${
            darkMode 
              ? 'bg-gradient-to-br from-blue-900/20 to-blue-800/20' 
              : 'bg-gradient-to-br from-blue-50 to-blue-100'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-lg border border-blue-400 ${
              darkMode ? 'bg-blue-800/30' : 'bg-blue-200'
            }`}>
              <Brain size={24} className={darkMode ? 'text-blue-300' : 'text-blue-600'} />
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                AI Training at Multi Mango
              </h3>
              <p className={`${
                darkMode ? 'text-blue-200' : 'text-blue-700'
              }`}>
                {multiMangoExperience.role}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-blue-200' : 'text-blue-800'
              }`}>
                Key Achievements
              </h4>
              <ul className="space-y-3">
                {multiMangoExperience.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className={`mt-1 flex-shrink-0 ${
                      darkMode ? 'text-blue-400' : 'text-blue-500'
                    }`} size={16} />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-blue-200' : 'text-blue-800'
              }`}>
                Skills Developed
              </h4>
              <div className="flex flex-wrap gap-2">
                {multiMangoExperience.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border border-blue-400 ${
                      darkMode
                        ? 'bg-blue-800/30 text-blue-200'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prompt Library Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className={`text-3xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Prompt Library
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <Lightbulb size={16} className={darkMode ? 'text-yellow-400' : 'text-yellow-500'} />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Click prompts to view details
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {promptCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all border border-blue-400 ${
                  activeCategory === category.id
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : darkMode
                      ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.icon}
                <span className="font-medium">{category.title}</span>
              </button>
            ))}
          </div>

          {/* Active Category Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {promptCategories
              .find(cat => cat.id === activeCategory)
              ?.prompts.map((prompt, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedPrompt(prompt)}
                  className={`p-6 rounded-xl cursor-pointer transition-all hover:scale-[1.02] border border-blue-400 ${
                    darkMode
                      ? 'bg-slate-800/60 hover:border-blue-500/50'
                      : 'bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className={`text-xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {prompt.title}
                    </h4>
                    <ExternalLink size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                  <div className={`mb-4 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-blue-400 ${
                    darkMode ? 'bg-slate-900 text-gray-300' : 'bg-gray-50 text-gray-800'
                  }`}>
                    {prompt.prompt.substring(0, 150)}...
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className={`text-sm font-medium ${
                        darkMode ? 'text-blue-300' : 'text-blue-600'
                      }`}>
                        Strategy:
                      </span>
                      <p className={`text-sm mt-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {prompt.strategy}
                      </p>
                    </div>
                    <div>
                      <span className={`text-sm font-medium ${
                        darkMode ? 'text-green-300' : 'text-green-600'
                      }`}>
                        Result:
                      </span>
                      <p className={`text-sm mt-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {prompt.result}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className={`text-3xl font-bold mb-8 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Practical Applications
          </h3>
          <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl border border-blue-400 ${
                  darkMode
                    ? 'bg-gradient-to-br from-slate-800/60 to-slate-900/60'
                    : 'bg-white'
                }`}
              >
                <div className={`inline-flex p-3 rounded-lg mb-4 border border-blue-400 ${
                  darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                }`}>
                  <div className={darkMode ? 'text-blue-300' : 'text-blue-600'}>
                    {project.icon}
                  </div>
                </div>
                <h4 className={`text-xl font-bold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h4>
                <p className={`text-sm mb-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>
                <ul className="space-y-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <ChevronRight size={14} className={darkMode ? 'text-blue-400' : 'text-blue-500'} />
                      <span className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className={`text-3xl font-bold mb-8 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Research & Insights
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {research.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl border border-blue-400 ${
                  darkMode
                    ? 'bg-gradient-to-br from-blue-900/20 to-blue-800/20'
                    : 'bg-gradient-to-br from-blue-50 to-blue-100'
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-full border border-blue-400 ${
                    darkMode ? 'bg-blue-800/30' : 'bg-blue-100'
                  }`}>
                    {topic.icon}
                  </div>
                  <div>
                    <h4 className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {topic.title}
                    </h4>
                    <p className={darkMode ? 'text-blue-200' : 'text-blue-700'}>
                      {topic.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {topic.findings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`p-1 rounded mt-1 border border-blue-400 ${
                        darkMode ? 'bg-blue-800/30' : 'bg-blue-100'
                      }`}>
                        <Zap size={12} className={darkMode ? 'text-blue-300' : 'text-blue-500'} />
                      </div>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {finding}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Prompt Modal */}
        {selectedPrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`max-w-4xl w-full max-h-[90vh] overflow-auto rounded-2xl border border-blue-400 ${
                darkMode ? 'bg-slate-900' : 'bg-white'
              }`}
            >
              <div className="p-6 border-b border-blue-400 flex justify-between items-center">
                <h3 className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedPrompt.title}
                </h3>
                <button
                  onClick={() => setSelectedPrompt(null)}
                  className={`p-2 rounded-lg border border-blue-400 ${
                    darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className={`text-lg font-semibold mb-3 ${
                    darkMode ? 'text-blue-300' : 'text-blue-600'
                  }`}>
                    Full Prompt
                  </h4>
                  <pre className={`p-4 rounded-lg font-mono text-sm overflow-x-auto border border-blue-400 ${
                    darkMode ? 'bg-slate-800 text-gray-300' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedPrompt.prompt}
                  </pre>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className={`text-lg font-semibold mb-3 ${
                      darkMode ? 'text-blue-300' : 'text-blue-600'
                    }`}>
                      Design Strategy
                    </h4>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {selectedPrompt.strategy}
                    </p>
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold mb-3 ${
                      darkMode ? 'text-green-300' : 'text-green-600'
                    }`}>
                      Expected Results
                    </h4>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {selectedPrompt.result}
                    </p>
                  </div>
                </div>
                <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-400">
                  <h4 className={`text-lg font-semibold mb-2 ${
                    darkMode ? 'text-blue-300' : 'text-blue-700'
                  }`}>
                    Pro Tip
                  </h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    For best results, replace bracketed parameters like [topic], [tone], and [audience] 
                    with specific values relevant to your use case. Consider A/B testing different 
                    variations to optimize performance.
                  </p>
                </div>
              </div>
              <div className="p-6 border-t border-blue-400 flex justify-end">
                <button
                  onClick={() => setSelectedPrompt(null)}
                  className={`px-6 py-2 rounded-lg font-medium border border-blue-400 ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}