const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-700 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} PrasadM. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
