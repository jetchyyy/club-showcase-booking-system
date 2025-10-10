import { Music, Users, Sparkles, Clock } from 'lucide-react';
import TiltCard from './TiltCard';

const Features = () => {
  const features = [
    {
      icon: <Music className="w-8 h-8" />,
      title: "World-Class DJs",
      description: "International and local DJs spinning the hottest tracks every weekend"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "VIP Table Service",
      description: "Premium bottle service with dedicated hosts for an exclusive experience"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "LED & Laser Shows",
      description: "State-of-the-art lighting and visual effects for an immersive experience"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Open Till Late",
      description: "Party from 10PM to 6AM every Friday and Saturday night"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden" aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto">
          <h2 id="features-heading" className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Why Choose{' '}
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Your club
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <TiltCard key={idx}>
              <article className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-pink-500/50 transition-all duration-300 hover:scale-105">
                <div className="text-pink-400 mb-4" aria-hidden="true">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
