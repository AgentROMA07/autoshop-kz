import { Container } from '@/components/ui/Container';

interface HowItWorksProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}

export function HowItWorks({ dictionary }: HowItWorksProps) {
  const content = dictionary.how_it_works;

  return (
    <section className="py-20 bg-muted/50">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-16">{content.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-border -z-10" />
          
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {content.steps.map((step: any, index: number) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
