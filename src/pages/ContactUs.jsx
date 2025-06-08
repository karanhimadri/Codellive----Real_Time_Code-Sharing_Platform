import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Users, Zap } from "lucide-react";

const contactMethods = [
    {
        id: 1,
        icon: <Mail className="w-6 h-6" />,
        title: "Email Us",
        description: "Get in touch via email",
        contact: "hello@devplatform.com",
        gradient: "from-blue-500 to-cyan-400",
        action: "Send Email"
    },
    {
        id: 2,
        icon: <Phone className="w-6 h-6" />,
        title: "Call Us",
        description: "Speak with our team",
        contact: "+1 (555) 123-4567",
        gradient: "from-green-500 to-emerald-400",
        action: "Call Now"
    },
    {
        id: 3,
        icon: <MessageSquare className="w-6 h-6" />,
        title: "Live Chat",
        description: "Chat with support",
        contact: "Available 24/7",
        gradient: "from-purple-500 to-pink-400",
        action: "Start Chat"
    },
    {
        id: 4,
        icon: <MapPin className="w-6 h-6" />,
        title: "Visit Us",
        description: "Our headquarters",
        contact: "123 Tech Street, SF, CA",
        gradient: "from-orange-500 to-red-400",
        action: "Get Directions"
    }
];

const supportFeatures = [
    {
        icon: <Clock className="w-5 h-5" />,
        title: "24/7 Support",
        description: "Round-the-clock assistance"
    },
    {
        icon: <Users className="w-5 h-5" />,
        title: "Expert Team",
        description: "Experienced developers"
    },
    {
        icon: <Zap className="w-5 h-5" />,
        title: "Quick Response",
        description: "Average 2-hour response time"
    }
];

const ContactMethod = ({ method }) => {
    return (
        <div className="group bg-white/90 backdrop-blur-xl border border-gray-200/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white w-full h-full flex items-center justify-center">
                    {method.icon}
                </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
                {method.title}
            </h3>
            <p className="text-gray-600 mb-3">
                {method.description}
            </p>
            <p className="text-gray-800 font-semibold mb-4">
                {method.contact}
            </p>
            <button className={`w-full py-2 px-4 bg-gradient-to-r ${method.gradient} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                {method.action}
            </button>
        </div>
    );
};

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            inquiryType: 'general'
        });
        setIsSubmitting(false);

        alert('Message sent successfully! We\'ll get back to you soon.');
    };

    return (
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-xl p-8">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Send us a Message
                </h3>
                <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type
                    </label>
                    <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    >
                        <option value="general">General Inquiry</option>
                        <option value="sales">Sales</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                    </label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        placeholder="How can we help you?"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
                        placeholder="Tell us more about your inquiry..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Send Message
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

const ContactUsSection = () => {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full border border-blue-200/50 mb-6">
                        <span className="text-sm font-semibold text-blue-600">
                            GET IN TOUCH
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
                        Let's Start a
                        <br />
                        Conversation
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Have questions about our platform? Need technical support? Or want to discuss a partnership? We're here to help.
                    </p>
                </div>

                {/* Support Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {supportFeatures.map((feature, index) => (
                        <div key={index} className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3">
                                {feature.icon}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Methods */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            Choose Your Preferred Way to Connect
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {contactMethods.map((method) => (
                                <ContactMethod key={method.id} method={method} />
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <ContactForm />
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-20 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/30">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Join Our Developer Community
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Connect with thousands of developers, share knowledge, and get help from our community
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            Join Discord
                        </button>
                        <button className="px-6 py-3 bg-white/70 text-blue-600 font-semibold rounded-xl border border-blue-200/50 hover:bg-white hover:shadow-lg transition-all duration-300">
                            Browse Forum
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUsSection;