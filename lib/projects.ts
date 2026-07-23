export interface Challenge {
  title: string;
  solution: string;
}

export interface Project {
  index: string;
  slug: string;
  title: string;
  tags: string[];
  description: string;
  github: string;
  live: string;
  image: string;
  architecture: string;
  challenges: Challenge[];
}

export const projects: Project[] = [
  {
    index: "01",
    slug: "zyro",
    title: "ZYRO Jewel Box",
    tags: ["React.js", "Node.js", "MongoDB", "Gemini AI", "Groq"],
    description: "A luxury AI-powered e-commerce platform featuring virtual try-ons and personalized styling consultations.",
    github: "https://github.com/jeetu-programmer7887/ZYRO-TheJewelBox.git",
    live: "https://zyro-jewellery.vercel.app",
    image: "/project1.png",
    architecture: "ZYRO is built on a scalable MERN stack, deliberately optimized for high-performance e-commerce. The frontend utilizes React 18 with Vite, implementing the Intersection Observer API for silky 60fps infinite scrolling. The backend acts as an orchestration layer, integrating Google Gemini and Groq (Llama 3) for the AI styling engine, while Brevo handles transactional emails. MongoDB handles complex SKU-level inventory with selective data projection to keep API payloads minimal.",
    challenges: [
      {
        title: "Automated Order Status Management",
        solution: "Manually tracking and updating order statuses is prone to human error and creates bottlenecks at scale. I engineered a Node.js cron job that executes precisely at the top of every hour to automatically evaluate timestamps and transition order statuses across the database, ensuring seamless operational flow without manual intervention."
      },
      {
        title: "AI Virtual Try-On Pipeline",
        solution: "Coordinating two different AI models seamlessly. I used Groq (Llama 3) for rapid analysis of user portraits (skin undertones) and piped that context into Google Gemini to generate custom visualization composites in real-time."
      },
      {
        title: "Loyalty State Management",
        solution: "Built a custom ZYRO Coin System where users earn 10% back. Engineered automated expiration and deduction logic tied directly to the order lifecycle, ensuring returns automatically reverse loyalty point balances."
      }
    ]
  },
  {
    index: "02",
    slug: "jsocial",
    title: "JSocial",
    tags: ["React", "Socket.IO", "Render", "MongoDB", "Redux"],
    description: "A full-stack real-time social platform featuring instant messaging, live notifications, and a follow-based network.",
    github: "https://github.com/jeetu-programmer7887/jsocial.git",
    live: "https://jeesocial.netlify.app",
    image: "/project2.png",
    architecture: "JSocial's architecture is explicitly designed around real-time data flow. Unlike standard stateless API backends, JSocial is deployed to Render specifically to maintain persistent WebSocket connections—a requirement that serverless platforms cannot fulfill. The frontend consumes these socket events through a React Context provider, ensuring a single source of truth for presence, typing indicators, and notifications across the entire application.",
    challenges: [
      {
        title: "Socket Race Conditions",
        solution: "Faced intermittent notification failures because multiple components were opening independent socket connections, overwriting the user's socket ID on the server. Fixed this by lifting the Socket.IO instance into a top-level React Context, ensuring a single shared connection per user."
      },
      {
        title: "Cross-Domain Cookie Authentication",
        solution: "With a Netlify frontend and Render backend, standard cookies were being dropped by the browser. Configured the Express backend to issue httpOnly JWT cookies with strict cross-origin policies (sameSite: 'none' + secure: true), securing the app against XSS while allowing decoupled hosting."
      },
      {
        title: "Split-Brain Unread Counters",
        solution: "The unread message badge was initially driven by raw DOM events and local socket state, leading to out-of-sync counters. Refactored the notification pipeline to funnel all socket events into a centralized Redux store, establishing a strict one-way data flow."
      }
    ]
  },
  {
    index: "03",
    slug: "jpsyche",
    title: "JPsyche",
    tags: ["Next.js 16", "TypeScript", "Clerk", "Tailwind v4"],
    description: "An AI-powered virtual psychiatrist app featuring intelligent conversation branching and multi-language text-to-speech.",
    github: "https://github.com/jeetu-programmer7887/JPsyche.git",
    live: "https://jpsyche.vercel.app",
    image: "/project3.png",
    architecture: "JPsyche is built on the Next.js App Router to leverage React Server Components for optimal performance and SEO. The authentication layer is handled securely via Clerk, utilizing modal flows to prevent jarring redirects. Data mutations are handled optimistically using SWR for snappy UI feedback, and the UI is powered by a semantic CSS custom property system integrated directly with Tailwind v4 for seamless theme toggling.",
    challenges: [
      {
        title: "Intelligent Text-to-Speech Routing",
        solution: "Using the Web Speech API resulted in robotic accents when Hindi text was read by English voices. I implemented an automatic language detection algorithm (checking for Devanagari script) to dynamically route the playback to language-matched neural voices."
      },
      {
        title: "Complex Chat State Forking",
        solution: "Users needed the ability to edit past messages mid-conversation. I engineered a state mutation that slices the message array at the edited index, discards subsequent AI responses, and resubmits the new context to the LLM, seamlessly 'forking' the timeline."
      },
      {
        title: "Mobile Chrome Safe-Area Rendering",
        solution: "The absolute positioning of the chat input was being clipped by iOS bottom bars and Safari browser chrome. Switched from standard 100vh to 100dvh and integrated env(safe-area-inset-bottom) to ensure the chat input always sits perfectly above the hardware notch."
      }
    ]
  }
];