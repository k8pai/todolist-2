// Footer.tsx
import React, { ReactNode } from 'react';

const Footer = (): ReactNode => {
	return (
		<footer className="p-4">
			<p>Copyright &copy; {new Date().getFullYear()}</p>
		</footer>
	);
};

export default Footer;
