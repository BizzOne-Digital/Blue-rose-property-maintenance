export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "booking",
    question: "How do I book a service?",
    answer:
      "Use our online booking form to select your service, preferred date and contact details. We'll review your request and confirm your appointment.",
  },
  {
    id: "pricing",
    question: "Are the prices on the website final?",
    answer:
      "Prices shown are starting prices. Final pricing may vary based on property size, condition and specific requirements. We'll provide an exact quote before confirming.",
  },
  {
    id: "services",
    question: "Can I book multiple services at once?",
    answer:
      "Yes. Blue Rose offers carpet cleaning, home cleaning, lawn care and snow removal — one company for year-round property care.",
  },
  {
    id: "confirmation",
    question: "When is my appointment confirmed?",
    answer:
      "Your appointment is confirmed once our team reviews your booking request and contacts you with availability and final pricing.",
  },
  {
    id: "area",
    question: "What areas do you serve?",
    answer:
      "We provide residential property maintenance services in Regina, SK and surrounding areas. Contact us to confirm availability for your address.",
  },
];
