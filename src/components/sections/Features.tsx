// src/components/sections/Features.tsx

interface FeatureCardProps {
    title: string;
    description: string;
    hasBorder?: boolean;
  }
  
  const FeatureCard = ({ title, description, hasBorder = false }: FeatureCardProps) => {
    return (
      <div className={`text-center px-6 ${
        hasBorder ? 'border-t md:border-t-0 md:border-l md:border-r border-gray-700 py-8 md:py-0' : ''
      }`}>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300">{description}</p>
      </div>
    );
  };
  
  const Features = () => {
    return (
      <section className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        <FeatureCard 
          title="What we do" 
          description="We facilitate connections between job seekers and hiring clients."
        />
        
        <FeatureCard 
          title="How it works" 
          description="Employees apply to jobs, while clients review and manage applications."
          hasBorder
        />
        
        <FeatureCard 
          title="Why Nexquared" 
          description="Our platform provides an efficient and user-friendly experience for both parties"
        />
      </section>
    );
  };
  
  export default Features;