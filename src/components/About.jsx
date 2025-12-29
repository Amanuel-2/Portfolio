const About = () => {
    return (
        <section id="about" className="py-20 bg-white text-slate-800">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900">
                    About Me
                </h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-lg leading-relaxed">
                            I am a Computer Science student with a strong interest in web development and software engineering. I am currently enrolled in the ALX Professional Foundations Program, where I am developing both technical and professional skills.
                        </p>
                        <p className="text-lg leading-relaxed">
                            I enjoy learning by building real projects, especially using React. I like being challenged with slightly harder problems because I believe growth comes from pushing limits.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Besides coding, I am also improving my English communication skills, especially speaking, to become a better global developer.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-6xl">👨‍💻</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
