import React from 'react';

const Features = () => {
    const features = [
        { title: 'Instant Transfers', description: 'Send and receive money instantly with just a few taps.', icon: '🚀' },
        { title: 'Secure Payments', description: 'Top-tier encryption to keep your data safe.', icon: '🔒' },
        { title: 'Easy to Use', description: 'Simple interface that anyone can navigate effortlessly.', icon: '👌' }
    ];

    return (
        <section className="py-16 bg-white">
            <h2 className="text-3xl font-bold text-center mb-10">Why Choose FAB-PAY?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                {features.map((feature, idx) => (
                    <div key={idx} className="border p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                        <div className="text-5xl mb-4">{feature.icon}</div>
                        <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
