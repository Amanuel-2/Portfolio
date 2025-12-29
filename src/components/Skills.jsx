const Skills = () => {
    const programmingSkills = [
        "HTML5", "CSS3", "JavaScript (ES6+)", "React", "Tailwind CSS", "Basic PHP", "MySQL"
    ];

    const toolsSkills = [
        "Git & GitHub", "Responsive Web Design", "Component-based Architecture", "Problem Solving", "Team Collaboration"
    ];

    return (
        <section id="skills" className="py-20 bg-slate-50 text-slate-800">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900">
                    Skills
                </h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold mb-8 text-blue-600">
                            Programming & Web Technologies
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {programmingSkills.map((skill, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <span className="text-slate-700 font-medium">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-8 text-purple-600">
                            Tools & Concepts
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {toolsSkills.map((skill, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <span className="text-slate-700 font-medium">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
