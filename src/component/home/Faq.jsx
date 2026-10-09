import React, { useState } from "react";
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is included in a modern luxury bedroom set?",
      answer:
        "Our bedroom sets can include a bed, bedside tables, wardrobes, dressers, and other matching pieces designed to create a cohesive look.",
    },
    {
      question: "How do I choose the right living room furniture?",
      answer:
        "Consider your room size, layout, seating needs, and interior style to create a comfortable and well-balanced living space.",
    },
    {
      question: "Is a 6-seater dining set suitable for family dining?",
      answer:
        "Yes, a 6-seater dining set provides comfortable seating for families and is ideal for everyday meals as well as entertaining guests.",
    },
    {
      question: "Is an L-shaped sofa suitable for small living rooms?",
      answer:
        "Yes, an L-shaped sofa can make efficient use of corners and provide generous seating while helping maximize available floor space.",
    },
  ];

  return (
    <section className="flex flex-col md:flex-row gap-8 md:gap-16 py-6 md:py-10">
      <div className="md:w-1/3">
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-text-h mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-text-secondary text-sm mb-8 leading-relaxed">
          Find answers to common questions about our furniture collections,
          materials and designs. We’re here to help you choose the perfect
          pieces for your home.
        </p>
        <button className="flex items-center justify-center gap-2 bg-btn hover:bg-black text-white px-6 py-3 rounded-full text-sm font-medium transition-colors w-full sm:w-auto">
          Ask A Question <ChevronRight size={16} />
        </button>
      </div>

      <div className="md:w-2/3 flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-text-subtle rounded-lg p-4 sm:p-5 cursor-pointer hover:border-border-strong transition-colors"
            onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
          >
            <div className="flex justify-between items-start gap-4 text-text-heading">
              <span className="font-medium text-sm sm:text-base pr-2">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp size={20} className="text-text-muted" />
              ) : (
                <ChevronDown size={20} className="text-text-muted" />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-4 text-text-secondary text-sm leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Faq;
