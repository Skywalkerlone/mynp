// Component/chatcon.js
// Pretrained USE embeddings + cosine similarity for intent matching
// + multi-turn flow state machine (lead capture → email handoff)
// NO prices are ever given. All pricing leads to "contact via email".

import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

// ============================================================
// Constants
// ============================================================
const CONTACT_EMAIL = 'idaeworsamuelprovidence@gmail.com';
const SIMILARITY_THRESHOLD = 0.62;   // below this → fallback
const CONFIDENT_THRESHOLD = 0.75;    // above this → confident match

class ChatCon {
  constructor() {
    this.encoder = null;
    this.intentEmbeddings = null;      // tf.Tensor2D  [numPatterns, 512]
    this.intentMap = [];               // [{ tag, pattern, responsePool }] aligned with rows
    this.intents = [];
    this.responseCache = new Map();

    this.isLoaded = false;
    this.isLoading = false;

    // Session / conversation state
    this.session = {
      lastIntent: null,
      lastBotMessage: null,
      pendingFlow: null,       // name of active flow, e.g. 'lead_capture'
      flowStep: 0,
      flowData: {},            // { name, email, projectType, budgetRange }
      greeted: false
    };

    // Flow definitions
    this.flows = this.buildFlows();
  }

  // ============================================================
  // 1. INTENTS — patterns + response pools (NO prices ever!)
  // ============================================================
  getIntents() {
    return [
      {
        tag: 'greeting',
        patterns: [
          'hello', 'hi', 'hey', 'good morning', 'good afternoon',
          'good evening', 'greetings', 'sup', 'howdy', 'yo',
          'what is up', 'hi there', 'hey there'
        ],
        responses: [
          'Hey there! Welcome to my creative space. How can I assist you today?',
          'Hello! Great to see you here. What would you like to explore?',
          'Hi! I am Sam, here to help you learn about my work and services.'
        ]
      },
      {
        tag: 'about',
        patterns: [
          'who are you', 'tell me about yourself', 'introduce yourself',
          'about you', 'your background', 'your story', 'who is samuel',
          'who is idaewor', 'what do you do', 'what is your name'
        ],
        responses: [
          'I am Idaewor S.E Providence — a creative technologist, digital artist, and educator with over 10 years of experience across web development, AI, 3D design, and education.',
          'I am a multidisciplinary creator passionate about using technology and art to transform ideas into reality. My work spans digital art, web development, AI education, and creative design.'
        ]
      },
      {
        tag: 'art_services',
        patterns: [
          'art', 'illustration', 'drawing', 'artist', 'commission',
          'artwork', 'concept art', 'book cover', 'comics',
          'character design', 'digital art', 'can you draw',
          'do you illustrate', 'make me a logo', 'design a logo'
        ],
        responses: [
          'I offer comprehensive artistic services including custom illustrations, logo design, and visual branding using Clip Studio and Adobe Creative Suite.',
          'As a digital artist, I work with Clip Studio Paint and Adobe Creative Suite to create custom illustrations, logos, branding, and commissioned artwork.'
        ]
      },
      {
        tag: '3d_services',
        patterns: [
          '3d', 'blender', '3d modeling', '3d animation', 'sculpting',
          '3d render', 'product design', '3d visualization',
          'animation', '3d artist', 'rendering'
        ],
        responses: [
          'I specialize in 3D modeling and animation using Blender — sculpting, modeling, and animating 3D visuals for product design, visualization, and creative projects.',
          'With Blender expertise, I offer 3D modeling, sculpting, and animation. I create product visualizations, 3D renders, and animated content.'
        ]
      },
      {
        tag: 'web_development',
        patterns: [
          'web development', 'frontend', 'backend', 'full stack',
          'website', 'web app', 'react', 'nextjs', 'nodejs',
          'javascript', 'tailwind', 'html', 'css', 'developer',
          'app development', 'build me a website', 'do you code'
        ],
        responses: [
          'I am a full-stack developer with expertise in React, Next.js, Node.js, Python, Django, Laravel, MySQL, and MongoDB. I build responsive, scalable web applications.',
          'I create professional websites and web apps using React, Next.js, and modern frameworks. My work is responsive, optimized, and user-friendly.'
        ]
      },
      {
        tag: 'ai_services',
        patterns: [
          'ai', 'artificial intelligence', 'machine learning',
          'prompt engineering', 'llm', 'data annotation',
          'ai trainer', 'chatbot', 'do you do ai'
        ],
        responses: [
          'I am an AI Training Specialist with expertise in prompt engineering and data annotation. I develop and optimize training prompts for conversational AI models.',
          'My AI services include prompt engineering, LLM fine-tuning, data curation and annotation, model evaluation, and AI ethics & bias mitigation.'
        ]
      },
      {
        tag: 'social_media',
        patterns: [
          'social media', 'social media management', 'content creation',
          'video editing', 'post creation', 'paid ads',
          'marketing', 'campaign', 'instagram', 'tiktok'
        ],
        responses: [
          'I offer comprehensive social media management: content strategy, post creation, paid advertising, and community building across all major platforms.',
          'My social media expertise includes content strategy, scheduling, paid ads management, video editing, and campaign optimization.'
        ]
      },
      {
        tag: 'education',
        patterns: [
          'education', 'teaching', 'tutor', 'mentorship', 'workshop',
          'learn', 'training', 'curriculum', 'teach me', 'lessons',
          'can you teach', 'i want to learn'
        ],
        responses: [
          'I offer educational services with over 10 years of experience. I provide 1-on-1 tutoring for all ages in Mathematics, Physics, Chemistry, Computer Science, Frontend Development, and 2D Drawing.',
          'I am an experienced teacher with 10+ years across multiple subjects. I tutor, mentor, and facilitate workshops in technology, art, and computer science.'
        ]
      },
      {
        tag: 'portfolio',
        patterns: [
          'portfolio', 'projects', 'country finder', 'game hub',
          'upperclass ai', 'gvany', 'afriak', 'show me your work',
          'examples', 'what have you built', 'case studies'
        ],
        responses: [
          'My portfolio includes Country Finder (country data app), Game Hub (mobile games), Upperclass AI (AI-driven LMS), Gvany (project delivery in Africa), Afriak (indigenous fashion marketplace), and JCINUNIBEN (EBL Masterclass website).',
          'I have built diverse projects: interactive web apps, e-commerce platforms, learning management systems, and business websites. Check the portfolio section for details.'
        ]
      },
      {
        tag: 'skills',
        patterns: [
          'skills', 'expertise', 'technologies', 'what can you do',
          'what are you good at', 'your skills', 'specialties'
        ],
        responses: [
          'Technical: React, Next.js, Node.js, Python, Figma, Adobe Suite, Blender, AI/ML, data annotation. Soft skills: creativity, collaboration, critical thinking, teaching, problem solving.',
          'I combine full-stack web development, digital art, 3D modeling, AI training, curriculum design, and workshop facilitation.'
        ]
      },
      {
        // PRICING: NEVER give numbers. Always defer to email.
        tag: 'pricing',
        patterns: [
          'budget', 'price', 'cost', 'pricing', 'rates', 'how much',
          'hourly', 'quote', 'expensive', 'cheap', 'what do you charge',
          'what is your rate', 'how much do you charge',
          'how much does it cost', 'can you give me a price',
          'what is your pricing', 'give me a quote'
        ],
        responses: [
          `For pricing, I keep things personal — please reach out to me directly at ${CONTACT_EMAIL} and we'll discuss your specific project.`,
          `I'd love to talk through your project and give you a proper quote. Drop me a line at ${CONTACT_EMAIL} and I'll respond within 24 hours.`,
          `Pricing depends on your project scope. Contact me at ${CONTACT_EMAIL} and we can chat about your needs in detail.`
        ]
      },
      {
        tag: 'certifications',
        patterns: [
          'certification', 'bsc', 'niit', 'comptia', 'edo innovate',
          'qualifications', 'credentials', 'degree',
          'what are your qualifications', 'where did you study'
        ],
        responses: [
          'I hold a BSc in Computer Science, a CompTIA A+ certification from NIIT, and graduated from the Edo Innovate Software Development program.',
          'My credentials: BSc in Computer Science, CompTIA A+ (NIIT), Edo Innovate Software Development graduate, and 10+ years in creative technology.'
        ]
      },
      {
        tag: 'hire',
        patterns: [
          'hire', 'client', 'work together', 'contract', 'freelance',
          'availability', 'available', 'when can you start',
          'can i hire you', 'work with you', 'do you have time',
          'i want to work with you', 'are you taking clients'
        ],
        responses: [
          `I am available for freelance work and collaborations! Contact me at ${CONTACT_EMAIL} or call +234 811 782 0918.`,
          `I am currently accepting new clients! Whether you need creative services, development, AI training, or education — let's talk via ${CONTACT_EMAIL}.`
        ]
      },
      {
        tag: 'shop',
        patterns: [
          'shop', 'store', 'merch', 'redbubble', 'buy your art',
          'purchase', 'products', 'merchandise'
        ],
        responses: [
          'I have an art merch shop where you can find my designs on apparel, accessories, and more! Check out the collection on Redbubble.',
          'My art merch is available on Redbubble — t-shirts, hoodies, stickers, phone cases, and more.'
        ]
      },
      {
        tag: 'services_overview',
        patterns: [
          'services', 'what do you offer', 'what services',
          'help with', 'how can you help', 'what can you help with'
        ],
        responses: [
          'I offer creative and technical services: digital art, book covers, 3D modeling, video editing, web development, mobile apps, AI solutions, data annotation, and tech education.',
          'My services span creative design, web and app development, AI training, and education — from concept to deployment.'
        ]
      },
      {
        tag: 'philosophy',
        patterns: [
          'philosophy', 'belief', 'values', 'mission',
          'what do you believe', 'your approach', 'what drives you'
        ],
        responses: [
          'My philosophy: Curiosity is a superpower. I believe art and technology are tools for transformation — they connect, inspire, and empower.',
          'I believe creativity and technology together can change the world. My mission is to create impactful work and help others do the same.'
        ]
      },
      {
        tag: 'contact',
        patterns: [
          'contact', 'email', 'phone', 'whatsapp', 'reach you',
          'get in touch', 'call you', 'how do i reach you',
          'can i email you', 'how can i contact'
        ],
        responses: [
          `Email: ${CONTACT_EMAIL} | Call: +234 811 782 0918 | WhatsApp: +234 810 866 6501 | Twitter/X: @E_sai_Art.`,
          `You can reach me at ${CONTACT_EMAIL} or on WhatsApp at +234 810 866 6501. I respond within 24 hours.`
        ]
      },
      {
        tag: 'e_sai_art',
        patterns: [
          'e_sai_art', 'skywalker', 'why e sai',
          'what does e sai mean', 'your alias',
          'what does your name mean'
        ],
        responses: [
          'E_sai_Art (The Skywalker) is my creative alias — it represents storytelling, personal growth, and creative reinvention. Art that reaches for the sky.',
          'E_sai_Art embodies artistic expression, limitless imagination, storytelling across mediums, and constant evolution.'
        ]
      },
      {
        tag: 'thanks',
        patterns: [
          'thank you', 'thanks', 'appreciate', 'grateful',
          'cheers', 'thanks a lot'
        ],
        responses: [
          'You are welcome! It is a pleasure to help. Anything else you would like to know?',
          'Thanks for your kind words! I am here whenever you need assistance.'
        ]
      },
      {
        tag: 'goodbye',
        patterns: [
          'bye', 'goodbye', 'see you', 'farewell',
          'talk later', 'i have to go', 'catch you later'
        ],
        responses: [
          'Goodbye! It was great chatting with you. Come back anytime! Remember: Curiosity is your superpower.',
          'Take care! Feel free to reach out whenever you have questions or ideas to explore.'
        ]
      },
      {
        tag: 'bot_identity',
        patterns: [
          'are you ai', 'are you a robot', 'who made you',
          'who created you', 'can you think', 'can you feel',
          'do you have emotions', 'are you sentient',
          'am i talking to a human', 'turing test', 'are you real'
        ],
        responses: [
          'I am an AI-powered chatbot named Sam, created by Idaewor S.E Providence to help you learn about his work and services.',
          `I am an AI chatbot, not a human. For direct contact, use ${CONTACT_EMAIL} or +234 811 782 0918.`
        ]
      },
      {
        tag: 'collaboration',
        patterns: [
          'collaborate', 'partner', 'collaboration',
          'work together on', 'team up', 'partnership',
          'lets work together'
        ],
        responses: [
          'I am always open to collaborations — creative partners for art, developers for web/app ideas, educators for tech training, or consultants for AI initiatives.',
          'Collaboration is at the heart of what I do. Reach out if you have a project in mind!'
        ]
      },
      {
        tag: 'start_project',
        // Trigger the multi-turn flow
        patterns: [
          'i have a project', 'i want to start a project',
          'lets start a project', 'i need help with a project',
          'can we discuss a project', 'i want to work with you on something',
          'i need a website built', 'i need an app built',
          'i want to hire you', 'i have an idea',
          'help me build', 'i need design work'
        ],
        responses: [
          "That's exciting! Let's get a few quick details so I can pass them on. What's your name?"
        ]
      },
      {
        tag: 'yes',
        patterns: ['yes', 'yeah', 'sure', 'yep', 'ok', 'okay', 'alright', 'sounds good'],
        responses: ['Great!']
      },
      {
        tag: 'no',
        patterns: ['no', 'nope', 'not now', 'later', 'not yet'],
        responses: ['No problem at all — feel free to reach out whenever!']
      },
      {
        tag: 'fallback',
        patterns: [
          'i do not know', 'not sure', 'asdf', 'blah', 'random'
        ],
        responses: [
          `I'd love to help! Could you tell me more specifically what you're looking for? I can discuss art, web development, AI training, education, pricing, or my portfolio.`,
          `I am here to help with services, portfolio, pricing, or contact info. What would you like to know?`
        ]
      }
    ];
  }

  // ============================================================
  // 2. FLOWS — multi-turn scripts
  //    Flow: lead_capture → name → email → project type → handoff
  // ============================================================
  buildFlows() {
    return {
      lead_capture: {
        start: 'ask_name',
        steps: {
          ask_name: {
            prompt: "That's exciting! Let's get a few quick details so I can pass them on. What's your name?",
            validate: (input, data) => {
              const name = input.trim();
              if (name.length < 2 || name.length > 60) return { ok: false };
              data.name = name;
              return { ok: true, next: 'ask_email' };
            }
          },
          ask_email: {
            prompt: (data) => `Nice to meet you, ${data.name}! What's the best email to reach you at?`,
            validate: (input, data) => {
              const email = input.trim();
              const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!re.test(email)) {
                return {
                  ok: false,
                  retry: `Hmm, that doesn't look like a valid email. Could you double-check it for me?`
                };
              }
              data.email = email;
              return { ok: true, next: 'ask_project' };
            }
          },
          ask_project: {
            prompt: "Great! In a few words, what kind of project is it? (e.g. website, logo, app, 3D, AI, tutoring…)",
            validate: (input, data) => {
              const project = input.trim();
              if (project.length < 2) return { ok: false };
              data.projectType = project;
              return { ok: true, next: 'ask_scope' };
            }
          },
          ask_scope: {
            prompt: "Got it. Do you have a rough timeline or scope in mind — or is it still early days?",
            validate: (input, data) => {
              data.scope = input.trim();
              return { ok: true, next: 'confirm' };
            }
          },
          confirm: {
            prompt: (data) =>
              `Thanks, ${data.name}! Here's what I've got:\n\n` +
              `• Project: ${data.projectType}\n` +
              `• Scope / timeline: ${data.scope}\n` +
              `• Email: ${data.email}\n\n` +
              `I'll pass this on to Idaewor. For pricing and next steps, please reach out to him directly at ${CONTACT_EMAIL} — he responds within 24 hours. Anything else I can help with?`,
            isTerminal: true
          }
        }
      }
    };
  }

  // ============================================================
  // 3. LOAD — encode all intents once, cache the matrix
  // ============================================================
  async load() {
    if (this.isLoaded || this.isLoading) return this.isLoaded;
    this.isLoading = true;

    try {
      console.log('🧠 chatcon: loading Universal Sentence Encoder…');
      this.encoder = await use.load();
      console.log('✅ chatcon: encoder ready');

      // Build flat list of (tag, pattern) rows
      this.intents = this.getIntents();
      const flatPatterns = [];
      this.intentMap = [];

      this.intents.forEach(intent => {
        intent.patterns.forEach(pattern => {
          flatPatterns.push(pattern);
          this.intentMap.push({
            tag: intent.tag,
            pattern,
            responsePool: intent.responses
          });
        });
      });

      console.log(`📚 chatcon: encoding ${flatPatterns.length} patterns…`);
      this.intentEmbeddings = await this.encoder.embed(flatPatterns);
      console.log(`✅ chatcon: embedded ${flatPatterns.length} patterns (dim ${this.intentEmbeddings.shape[1]})`);

      this.isLoaded = true;
      this.isLoading = false;
      return true;
    } catch (err) {
      console.error('❌ chatcon: load failed', err);
      this.isLoading = false;
      return false;
    }
  }

  // ============================================================
  // 4. SIMILARITY — cosine sim between query & all patterns
  // ============================================================
  async bestIntentMatch(input) {
    const queryEmb = await this.encoder.embed([input]);     // [1, 512]

    // Normalize both
    const a = tf.linalg.normalize(queryEmb, 2, 1).slice([0, 0], [1, queryEmb.shape[1]]); // [1,512]
    const b = tf.linalg.normalize(this.intentEmbeddings, 2, 1);                          // [N,512]

    // cos_sim = a · bᵀ → shape [1, N]
    const sims = tf.matMul(a, b, false, true);
    const simsData = await sims.data();

    // Clean up
    queryEmb.dispose();
    a.dispose();
    b.dispose();
    sims.dispose();

    // Find top-2
    const ranked = Array.from(simsData)
      .map((score, i) => ({ score, i }))
      .sort((x, y) => y.score - x.score);

    const top = ranked[0];
    const second = ranked[1];
    const topMatch = this.intentMap[top.i];

    return {
      score: top.score,
      tag: topMatch.tag,
      responsePool: topMatch.responsePool,
      pattern: topMatch.pattern,
      runnerUp: second ? { tag: this.intentMap[second.i].tag, score: second.score } : null,
      ranked
    };
  }

  // ============================================================
  // 5. PREDICT — main entry point
  // ============================================================
  async predict(input) {
    const text = String(input || '').trim();
    if (!text) return "Say something and I'll do my best to help!";

    if (!this.isLoaded) {
      const ok = await this.load();
      if (!ok) {
        return "Sorry, my brain is still loading. Try again in a moment.";
      }
    }

    // ---- FLOW SHORTCUT: if we're inside a flow, handle it first ----
    if (this.session.pendingFlow) {
      return this.handleFlowInput(text);
    }

    // ---- Track history ----
    this.session.lastUserMessage = text;

    // ---- Global quick-reply to a yes/no after a question ----
    if (this.session.lastBotMessage && this.isShortAffirmative(text)) {
      // If bot's last message asked something flow-related, but we're not in a flow,
      // treat as continuation of that intent if possible.
      if (this.session.lastIntent === 'hire' || this.session.lastIntent === 'start_project') {
        // Auto-start lead flow
        return this.startFlow('lead_capture');
      }
    }

    // ---- Cosine similarity against all patterns ----
    let match;
    try {
      match = await this.bestIntentMatch(text);
    } catch (err) {
      console.error('chatcon: similarity error', err);
      return this.keywordRescue(text) ||
        `I ran into a small hiccup. Could you rephrase that? I can talk about services, portfolio, pricing, or contact info.`;
    }

    console.log(
      `🎯 chatcon: "${text}" → ${match.tag} (${match.score.toFixed(3)}), ` +
      `runner-up: ${match.runnerUp?.tag} (${match.runnerUp?.score.toFixed(3)})`
    );

    // ---- Confidence gating ----
    if (match.score < SIMILARITY_THRESHOLD) {
      const rescue = this.keywordRescue(text);
      if (rescue) {
        this.remember('fallback', rescue);
        return rescue;
      }
      const fb = this.pickRandom(
        this.intents.find(i => i.tag === 'fallback').responses
      );
      this.remember(null, fb);
      return fb;
    }

    // ---- Flow trigger: if top intent is start_project (or hire with hi confidence) ----
    if (match.tag === 'start_project') {
      return this.startFlow('lead_capture');
    }

    // ---- Special-case: pricing ALWAYS defers to email (safety net) ----
    if (match.tag === 'pricing') {
      const response = this.pickRandom(match.responsePool);
      this.remember('pricing', response);
      return response;
    }

    // ---- Normal reply ----
    const response = this.pickRandom(match.responsePool);
    this.remember(match.tag, response);
    return response;
  }

  // ============================================================
  // 6. FLOW ENGINE
  // ============================================================
  startFlow(flowName) {
    const flow = this.flows[flowName];
    if (!flow) return "Something went wrong starting that flow.";

    this.session.pendingFlow = flowName;
    this.session.flowStep = flow.start;
    this.session.flowData = {};

    const step = flow.steps[flow.start];
    const prompt = typeof step.prompt === 'function'
      ? step.prompt(this.session.flowData)
      : step.prompt;

    this.session.lastBotMessage = prompt;
    this.session.lastIntent = flowName;
    return prompt;
  }

  handleFlowInput(text) {
    const flowName = this.session.pendingFlow;
    const flow = this.flows[flowName];
    if (!flow) {
      this.session.pendingFlow = null;
      return "Let's try that again. What can I help you with?";
    }

    const stepName = this.session.flowStep;
    const step = flow.steps[stepName];
    if (!step) {
      this.session.pendingFlow = null;
      return "I got a bit lost — can you start over?";
    }

    // Allow user to bail out
    if (this.userWantsToExit(text)) {
      this.session.pendingFlow = null;
      this.session.flowStep = 0;
      const bail = "No problem, we can pick this up anytime. Anything else I can help with?";
      this.session.lastBotMessage = bail;
      this.session.lastIntent = null;
      return bail;
    }

    const result = step.validate(text, this.session.flowData);

    // Validation failed → retry
    if (!result.ok) {
      const retry = result.retry
        ? result.retry
        : `Hmm, I didn't quite catch that. ${typeof step.prompt === 'function' ? step.prompt(this.session.flowData) : step.prompt}`;
      this.session.lastBotMessage = retry;
      return retry;
    }

    // Move to next step
    if (step.isTerminal) {
      this.session.pendingFlow = null;
      this.session.flowStep = 0;
      this.session.lastIntent = null;
    } else if (result.next) {
      this.session.flowStep = result.next;
    }

    const nextStep = flow.steps[this.session.flowStep];
    const prompt = typeof nextStep.prompt === 'function'
      ? nextStep.prompt(this.session.flowData)
      : nextStep.prompt;

    this.session.lastBotMessage = prompt;
    return prompt;
  }

  userWantsToExit(text) {
    const t = text.toLowerCase().trim();
    return ['cancel', 'stop', 'never mind', 'nevermind', 'forget it', 'skip']
      .some(k => t.includes(k));
  }

  isShortAffirmative(text) {
    const t = text.toLowerCase().trim();
    return ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'please', 'go ahead', 'yes please']
      .includes(t);
  }

  // ============================================================
  // 7. KEYWORD RESCUE — when cosine sim is weak
  // ============================================================
  keywordRescue(input) {
    const t = String(input).toLowerCase();
    const map = [
      { keys: ['art', 'draw', 'illustrat', 'logo'], tag: 'art_services' },
      { keys: ['3d', 'blender', 'render', 'sculpt'], tag: '3d_services' },
      { keys: ['web', 'code', 'react', 'develop', 'website', 'app'], tag: 'web_development' },
      { keys: ['ai', 'machine', 'prompt', 'llm', 'annotat'], tag: 'ai_services' },
      { keys: ['teach', 'tutor', 'learn', 'lesson'], tag: 'education' },
      { keys: ['price', 'cost', 'budget', 'rate', 'charge', 'quote'], tag: 'pricing' },
      { keys: ['contact', 'email', 'phone', 'whatsapp', 'reach'], tag: 'contact' },
      { keys: ['hire', 'available', 'freelance', 'client'], tag: 'hire' },
      { keys: ['portfolio', 'project'], tag: 'portfolio' }
    ];
    for (const { keys, tag } of map) {
      if (keys.some(k => t.includes(k))) {
        const intent = this.intents.find(i => i.tag === tag);
        if (intent) return this.pickRandom(intent.responses);
      }
    }
    return null;
  }

  // ============================================================
  // 8. HELPERS
  // ============================================================
  pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  remember(intentTag, botMessage) {
    this.session.lastIntent = intentTag;
    this.session.lastBotMessage = botMessage;
    this.session.greeted = this.session.greeted || intentTag === 'greeting';
  }

  reset() {
    this.session = {
      lastIntent: null,
      lastBotMessage: null,
      pendingFlow: null,
      flowStep: 0,
      flowData: {},
      greeted: false
    };
    this.responseCache.clear();
    console.log('🔄 chatcon session reset');
  }

  getInfo() {
    return {
      isLoaded: this.isLoaded,
      numIntents: this.intents.length,
      numPatterns: this.intentMap.length,
      session: { ...this.session }
    };
  }
}

// ============================================================
// SINGLETON + AUTO-LOAD
// ============================================================
const chatcon = new ChatCon();

(async () => {
  try {
    await chatcon.load();
    console.log('✅ chatcon ready. No training required — using pretrained embeddings.');
  } catch (err) {
    console.error('❌ chatcon: auto-init failed', err);
  }
})();

export default chatcon;