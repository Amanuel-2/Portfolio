const Projects = () => {
    const projects = [
        {
            title: "Exit Prep",
            description: "A practical project focused on preparation and structure, designed to help users organize and prepare for important transitions and milestones.",
            technologies: ["React", "JavaScript", "Tailwind CSS"],
            purpose: "Preparation & Organization"
        },
        {
            title: "Share It",
            description: "A project centered around sharing content or resources, enabling users to easily distribute and access shared materials within a community.",
            technologies: ["React", "Node.js", "MongoDB"],
            purpose: "Content Sharing"
        },
        {
            title: "Kitabeko",
            description: "A meaningful project with real use cases, providing practical solutions for users seeking reliable and accessible information services.",
            technologies: ["React", "Express.js", "PostgreSQL"],
            purpose: "Information Services"
        }
    ];

    return (
        <section id="projects" className="py-20 bg-white text-slate-800">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900">
                    Projects
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-slate-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="h-48 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                                <span className="text-4xl">🚀</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-slate-900">{project.title}</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                                <div className="mb-4">
                                    <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                                        {project.purpose}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span key={techIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
