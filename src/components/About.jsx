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
                            I am currently enrolled in the ALX program as a Back-End learner, building real-world web projects and focusing on practical skills in software development.
                        </p>
                        <p className="text-lg leading-relaxed">
                            I have a strong interest in modern web technologies and am committed to writing clean code, creating scalable structures, and continuous learning. I enjoy tackling challenging problems and pushing technical boundaries.
                        </p>
                        <p className="text-lg leading-relaxed">
                            I am also actively improving my English communication skills to enhance collaboration in global development environments.
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
