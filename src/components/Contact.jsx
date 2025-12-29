const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-slate-50 text-slate-800">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900">
                    Contact
                </h2>
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-lg mb-12 text-slate-600 leading-relaxed">
                        If you'd like to collaborate, ask questions, or just connect, feel free to reach out.
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-center justify-center space-x-4">
                            <span className="text-2xl">📧</span>
                            <a href="mailto:your-email@example.com" className="text-blue-600 hover:text-blue-800 font-medium">
                                your-email@example.com
                            </a>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <span className="text-2xl">🌐</span>
                            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                                github.com/yourusername
                            </a>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <span className="text-2xl">💼</span>
                            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                                linkedin.com/in/yourusername
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
