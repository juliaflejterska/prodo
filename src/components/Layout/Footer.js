const Footer = () => {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <footer>
      <div>
        <span> © {year} Julia Flejterska</span>
      </div>
    </footer>
  );
};

export default Footer;
