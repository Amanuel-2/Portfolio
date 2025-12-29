const Experience = () => {
    const experiences = [
        {
            title: "ALX Professional Foundations Program",
            description: "Developing professional skills, communication, teamwork, and problem-solving.",
            icon: "🎓"
        },
        {
            title: "Hackathons (24-hour format)",
            description: "Worked in teams to brainstorm, plan, and build solutions under time pressure.",
            icon: "🏆"
        },
        {
            title: "Self-Learning",
            description: "Actively learning JavaScript and React through projects, tutorials, and practice.",
            icon: "📚"
        }
    ];

    return (
        <section id="experience" className="py-20 bg-slate-50 text-slate-800">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900">
                    Experience & Learning
                </h2>
                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <div key={index} className="flex items-start space-x-6 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                                {exp.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-2 text-slate-900">{exp.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
