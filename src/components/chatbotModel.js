// // Component/chatbotModel.js

// // Simple neural network training using TensorFlow.js
// import * as tf from '@tensorflow/tfjs'

// class ChatbotModel {
//   constructor() {
//     this.model = null
//     this.tokenizer = null
//     this.isLoaded = false
//   }

//   async train() {
//     // Define your training data - All patterns and responses from geminiMockData
//     const trainingData = [
//       // Greetings
//       { input: 'hello', output: 'Hey there! Welcome to my creative space. How can I assist you today?' },
//       { input: 'hi', output: 'Hello! Great to see you here. What would you like to explore?' },
//       { input: 'hey', output: 'Hi! I am here to help you learn more about my work and services.' },
//       { input: 'good morning', output: 'Greetings! I am Sam, your virtual assistant. What brings you here today?' },
//       { input: 'good afternoon', output: 'Welcome! I am delighted to chat with you. How can I help?' },
//       { input: 'good evening', output: 'Hey there! Welcome to my creative space. How can I assist you today?' },
//       { input: 'greetings', output: 'Greetings! I am Sam, your virtual assistant. What brings you here today?' },
//       { input: 'sup', output: 'Hi! I am here to help you learn more about my work and services.' },
//       { input: 'howdy', output: 'Hey there! Welcome to my creative space. How can I assist you today?' },

//       // About
//       { input: 'who are you', output: 'I am Idaewor S.E Providence — a creative technologist, digital artist, and educator. I blend code, creativity, and teaching to build meaningful solutions. With over 10 years of experience, I have worked across web development, AI, 3D design, and education.' },
//       { input: 'tell me about yourself', output: 'I am a multidisciplinary creator passionate about using technology and art to transform ideas into reality. My work spans digital art, web development, AI education, and creative design.' },
//       { input: 'introduce yourself', output: 'I am Samuel, a creative technologist who believes in the power of art and code. I have been building digital experiences and teaching technology for over a decade.' },
//       { input: 'about you', output: 'I am Idaewor S.E Providence, also known as E_sai_Art. I combine my skills in design, development, and education to create meaningful work and empower others.' },
//       { input: 'your background', output: 'I am a creative problem solver who works at the intersection of art, technology, and education. I help people and organizations bring their digital visions to life.' },
//       { input: 'your story', output: 'I am Samuel, a creative technologist who believes in the power of art and code. I have been building digital experiences and teaching technology for over a decade.' },
//       { input: 'who is samuel', output: 'I am Samuel, a creative technologist who believes in the power of art and code. I have been building digital experiences and teaching technology for over a decade.' },
//       { input: 'who is idaewor', output: 'I am Idaewor S.E Providence — a creative technologist, digital artist, and educator. I blend code, creativity, and teaching to build meaningful solutions.' },
//       { input: 'about samuel', output: 'I am a multidisciplinary creator passionate about using technology and art to transform ideas into reality. My work spans digital art, web development, AI education, and creative design.' },

//       // Artistic Services & Tools
//       { input: 'art', output: 'I offer comprehensive artistic services including custom illustrations, logo design, and visual branding solutions using Clip Studio and Adobe Creative Suite. I specialize in digital art, concept art, book covers, comics, and character design.' },
//       { input: 'illustration', output: 'As a digital artist, I work with professional tools like Clip Studio Paint and Adobe Creative Suite. I create custom illustrations, design logos, develop visual branding, and produce commissioned artwork.' },
//       { input: 'drawing', output: 'My artistic expertise includes 2D art and illustrations, graphic design, and logo creation. I use industry-standard tools including Photoshop, Illustrator, and Clip Studio.' },
//       { input: 'artist', output: 'I offer a wide range of artistic services: digital illustrations, book covers, comic art, graphic design, and visual branding. I work with Clip Studio, Adobe Creative Suite, and other professional tools.' },
//       { input: 'artistic', output: 'My artistic portfolio includes custom illustrations, branding solutions, concept art, and visual storytelling. I\'m proficient in Clip Studio, Photoshop, Illustrator, and other creative tools.' },
//       { input: '2d art', output: 'I specialize in 2D art and illustrations, creating custom artwork for clients. I use professional tools like Clip Studio and Adobe Creative Suite to bring ideas to life.' },
//       { input: 'commission', output: 'I accept commissions for custom illustrations, character designs, book covers, and more. Contact me to discuss your project requirements and get a quote.' },
//       { input: 'artwork', output: 'My artwork spans multiple styles and mediums. I create custom illustrations, concept art, character designs, and visual storytelling pieces for various projects.' },
//       { input: 'concept art', output: 'I specialize in concept art and visual storytelling, creating compelling characters, environments, and narratives for games, books, and other media.' },
//       { input: 'visual storytelling', output: 'I bring characters and stories to life through visual storytelling. I create illustrations, comics, and concept art that engage and inspire audiences.' },
//       { input: 'book cover', output: 'I design professional book covers that capture the essence of the story. My covers are created with attention to detail and market appeal.' },
//       { input: 'comics', output: 'I create comics and sequential art, developing characters and narratives through visual storytelling. My comic art is detailed and expressive.' },
//       { input: 'character design', output: 'I design compelling characters for games, comics, and animation. My character designs are unique, expressive, and tailored to your project\'s needs.' },
//       { input: 'digital art', output: 'I create digital art using professional tools like Clip Studio Paint and Adobe Creative Suite. My digital artwork includes illustrations, concept art, and character designs.' },
//       { input: 'art tools', output: 'I use professional art tools including Clip Studio Paint, Adobe Creative Suite (Photoshop, Illustrator), and Wacom tablets for digital art creation.' },
//       { input: 'clip studio', output: 'I use Clip Studio Paint extensively for digital illustration, comic art, and character design. It\'s one of my primary tools for creating professional artwork.' },
//       { input: 'adobe creative', output: 'I use Adobe Creative Suite including Photoshop and Illustrator for graphic design, photo editing, and vector artwork. These tools help me create professional visual solutions.' },
//       { input: 'creative suite', output: 'Adobe Creative Suite is essential to my workflow for graphic design, illustration, and visual branding. I use Photoshop, Illustrator, and other Adobe tools.' },
//       { input: 'photoshop', output: 'I use Adobe Photoshop for photo editing, digital painting, and graphic design. It\'s a key tool in my creative workflow.' },
//       { input: 'illustrator', output: 'I use Adobe Illustrator for vector graphics, logo design, and illustration. It\'s perfect for creating scalable graphics and clean designs.' },

//       // 3D Services
//       { input: '3d', output: 'I specialize in 3D modeling and animation using Blender. My services include sculpting, modeling, and animating captivating 3D visuals for product design, visualization, and creative projects.' },
//       { input: 'blender', output: 'With Blender expertise, I offer 3D modeling, sculpting, and animation services. I create product visualizations, 3D renders, and animated content for presentations, marketing, and creative projects.' },
//       { input: '3d modeling', output: 'I provide professional 3D services including modeling, texturing, lighting, and animation. Using Blender, I create high-quality 3D renders and visualizations for products, characters, and environments.' },
//       { input: '3d animation', output: 'My 3D capabilities include Blender-based modeling, sculpting, and animation. I create product visualizations, 3D assets, and animated sequences for various applications.' },
//       { input: 'sculpting', output: 'I offer comprehensive 3D services from concept to final render. Using Blender, I create 3D models, animations, and visualizations for product design, advertising, and creative projects.' },
//       { input: '3d render', output: 'I create high-quality 3D renders and visualizations using Blender. My renders are photorealistic and suitable for product design, marketing, and creative projects.' },
//       { input: 'product design', output: 'I provide 3D product design and visualization services using Blender. I create detailed 3D models and renders for product development and marketing.' },
//       { input: '3d visualization', output: 'I specialize in 3D visualization for products, architecture, and creative projects. Using Blender, I create immersive visualizations that bring ideas to life.' },
//       { input: 'animation', output: 'I create professional animations using Blender. My animation services include product animations, character animations, and motion graphics for various applications.' },
//       { input: '3d artist', output: 'As a 3D artist, I create models, animations, and visualizations using Blender. My work includes organic and hard-surface modeling for various industries.' },
//       { input: 'rendering', output: 'I provide professional rendering services using Blender. I create high-quality renders for product design, architecture, and creative projects.' },

//       // Technical Services
//       { input: 'web development', output: 'I am a full-stack developer with expertise in modern web technologies. My technical skills include: Frontend (React, Next.js, HTML/CSS, Tailwind, JavaScript), Backend (Node.js, Laravel, Django, Express, Python), Databases (MySQL, MongoDB), and Mobile (React Native).' },
//       { input: 'frontend', output: 'I specialize in frontend development using React, Next.js, HTML/CSS, Tailwind, and JavaScript. I build responsive, user-friendly interfaces that provide excellent user experiences.' },
//       { input: 'backend', output: 'I offer backend development services using Node.js, Python, Django, Laravel, and Express. I build robust APIs, server-side logic, and database integrations.' },
//       { input: 'full-stack', output: 'I provide full-stack development services including frontend and backend development, database design, SEO optimization, and end-to-end digital solutions.' },
//       { input: 'app development', output: 'I build web and mobile applications using modern technologies. My app development includes React, Next.js, React Native, and Flutter for cross-platform solutions.' },
//       { input: 'website', output: 'I create professional websites and web applications using React, Next.js, and modern frontend frameworks. My websites are responsive, optimized, and user-friendly.' },
//       { input: 'web app', output: 'I build web applications with React, Next.js, and Node.js. My web apps are scalable, performant, and built with modern best practices.' },
//       { input: 'react', output: 'I specialize in React development for building dynamic user interfaces. I create reusable components, manage state effectively, and build performant React applications.' },
//       { input: 'nextjs', output: 'I use Next.js for server-side rendering, static site generation, and building modern web applications. Next.js is my primary framework for React development.' },
//       { input: 'nodejs', output: 'I use Node.js for backend development, building REST APIs, and server-side applications. I\'m proficient with Express.js and various Node.js frameworks.' },
//       { input: 'javascript', output: 'I\'m proficient in JavaScript (ES6+) for both frontend and backend development. I use modern JavaScript features and best practices.' },
//       { input: 'tailwind', output: 'I use Tailwind CSS for utility-first styling and rapid UI development. It\'s my preferred CSS framework for building responsive interfaces.' },
//       { input: 'html', output: 'I write semantic, accessible HTML for web development. I ensure clean, well-structured markup that follows best practices.' },
//       { input: 'css', output: 'I create responsive, modern CSS layouts using Flexbox, Grid, and CSS frameworks. I ensure cross-browser compatibility and pixel-perfect designs.' },
//       { input: 'php', output: 'I use PHP for backend development, including Laravel framework. I build robust, secure server-side applications with PHP.' },
//       { input: 'laravel', output: 'I use Laravel for PHP development, building scalable web applications with MVC architecture. I\'m experienced with Laravel\'s ecosystem and features.' },
//       { input: 'mysql', output: 'I work with MySQL for relational database design and management. I create efficient database schemas and optimize queries.' },
//       { input: 'mongodb', output: 'I use MongoDB for NoSQL database solutions. I design flexible, scalable database structures for modern applications.' },
//       { input: 'python', output: 'I use Python for backend development, AI, and data processing. I\'m experienced with Django, Flask, and various Python libraries.' },
//       { input: 'java', output: 'I have experience with Java for enterprise applications and Android development. I write clean, maintainable Java code.' },
//       { input: 'reactnative', output: 'I use React Native for mobile app development, building cross-platform applications for iOS and Android.' },
//       { input: 'express', output: 'I use Express.js for building REST APIs and backend applications with Node.js. I create efficient, scalable server-side solutions.' },
//       { input: 'git', output: 'I use Git for version control and collaborative development. I follow Git best practices for branching, committing, and merging.' },
//       { input: 'wordpress', output: 'I develop WordPress sites with custom themes and plugins. I also provide WordPress maintenance and optimization services.' },
//       { input: 'ui/ux', output: 'I design user interfaces and user experiences using Figma and Framer. I create intuitive, engaging designs that enhance user satisfaction.' },
//       { input: 'prototyping', output: 'I create prototypes using Figma and Framer for web and mobile applications. My prototypes are interactive and user-tested.' },
//       { input: 'programming', output: 'I\'m proficient in multiple programming languages including JavaScript, Python, PHP, and Java. I write clean, efficient, and maintainable code.' },
//       { input: 'developer', output: 'I\'m a full-stack developer with expertise in React, Next.js, Node.js, and modern web technologies. I build scalable, optimized digital solutions.' },
//       { input: 'tech stack', output: 'My tech stack includes React, Next.js, Node.js, Python, Django, Laravel, MongoDB, MySQL, and various modern frameworks. I work with cutting-edge technologies.' },

//       // AI Training & Data Annotation
//       { input: 'ai', output: 'I am an AI Training Specialist with expertise in prompt engineering and data annotation. I develop and optimize training prompts for conversational AI models, curate diverse datasets to improve model robustness and reduce bias, and implement prompt engineering strategies that increase model accuracy by up to 35%.' },
//       { input: 'artificial intelligence', output: 'As an AI Trainer & Data Annotator at Multi Mango, I specialize in optimizing prompts that transform AI interactions across creative writing, Q&A systems, summarization, and sentiment analysis. I have developed comprehensive prompt libraries for various use cases and industries.' },
//       { input: 'machine learning', output: 'My AI services include prompt engineering, LLM fine-tuning, data curation and annotation, model evaluation and testing, and AI ethics & bias mitigation. I\'ve collaborated with cross-functional teams to align AI outputs with business objectives.' },
//       { input: 'ml', output: 'I specialize in AI prompt engineering and LLM optimization. I create structured prompts for various applications including creative text generation, Q&A systems, summarization, sentiment analysis, and chatbot development.' },
//       { input: 'prompt engineering', output: 'I offer AI training services including prompt optimization, data annotation, and model evaluation. I\'ve worked on AI chatbots, story generators, resume analyzers, and various other AI applications.' },
//       { input: 'llm', output: 'I work with Large Language Models (LLMs) for prompt engineering and optimization. I create effective prompts for various AI applications and use cases.' },
//       { input: 'data annotation', output: 'I provide data annotation services for AI training. I curate diverse datasets to improve model robustness and reduce bias.' },
//       { input: 'ai trainer', output: 'As an AI Trainer, I develop and optimize training prompts for conversational AI models. I implement strategies that increase model accuracy and performance.' },
//       { input: 'chatbot', output: 'I\'ve worked on AI chatbot development, including prompt engineering and conversation design. I create natural, user-centric chatbot interactions.' },
//       { input: 'llm specialist', output: 'I specialize in LLM optimization and prompt engineering. I create comprehensive prompt libraries for various use cases and industries.' },

//       // Social Media Services
//       { input: 'social media', output: 'I offer comprehensive social media management services including platform optimization, content strategy, paid advertising, and community building. I design targeted content strategies that boost engagement, build brand identity, and increase reach across Instagram, TikTok, Twitter, YouTube, and Facebook.' },
//       { input: 'social media management', output: 'My social media expertise includes content strategy, post creation and scheduling, paid ads management, video editing, and campaign optimization. I create algorithm-friendly content tailored for each platform.' },
//       { input: 'content creation', output: 'I create compelling content for social media platforms including posts, videos, stories, and ads. My content is designed to engage audiences and drive results.' },
//       { input: 'video editing', output: 'I provide professional video editing services for social media, including reels, stories, ads, and educational content. I create compelling short-form and long-form videos.' },
//       { input: 'post creation', output: 'I create engaging social media posts with compelling visuals and copy. My posts are optimized for each platform and designed to drive engagement.' },
//       { input: 'scheduling', output: 'I manage social media scheduling and content calendars to ensure consistent posting and optimal engagement times across all platforms.' },
//       { input: 'paid ads', output: 'I manage paid advertising campaigns across social media platforms. I create data-driven campaigns that convert views into loyal followers and sales.' },
//       { input: 'marketing', output: 'I provide marketing services including social media strategy, content marketing, and campaign management. I help brands grow their online presence and reach.' },
//       { input: 'campaign', output: 'I create and manage marketing campaigns across social media platforms. My campaigns are data-driven and optimized for maximum ROI.' },

//       // Educational Services
//       { input: 'education', output: 'I offer educational services with over 10 years of experience in teaching and mentorship. I provide 1-on-1 tutoring for all ages (3 to adult) in Mathematics, Physics, Chemistry, Sciences, Computer Science, Frontend Development, Video Editing, and 2D Drawing.' },
//       { input: 'teaching', output: 'I am an experienced teacher with 10+ years of experience across multiple subjects and age groups. I provide personalized instruction in Mathematics, Physics, Chemistry, Computer Science, and Fine Art.' },
//       { input: 'tutor', output: 'I offer one-on-one tutoring services for all ages and skill levels. I specialize in Mathematics, Physics, Chemistry, Computer Science, and Frontend Development.' },
//       { input: 'mentorship', output: 'I provide mentorship programs for students and professionals in technology, art, and education. I help people develop skills and achieve their goals.' },
//       { input: 'workshop', output: 'I facilitate workshops and bootcamps in web development, coding, AI, and digital art. My workshops are hands-on and practical.' },
//       { input: 'learn', output: 'I help people learn various subjects including Mathematics, Physics, Chemistry, Computer Science, and Frontend Development. My teaching approach is practical and engaging.' },
//       { input: 'training', output: 'I provide training programs in technology, digital skills, and creative arts. I\'ve trained over 500 students across various programs and institutions.' },
//       { input: 'curriculum', output: 'I design educational curricula for technology programs, coding bootcamps, and digital skills training. My curricula are comprehensive and practical.' },

//       // Computer Science & Programming Education
//       { input: 'computer science', output: 'I teach Computer Science and Programming with expertise in Frontend Development (React, Next.js, HTML/CSS), Python, JavaScript, and software development principles. I\'ve facilitated coding bootcamps and programs at Edo State Innovation Center, Teklearn, and GiveHerTech.' },
//       { input: 'programming', output: 'I teach programming to students of all ages and skill levels. I cover concepts from basic programming to advanced software development.' },
//       { input: 'coding', output: 'I teach coding and software development with a focus on practical, hands-on learning. I cover JavaScript, Python, React, and Next.js.' },
//       { input: 'software development', output: 'I teach software development principles including algorithms, data structures, and best practices. I help students build real-world applications.' },
//       { input: 'coding bootcamp', output: 'I facilitate coding bootcamps for beginners and intermediate learners. My bootcamps cover web development, programming, and software engineering fundamentals.' },

//       // Portfolio & Projects
//       { input: 'portfolio', output: 'My portfolio includes various web development projects: Country Finder (interactive country data app), Game Hub (Xavier-themed games optimized for mobile), Upperclass AI (AI-driven LMS platform), Gvany (project delivery services in Africa), Afriak (indigenous fashion marketplace), JCINUNIBEN (EBL Masterclass website), TPN Consult (LMS in development), Trashpoint (WordPress site), OSA Heritage (WordPress site), and Obel (oil & gas industry website).' },
//       { input: 'projects', output: 'I\'ve built diverse projects including interactive web apps, e-commerce platforms, learning management systems, and business websites. Notable projects include Country Finder, Game Hub, Upperclass AI, Gvany, Afriak, and JCINUNIBEN.' },
//       { input: 'country finder', output: 'Country Finder is an interactive web app that shows countries, maps, weather, travel data, and more. It\'s built with HTML, CSS, JavaScript, and Firebase.' },
//       { input: 'game hub', output: 'Game Hub is a collection of Xavier-themed games optimized for mobile with smooth swipe and touch controls. Each game delivers unique gameplay mechanics and progressively challenging levels.' },
//       { input: 'upperclass ai', output: 'Upperclass AI is an AI-driven LMS platform for machine learning, web development, and other skills. It\'s built with Django and Vite, featuring intelligent chatbots and interactive training.' },
//       { input: 'gvany', output: 'Gvany is a project delivery services website serving Nigeria, Kenya, Uganda, Ghana, and Ivory Coast. It\'s built with Next.js, Tailwind CSS, Framer, and Node.js.' },
//       { input: 'afriak', output: 'Afriak is a digital marketplace celebrating indigenous fashion. It spotlights local artisans, shares stories, and brings authentic African designs to the world.' },
//       { input: 'show work', output: 'I showcase my work across multiple domains including web development, digital art, 3D modeling, and education. You can see examples of my projects in the portfolio section.' },
//       { input: 'my projects', output: 'I\'ve built websites, web applications, and digital products across various industries. My projects demonstrate full-stack development capabilities and creative design.' },

//       // Tools
//       { input: 'tools', output: 'I use a variety of professional tools across different disciplines: Art & Design - Clip Studio Paint, Adobe Creative Suite (Photoshop, Illustrator), Blender for 3D; Development - VS Code, Git, Figma, Framer; AI - Various LLM platforms and prompt engineering tools; Education - Various e-learning platforms and teaching tools.' },
//       { input: 'software', output: 'My primary software tools include Clip Studio Paint, Adobe Creative Suite, Blender, VS Code, Figma, and various AI platforms.' },
//       { input: 'what do you use', output: 'I work with industry-standard tools: Clip Studio and Adobe Creative Cloud for artistic work, Blender for 3D, VS Code and Git for development, Figma and Framer for UI/UX design.' },
//       { input: 'your tools', output: 'My creative toolkit includes Clip Studio, Adobe Creative Suite, Blender, Figma, and VS Code. I also use various development tools, AI platforms, and productivity software.' },
//       { input: 'figma', output: 'I use Figma for UI/UX design and prototyping. It\'s my primary tool for creating user interfaces and interactive prototypes.' },
//       { input: 'vscode', output: 'VS Code is my preferred code editor for web development. I use it with various extensions for JavaScript, React, Python, and other languages.' },

//       // Hire/Client Information
//       { input: 'hire', output: 'I am available for freelance work, consultations, and project-based collaborations! To discuss rates, timelines, and project details, please contact me directly at idaeworsamuelprovidence@gmail.com or call +234 811 782 0918. I\'m also available on WhatsApp at +234 810 866 6501.' },
//       { input: 'client', output: 'I\'m currently accepting new clients and projects! Whether you need creative services, technical development, AI training, or educational programs, I\'d love to work with you.' },
//       { input: 'work together', output: 'I am open to freelance projects, consultations, and collaborations. Rates depend on project scope and requirements. Contact me to discuss your project needs.' },
//       { input: 'contract', output: 'I work on contract basis for projects ranging from creative services to full-stack development. Contact me to discuss your project requirements and timeline.' },
//       { input: 'freelance', output: 'I\'m available for freelance work across multiple disciplines including art, web development, AI training, and education.' },
//       { input: 'rates', output: 'Rates depend on project scope and requirements. I offer competitive pricing for quality services. Contact me for a custom quote.' },
//       { input: 'availability', output: 'I am currently available for new projects and collaborations. My services include artistic work, technical development, AI training, social media management, and educational programs.' },

//       // Shop
//       { input: 'shop', output: 'I have an art merch shop where you can find my designs on various products! From apparel to accessories, my artwork is available on high-quality items.' },
//       { input: 'store', output: 'You can browse and purchase my art on Redbubble! I have a collection of designs available on t-shirts, hoodies, stickers, phone cases, and more.' },
//       { input: 'merch', output: 'My art merch is available online! I sell my designs on various products through Redbubble. Check out the collection here.' },
//       { input: 'redbubble', output: 'Support my art by purchasing merch! I have a shop on Redbubble featuring my designs on a variety of products.' },

//       // Services
//       { input: 'services', output: 'I offer a wide range of creative and technical services: digital art and illustrations, book covers and comics, 3D modeling and product design, video editing and animation, web development (frontend and backend), mobile app development, AI and machine learning solutions, data annotation and training, and tech education and training.' },
//       { input: 'offer', output: 'My services include creative design, web and app development, AI training, and education. Whether you need a website, a mobile app, digital art, or training programs, I can help.' },
//       { input: 'what can you do', output: 'I provide end-to-end digital solutions: from concept to deployment. This includes UI/UX design, full-stack development, 3D product visualization, video production, and technology education.' },
//       { input: 'help with', output: 'I specialize in creative and technical services: digital art and illustration, web and mobile development, AI and data solutions, and educational programs for all ages.' },

//       // Skills
//       { input: 'skills', output: 'Technical Skills: Frontend (React, Next.js, HTML/CSS, JavaScript), Backend (Node.js, Python, APIs), Design (Figma, Adobe Suite, Blender), AI/ML (AI Awareness, Machine Learning, Data Annotation), Education (Curriculum Design, Workshop Facilitation). Soft Skills: Creativity and Innovation, Team Collaboration, Critical Thinking, Communication and Teaching, Problem Solving.' },
//       { input: 'expertise', output: 'I bring a diverse skill set: full-stack web development, digital art and 3D modeling, AI and machine learning, curriculum design, and workshop facilitation. I am also skilled in project management and creative problem solving.' },
//       { input: 'technologies', output: 'My expertise includes frontend and backend development, UI/UX design, 3D modeling and animation, AI education, and data annotation. I also have strong teaching and facilitation skills.' },
//       { input: 'tech stack', output: 'I am proficient in React, Next.js, Node.js, Python, Figma, Blender, and various AI tools. I also design and deliver educational programs on technology and digital skills.' },

//       // Philosophy
//       { input: 'philosophy', output: 'My philosophy is simple: Curiosity is a superpower. I believe both art and technology are tools for transformation — they connect, inspire, and empower. I am committed to creating meaningful work that tells stories, sharing knowledge and empowering others, using technology to solve real problems, and blending creativity with functionality.' },
//       { input: 'belief', output: 'I believe that creativity and technology together can change the world. My mission is to use my skills to create impactful work and help others do the same.' },
//       { input: 'values', output: 'My values center on curiosity, creativity, and community. I believe in lifelong learning, collaborative creation, and using technology for good.' },
//       { input: 'mission', output: 'My mission is to use art and technology to create meaningful work, empower others, and solve real problems. I believe in the power of creativity and innovation.' },

//       // Collaboration
//       { input: 'collaborate', output: 'I am always open to exciting collaborations! Whether you are looking for a creative partner for art projects, a developer for your web or app idea, an educator for tech training, or a consultant for AI or tech initiatives, lets connect!' },
//       { input: 'work together', output: 'Collaboration is at the heart of what I do. I love working with others to bring ideas to life. Feel free to reach out if you have a project in mind.' },
//       { input: 'partner', output: 'I am available for freelance work, partnerships, and educational collaborations. Lets create something meaningful together!' },

//       // Contact
//       { input: 'contact', output: 'I would love to hear from you! Here is how you can reach me: Email: idaeworsamuelprovidence@gmail.com, Call: +234 811 782 0918, WhatsApp: +234 810 866 6501, Twitter/X: @E_sai_Art. Or use the contact form on my website. I typically respond within 24 hours.' },
//       { input: 'email', output: 'You can contact me via email at idaeworsamuelprovidence@gmail.com. I\'m most responsive on email and typically reply within 24 hours.' },
//       { input: 'phone', output: 'You can reach me by phone at +234 811 782 0918. I\'m available during business hours for calls.' },
//       { input: 'whatsapp', output: 'Contact me on WhatsApp at +234 810 866 6501 for quick responses and informal communication.' },

//       // E_sai_Art
//       { input: 'e_sai_art', output: 'E_sai_Art (The Skywalker) is my creative alias — it represents a journey of storytelling, personal growth, and creative reinvention. E_sai_Art embodies: artistic expression and creativity, limitless imagination (like the sky), storytelling through multiple mediums, and constant evolution and growth.' },
//       { input: 'skywalker', output: 'The Skywalker name represents my journey of exploration and growth. It reflects my belief that art and technology can take us to new heights.' },
//       { input: 'meaning', output: 'The name E_sai_Art reflects my creative philosophy: art that reaches for the sky. It symbolizes freedom, imagination, and the endless possibilities of creative expression.' },

//       // Thank You
//       { input: 'thank you', output: 'You are welcome! It is a pleasure to help. Anything else you would like to know?' },
//       { input: 'thanks', output: 'Thanks for your kind words! I am here whenever you need assistance.' },
//       { input: 'appreciate', output: 'My pleasure! Feel free to ask anything else about my work or services.' },

//       // Goodbye
//       { input: 'bye', output: 'Goodbye! It was great chatting with you. Come back anytime! Remember: Curiosity is your superpower.' },
//       { input: 'goodbye', output: 'Take care! Feel free to reach out whenever you have questions or ideas to explore.' },
//       { input: 'see you', output: 'See you later! Keep creating, keep learning, and keep pushing boundaries.' }
//     ]

//     // Convert text to numerical data
//     const inputs = trainingData.map(d => this.textToVector(d.input))
//     const outputs = trainingData.map(d => this.textToVector(d.output))

//     // Create and train the model
//     this.model = tf.sequential()
//     this.model.add(tf.layers.dense({ units: 256, activation: 'relu', inputShape: [100] }))
//     this.model.add(tf.layers.dropout({ rate: 0.2 }))
//     this.model.add(tf.layers.dense({ units: 128, activation: 'relu' }))
//     this.model.add(tf.layers.dropout({ rate: 0.2 }))
//     this.model.add(tf.layers.dense({ units: 64, activation: 'relu' }))
//     this.model.add(tf.layers.dense({ units: 100, activation: 'softmax' }))
    
//     this.model.compile({
//       optimizer: tf.train.adam(0.001),
//       loss: 'categoricalCrossentropy',
//       metrics: ['accuracy']
//     })

//     console.log('Training neural network with', trainingData.length, 'examples...')

//     // Train the model
//     await this.model.fit(tf.tensor2d(inputs), tf.tensor2d(outputs), {
//       epochs: 150,
//       batchSize: 32,
//       shuffle: true,
//       callbacks: {
//         onEpochEnd: (epoch, logs) => {
//           console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${(logs.acc * 100).toFixed(2)}%`)
//         }
//       }
//     })

//     this.isLoaded = true
//     console.log('Neural network training complete!')
//   }

//   textToVector(text) {
//     // Improved vectorization with better feature extraction
//     const vector = new Array(100).fill(0)
//     const words = text.toLowerCase().split(' ')
    
//     // Simple feature extraction
//     for (let i = 0; i < Math.min(words.length, 50); i++) {
//       const word = words[i]
//       // Word length feature
//       vector[i] = word.length / 10
//       // Character frequency features
//       const vowels = (word.match(/[aeiou]/gi) || []).length
//       vector[50 + i] = vowels / word.length || 0
//     }
    
//     // Add some pattern features
//     const commonWords = ['what', 'who', 'how', 'when', 'where', 'why', 'tell', 'show', 'about', 'your']
//     for (let i = 0; i < commonWords.length && i < 50; i++) {
//       if (text.includes(commonWords[i])) {
//         vector[50 + i] = 1
//       }
//     }
    
//     return vector
//   }

//   async predict(input) {
//     if (!this.isLoaded) {
//       await this.train()
//     }
    
//     const vector = this.textToVector(input)
//     const prediction = await this.model.predict(tf.tensor2d([vector]))
//     const output = await prediction.data()
    
//     // Convert prediction back to text
//     return this.vectorToText(output)
//   }

//   vectorToText(vector) {
//     // Improved conversion with better response selection
//     const confidenceThreshold = 0.3
//     const responses = []
    
//     // Map vector values to response patterns
//     const responsePatterns = [
//       { word: 'services', confidence: vector[0] },
//       { word: 'art', confidence: vector[1] },
//       { word: 'development', confidence: vector[2] },
//       { word: 'education', confidence: vector[3] },
//       { word: 'technology', confidence: vector[4] },
//       { word: 'skills', confidence: vector[5] },
//       { word: 'portfolio', confidence: vector[6] },
//       { word: 'contact', confidence: vector[7] },
//       { word: 'collaboration', confidence: vector[8] },
//       { word: 'philosophy', confidence: vector[9] }
//     ]
    
//     // Find the best matching response
//     const bestMatch = responsePatterns.reduce((best, current) => 
//       current.confidence > best.confidence ? current : best
//     )
    
//     // Generate response based on best match
//     if (bestMatch.confidence > confidenceThreshold) {
//       return this.getResponseForIntent(bestMatch.word)
//     }
    
//     // Default fallback
//     return "I would love to help you with that! Could you please tell me more about what you're looking for? I specialize in creative services, technical development, AI training, social media management, and education."
//   }

//   getResponseForIntent(intent) {
//     const responses = {
//       'services': "I offer a wide range of creative and technical services: digital art, 3D modeling, web development, AI training, social media management, and education. What specific service are you interested in?",
//       'art': "I create custom illustrations, digital art, book covers, comics, and character designs using Clip Studio and Adobe Creative Suite. I also work with 3D modeling and animation in Blender.",
//       'development': "I provide full-stack web development services using React, Next.js, Node.js, Python, and various databases. I build responsive, optimized web applications and digital solutions.",
//       'education': "I offer educational services with 10+ years of experience in teaching and mentorship. I tutor in Mathematics, Physics, Chemistry, Computer Science, Frontend Development, and Fine Art.",
//       'technology': "I work with modern technologies including React, Next.js, Node.js, Python, Django, Laravel, and various AI tools. I specialize in full-stack development and AI solutions.",
//       'skills': "I bring diverse skills in frontend and backend development, digital art, 3D modeling, AI training, curriculum design, and workshop facilitation.",
//       'portfolio': "My portfolio includes Country Finder, Game Hub, Upperclass AI, Gvany, Afriak, and various web applications. I build interactive, user-friendly digital experiences.",
//       'contact': "You can reach me at idaeworsamuelprovidence@gmail.com, call +234 811 782 0918, or WhatsApp at +234 810 866 6501. I typically respond within 24 hours.",
//       'collaboration': "I'm open to collaborations in art, technology, and education. Whether you need a creative partner, developer, educator, or consultant, let's connect!",
//       'philosophy': "My philosophy is that curiosity is a superpower. I believe art and technology are tools for transformation and empowerment."
//     }
    
//     return responses[intent] || "I would love to help! Could you tell me more specifically what you're interested in? I specialize in creative services, web development, AI training, and education."
//   }
// }

// export default new ChatbotModel()




















// Component/chatbotModel.js
// Simple chatbot model that doesn't require TensorFlow

class ChatbotModel {
  constructor() {
    this.isLoaded = false
    this.trainingData = []
    this.responseCache = new Map()
  }

  async train() {
    console.log('Building knowledge base...')
    
    // Define your training data - All patterns and responses from geminiMockData
    this.trainingData = [
      // Greetings
      { input: 'hello', output: 'Hey there! Welcome to my creative space. How can I assist you today?' },
      { input: 'hi', output: 'Hello! Great to see you here. What would you like to explore?' },
      { input: 'hey', output: 'Hi! I am here to help you learn more about my work and services.' },
      { input: 'good morning', output: 'Greetings! I am Sam, your virtual assistant. What brings you here today?' },
      { input: 'good afternoon', output: 'Welcome! I am delighted to chat with you. How can I help?' },
      { input: 'good evening', output: 'Hey there! Welcome to my creative space. How can I assist you today?' },
      { input: 'greetings', output: 'Greetings! I am Sam, your virtual assistant. What brings you here today?' },
      { input: 'sup', output: 'Hi! I am here to help you learn more about my work and services.' },
      { input: 'howdy', output: 'Hey there! Welcome to my creative space. How can I assist you today?' },

      // About
      { input: 'who are you', output: 'I am Idaewor S.E Providence — a creative technologist, digital artist, and educator. I blend code, creativity, and teaching to build meaningful solutions. With over 10 years of experience, I have worked across web development, AI, 3D design, and education.' },
      { input: 'tell me about yourself', output: 'I am a multidisciplinary creator passionate about using technology and art to transform ideas into reality. My work spans digital art, web development, AI education, and creative design.' },
      { input: 'introduce yourself', output: 'I am Samuel, a creative technologist who believes in the power of art and code. I have been building digital experiences and teaching technology for over a decade.' },
      { input: 'about you', output: 'I am Idaewor S.E Providence, also known as E_sai_Art. I combine my skills in design, development, and education to create meaningful work and empower others.' },
      { input: 'your background', output: 'I am a creative problem solver who works at the intersection of art, technology, and education. I help people and organizations bring their digital visions to life.' },
      { input: 'your story', output: 'I am Samuel, a creative technologist who believes in the power of art and code. I have been building digital experiences and teaching technology for over a decade.' },
      { input: 'who is samuel', output: 'I am Samuel, a creative technologist who believes in the power of art and code. I have been building digital experiences and teaching technology for over a decade.' },
      { input: 'who is idaewor', output: 'I am Idaewor S.E Providence — a creative technologist, digital artist, and educator. I blend code, creativity, and teaching to build meaningful solutions.' },
      { input: 'about samuel', output: 'I am a multidisciplinary creator passionate about using technology and art to transform ideas into reality. My work spans digital art, web development, AI education, and creative design.' },

      // Artistic Services & Tools
      { input: 'art', output: 'I offer comprehensive artistic services including custom illustrations, logo design, and visual branding solutions using Clip Studio and Adobe Creative Suite. I specialize in digital art, concept art, book covers, comics, and character design.' },
      { input: 'illustration', output: 'As a digital artist, I work with professional tools like Clip Studio Paint and Adobe Creative Suite. I create custom illustrations, design logos, develop visual branding, and produce commissioned artwork.' },
      { input: 'drawing', output: 'My artistic expertise includes 2D art and illustrations, graphic design, and logo creation. I use industry-standard tools including Photoshop, Illustrator, and Clip Studio.' },
      { input: 'artist', output: 'I offer a wide range of artistic services: digital illustrations, book covers, comic art, graphic design, and visual branding. I work with Clip Studio, Adobe Creative Suite, and other professional tools.' },
      { input: 'artistic', output: 'My artistic portfolio includes custom illustrations, branding solutions, concept art, and visual storytelling. I\'m proficient in Clip Studio, Photoshop, Illustrator, and other creative tools.' },
      { input: '2d art', output: 'I specialize in 2D art and illustrations, creating custom artwork for clients. I use professional tools like Clip Studio and Adobe Creative Suite to bring ideas to life.' },
      { input: 'commission', output: 'I accept commissions for custom illustrations, character designs, book covers, and more. Contact me to discuss your project requirements and get a quote.' },
      { input: 'artwork', output: 'My artwork spans multiple styles and mediums. I create custom illustrations, concept art, character designs, and visual storytelling pieces for various projects.' },
      { input: 'concept art', output: 'I specialize in concept art and visual storytelling, creating compelling characters, environments, and narratives for games, books, and other media.' },
      { input: 'visual storytelling', output: 'I bring characters and stories to life through visual storytelling. I create illustrations, comics, and concept art that engage and inspire audiences.' },
      { input: 'book cover', output: 'I design professional book covers that capture the essence of the story. My covers are created with attention to detail and market appeal.' },
      { input: 'comics', output: 'I create comics and sequential art, developing characters and narratives through visual storytelling. My comic art is detailed and expressive.' },
      { input: 'character design', output: 'I design compelling characters for games, comics, and animation. My character designs are unique, expressive, and tailored to your project\'s needs.' },
      { input: 'digital art', output: 'I create digital art using professional tools like Clip Studio Paint and Adobe Creative Suite. My digital artwork includes illustrations, concept art, and character designs.' },
      { input: 'art tools', output: 'I use professional art tools including Clip Studio Paint, Adobe Creative Suite (Photoshop, Illustrator), and Wacom tablets for digital art creation.' },
      { input: 'clip studio', output: 'I use Clip Studio Paint extensively for digital illustration, comic art, and character design. It\'s one of my primary tools for creating professional artwork.' },
      { input: 'adobe creative', output: 'I use Adobe Creative Suite including Photoshop and Illustrator for graphic design, photo editing, and vector artwork. These tools help me create professional visual solutions.' },
      { input: 'creative suite', output: 'Adobe Creative Suite is essential to my workflow for graphic design, illustration, and visual branding. I use Photoshop, Illustrator, and other Adobe tools.' },
      { input: 'photoshop', output: 'I use Adobe Photoshop for photo editing, digital painting, and graphic design. It\'s a key tool in my creative workflow.' },
      { input: 'illustrator', output: 'I use Adobe Illustrator for vector graphics, logo design, and illustration. It\'s perfect for creating scalable graphics and clean designs.' },

      // 3D Services
      { input: '3d', output: 'I specialize in 3D modeling and animation using Blender. My services include sculpting, modeling, and animating captivating 3D visuals for product design, visualization, and creative projects.' },
      { input: 'blender', output: 'With Blender expertise, I offer 3D modeling, sculpting, and animation services. I create product visualizations, 3D renders, and animated content for presentations, marketing, and creative projects.' },
      { input: '3d modeling', output: 'I provide professional 3D services including modeling, texturing, lighting, and animation. Using Blender, I create high-quality 3D renders and visualizations for products, characters, and environments.' },
      { input: '3d animation', output: 'My 3D capabilities include Blender-based modeling, sculpting, and animation. I create product visualizations, 3D assets, and animated sequences for various applications.' },
      { input: 'sculpting', output: 'I offer comprehensive 3D services from concept to final render. Using Blender, I create 3D models, animations, and visualizations for product design, advertising, and creative projects.' },
      { input: '3d render', output: 'I create high-quality 3D renders and visualizations using Blender. My renders are photorealistic and suitable for product design, marketing, and creative projects.' },
      { input: 'product design', output: 'I provide 3D product design and visualization services using Blender. I create detailed 3D models and renders for product development and marketing.' },
      { input: '3d visualization', output: 'I specialize in 3D visualization for products, architecture, and creative projects. Using Blender, I create immersive visualizations that bring ideas to life.' },
      { input: 'animation', output: 'I create professional animations using Blender. My animation services include product animations, character animations, and motion graphics for various applications.' },
      { input: '3d artist', output: 'As a 3D artist, I create models, animations, and visualizations using Blender. My work includes organic and hard-surface modeling for various industries.' },
      { input: 'rendering', output: 'I provide professional rendering services using Blender. I create high-quality renders for product design, architecture, and creative projects.' },

      // Technical Services
      { input: 'web development', output: 'I am a full-stack developer with expertise in modern web technologies. My technical skills include: Frontend (React, Next.js, HTML/CSS, Tailwind, JavaScript), Backend (Node.js, Laravel, Django, Express, Python), Databases (MySQL, MongoDB), and Mobile (React Native).' },
      { input: 'frontend', output: 'I specialize in frontend development using React, Next.js, HTML/CSS, Tailwind, and JavaScript. I build responsive, user-friendly interfaces that provide excellent user experiences.' },
      { input: 'backend', output: 'I offer backend development services using Node.js, Python, Django, Laravel, and Express. I build robust APIs, server-side logic, and database integrations.' },
      { input: 'full-stack', output: 'I provide full-stack development services including frontend and backend development, database design, SEO optimization, and end-to-end digital solutions.' },
      { input: 'app development', output: 'I build web and mobile applications using modern technologies. My app development includes React, Next.js, React Native, and Flutter for cross-platform solutions.' },
      { input: 'website', output: 'I create professional websites and web applications using React, Next.js, and modern frontend frameworks. My websites are responsive, optimized, and user-friendly.' },
      { input: 'web app', output: 'I build web applications with React, Next.js, and Node.js. My web apps are scalable, performant, and built with modern best practices.' },
      { input: 'react', output: 'I specialize in React development for building dynamic user interfaces. I create reusable components, manage state effectively, and build performant React applications.' },
      { input: 'nextjs', output: 'I use Next.js for server-side rendering, static site generation, and building modern web applications. Next.js is my primary framework for React development.' },
      { input: 'nodejs', output: 'I use Node.js for backend development, building REST APIs, and server-side applications. I\'m proficient with Express.js and various Node.js frameworks.' },
      { input: 'javascript', output: 'I\'m proficient in JavaScript (ES6+) for both frontend and backend development. I use modern JavaScript features and best practices.' },
      { input: 'tailwind', output: 'I use Tailwind CSS for utility-first styling and rapid UI development. It\'s my preferred CSS framework for building responsive interfaces.' },
      { input: 'html', output: 'I write semantic, accessible HTML for web development. I ensure clean, well-structured markup that follows best practices.' },
      { input: 'css', output: 'I create responsive, modern CSS layouts using Flexbox, Grid, and CSS frameworks. I ensure cross-browser compatibility and pixel-perfect designs.' },
      { input: 'php', output: 'I use PHP for backend development, including Laravel framework. I build robust, secure server-side applications with PHP.' },
      { input: 'laravel', output: 'I use Laravel for PHP development, building scalable web applications with MVC architecture. I\'m experienced with Laravel\'s ecosystem and features.' },
      { input: 'mysql', output: 'I work with MySQL for relational database design and management. I create efficient database schemas and optimize queries.' },
      { input: 'mongodb', output: 'I use MongoDB for NoSQL database solutions. I design flexible, scalable database structures for modern applications.' },
      { input: 'python', output: 'I use Python for backend development, AI, and data processing. I\'m experienced with Django, Flask, and various Python libraries.' },
      { input: 'java', output: 'I have experience with Java for enterprise applications and Android development. I write clean, maintainable Java code.' },
      { input: 'reactnative', output: 'I use React Native for mobile app development, building cross-platform applications for iOS and Android.' },
      { input: 'express', output: 'I use Express.js for building REST APIs and backend applications with Node.js. I create efficient, scalable server-side solutions.' },
      { input: 'git', output: 'I use Git for version control and collaborative development. I follow Git best practices for branching, committing, and merging.' },
      { input: 'wordpress', output: 'I develop WordPress sites with custom themes and plugins. I also provide WordPress maintenance and optimization services.' },
      { input: 'ui/ux', output: 'I design user interfaces and user experiences using Figma and Framer. I create intuitive, engaging designs that enhance user satisfaction.' },
      { input: 'prototyping', output: 'I create prototypes using Figma and Framer for web and mobile applications. My prototypes are interactive and user-tested.' },
      { input: 'programming', output: 'I\'m proficient in multiple programming languages including JavaScript, Python, PHP, and Java. I write clean, efficient, and maintainable code.' },
      { input: 'developer', output: 'I\'m a full-stack developer with expertise in React, Next.js, Node.js, and modern web technologies. I build scalable, optimized digital solutions.' },
      { input: 'tech stack', output: 'My tech stack includes React, Next.js, Node.js, Python, Django, Laravel, MongoDB, MySQL, and various modern frameworks. I work with cutting-edge technologies.' },

      // AI Training & Data Annotation
      { input: 'ai', output: 'I am an AI Training Specialist with expertise in prompt engineering and data annotation. I develop and optimize training prompts for conversational AI models, curate diverse datasets to improve model robustness and reduce bias, and implement prompt engineering strategies that increase model accuracy by up to 35%.' },
      { input: 'artificial intelligence', output: 'As an AI Trainer & Data Annotator at Multi Mango, I specialize in optimizing prompts that transform AI interactions across creative writing, Q&A systems, summarization, and sentiment analysis. I have developed comprehensive prompt libraries for various use cases and industries.' },
      { input: 'machine learning', output: 'My AI services include prompt engineering, LLM fine-tuning, data curation and annotation, model evaluation and testing, and AI ethics & bias mitigation. I\'ve collaborated with cross-functional teams to align AI outputs with business objectives.' },
      { input: 'ml', output: 'I specialize in AI prompt engineering and LLM optimization. I create structured prompts for various applications including creative text generation, Q&A systems, summarization, sentiment analysis, and chatbot development.' },
      { input: 'prompt engineering', output: 'I offer AI training services including prompt optimization, data annotation, and model evaluation. I\'ve worked on AI chatbots, story generators, resume analyzers, and various other AI applications.' },
      { input: 'llm', output: 'I work with Large Language Models (LLMs) for prompt engineering and optimization. I create effective prompts for various AI applications and use cases.' },
      { input: 'data annotation', output: 'I provide data annotation services for AI training. I curate diverse datasets to improve model robustness and reduce bias.' },
      { input: 'ai trainer', output: 'As an AI Trainer, I develop and optimize training prompts for conversational AI models. I implement strategies that increase model accuracy and performance.' },
      { input: 'chatbot', output: 'I\'ve worked on AI chatbot development, including prompt engineering and conversation design. I create natural, user-centric chatbot interactions.' },
      { input: 'llm specialist', output: 'I specialize in LLM optimization and prompt engineering. I create comprehensive prompt libraries for various use cases and industries.' },

      // Social Media Services
      { input: 'social media', output: 'I offer comprehensive social media management services including platform optimization, content strategy, paid advertising, and community building. I design targeted content strategies that boost engagement, build brand identity, and increase reach across Instagram, TikTok, Twitter, YouTube, and Facebook.' },
      { input: 'social media management', output: 'My social media expertise includes content strategy, post creation and scheduling, paid ads management, video editing, and campaign optimization. I create algorithm-friendly content tailored for each platform.' },
      { input: 'content creation', output: 'I create compelling content for social media platforms including posts, videos, stories, and ads. My content is designed to engage audiences and drive results.' },
      { input: 'video editing', output: 'I provide professional video editing services for social media, including reels, stories, ads, and educational content. I create compelling short-form and long-form videos.' },
      { input: 'post creation', output: 'I create engaging social media posts with compelling visuals and copy. My posts are optimized for each platform and designed to drive engagement.' },
      { input: 'scheduling', output: 'I manage social media scheduling and content calendars to ensure consistent posting and optimal engagement times across all platforms.' },
      { input: 'paid ads', output: 'I manage paid advertising campaigns across social media platforms. I create data-driven campaigns that convert views into loyal followers and sales.' },
      { input: 'marketing', output: 'I provide marketing services including social media strategy, content marketing, and campaign management. I help brands grow their online presence and reach.' },
      { input: 'campaign', output: 'I create and manage marketing campaigns across social media platforms. My campaigns are data-driven and optimized for maximum ROI.' },

      // Educational Services
      { input: 'education', output: 'I offer educational services with over 10 years of experience in teaching and mentorship. I provide 1-on-1 tutoring for all ages (3 to adult) in Mathematics, Physics, Chemistry, Sciences, Computer Science, Frontend Development, Video Editing, and 2D Drawing.' },
      { input: 'teaching', output: 'I am an experienced teacher with 10+ years of experience across multiple subjects and age groups. I provide personalized instruction in Mathematics, Physics, Chemistry, Computer Science, and Fine Art.' },
      { input: 'tutor', output: 'I offer one-on-one tutoring services for all ages and skill levels. I specialize in Mathematics, Physics, Chemistry, Computer Science, and Frontend Development.' },
      { input: 'mentorship', output: 'I provide mentorship programs for students and professionals in technology, art, and education. I help people develop skills and achieve their goals.' },
      { input: 'workshop', output: 'I facilitate workshops and bootcamps in web development, coding, AI, and digital art. My workshops are hands-on and practical.' },
      { input: 'learn', output: 'I help people learn various subjects including Mathematics, Physics, Chemistry, Computer Science, and Frontend Development. My teaching approach is practical and engaging.' },
      { input: 'training', output: 'I provide training programs in technology, digital skills, and creative arts. I\'ve trained over 500 students across various programs and institutions.' },
      { input: 'curriculum', output: 'I design educational curricula for technology programs, coding bootcamps, and digital skills training. My curricula are comprehensive and practical.' },

      // Computer Science & Programming Education
      { input: 'computer science', output: 'I teach Computer Science and Programming with expertise in Frontend Development (React, Next.js, HTML/CSS), Python, JavaScript, and software development principles. I\'ve facilitated coding bootcamps and programs at Edo State Innovation Center, Teklearn, and GiveHerTech.' },
      { input: 'programming', output: 'I teach programming to students of all ages and skill levels. I cover concepts from basic programming to advanced software development.' },
      { input: 'coding', output: 'I teach coding and software development with a focus on practical, hands-on learning. I cover JavaScript, Python, React, and Next.js.' },
      { input: 'software development', output: 'I teach software development principles including algorithms, data structures, and best practices. I help students build real-world applications.' },
      { input: 'coding bootcamp', output: 'I facilitate coding bootcamps for beginners and intermediate learners. My bootcamps cover web development, programming, and software engineering fundamentals.' },

      // Portfolio & Projects
      { input: 'portfolio', output: 'My portfolio includes various web development projects: Country Finder (interactive country data app), Game Hub (Xavier-themed games optimized for mobile), Upperclass AI (AI-driven LMS platform), Gvany (project delivery services in Africa), Afriak (indigenous fashion marketplace), JCINUNIBEN (EBL Masterclass website), TPN Consult (LMS in development), Trashpoint (WordPress site), OSA Heritage (WordPress site), and Obel (oil & gas industry website).' },
      { input: 'projects', output: 'I\'ve built diverse projects including interactive web apps, e-commerce platforms, learning management systems, and business websites. Notable projects include Country Finder, Game Hub, Upperclass AI, Gvany, Afriak, and JCINUNIBEN.' },
      { input: 'country finder', output: 'Country Finder is an interactive web app that shows countries, maps, weather, travel data, and more. It\'s built with HTML, CSS, JavaScript, and Firebase.' },
      { input: 'game hub', output: 'Game Hub is a collection of Xavier-themed games optimized for mobile with smooth swipe and touch controls. Each game delivers unique gameplay mechanics and progressively challenging levels.' },
      { input: 'upperclass ai', output: 'Upperclass AI is an AI-driven LMS platform for machine learning, web development, and other skills. It\'s built with Django and Vite, featuring intelligent chatbots and interactive training.' },
      { input: 'gvany', output: 'Gvany is a project delivery services website serving Nigeria, Kenya, Uganda, Ghana, and Ivory Coast. It\'s built with Next.js, Tailwind CSS, Framer, and Node.js.' },
      { input: 'afriak', output: 'Afriak is a digital marketplace celebrating indigenous fashion. It spotlights local artisans, shares stories, and brings authentic African designs to the world.' },
      { input: 'show work', output: 'I showcase my work across multiple domains including web development, digital art, 3D modeling, and education. You can see examples of my projects in the portfolio section.' },
      { input: 'my projects', output: 'I\'ve built websites, web applications, and digital products across various industries. My projects demonstrate full-stack development capabilities and creative design.' },

      // Tools
      { input: 'tools', output: 'I use a variety of professional tools across different disciplines: Art & Design - Clip Studio Paint, Adobe Creative Suite (Photoshop, Illustrator), Blender for 3D; Development - VS Code, Git, Figma, Framer; AI - Various LLM platforms and prompt engineering tools; Education - Various e-learning platforms and teaching tools.' },
      { input: 'software', output: 'My primary software tools include Clip Studio Paint, Adobe Creative Suite, Blender, VS Code, Figma, and various AI platforms.' },
      { input: 'what do you use', output: 'I work with industry-standard tools: Clip Studio and Adobe Creative Cloud for artistic work, Blender for 3D, VS Code and Git for development, Figma and Framer for UI/UX design.' },
      { input: 'your tools', output: 'My creative toolkit includes Clip Studio, Adobe Creative Suite, Blender, Figma, and VS Code. I also use various development tools, AI platforms, and productivity software.' },
      { input: 'figma', output: 'I use Figma for UI/UX design and prototyping. It\'s my primary tool for creating user interfaces and interactive prototypes.' },
      { input: 'vscode', output: 'VS Code is my preferred code editor for web development. I use it with various extensions for JavaScript, React, Python, and other languages.' },

      // Hire/Client Information
      { input: 'hire', output: 'I am available for freelance work, consultations, and project-based collaborations! To discuss rates, timelines, and project details, please contact me directly at idaeworsamuelprovidence@gmail.com or call +234 811 782 0918. I\'m also available on WhatsApp at +234 810 866 6501.' },
      { input: 'client', output: 'I\'m currently accepting new clients and projects! Whether you need creative services, technical development, AI training, or educational programs, I\'d love to work with you.' },
      { input: 'work together', output: 'I am open to freelance projects, consultations, and collaborations. Rates depend on project scope and requirements. Contact me to discuss your project needs.' },
      { input: 'contract', output: 'I work on contract basis for projects ranging from creative services to full-stack development. Contact me to discuss your project requirements and timeline.' },
      { input: 'freelance', output: 'I\'m available for freelance work across multiple disciplines including art, web development, AI training, and education.' },
      { input: 'rates', output: 'Rates depend on project scope and requirements. I offer competitive pricing for quality services. Contact me for a custom quote.' },
      { input: 'availability', output: 'I am currently available for new projects and collaborations. My services include artistic work, technical development, AI training, social media management, and educational programs.' },

      // Shop
      { input: 'shop', output: 'I have an art merch shop where you can find my designs on various products! From apparel to accessories, my artwork is available on high-quality items.' },
      { input: 'store', output: 'You can browse and purchase my art on Redbubble! I have a collection of designs available on t-shirts, hoodies, stickers, phone cases, and more.' },
      { input: 'merch', output: 'My art merch is available online! I sell my designs on various products through Redbubble. Check out the collection here.' },
      { input: 'redbubble', output: 'Support my art by purchasing merch! I have a shop on Redbubble featuring my designs on a variety of products.' },

      // Services
      { input: 'services', output: 'I offer a wide range of creative and technical services: digital art and illustrations, book covers and comics, 3D modeling and product design, video editing and animation, web development (frontend and backend), mobile app development, AI and machine learning solutions, data annotation and training, and tech education and training.' },
      { input: 'offer', output: 'My services include creative design, web and app development, AI training, and education. Whether you need a website, a mobile app, digital art, or training programs, I can help.' },
      { input: 'what can you do', output: 'I provide end-to-end digital solutions: from concept to deployment. This includes UI/UX design, full-stack development, 3D product visualization, video production, and technology education.' },
      { input: 'help with', output: 'I specialize in creative and technical services: digital art and illustration, web and mobile development, AI and data solutions, and educational programs for all ages.' },

      // Skills
      { input: 'skills', output: 'Technical Skills: Frontend (React, Next.js, HTML/CSS, JavaScript), Backend (Node.js, Python, APIs), Design (Figma, Adobe Suite, Blender), AI/ML (AI Awareness, Machine Learning, Data Annotation), Education (Curriculum Design, Workshop Facilitation). Soft Skills: Creativity and Innovation, Team Collaboration, Critical Thinking, Communication and Teaching, Problem Solving.' },
      { input: 'expertise', output: 'I bring a diverse skill set: full-stack web development, digital art and 3D modeling, AI and machine learning, curriculum design, and workshop facilitation. I am also skilled in project management and creative problem solving.' },
      { input: 'technologies', output: 'My expertise includes frontend and backend development, UI/UX design, 3D modeling and animation, AI education, and data annotation. I also have strong teaching and facilitation skills.' },
      { input: 'tech stack', output: 'I am proficient in React, Next.js, Node.js, Python, Figma, Blender, and various AI tools. I also design and deliver educational programs on technology and digital skills.' },

      // Philosophy
      { input: 'philosophy', output: 'My philosophy is simple: Curiosity is a superpower. I believe both art and technology are tools for transformation — they connect, inspire, and empower. I am committed to creating meaningful work that tells stories, sharing knowledge and empowering others, using technology to solve real problems, and blending creativity with functionality.' },
      { input: 'belief', output: 'I believe that creativity and technology together can change the world. My mission is to use my skills to create impactful work and help others do the same.' },
      { input: 'values', output: 'My values center on curiosity, creativity, and community. I believe in lifelong learning, collaborative creation, and using technology for good.' },
      { input: 'mission', output: 'My mission is to use art and technology to create meaningful work, empower others, and solve real problems. I believe in the power of creativity and innovation.' },






{ input: 'budget', output: 'For pricing inquiries, I recommend we discuss your specific project requirements directly. My rates are flexible and depend on the scope of work, whether it\'s a one-time project or ongoing engagement. I offer competitive rates for both project-based and hourly work. Contact me at idaeworsamuelprovidence@gmail.com or call +234 811 782 0918 to discuss your budget and get a custom quote tailored to your needs.' },
{ input: 'price', output: 'My pricing is project-dependent and varies based on complexity, timeline, and deliverables. I offer flexible arrangements including fixed project rates and hourly consultations. For an accurate quote, please reach out to discuss your specific requirements. Email: idaeworsamuelprovidence@gmail.com or WhatsApp: +234 810 866 6501.' },
{ input: 'cost', output: 'Costs vary depending on the scope and nature of your project. I provide transparent, competitive pricing for all my services. Whether you need creative work, technical development, or educational services, I\'ll work within your budget. Contact me for a free consultation and custom quote.' },
{ input: 'rates', output: 'I offer flexible pricing structures including: • Project-based fixed rates for defined scopes • Hourly rates for consultations and ongoing work • Retainer arrangements for long-term collaborations. Let\'s discuss your specific needs and I\'ll provide a competitive quote that fits your budget.' },
{ input: 'pricing', output: 'My pricing is customized to each project\'s unique requirements. I believe in transparent, fair pricing that delivers value. Whether you need a one-time project, ongoing support, or consultation, I\'ll work with you to find a pricing structure that works. Contact me for a detailed quote.' },

// Project vs Hourly
{ input: 'project based', output: 'I offer both project-based and hourly pricing options. For well-defined projects with clear deliverables, I provide fixed-rate quotes. For ongoing work, consultations, or projects with evolving requirements, I offer competitive hourly rates. Let\'s discuss your needs to determine the best pricing structure for you.' },
{ input: 'hourly', output: 'I charge competitive hourly rates for consultations, mentoring, and projects with flexible scopes. My hourly rate reflects my 10+ years of experience and diverse skill set. For specific projects, I often provide a fixed quote that can be more cost-effective. Contact me to discuss your project and get a custom quote.' },


// Certifications & Education
{ input: 'certification', output: 'I hold a BSc in Computer Science, providing me with a strong foundation in software development, algorithms, data structures, and computational thinking. Additionally, I have a NIIT degree in CompTIA A+, certifying my expertise in hardware troubleshooting, system maintenance, and software installation and management.' },
{ input: 'bsc', output: 'I earned my Bachelor of Science (BSc) in Computer Science, where I gained comprehensive knowledge in programming, database management, software engineering, and computer systems. This academic foundation combines with my practical experience to deliver high-quality technical solutions.' },
{ input: 'computer science', output: 'I hold a BSc in Computer Science, which provides me with deep expertise in: • Programming and Software Development • Data Structures and Algorithms • Database Design and Management • Software Engineering Principles • Computer Systems and Architecture. This academic background, combined with my practical experience, enables me to deliver robust technical solutions.' },
{ input: 'niit', output: 'I earned my CompTIA A+ certification from NIIT, demonstrating my expertise in: • Hardware Configuration and Troubleshooting • System Maintenance and Repair • Software Installation and Management • Networking Fundamentals • Security Best Practices. This certification complements my BSc in Computer Science, giving me comprehensive technical skills.' },
{ input: 'comptia', output: 'I hold a CompTIA A+ certification through NIIT, which validates my skills in IT support, hardware configuration, system maintenance, and software management. This certification ensures I can handle technical challenges effectively and maintain high-performance systems.' },
{ input: 'comptia a+', output: 'My CompTIA A+ certification from NIIT covers essential IT skills including hardware diagnostics, system troubleshooting, software installation, and network configuration. This practical certification, combined with my BSc in Computer Science, makes me well-equipped to handle diverse technical challenges.' },
{ input: 'edo innovate', output: 'I am a graduate of the Edo Innovate Software Development program, where I received advanced training in modern web development technologies. This intensive program covered full-stack development, industry best practices, and real-world project delivery, further strengthening my technical capabilities.' },
{ input: 'software development', output: 'I completed an intensive Software Development program at Edo Innovate, where I gained hands-on experience in modern web technologies, full-stack development, and practical software engineering. This program enhanced my skills in React, Next.js, Node.js, and industry-standard development practices.' },

// Qualifications Combined
{ input: 'qualifications', output: 'My qualifications include: • BSc in Computer Science (Academic Foundation) • CompTIA A+ Certification from NIIT (IT Support & Hardware) • Edo Innovate Software Development Program (Advanced Full-Stack) • 10+ Years of Practical Experience • Over 500 Students Trained. I combine academic knowledge with industry certifications and extensive practical experience.' },
{ input: 'education background', output: 'I hold a BSc in Computer Science, complemented by a CompTIA A+ certification from NIIT, and completed the Edo Innovate Software Development program. This combination gives me a strong foundation in computer science principles, practical IT support skills, and modern software development expertise.' },
{ input: 'credentials', output: 'My professional credentials include: • Bachelor of Science in Computer Science • CompTIA A+ Certification (NIIT) • Edo Innovate Software Development Graduate • 10+ Years in Creative Technology • Proven Track Record in Teaching and Development. I continuously update my skills to stay current with industry trends.' },
{ input: 'what are your qualifications', output: 'I hold a BSc in Computer Science and a CompTIA A+ certification from NIIT, and I am a graduate of the Edo Innovate Software Development program. These credentials, combined with over 10 years of practical experience, ensure I deliver professional, high-quality services across creative, technical, and educational fields.' },
{ input: 'degree', output: 'I hold a Bachelor of Science degree in Computer Science, which provides me with strong theoretical and practical knowledge in computing, programming, and systems development. This academic background is complemented by professional certifications and extensive real-world experience.' },










      
      // Collaboration
      { input: 'collaborate', output: 'I am always open to exciting collaborations! Whether you are looking for a creative partner for art projects, a developer for your web or app idea, an educator for tech training, or a consultant for AI or tech initiatives, lets connect!' },
      { input: 'work together', output: 'Collaboration is at the heart of what I do. I love working with others to bring ideas to life. Feel free to reach out if you have a project in mind.' },
      { input: 'partner', output: 'I am available for freelance work, partnerships, and educational collaborations. Lets create something meaningful together!' },

      // Contact
      { input: 'contact', output: 'I would love to hear from you! Here is how you can reach me: Email: idaeworsamuelprovidence@gmail.com, Call: +234 811 782 0918, WhatsApp: +234 810 866 6501, Twitter/X: @E_sai_Art. Or use the contact form on my website. I typically respond within 24 hours.' },
      { input: 'email', output: 'You can contact me via email at idaeworsamuelprovidence@gmail.com. I\'m most responsive on email and typically reply within 24 hours.' },
      { input: 'phone', output: 'You can reach me by phone at +234 811 782 0918. I\'m available during business hours for calls.' },
      { input: 'whatsapp', output: 'Contact me on WhatsApp at +234 810 866 6501 for quick responses and informal communication.' },

      // E_sai_Art
      { input: 'e_sai_art', output: 'E_sai_Art (The Skywalker) is my creative alias — it represents a journey of storytelling, personal growth, and creative reinvention. E_sai_Art embodies: artistic expression and creativity, limitless imagination (like the sky), storytelling through multiple mediums, and constant evolution and growth.' },
      { input: 'skywalker', output: 'The Skywalker name represents my journey of exploration and growth. It reflects my belief that art and technology can take us to new heights.' },
      { input: 'meaning', output: 'The name E_sai_Art reflects my creative philosophy: art that reaches for the sky. It symbolizes freedom, imagination, and the endless possibilities of creative expression.' },

      // Thank You
      { input: 'thank you', output: 'You are welcome! It is a pleasure to help. Anything else you would like to know?' },
      { input: 'thanks', output: 'Thanks for your kind words! I am here whenever you need assistance.' },
      { input: 'appreciate', output: 'My pleasure! Feel free to ask anything else about my work or services.' },

      // Goodbye
      { input: 'bye', output: 'Goodbye! It was great chatting with you. Come back anytime! Remember: Curiosity is your superpower.' },
      { input: 'goodbye', output: 'Take care! Feel free to reach out whenever you have questions or ideas to explore.' },
      { input: 'see you', output: 'See you later! Keep creating, keep learning, and keep pushing boundaries.' }
    ]

    // Build keyword index for faster lookups
    this.keywordIndex = new Map()
    this.trainingData.forEach(item => {
      const words = item.input.toLowerCase().split(' ')
      words.forEach(word => {
        if (word.length > 2) {
          if (!this.keywordIndex.has(word)) {
            this.keywordIndex.set(word, [])
          }
          this.keywordIndex.get(word).push(item)
        }
      })
    })

    this.isLoaded = true
    console.log('Knowledge base built with', this.trainingData.length, 'entries!')
    console.log('Keyword index has', this.keywordIndex.size, 'unique keywords')
  }

  async predict(input) {
    if (!this.isLoaded) {
      await this.train()
    }

    const lowerInput = input.toLowerCase()
    
    // Check cache first
    if (this.responseCache.has(lowerInput)) {
      return this.responseCache.get(lowerInput)
    }

    // Score each training item based on keyword matches
    const scores = new Map()
    const inputWords = lowerInput.split(' ')
    
    this.trainingData.forEach(item => {
      let score = 0
      const itemWords = item.input.toLowerCase().split(' ')
      
      // Check exact phrase matches
      if (lowerInput.includes(item.input.toLowerCase())) {
        score += 10
      }
      
      // Check word matches
      inputWords.forEach(word => {
        if (itemWords.some(itemWord => itemWord.includes(word) || word.includes(itemWord))) {
          score += 1
        }
      })
      
      // Check partial matches
      itemWords.forEach(itemWord => {
        if (lowerInput.includes(itemWord) && itemWord.length > 3) {
          score += 2
        }
      })
      
      if (score > 0) {
        scores.set(item, score)
      }
    })

    // Find the best match
    let bestMatch = null
    let bestScore = 0
    
    for (const [item, score] of scores) {
      if (score > bestScore) {
        bestScore = score
        bestMatch = item
      }
    }

    // If we found a good match (score > 3), return it
    if (bestMatch && bestScore > 3) {
      const response = bestMatch.output
      this.responseCache.set(lowerInput, response)
      return response
    }

    // Check for related topics
    const relatedTopics = {
      'art': ['illustration', 'drawing', 'artist', 'digital', 'paint', 'sketch', 'creative'],
      'development': ['web', 'coding', 'programming', 'software', 'app', 'react', 'nextjs'],
      'services': ['offer', 'help', 'provide', 'available', 'work'],
      'education': ['teach', 'learn', 'tutor', 'mentor', 'workshop', 'class']
    }

    for (const [topic, keywords] of Object.entries(relatedTopics)) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        const topicMatch = this.trainingData.find(item => 
          item.input.toLowerCase().includes(topic)
        )
        if (topicMatch) {
          this.responseCache.set(lowerInput, topicMatch.output)
          return topicMatch.output
        }
      }
    }

    // Default response
    const defaultResponse = "I would love to help with that! Could you tell me more specifically what you're looking for? I specialize in creative services, web development, AI training, social media management, and education. Feel free to ask about any of these areas!"
    
    this.responseCache.set(lowerInput, defaultResponse)
    return defaultResponse
  }
}

export default new ChatbotModel()