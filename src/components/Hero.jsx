const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
            <div className="text-center px-6 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Hi, I'm Amanuel Wendimu
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-slate-300 leading-relaxed">
                    A passionate developer building modern web applications with clean, scalable code.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg">
                        View Projects
                    </button>
                    <button className="px-8 py-3 bg-transparent border-2 border-blue-400 hover:bg-blue-400 text-blue-400 hover:text-white font-semibold rounded-lg transition-all duration-300">
                        Contact Me
                    </button>
                    <button className="px-8 py-3 bg-transparent border-2 border-purple-400 hover:bg-purple-400 text-purple-400 hover:text-white font-semibold rounded-lg transition-all duration-300">
                        About Me
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
