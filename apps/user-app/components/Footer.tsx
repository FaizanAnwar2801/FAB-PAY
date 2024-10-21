import React from 'react';

const Footer = () => {
    return (
        <footer className="py-5 bg-gray-800 text-white text-center">
            <div className="mb-2">
                <a href="#" className="hover:underline mx-2">Privacy Policy</a>
                <a href="#" className="hover:underline mx-2">Terms of Service</a>
                <a href="#" className="hover:underline mx-2">Help Center</a>
            </div>
            <p>&copy; {new Date().getFullYear()} FAB-PAY. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
