// Client-facing descriptions of the projects, shown on the services site (/work/[slug]).
// Written for business owners: what it does, why it helps, what it changes.
// The technical write-ups for the same projects live in lib/projects.ts (portfolio only).
//
// These are projects built by Jeetu, not client commissions — present them as
// "projects I've built", never as client work or testimonials. No unmeasured numbers.

export interface ShowcaseItem {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  intro: string;
  image: string;
  live: string;
  features: { title: string; text: string }[];
  benefits: string[];
  impact: string[];
  goodFitFor: string[];
  /** Short "for your business" points shown on the home page. */
  uses: string[];
  liveHost: string;
  note?: string;
}

export const showcase: ShowcaseItem[] = [
  {
    slug: "zyro",
    name: "ZYRO Jewel Box",
    kind: "Online store concept",
    summary: "A premium jewellery store with a product catalogue, checkout and a built-in AI stylist.",
    intro:
      "ZYRO is a complete online store for a jewellery brand. Customers can browse the collection, get personal styling advice, see how a piece could look on them, and pay online. Behind the scenes, orders, emails and rewards run on their own.",
    image: "/project1.png",
    live: "https://zyro-jewellery.vercel.app",
    liveHost: "zyro-jewellery.vercel.app",
    uses: [
      "Show your products beautifully on any phone",
      "Let customers enquire or buy in a few taps",
      "Answer common questions automatically",
    ],
    features: [
      {
        title: "Smooth, beautiful catalogue",
        text: "Customers scroll through the full collection without waiting for pages to load, on phone or laptop.",
      },
      {
        title: "AI virtual try-on",
        text: "Shoppers upload a photo and see how a piece could look on them before they buy.",
      },
      {
        title: "Personal styling suggestions",
        text: "The AI stylist recommends pieces that suit each customer, like a helpful salesperson.",
      },
      {
        title: "Secure online payments",
        text: "Customers check out and pay online in a few taps.",
      },
      {
        title: "Automatic order tracking",
        text: "Order statuses update by themselves every hour, and customers get email updates.",
      },
      {
        title: "Rewards for loyal customers",
        text: "Every order earns coins worth 10% back, so customers have a reason to return.",
      },
    ],
    benefits: [
      "Your store keeps selling 24/7, even when the shop is closed.",
      "Less time spent updating orders and answering “where is my order?” messages.",
      "Customers who aren't sure what to buy get guided instead of leaving.",
      "A rewards programme that brings people back for their next purchase.",
    ],
    impact: [
      "Order updates run automatically, so nobody has to track them by hand.",
      "Rewards adjust on their own when an item is returned, so balances are always correct.",
      "Built to handle a growing number of shoppers without slowing down.",
    ],
    goodFitFor: ["Jewellery stores", "Fashion & boutiques", "Gift shops", "Any shop that wants to sell online"],
  },
  {
    slug: "jsocial",
    name: "JSocial",
    kind: "Community app concept",
    summary: "A private member space with instant chat and live notifications.",
    intro:
      "JSocial is a members-only community app. People sign up, follow each other, share updates and chat in real time, with notifications that arrive the moment something happens.",
    image: "/project2.png",
    live: "https://jeesocial.netlify.app",
    liveHost: "jeesocial.netlify.app",
    uses: [
      "A members area for coaches and course creators",
      "Keep clients engaged between sessions",
      "Announcements that actually get seen",
    ],
    features: [
      {
        title: "Instant messaging",
        text: "Members chat one-to-one in real time and can see when the other person is typing.",
      },
      {
        title: "Live notifications",
        text: "New messages, follows and activity appear instantly, without refreshing the page.",
      },
      {
        title: "Follow-based feed",
        text: "Members follow the people they care about and see their updates in one place.",
      },
      {
        title: "Who's online",
        text: "See at a glance which members are active right now.",
      },
      {
        title: "Secure accounts",
        text: "Private sign-in keeps every member's account and messages safe.",
      },
    ],
    benefits: [
      "Give your students, members or customers their own private space to connect.",
      "Real-time conversations keep people engaged and coming back.",
      "Announcements reach everyone instantly instead of getting lost in group chats.",
    ],
    impact: [
      "Messages and notifications arrive instantly, with no refreshing.",
      "Unread counts stay accurate everywhere in the app.",
      "Sign-in stays secure even though the app runs across separate services.",
    ],
    goodFitFor: ["Coaching centres", "Gyms & clubs", "Membership groups", "Communities and alumni networks"],
  },
  {
    slug: "jpsyche",
    name: "JPsyche",
    kind: "AI assistant concept",
    summary: "A friendly assistant that talks and listens in Hindi and English.",
    intro:
      "JPsyche is a supportive AI chat companion. People have natural conversations with it, can edit what they said earlier, and can listen to replies read aloud in a natural Hindi or English voice. It shows what a smart assistant on your own website could do.",
    image: "/project3.png",
    live: "https://jpsyche.vercel.app",
    liveHost: "jpsyche.vercel.app",
    uses: [
      "Answer enquiries 24/7, in your customer’s language",
      "Qualify leads before you call back",
      "Hand off to WhatsApp when it’s time to talk",
    ],
    features: [
      {
        title: "Natural conversations",
        text: "The assistant understands questions in everyday language and replies helpfully.",
      },
      {
        title: "Replies read aloud",
        text: "Answers can be spoken out loud, with the right Hindi or English voice picked automatically.",
      },
      {
        title: "Edit and continue",
        text: "Users can change an earlier message and the conversation continues from there.",
      },
      {
        title: "Private sign-in",
        text: "Each person's conversations stay in their own secure account.",
      },
      {
        title: "Made for phones",
        text: "The chat works smoothly on mobile, including iPhones, with the message box always in view.",
      },
      {
        title: "Light and dark mode",
        text: "Comfortable to read at any time of day.",
      },
    ],
    benefits: [
      "An assistant like this can answer common customer questions 24/7.",
      "Hindi and English support means more of your customers can use it comfortably.",
      "Fewer repeated phone calls for the same questions.",
    ],
    impact: [
      "Spoken replies sound natural in both Hindi and English.",
      "Works smoothly on phones, where most customers will use it.",
    ],
    goodFitFor: ["Clinics (answering common questions)", "Coaching centres (doubt solving)", "Any business that gets the same questions every day"],
    note: "JPsyche is a personal project exploring supportive AI conversation. It is not a medical service.",
  },
];

export function getShowcaseItem(slug: string) {
  return showcase.find((item) => item.slug === slug);
}
