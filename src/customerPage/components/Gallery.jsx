const Gallery = () => {
  const images = [
    { color: 'from-purple-600 to-pink-600', label: 'Main Floor' },
    { color: 'from-orange-600 to-red-600', label: 'VIP Lounge' },
    { color: 'from-blue-600 to-purple-600', label: 'DJ Booth' },
    { color: 'from-pink-600 to-purple-600', label: 'Rooftop Bar' }
  ];

  return (
    <div className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Experience <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">The Vibe</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${img.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-white rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1" />
                  </div>
                  <p className="text-white text-2xl font-bold">{img.label}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;