import "@/styles/TermCondition.css";

export default function PrivacyContent() {
  return (
    <div className="legal-wrapper">
      {/* Breadcrumb */}
      {/* <div className="breadcrumb">
        <a href="/">Home</a> <span>/</span> <span>Privacy Policy</span>
      </div> */}

      <div className="legal-layout">
        {/* LEFT TOC */}
        {/* <aside className="legal-toc">
          <h4>Contents</h4>
          <ul>
            <li><a href="#scope">Scope</a></li>
            <li><a href="#collect">Information We Collect</a></li>
            <li><a href="#usage">Use of Information</a></li>
            <li><a href="#sharing">Sharing</a></li>
            <li><a href="#security">Data Security</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </aside> */}

        {/* MAIN CONTENT */}
        <div className="legal-page">
          <h1>Privacy Policy</h1>

          <section id="scope">
            <h2>Scope of This Policy</h2>
            <p>
              This Privacy Policy explains how BikeBuyer collects, uses, stores,
              and safeguards your information when you access or use our
              platform. By using BikeBuyer, you agree to the practices described
              here.
            </p>
          </section>

          <section id="collect">
            <h2>Information We Collect</h2>
            <p>
              We may collect personal details such as name, email, phone number,
              location, and vehicle-related information when you use the
              platform or list a bike for sale.
            </p>
          </section>

          <section id="usage">
            <h2>Use of Collected Information</h2>
            <p>
              The collected information is used to operate and improve our
              services, enable communication between buyers and sellers, prevent
              fraud, and ensure platform security.
            </p>
          </section>

          <section id="sharing">
            <h2>Sharing of Information</h2>
            <p>
              BikeBuyer does not sell or rent personal information. Data may be
              shared only when required to complete transactions or with trusted
              service providers under confidentiality agreements.
            </p>
          </section>

          <section id="security">
            <h2>Data Security</h2>
            <p>
              We apply reasonable technical and organizational safeguards to
              protect your data. However, no digital system can guarantee
              absolute security.
            </p>
          </section>

          <section id="contact">
            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, you may contact
              BikeBuyer through official communication channels provided on the
              platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
