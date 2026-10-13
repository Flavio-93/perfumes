"use client";
import { businessData } from "@/data/businessContent";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export default function FAQAccordion() {
  return (
    <section id="faqs" className="py-24 bg-brand-surface">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-brand-gold mb-4">Preguntas Frecuentes</h2>
          <p className="text-brand-light/80">Resolvemos todas tus dudas para que adquieras tus perfumes con total seguridad.</p>
        </div>
        
        <Accordion.Root type="single" collapsible className="space-y-4">
          {businessData.faqs.map((faq, index) => (
            <Accordion.Item 
              key={index} 
              value={`item-${index}`} 
              className="glass rounded-xl overflow-hidden border border-brand-gold/10"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex justify-between items-center p-6 text-left font-bold text-brand-light hover:text-brand-gold transition-colors group">
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown className="text-brand-gold shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="p-6 pt-0 text-brand-light/70 leading-relaxed">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
