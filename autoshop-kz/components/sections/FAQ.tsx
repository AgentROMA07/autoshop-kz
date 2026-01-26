import { Container } from '@/components/ui/Container';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';

interface FAQProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}

export function FAQ({ dictionary }: FAQProps) {
  const content = dictionary.faq;

  return (
    <section className="py-20 bg-muted/30">
      <Container className="max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">{content.title}</h2>
        <Accordion type="single" collapsible className="w-full">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {content.items.map((item: any, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
