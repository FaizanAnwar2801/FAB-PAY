import React from 'react';

const Testimonials = () => {
    const testimonials = [
        { name: 'John Doe', quote: 'FAB-PAY is the best digital wallet I have ever used!' },
        { name: 'Jane Smith', quote: 'Super fast and secure, I use it daily for all my transactions.' }
    ];

    return (
        <section className="py-16 bg-white">
            <h2 className="text-3xl font-bold text-center mb-10">What Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
                {testimonials.map((testimonial, idx) => (
                    <div key={idx} className="p-6 border rounded-lg shadow">
                        <p className="text-lg italic">"{testimonial.quote}"</p>
                        <h3 className="text-xl font-bold mt-4">{testimonial.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
