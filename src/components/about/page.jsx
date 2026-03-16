import "@/styles/TermCondition.css";

export default function AboutContent() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <h1>About BikeBuyer</h1>
        <p className="subtitle">
          A trusted digital platform simplifying two-wheeler buying and selling
          across India.
        </p>
      </header>

      <section>
        <h2>Who We Are</h2>
        <p>
          BikeBuyer is a technology-driven marketplace connecting individual bike
          owners, verified dealers, and buyers on a single, easy-to-use platform.
          We do not own or sell vehicles ourselves. Instead, we enable discovery,
          comparison, and direct communication.
        </p>
      </section>

      <section>
        <h2>What We Offer</h2>
        <ul>
          <li>Simple and fast bike listing process</li>
          <li>Verified dealers and individual sellers</li>
          <li>Location-based bike discovery</li>
          <li>Clear and transparent bike details</li>
        </ul>
      </section>

      <section>
        <h2>Our Vision</h2>
        <p>
          To become one of India’s most trusted digital platforms for two-wheeler
          transactions by bringing transparency, reliability, and ease to a
          complex marketplace.
        </p>
      </section>

      <section>
        <h2>Our Mission</h2>
        <ul>
          <li>Create a transparent and reliable marketplace</li>
          <li>Enable easy discovery and comparison</li>
          <li>Support individuals and professional dealers</li>
          <li>Continuously improve through user feedback</li>
        </ul>
      </section>

      <section>
        <h2>Why Choose BikeBuyer</h2>
        <ul>
          <li>Clean, intuitive, and modern interface</li>
          <li>Wide range of bikes across India</li>
          <li>Trust-focused platform design</li>
          <li>No unnecessary middlemen</li>
        </ul>
      </section>

      <footer className="legal-footer">
        BikeBuyer is built for riders, commuters, sellers, and dreamers.
        We’re here to make your journey simple, transparent, and stress-free.
      </footer>
    </div>
  );
}
