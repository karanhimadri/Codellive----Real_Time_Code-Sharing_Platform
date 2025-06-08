import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, FileText, Shield, Zap } from "lucide-react";

const faqData = [
    {
        id: 1,
        icon: <MessageCircle className="w-5 h-5" />,
        question: "How does real-time collaboration work?",
        answer: "Our real-time collaboration features allow multiple developers to work on the same project simultaneously. You can see live cursors, instant code changes, and communicate through integrated chat. All changes are synchronized in real-time with conflict resolution to ensure smooth teamwork.",
        category: "Collaboration"
    },
    {
        id: 2,
        icon: <Shield className="w-5 h-5" />,
        question: "Is my code and data secure?",
        answer: "Absolutely! We use enterprise-grade encryption for all data in transit and at rest. Your code is stored in secure, geo-distributed data centers with automatic backups. We're SOC 2 compliant and follow industry best practices for security and privacy.",
        category: "Security"
    },
    {
        id: 3,
        icon: <Zap className="w-5 h-5" />,
        question: "What programming languages and frameworks are supported?",
        answer: "We support all major programming languages including JavaScript, Python, Java, C++, Go, Rust, and more. Popular frameworks like React, Vue, Angular, Django, Flask, Spring Boot, and Node.js are fully supported with intelligent code completion and debugging.",
        category: "Development"
    },
    {
        id: 4,
        icon: <FileText className="w-5 h-5" />,
        question: "Can I import existing projects?",
        answer: "Yes! You can easily import projects from GitHub, GitLab, Bitbucket, or upload files directly. Our platform automatically detects project structure, dependencies, and sets up the appropriate development environment for you.",
        category: "Getting Started"
    },
    {
        id: 5,
        icon: <HelpCircle className="w-5 h-5" />,
        question: "What are the pricing plans?",
        answer: "We offer flexible pricing starting with a free tier for individual developers. Pro plans start at $10/month with advanced features, unlimited private projects, and priority support. Enterprise plans include custom integrations and dedicated support.",
        category: "Pricing"
    },
    {
        id: 6,
        icon: <MessageCircle className="w-5 h-5" />,
        question: "How do I deploy my applications?",
        answer: "Deployment is as simple as clicking a button! We integrate with major cloud providers like AWS, Google Cloud, and Azure. You can set up automated CI/CD pipelines, custom domains, and environment variables with just a few clicks.",
        category: "Deployment"
    },
    {
        id: 7,
        icon: <Shield className="w-5 h-5" />,
        question: "Do you offer customer support?",
        answer: "Yes! We provide 24/7 support through multiple channels including live chat, email, and community forums. Pro and Enterprise users get priority support with dedicated account managers and faster response times.",
        category: "Support"
    },
    {
        id: 8,
        icon: <Zap className="w-5 h-5" />,
        question: "Can I work offline?",
        answer: "While our platform is cloud-based, we offer offline capabilities for premium users. You can sync your work locally, continue coding without internet, and sync changes once you're back online. All your work is automatically backed up.",
        category: "Features"
    }
];

const categories = ["All", "Collaboration", "Security", "Development", "Getting Started", "Pricing", "Deployment", "Support", "Features"];

const FAQItem = ({ faq, isOpen, onToggle }) => {
    return (
        <div className="group bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full p-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-xl"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        {faq.icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {faq.question}
                        </h3>
                        <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
                            {faq.category}
                        </span>
                    </div>
                </div>
                <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="px-6 pb-6">
                    <div className="pl-14">
                        <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const [openItems, setOpenItems] = useState(new Set([1])); // First item open by default
    const [activeCategory, setActiveCategory] = useState("All");

    const toggleItem = (id) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(id)) {
            newOpenItems.delete(id);
        } else {
            newOpenItems.add(id);
        }
        setOpenItems(newOpenItems);
    };

    const filteredFAQs = activeCategory === "All"
        ? faqData
        : faqData.filter(faq => faq.category === activeCategory);

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 py-16 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full border border-purple-200/50 mb-6">
                        <span className="text-sm font-semibold text-purple-600">
                            FREQUENTLY ASKED QUESTIONS
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
                        Got Questions?
                        <br />
                        We've Got Answers
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Find answers to the most common questions about our development platform
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                    : 'bg-white/70 text-gray-600 hover:bg-white hover:text-purple-600 border border-gray-200/50'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {filteredFAQs.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            faq={faq}
                            isOpen={openItems.has(faq.id)}
                            onToggle={() => toggleItem(faq.id)}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200/30">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Still have questions?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Our support team is here to help you get started
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            Contact Support
                        </button>
                        <button className="px-6 py-3 bg-white/70 text-purple-600 font-semibold rounded-xl border border-purple-200/50 hover:bg-white hover:shadow-lg transition-all duration-300">
                            View Documentation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;