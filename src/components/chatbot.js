// Component/Chatbot.js

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiMessageCircle, FiX, FiMinimize2, FiMaximize2 } from 'react-icons/fi'
import { BsRobot, BsPerson } from 'react-icons/bs'
import { useTheme } from '../context/ThemeContext'
import chatbotModel from './chatbotModel'

// Mock Gemini AI response data - 5 responses each, no emojis
const geminiMockData = {
  greetings: {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'sup', 'howdy'],
    responses: [
      'Hey there! Welcome to my creative space. How can I assist you today?',
      'Hello! Great to see you here. What would you like to explore?',
      'Hi! I am here to help you learn more about my work and services.',
      'Greetings! I am Sam, your virtual assistant. What brings you here today?',
      'Welcome! I am delighted to chat with you. How can I help?'
    ]
  },
  about: {
    patterns: ['who are you', 'tell me about yourself', 'introduce yourself', 'about you', 'your background', 'your story', 'who is samuel', 'who is idaewor', 'about samuel'],
    responses: [
      "I am Idaewor S.E Providence — a creative technologist, digital artist, and educator. I blend code, creativity, and teaching to build meaningful solutions. With over 10 years of experience, I have worked across web development, AI, 3D design, and education.",
      "I am a multidisciplinary creator passionate about using technology and art to transform ideas into reality. My work spans digital art, web development, AI education, and creative design.",
      "I am Samuel, a creative technologist who believes in the power of art and code. I have been building digital experiences and teaching technology for over a decade.",
      "I am Idaewor S.E Providence, also known as E_sai_Art. I combine my skills in design, development, and education to create meaningful work and empower others.",
      "I am a creative problem solver who works at the intersection of art, technology, and education. I help people and organizations bring their digital visions to life."
    ]
  },
  artServices: {
    patterns: ['art', 'illustration', 'drawing', 'artist', 'artistic', '2d art', 'illustrator', 'commission', 'artwork', 'concept art', 'visual storytelling', 'book cover', 'comics', 'character design', 'digital art', 'paint', 'sketch', 'art tools', 'clip studio', 'adobe creative', 'creative suite', 'photoshop', 'illustrator'],
    responses: [
      "I offer comprehensive artistic services including custom illustrations, logo design, and visual branding solutions using Clip Studio and Adobe Creative Suite. I specialize in digital art, concept art, book covers, comics, and character design. My work brings characters and stories to life through visual storytelling.",
      "As a digital artist, I work with professional tools like Clip Studio Paint and Adobe Creative Suite. I create custom illustrations, design logos, develop visual branding, and produce commissioned artwork. I also specialize in concept art and visual storytelling for various projects.",
      "My artistic expertise includes 2D art and illustrations, graphic design, and logo creation. I use industry-standard tools including Photoshop, Illustrator, and Clip Studio. Whether you need a book cover, comic art, or character designs, I can bring your vision to life.",
      "I offer a wide range of artistic services: digital illustrations, book covers, comic art, graphic design, and visual branding. I work with Clip Studio, Adobe Creative Suite, and other professional tools to deliver high-quality artwork for clients.",
      "My artistic portfolio includes custom illustrations, branding solutions, concept art, and visual storytelling. I'm proficient in Clip Studio, Photoshop, Illustrator, and other creative tools. I can help you with anything from character design to full visual campaigns."
    ]
  },
  threeDServices: {
    patterns: ['3d', 'blender', '3d modeling', '3d animation', 'sculpting', '3d render', 'product design', '3d visualization', 'animation', '3d artist', 'modeling', 'rendering'],
    responses: [
      "I specialize in 3D modeling and animation using Blender. My services include sculpting, modeling, and animating captivating 3D visuals for product design, visualization, and creative projects. I can create 3D renders, animations, and product visualizations for various industries.",
      "With Blender expertise, I offer 3D modeling, sculpting, and animation services. I create product visualizations, 3D renders, and animated content for presentations, marketing, and creative projects. My work includes both organic and hard-surface modeling.",
      "I provide professional 3D services including modeling, texturing, lighting, and animation. Using Blender, I create high-quality 3D renders and visualizations for products, characters, and environments. Whether you need product designs or animated content, I can help.",
      "My 3D capabilities include Blender-based modeling, sculpting, and animation. I create product visualizations, 3D assets, and animated sequences for various applications including marketing, presentations, and creative projects.",
      "I offer comprehensive 3D services from concept to final render. Using Blender, I create 3D models, animations, and visualizations for product design, advertising, and creative projects. I also provide 3D product design and visualization services."
    ]
  },
  budgetPricing: {
    patterns: ['budget', 'price', 'cost', 'rates', 'pricing', 'how much', 'fee', 'charges', 'project cost', 'hourly rate'],
    responses: [
      "For pricing inquiries, I recommend we discuss your specific project requirements directly. My rates are flexible and depend on the scope of work, whether it's a one-time project or ongoing engagement. I offer competitive rates for both project-based and hourly work. Contact me at idaeworsamuelprovidence@gmail.com or call +234 811 782 0918 to discuss your budget.",
      "My pricing is project-dependent and varies based on complexity, timeline, and deliverables. I offer flexible arrangements including fixed project rates and hourly consultations. For an accurate quote, please reach out to discuss your specific requirements. Email: idaeworsamuelprovidence@gmail.com",
      "Costs vary depending on the scope and nature of your project. I provide transparent, competitive pricing for all my services. Whether you need creative work, technical development, or educational services, I'll work within your budget. Contact me for a free consultation and custom quote.",
      "I offer flexible pricing structures including project-based fixed rates, hourly rates for consultations, and retainer arrangements for long-term collaborations. Let's discuss your specific needs and I'll provide a competitive quote that fits your budget.",
      "My pricing is customized to each project's unique requirements. I believe in transparent, fair pricing that delivers value. Contact me for a detailed quote tailored to your specific needs."
    ]
  },
  certifications: {
    patterns: ['certification', 'certificate', 'qualified', 'credentials', 'bsc', 'computer science', 'niit', 'comptia', 'comptia a+', 'edo innovate', 'degree', 'education', 'qualifications'],
    responses: [
      "I hold a BSc in Computer Science, providing me with a strong foundation in software development, algorithms, data structures, and computational thinking. Additionally, I have a NIIT degree in CompTIA A+, certifying my expertise in hardware troubleshooting, system maintenance, and software installation and management. I also completed the Edo Innovate Software Development program.",
      "My qualifications include: BSc in Computer Science, CompTIA A+ Certification from NIIT, Edo Innovate Software Development Graduate, 10+ Years of Practical Experience, and over 500 students trained. I combine academic knowledge with industry certifications and extensive practical experience.",
      "I earned my Bachelor of Science (BSc) in Computer Science, where I gained comprehensive knowledge in programming, database management, software engineering, and computer systems. My CompTIA A+ certification from NIIT covers hardware configuration, system maintenance, and security best practices.",
      "I am a graduate of the Edo Innovate Software Development program, where I received advanced training in modern web development technologies including full-stack development and industry best practices. This complements my BSc in Computer Science and CompTIA A+ certification.",
      "My professional credentials include: Bachelor of Science in Computer Science, CompTIA A+ Certification (NIIT), Edo Innovate Software Development Graduate, 10+ Years in Creative Technology, and Proven Track Record in Teaching and Development."
    ]
  },
  pricingStructure: {
    patterns: ['project based', 'hourly', 'employment', 'contract', 'retainer', 'fixed price', 'per hour', 'salary', 'full time', 'part time'],
    responses: [
      "I offer both project-based and hourly pricing options. For well-defined projects with clear deliverables, I provide fixed-rate quotes. For ongoing work, consultations, or projects with evolving requirements, I offer competitive hourly rates. I'm also open to retainer arrangements and employment opportunities.",
      "I'm open to both freelance/contract work and employment opportunities. For contract work, I offer flexible arrangements including project-based, hourly, or retainer options. I'm also interested in full-time positions where I can contribute my skills in web development, AI training, digital art, or education.",
      "I offer flexible pricing structures including project-based fixed rates for defined scopes, hourly rates for consultations and ongoing work, and retainer arrangements for long-term collaborations. Let's discuss your specific needs and I'll provide a competitive quote that fits your budget.",
      "For specific projects, I often provide a fixed quote that can be more cost-effective than hourly billing. For ongoing work, consultations, or projects with flexible scopes, I offer competitive hourly rates. Contact me to discuss your project and get a custom quote.",
      "I charge competitive hourly rates for consultations, mentoring, and projects with flexible scopes. For well-defined projects, I provide fixed-rate quotes. My rates reflect my 10+ years of experience and diverse skill set across creative, technical, and educational fields."
    ]
  },
  technicalServices: {
    patterns: ['web development', 'frontend', 'backend', 'full-stack', 'app development', 'website', 'web app', 'react', 'nextjs', 'nodejs', 'javascript', 'tailwind', 'css', 'html', 'php', 'laravel', 'mysql', 'mongodb', 'python', 'java', 'reactnative', 'express', 'git', 'wordpress', 'ui/ux', 'prototyping', 'code', 'programming', 'developer', 'full stack', 'tech stack', 'digital solution', 'web design'],
    responses: [
      "I am a full-stack developer with expertise in modern web technologies. My technical skills include: Frontend (React, Next.js, HTML/CSS, Tailwind, JavaScript), Backend (Node.js, Laravel, Django, Express, Python), Databases (MySQL, MongoDB), and Mobile (React Native). I build responsive, optimized web applications and digital solutions.",
      "I offer full-stack development services including frontend and backend development, database design, SEO optimization, and end-to-end digital solutions. I work with React, Next.js, Node.js, Python, and various frameworks to create robust web applications and websites.",
      "As a developer, I specialize in React and Next.js with strong expertise in Tailwind CSS and Framer for frontend development. I also have growing backend expertise with Node.js, Express, Laravel, and Django. I build responsive, user-friendly web applications with modern tech stacks.",
      "My technical services include web development, app development, UI/UX prototyping, and code optimization. I work with technologies like React, Next.js, Node.js, Tailwind CSS, and various databases. I also provide WordPress development and custom web solutions.",
      "I offer comprehensive technical services including full-stack web development, mobile app development, database design, and system architecture. My tech stack includes React, Next.js, Node.js, Python, Laravel, Django, Express, and modern frontend frameworks. I build scalable, optimized digital solutions."
    ]
  },
  technologies: {
    patterns: ['react', 'nextjs', 'next.js', 'tailwind', 'tailwindcss', 'node', 'nodejs', 'node.js', 'python', 'django', 'laravel', 'express', 'mongodb', 'mysql', 'php', 'java', 'flutter', 'react native', 'wordpress', 'figma', 'framer', 'javascript', 'html', 'css', 'git', 'vite', 'typescript', 'firebase', 'api', 'websocket'],
    responses: [
      "My technical expertise includes: Frontend - React, Next.js, HTML5, CSS3, Tailwind, Framer, JavaScript; Backend - Node.js, Express, Django, Laravel, Python; Databases - MySQL, MongoDB; Mobile - React Native, Flutter; Tools - Git, Figma, Vite, Firebase, WordPress. I specialize in building full-stack web and mobile applications.",
      "I work with a modern tech stack including React, Next.js, Tailwind CSS, Node.js, Express, Django, Laravel, Python, MongoDB, MySQL, and React Native. I also use tools like Git, Figma, Framer, and Firebase for development and design.",
      "My primary technologies are React and Next.js for frontend development, with Node.js and Express for backend. I also use Python, Django, Laravel, and various databases. For design, I use Figma and Framer. I'm proficient in Git, Firebase, and WordPress.",
      "I'm skilled in multiple programming languages and frameworks: JavaScript, React, Next.js, Python, Django, PHP, Laravel, Java, and more. I use MySQL, MongoDB, and Firebase for databases. I also work with React Native and Flutter for mobile development.",
      "My tech stack includes modern JavaScript frameworks (React, Next.js, React Native), backend technologies (Node.js, Python, Django, Laravel), databases (MySQL, MongoDB), and design tools (Figma, Framer). I also have experience with WordPress, Git, and various APIs."
    ]
  },
  aiServices: {
    patterns: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'prompt engineering', 'llm', 'data annotation', 'data training', 'ai trainer', 'ai training', 'model training', 'prompt engineer', 'chatbot', 'llm specialist', 'ai ethics', 'data curation'],
    responses: [
      "I am an AI Training Specialist with expertise in prompt engineering and data annotation. I develop and optimize training prompts for conversational AI models, curate diverse datasets to improve model robustness and reduce bias, and implement prompt engineering strategies that increase model accuracy by up to 35%.",
      "As an AI Trainer & Data Annotator at Multi Mango, I specialize in optimizing prompts that transform AI interactions across creative writing, Q&A systems, summarization, and sentiment analysis. I have developed comprehensive prompt libraries for various use cases and industries.",
      "My AI services include prompt engineering, LLM fine-tuning, data curation and annotation, model evaluation and testing, and AI ethics & bias mitigation. I've collaborated with cross-functional teams to align AI outputs with business objectives.",
      "I specialize in AI prompt engineering and LLM optimization. I create structured prompts for various applications including creative text generation, Q&A systems, summarization, sentiment analysis, and chatbot development. My work has increased model accuracy by 35%.",
      "I offer AI training services including prompt optimization, data annotation, and model evaluation. I've worked on AI chatbots, story generators, resume analyzers, and various other AI applications. My expertise includes creating comprehensive prompt libraries and implementing A/B testing on prompt variations."
    ]
  },
  socialMediaServices: {
    patterns: ['social media', 'social media management', 'content creation', 'video editing', 'post creation', 'scheduling', 'paid ads', 'ads', 'advertising', 'marketing', 'campaign', 'social media strategy', 'brand growth', 'content strategy', 'instagram', 'tiktok', 'twitter', 'youtube', 'facebook', 'linkedin', 'reels', 'shorts', 'story'],
    responses: [
      "I offer comprehensive social media management services including platform optimization, content strategy, paid advertising, and community building. I design targeted content strategies that boost engagement, build brand identity, and increase reach across Instagram, TikTok, Twitter, YouTube, and Facebook.",
      "My social media expertise includes content strategy, post creation and scheduling, paid ads management, video editing, and campaign optimization. I create algorithm-friendly content tailored for each platform and provide 24/7 community support to help brands grow.",
      "I specialize in social media strategy and marketing campaigns that convert views into loyal followers and sales. From influencer outreach to paid ads, I create data-driven campaigns with performance tracking, conversion optimization, and ROI analysis.",
      "I offer professional social media services including platform optimization, audience engagement, viral content creation, community building, and analytics tracking. I help brands grow with targeted content strategies and paid advertising campaigns.",
      "My social media services include video editing for reels, stories, ads, and educational content. I create compelling short-form and long-form videos tailored for various platforms. I've helped clients achieve 100k+ reach with 85% engagement rates across campaigns."
    ]
  },
  educationalServices: {
    patterns: ['education', 'teaching', 'tutor', 'mentorship', 'workshop', 'tutorial', 'student', 'learn', 'training', 'curriculum', 'class', 'lesson', 'instructor', 'mentor', 'teach', 'educator', 'e-learning', 'online course', 'coach', 'bootcamp'],
    responses: [
      "I offer educational services with over 10 years of experience in teaching and mentorship. I provide 1-on-1 tutoring for all ages (3 to adult) in Mathematics, Physics, Chemistry, Sciences, Computer Science, Frontend Development, Video Editing, and 2D Drawing.",
      "My educational expertise includes curriculum creation, workshop facilitation, and e-learning development. I've facilitated programs at Edo State Innovation Center, Teklearn, GiveHerTech, and other institutions. I teach early learners, primary school, secondary school, university students, and adults.",
      "I offer comprehensive educational services including teaching and mentorship, workshops and tutorials, curriculum design, and one-on-one mentorship. I specialize in Mathematics, Physics, Chemistry, Computer Science, Frontend Development, and Fine Art.",
      "I have 10+ years of teaching experience across multiple subjects and age groups. I provide 1-on-1 tutoring in Mathematics, Physics, Chemistry, Sciences, Computer Science, Frontend Development, Video Editing, and 2D Drawing. I also facilitate coding bootcamps and tech workshops.",
      "My educational services include personalized tutoring, curriculum development, workshop facilitation, and e-learning content creation. I work with students of all ages from early learners to adults, helping them master various subjects and skills."
    ]
  },
  csEducation: {
    patterns: ['computer science', 'programming', 'coding', 'software development', 'algorithm', 'data structure', 'cs', 'coding bootcamp', 'learn programming', 'learn coding', 'tech education'],
    responses: [
      "I teach Computer Science and Programming with expertise in Frontend Development (React, Next.js, HTML/CSS), Python, JavaScript, and software development principles. I've facilitated coding bootcamps and programs at Edo State Innovation Center, Teklearn, and GiveHerTech.",
      "As a Computer Science educator, I teach programming, software development, algorithms, and data structures. I specialize in Frontend Development, React, Next.js, Python, and JavaScript. I've taught students from ages 3 to adult in various tech programs.",
      "I offer Computer Science and programming education with practical, hands-on learning approaches. I teach coding concepts, software development, web development, and programming languages including JavaScript, Python, React, and Next.js.",
      "I teach Computer Science with a focus on practical application and real-world skills. My expertise includes Frontend Development, React, Next.js, Python, JavaScript, and software development principles. I create engaging curriculum for bootcamps and workshops.",
      "My Computer Science teaching covers programming fundamentals, web development, software engineering principles, and modern frameworks. I've taught coding bootcamps, workshops, and courses to students of all levels and ages."
    ]
  },
  portfolioWork: {
    patterns: ['portfolio', 'projects', 'country finder', 'game hub', 'upperclass ai', 'gvany', 'afriak', 'jcinuniben', 'tpn consult', 'trashpoint', 'osa heritage', 'obel', 'work examples', 'show work', 'my projects', 'samples', 'past work'],
    responses: [
      "My portfolio includes various web development projects: Country Finder (interactive country data app), Game Hub (Xavier-themed games optimized for mobile), Upperclass AI (AI-driven LMS platform), Gvany (project delivery services in Africa), Afriak (indigenous fashion marketplace), JCINUNIBEN (EBL Masterclass website), TPN Consult (LMS in development), Trashpoint (WordPress site), OSA Heritage (WordPress site), and Obel (oil & gas industry website).",
      "I've built diverse projects including interactive web apps, e-commerce platforms, learning management systems, and business websites. Notable projects include Country Finder, Game Hub, Upperclass AI, Gvany, Afriak, and JCINUNIBEN. I use React, Next.js, Tailwind CSS, Node.js, and various technologies.",
      "My portfolio showcases web applications across different industries. I've built real-time data apps, gaming platforms, AI-driven learning systems, e-commerce marketplaces, and business websites. Each project demonstrates my full-stack development capabilities.",
      "I've developed projects ranging from simple websites to complex web applications. My work includes Country Finder (data visualization), Game Hub (mobile games), Upperclass AI (LMS platform), and various business websites. I focus on responsive, user-friendly designs.",
      "My project portfolio includes web applications built with modern technologies. I've created data visualization tools, gaming platforms, educational systems, e-commerce sites, and business websites. All projects are optimized for performance and user experience."
    ]
  },
  tools: {
    patterns: ['tools', 'software', 'applications', 'programs', 'what do you use', 'your tools', 'creative tools', 'dev tools', 'design tools', 'tech tools', 'clip studio', 'photoshop', 'illustrator', 'blender', 'figma', 'vscode', 'adobe', 'creative cloud'],
    responses: [
      "I use a variety of professional tools across different disciplines: Art & Design - Clip Studio Paint, Adobe Creative Suite (Photoshop, Illustrator), Blender for 3D; Development - VS Code, Git, Figma, Framer; AI - Various LLM platforms and prompt engineering tools; Education - Various e-learning platforms and teaching tools.",
      "My primary tools include Clip Studio Paint and Adobe Creative Suite for digital art and illustration, Blender for 3D modeling and animation, VS Code for development, Figma and Framer for design, and various AI platforms for prompt engineering and training.",
      "I work with industry-standard tools: Clip Studio and Adobe Creative Cloud for artistic work, Blender for 3D, VS Code and Git for development, Figma and Framer for UI/UX design, and various AI platforms for model training and prompt engineering.",
      "My creative toolkit includes Clip Studio, Adobe Creative Suite, Blender, Figma, and VS Code. I also use various development tools, AI platforms, and productivity software to deliver high-quality work across multiple disciplines.",
      "I'm proficient in multiple professional tools: Art (Clip Studio, Adobe Creative Suite, Blender), Development (VS Code, Git, Node.js, various frameworks), Design (Figma, Framer), and AI (LLM platforms, annotation tools)."
    ]
  },
  hireClient: {
    patterns: ['hire', 'client', 'work together', 'contract', 'freelance', 'project cost', 'price', 'rates', 'cost', 'budget', 'availability', 'available', 'booking', 'book', 'schedule', 'consultation', 'consult', 'meeting'],
    responses: [
      "I am available for freelance work, consultations, and project-based collaborations! To discuss rates, timelines, and project details, please contact me directly at idaeworsamuelprovidence@gmail.com or call +234 811 782 0918. I'm also available on WhatsApp at +234 810 866 6501.",
      "I'm currently accepting new clients and projects! Whether you need creative services, technical development, AI training, or educational programs, I'd love to work with you. Contact me via email at idaeworsamuelprovidence@gmail.com or call +234 811 782 0918.",
      "I am open to freelance projects, consultations, and collaborations. Rates depend on project scope and requirements. Contact me through email, phone, or social media to discuss your project needs and schedule a consultation.",
      "I'm available for hire! I work with clients on creative projects, web development, AI training, educational programs, and more. Let's discuss your project requirements, timeline, and budget. Reach out via email or phone to get started.",
      "I am currently available for new projects and collaborations. My services include artistic work, technical development, AI training, social media management, and educational programs. Contact me to discuss your project needs and availability."
    ]
  },
  shop: {
    patterns: ['shop', 'store', 'merch', 'buy', 'purchase', 'redbubble', 'products', 'art shop', 'merchandise', 'visit shop', 'art store', 'buy art', 'shop link'],
    responses: [
      "I have an art merch shop where you can find my designs on various products! From apparel to accessories, my artwork is available on high-quality items.",
      "You can browse and purchase my art on Redbubble! I have a collection of designs available on t-shirts, hoodies, stickers, phone cases, and more. ",
      "My art merch is available online! I sell my designs on various products through Redbubble. Check out the collection here",
      "Looking for my art on products? Visit my Redbubble shop to see my designs on apparel, accessories, and home decor",
      "Support my art by purchasing merch! I have a shop on Redbubble featuring my designs on a variety of products. "
    ]
  },
  services: {
    patterns: ['services', 'offer', 'do you do', 'what can you do', 'help with', 'what services', 'your services', 'service', 'offerings', 'what do you offer'],
    responses: [
      "I offer a wide range of creative and technical services: digital art and illustrations, book covers and comics, 3D modeling and product design, video editing and animation, web development (frontend and backend), mobile app development, AI and machine learning solutions, data annotation and training, and tech education and training.",
      "My services include creative design, web and app development, AI training, and education. Whether you need a website, a mobile app, digital art, or training programs, I can help.",
      "I provide end-to-end digital solutions: from concept to deployment. This includes UI/UX design, full-stack development, 3D product visualization, video production, and technology education.",
      "I specialize in creative and technical services: digital art and illustration, web and mobile development, AI and data solutions, and educational programs for all ages.",
      "My offerings cover the full spectrum of digital creation: design, development, AI, and education. I work with individuals, businesses, and educational institutions."
    ]
  },
  skills: {
    patterns: ['skills', 'expertise', 'technologies', 'tools', 'know', 'what are your skills', 'tech stack', 'proficient in', 'capabilities', 'what do you know'],
    responses: [
      "Technical Skills: Frontend (React, Next.js, HTML/CSS, JavaScript), Backend (Node.js, Python, APIs), Design (Figma, Adobe Suite, Blender), AI/ML (AI Awareness, Machine Learning, Data Annotation), Education (Curriculum Design, Workshop Facilitation). Soft Skills: Creativity and Innovation, Team Collaboration, Critical Thinking, Communication and Teaching, Problem Solving.",
      "I bring a diverse skill set: full-stack web development, digital art and 3D modeling, AI and machine learning, curriculum design, and workshop facilitation. I am also skilled in project management and creative problem solving.",
      "My expertise includes frontend and backend development, UI/UX design, 3D modeling and animation, AI education, and data annotation. I also have strong teaching and facilitation skills.",
      "I am proficient in React, Next.js, Node.js, Python, Figma, Blender, and various AI tools. I also design and deliver educational programs on technology and digital skills.",
      "I combine technical skills in web development and AI with creative skills in design and art. I am also an experienced educator who has trained over 500 students across various programs."
    ]
  },
  philosophy: {
    patterns: ['philosophy', 'belief', 'values', 'mission', 'vision', 'what do you believe', 'your philosophy', 'core values', 'principle', 'what drives you'],
    responses: [
      "My philosophy is simple: Curiosity is a superpower. I believe both art and technology are tools for transformation — they connect, inspire, and empower. I am committed to creating meaningful work that tells stories, sharing knowledge and empowering others, using technology to solve real problems, and blending creativity with functionality.",
      "I believe that creativity and technology together can change the world. My mission is to use my skills to create impactful work and help others do the same.",
      "My values center on curiosity, creativity, and community. I believe in lifelong learning, collaborative creation, and using technology for good.",
      "I believe every project is an opportunity to learn, grow, and make a positive impact. My work is guided by a commitment to excellence, integrity, and innovation.",
      "I am driven by a belief that art and technology are powerful tools for storytelling and empowerment. My mission is to help people express themselves and solve problems through digital creation."
    ]
  },
  collaboration: {
    patterns: ['collaborate', 'work together', 'partner', 'team up', 'hire', 'collaboration', 'freelance', 'contract', 'project', 'work with you'],
    responses: [
      "I am always open to exciting collaborations! Whether you are looking for a creative partner for art projects, a developer for your web or app idea, an educator for tech training, or a consultant for AI or tech initiatives, lets connect! You can reach me at idaeworsamuelprovidence@gmail.com or call +234 811 782 0918.",
      "Collaboration is at the heart of what I do. I love working with others to bring ideas to life. Feel free to reach out if you have a project in mind.",
      "I am available for freelance work, partnerships, and educational collaborations. Lets create something meaningful together!",
      "I welcome collaboration opportunities in art, technology, and education. Whether its a creative project, a technical build, or a training program, I am interested.",
      "Lets work together! I bring creativity, technical skills, and teaching experience to every collaboration. Contact me to discuss your project."
    ]
  },
  portfolio: {
    patterns: ['portfolio', 'work', 'projects', 'show me', 'gallery', 'examples', 'your work', 'past projects', 'what have you built', 'your creations', 'samples'],
    responses: [
      "You can explore my work across different sections: Web Development (React, Next.js, full-stack projects), Digital Art (2D and 3D illustrations, character design), Graphic Design (Branding, layouts, book covers), Video and Animation (Editing, motion graphics), Education (Training programs, workshops). Check out the portfolio section above or ask me about specific projects.",
      "My portfolio showcases a diverse range of work: from web applications and mobile apps to digital art and educational materials. I also have experience with 3D product design and animation.",
      "I have worked on projects across multiple domains: creative design, web development, AI education, and content creation. You can find examples of my work in the portfolio section.",
      "My work includes commercial projects, personal art pieces, educational programs, and technical builds. I am happy to share examples based on your area of interest.",
      "I have built websites, designed products, created art, and developed training programs. Let me know what you are interested in, and I can show you relevant examples."
    ]
  },
  contact: {
    patterns: ['contact', 'reach', 'email', 'phone', 'whatsapp', 'message', 'how to contact', 'get in touch', 'reach out', 'connect with you', 'your contact'],
    responses: [
      "I would love to hear from you! Here is how you can reach me: Email: idaeworsamuelprovidence@gmail.com, Call: +234 811 782 0918, WhatsApp: +234 810 866 6501, Twitter/X: @E_sai_Art. Or use the contact form on my website. I typically respond within 24 hours.",
      "You can contact me via email, phone, or social media. I am most responsive on email and WhatsApp. Looking forward to connecting with you!",
      "Reach out to me through any of these channels: email, phone, WhatsApp, or Twitter. I am always happy to hear from potential collaborators or clients.",
      "I am available for inquiries via email, phone, or social media. Feel free to reach out with any questions or project ideas.",
      "Contact me through my website's contact form, email, or WhatsApp. I usually respond quickly and would love to discuss your project."
    ]
  },
  e_sai_art: {
    patterns: ['e_sai_art', 'skywalker', 'meaning', 'what does e_sai_art mean', 'e sai art', 'alias', 'artistic name', 'why e_sai_art', 'what is e_sai_art'],
    responses: [
      "E_sai_Art (The Skywalker) is my creative alias — it represents a journey of storytelling, personal growth, and creative reinvention. E_sai_Art embodies: artistic expression and creativity, limitless imagination (like the sky), storytelling through multiple mediums, and constant evolution and growth. It is a reflection of my belief that art and technology can take us to new heights.",
      "E_sai_Art is my artistic identity. It combines my passion for art with a sense of limitless potential. The Skywalker name represents my journey of exploration and growth.",
      "The name E_sai_Art reflects my creative philosophy: art that reaches for the sky. It symbolizes freedom, imagination, and the endless possibilities of creative expression.",
      "E_sai_Art (The Skywalker) is more than just a name — it is a commitment to creative excellence and personal growth. It represents my journey as an artist and technologist.",
      "I chose E_sai_Art as my creative alias to capture the spirit of exploration and artistic expression. The Skywalker part reminds me to always reach higher and push boundaries."
    ]
  },
  education: {
    patterns: ['education', 'teaching', 'train', 'learn', 'bootcamp', 'workshop', 'teach', 'trainer', 'instructor', 'mentor', 'students', 'classes', 'courses'],
    responses: [
      "Education is at the heart of what I do! With 10+ years of experience, I have taught: eduBRICKS (2020-Present): Coding and Robotics for ages 5-16, UpperClass AI (2023-Present): AI Awareness, ML, Web Dev, GivHerTech Africa (2024): HTML/CSS, JavaScript for women, PIP Initiative (2024): Programming awareness in schools, Edo Innovate (2025): Web dev bootcamps and kids coding. I am passionate about making tech education accessible and fun.",
      "I have extensive teaching experience across multiple programs and age groups. My approach is hands-on and practical, focusing on real-world skills and project-based learning.",
      "I design and deliver educational programs on technology, digital skills, and creative arts. I have worked with children, teenagers, adults, and professionals.",
      "Teaching is one of my greatest passions. I have developed curricula and taught coding, robotics, AI, web development, and digital art to diverse audiences.",
      "I believe in accessible education for all. My teaching experience spans bootcamps, school programs, online courses, and workshops for various age groups and skill levels."
    ]
  },
  thank_you: {
    patterns: ['thank you', 'thanks', 'appreciate', 'grateful', 'thank', 'thx', 'appreciation'],
    responses: [
      "You are welcome! It is a pleasure to help. Anything else you would like to know?",
      "Thanks for your kind words! I am here whenever you need assistance.",
      "My pleasure! Feel free to ask anything else about my work or services.",
      "I appreciate your gratitude! Let me know if I can help with anything else.",
      "Anytime! I enjoy helping people learn more about my work and how we can collaborate."
    ]
  },
  goodbye: {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'exit', 'quit', 'end', 'done', 'farewell', 'take care'],
    responses: [
      "Goodbye! It was great chatting with you. Come back anytime! Remember: Curiosity is your superpower.",
      "Take care! Feel free to reach out whenever you have questions or ideas to explore.",
      "See you later! Keep creating, keep learning, and keep pushing boundaries.",
      "Until next time! It was a pleasure connecting with you. Wishing you all the best.",
      "Farewell! I hope you found our conversation helpful. Feel free to return anytime."
    ]
  }
}

// Default welcome messages
const defaultMessages = [
  {
    from: 'bot',
    text: 'Hi there! I am your virtual assistant. Ask me anything about my work, skills, or how we can collaborate.',
  },
]

const suggestions = [
  'Who are you?',
  'What services do you offer?',
  'What are your skills?',
  'What is your philosophy?',
  'Can we collaborate?',
  'Show me your work',
  'How do I contact you?',
  'What does E_sai_Art mean?',
  'Tell me about your teaching',
  'What are your qualifications?',
  'What are your rates?',
  'Do you offer project-based pricing?',
]

const typingReplies = [
  'Let me think about that...',
  'Processing your question...',
  'Finding the best answer...',
  'Just a moment...',
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(defaultMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voicesLoaded, setVoicesLoaded] = useState(false)
  const [modelReady, setModelReady] = useState(false)
  const [useNeuralNet, setUseNeuralNet] = useState(true)
  const recognitionRef = useRef(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { darkMode } = useTheme()

  // Initialize the neural network model
  useEffect(() => {
    const initModel = async () => {
      try {
        console.log('Initializing neural network model...')
        if (!chatbotModel.isLoaded) {
          await chatbotModel.train()
        }
        setModelReady(true)
        console.log('Neural network model ready!')
      } catch (error) {
        console.error('Failed to initialize model:', error)
        setModelReady(false)
        setUseNeuralNet(false)
      }
    }
    initModel()
  }, [])

  // Check speech support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const isSupported = !!SpeechRecognition
    setSpeechSupported(isSupported)
    console.log('Speech recognition supported:', isSupported)
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }
  
  const toggleMinimize = () => setIsMinimized(!isMinimized)

  // Rotate typing messages
  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setTypingText(typingReplies[Math.floor(Math.random() * typingReplies.length)])
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isTyping])

  // Auto-open chat after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 7000)
    return () => clearTimeout(timer)
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Pre-load voices when component mounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        setVoicesLoaded(true)
        console.log('Voices loaded immediately:', voices.map(v => v.name))
      }
      
      const handleVoicesChanged = () => {
        const updatedVoices = window.speechSynthesis.getVoices()
        setVoicesLoaded(true)
        console.log('Voices changed event fired. Available voices:', updatedVoices.map(v => v.name))
      }
      
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged
      
      const timeoutId = setTimeout(() => {
        const delayedVoices = window.speechSynthesis.getVoices()
        if (delayedVoices.length > 0) {
          setVoicesLoaded(true)
        }
      }, 1000)
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null
        clearTimeout(timeoutId)
      }
    }
  }, [])

  // Speak text with soothing male voice
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported')
      return
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
    }

    const cleanText = text.replace(/\*\*/g, '').replace(/[•\n]/g, ' ').replace(/\s+/g, ' ').trim()
    const utterance = new SpeechSynthesisUtterance(cleanText)
    
    utterance.pitch = 0.75
    utterance.rate = 1
    utterance.volume = 1
    
    const voices = window.speechSynthesis.getVoices()
    const maleVoicePatterns = [
      'Google UK English Male',  'Microsoft David',
      'Microsoft Mark', 'Microsoft Daniel', 'Microsoft Fred', 'Daniel',
      'David', 'Mark', 'Fred', 'Alex', 'Male'
    ]
    
    let selectedVoice = null
    for (const pattern of maleVoicePatterns) {
      const voice = voices.find(v => v.name === pattern || v.name.includes(pattern))
      if (voice) {
        selectedVoice = voice
        break
      }
    }
    
    if (!selectedVoice) {
      selectedVoice = voices.find(v => 
        v.name.toLowerCase().includes('male') ||
        v.name.toLowerCase().includes('david') ||
        v.name.toLowerCase().includes('mark') ||
        v.name.toLowerCase().includes('daniel')
      )
    }
    
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith('en'))
      if (selectedVoice) utterance.pitch = 0.6
    }
    
    if (!selectedVoice && voices.length > 0) {
      selectedVoice = voices[0]
      utterance.pitch = 0.5
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }
    
    utterance.onstart = () => setVoiceEnabled(true)
    utterance.onend = () => setVoiceEnabled(false)
    utterance.onerror = () => setVoiceEnabled(false)
    
    try {
      window.speechSynthesis.speak(utterance)
    } catch (error) {
      console.error('Speech error:', error)
      setVoiceEnabled(false)
    }
  }

  // Gemini AI response logic with improved matching (Fallback)
  const getGeminiReply = (lower) => {
    const categories = Object.entries(geminiMockData)
    const sortedCategories = categories.sort((a, b) => {
      const maxLenA = Math.max(...a[1].patterns.map(p => p.length))
      const maxLenB = Math.max(...b[1].patterns.map(p => p.length))
      return maxLenB - maxLenA
    })
    
    for (const [category, data] of sortedCategories) {
      const matched = data.patterns.some(pattern => lower.includes(pattern))
      if (matched) {
        const responses = data.responses
        return responses[Math.floor(Math.random() * responses.length)]
      }
    }
    
    return `I am not sure about that specific topic, but I would love to help! You can ask me about: Who I am, My services, Skills and expertise, Portfolio, Contact information, Collaboration, Education and teaching, or contact me directly via socials or via contact form message.`
  }

  // Enhanced getReply that uses neural network or falls back to mock data
  const getReply = async (userMessage) => {
    const lower = userMessage.toLowerCase()
    
    if (useNeuralNet && modelReady) {
      try {
        console.log('Using neural network for prediction...')
        const prediction = await chatbotModel.predict(lower)
        if (prediction && prediction.length > 0) {
          console.log('Neural network response:', prediction)
          return prediction
        }
      } catch (error) {
        console.error('Neural network prediction failed:', error)
      }
    }
    
    console.log('Using mock data fallback...')
    return getGeminiReply(lower)
  }

  // Send message
  const handleSend = async (textOverride = null) => {
    const finalInput = textOverride || input.trim()
    if (!finalInput) return

    const userMessage = { from: 'user', text: finalInput }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const reply = await getReply(finalInput)
      
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: 'bot', text: reply }])
        setIsTyping(false)
        speakText(reply)
      }, 800)
    } catch (error) {
      console.error('Error getting reply:', error)
      const fallbackReply = getGeminiReply(finalInput.toLowerCase())
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: 'bot', text: fallbackReply }])
        setIsTyping(false)
        speakText(fallbackReply)
      }, 800)
    }
  }

  // Voice input - FIXED VERSION
  const startSpeechRecognition = () => {
    if (isListening) {
      console.log('Already listening...')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      alert('Speech recognition is only supported in Chrome, Edge, or Safari browsers.')
      return
    }

    // Request microphone permission first
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        console.log('Microphone permission granted')
        
        try {
          const recognition = new SpeechRecognition()
          recognition.lang = 'en-US'
          recognition.interimResults = true
          recognition.maxAlternatives = 1
          recognition.continuous = false
          recognition.timeout = 5000

          recognition.onstart = () => {
            console.log('Speech recognition started - Speak now!')
            setIsListening(true)
            setInput('🎤 Listening...')
          }

          recognition.onresult = (event) => {
            let finalTranscript = ''
            let interimTranscript = ''

            for (let i = event.resultIndex; i < event.results.length; i++) {
              const transcript = event.results[i][0].transcript
              if (event.results[i].isFinal) {
                finalTranscript += transcript
              } else {
                interimTranscript += transcript
              }
            }

            if (interimTranscript) {
              setInput(interimTranscript)
            }

            if (finalTranscript) {
              console.log('Final transcript:', finalTranscript)
              setInput(finalTranscript)
              setTimeout(() => {
                handleSend(finalTranscript)
              }, 300)
            }
          }

          recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error)
            setIsListening(false)
            
            const errorMessages = {
              'not-allowed': 'Please allow microphone access in your browser settings.',
              'no-speech': 'No speech detected. Please try again.',
              'audio-capture': 'No microphone found. Please connect a microphone.',
              'network': 'Network error. Please check your connection.',
              'aborted': 'Speech recognition was cancelled.',
              'language-not-supported': 'English (US) is not supported on this device.'
            }
            
            const message = errorMessages[event.error] || `Error: ${event.error}`
            if (event.error !== 'aborted' && event.error !== 'no-speech') {
              alert(message)
            }
            
            setInput('')
          }

          recognition.onend = () => {
            console.log('Speech recognition ended')
            setIsListening(false)
            if (!input || input === '🎤 Listening...') {
              setInput('')
            }
          }

          recognitionRef.current = recognition
          recognition.start()
          
        } catch (error) {
          console.error('Error creating speech recognition:', error)
          setIsListening(false)
          alert('There was an error starting voice input. Please try again.')
        }
      })
      .catch((err) => {
        console.error('Microphone permission denied:', err)
        setIsListening(false)
        alert('Microphone access is required for voice input. Please allow microphone access and try again.')
      })
  }

  return (
    <div className="fixed bottom-0 right-6 z-50">
      <AnimatePresence>
        {/* Toggle Button */}
        <motion.button
          key="toggle-button"
          onClick={toggleChat}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`flex items-center gap-2 p-4 rounded-full shadow-2xl transition-all duration-300 ${
            darkMode
              ? 'bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700'
              : 'bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600'
          } text-white`}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
        </motion.button>

        {/* Chat Window */}
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`absolute bottom-10 right-0 w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${
              darkMode
                ? 'bg-slate-800/95 backdrop-blur-xl border-slate-700'
                : 'bg-white/95 backdrop-blur-xl border-blue-100'
            }`}
          >
            {!isMinimized ? (
              <>
                {/* Header with Gradient */}
                <motion.div 
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  className={`px-4 py-4 bg-gradient-to-r from-blue-600 to-blue-600 text-white`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <BsRobot size={24} />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold">Sam Assistant</h3>
                        <div className="flex items-center gap-2 text-xs opacity-90">
                          <div className={`w-2 h-2 rounded-full ${
                            isTyping ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
                          }`} />
                          <span>
                            {isTyping ? 'Thinking...' : 
                             voiceEnabled ? 'Speaking...' : 
                             modelReady ? 'AI Ready' : 'Loading...'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {voiceEnabled && (
                        <div className="flex items-center gap-1 mr-1">
                          <span className="animate-pulse text-xs">🔊</span>
                        </div>
                      )}
                      {modelReady && (
                        <div className="flex items-center gap-1 mr-1">
                          <span className="text-xs" title="Neural Network Active">🧠</span>
                        </div>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMinimize}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <FiMinimize2 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleChat}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <FiX size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Messages Area */}
                <div 
                  className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: darkMode ? '#475569 #1e293b' : '#cbd5e1 #f1f5f9',
                  }}
                >
                  <AnimatePresence>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: msg.from === 'user' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.from === 'bot' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-600 flex items-center justify-center text-white text-sm shrink-0">
                            <BsRobot size={14} />
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-wrap shadow-md ${
                            msg.from === 'user'
                              ? darkMode
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-blue-500 text-white rounded-br-none'
                              : darkMode
                                ? 'bg-slate-700 text-gray-200 rounded-bl-none'
                                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                        {msg.from === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-600 flex items-center justify-center text-white text-sm shrink-0">
                            <BsPerson size={14} />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start gap-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-600 flex items-center justify-center text-white">
                        <BsRobot size={14} />
                      </div>
                      <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-2xl rounded-bl-none">
                        <div className="flex gap-1 items-center mb-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                          {typingText}
                        </p>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                <div className="px-4 py-3 border-t dark:border-slate-700">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Quick suggestions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSend(s)}
                        className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                          darkMode
                            ? 'bg-slate-700 hover:bg-slate-600 text-gray-200'
                            : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                        }`}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50">
                  <div className="flex gap-2">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="flex-1 relative"
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={isListening ? '🎤 Listening...' : 'Type your message...'}
                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          isListening
                            ? 'ring-2 ring-red-500'
                            : ''
                        } ${
                          darkMode
                            ? 'bg-slate-700 text-white placeholder-gray-400 focus:ring-blue-500'
                            : 'bg-white text-gray-800 placeholder-gray-400 focus:ring-blue-400'
                        }`}
                      />
                      {isListening && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <span className="flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          </span>
                        </div>
                      )}
                    </motion.div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isListening}
                        className={`p-3 rounded-xl transition-all ${
                          darkMode
                            ? input.trim() && !isListening
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-slate-700 text-gray-500 cursor-not-allowed'
                            : input.trim() && !isListening
                              ? 'bg-blue-500 hover:bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <FiSend size={18} />
                      </motion.button>
                      {speechSupported && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={startSpeechRecognition}
                          disabled={isListening || isTyping}
                          className={`p-3 rounded-xl transition-all ${
                            isListening
                              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                              : isTyping
                              ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                              : darkMode
                                ? 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                          }`}
                          title={isListening ? 'Listening...' : 'Voice input'}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        </motion.button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    {isListening ? '🎤 Listening...' : 
                     voiceEnabled ? '🔊 Speaking...' : 
                     modelReady ? '🧠 Neural Network Active' : '⏳ Loading AI Model...'}
                  </p>
                </div>
              </>
            ) : (
              /* Minimized View */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 cursor-pointer"
                onClick={toggleMinimize}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white">
                      <BsRobot size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm dark:text-white">Sam Assistant</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {modelReady ? '🧠 Neural AI' : 'Loading...'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {voiceEnabled && (
                      <span className="text-xs animate-pulse text-blue-500">🔊</span>
                    )}
                    {modelReady && (
                      <span className="text-xs text-blue-500">🧠</span>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleMinimize()
                      }}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                    >
                      <FiMaximize2 size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleChat()
                      }}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                    >
                      <FiX size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#475569' : '#cbd5e1'};
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#64748b' : '#94a3b8'};
        }
      `}</style>
    </div>
  )
}