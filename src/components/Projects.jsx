const Projects = () => {
    const projects = [
        {
            title: "DevConnect (In Progress)",
            description: "A mini social network for developers built with React. Features include user profiles, posts, and developer interaction.",
            technologies: ["React", "Tailwind CSS"],
            status: "In Progress"
        },
        {
            title: "Portfolio Website",
            description: "A personal portfolio website to showcase my skills, projects, and journey as a developer.",
            technologies: ["HTML", "CSS", "JavaScript", "React"],
            status: "Completed"
        },
        {
            title: "Academic & Practice Projects",
            description: "Multiple small projects and assignments completed as part of university coursework, ALX program, and personal learning.",
            technologies: ["Various"],
            status: "Completed"
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
                                    <span className={`px-2 py-1 text-xs font-semibold rounded ${project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {project.status}
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
