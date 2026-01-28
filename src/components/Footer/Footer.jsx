import "./Footer.css";

function Footer() {
  return <footer className="footer">
    <p className="footer__signature">
  Developed by{" "}
  <a
    href="https://jasondijols.com"
    target="_blank"
    rel="noopener noreferrer"
    className="footer__signature-link"
  >
    Jason Dijols
  </a>
</p>
<p className="footer__year">2026</p>
  </footer>;
}

export default Footer;
