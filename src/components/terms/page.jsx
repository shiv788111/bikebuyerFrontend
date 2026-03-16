import "@/styles/TermCondition.css";

export default function TermsContent() {
  return (
    <div className="legal-wrapper">
      {/* Breadcrumb */}
     
      <div className="legal-layout">
        {/* LEFT TOC */}
       

        {/* MAIN CONTENT */}
        <div className="legal-page">
          <h1>Terms & Conditions</h1>

          <section id="nature">
            <h2>Nature of Services</h2>
            <p>
              BikeBuyer operates solely as a digital marketplace facilitating
              listings and communication between buyers and sellers. We do not
              own, sell, inspect, or verify any vehicle listed on the platform.
            </p>
          </section>

          <section id="eligibility">
            <h2>User Eligibility & Registration</h2>
            <p>
              Users must be at least 18 years old and legally competent to enter
              into a binding contract under Indian law. You are responsible for
              maintaining the confidentiality of your account credentials.
            </p>
          </section>

          <section id="seller">
            <h2>Seller Responsibilities</h2>
            <p>
              Sellers must ensure all listing information is accurate, lawful,
              and complete. Any misleading or fraudulent listing may be removed
              without notice.
            </p>
          </section>

          <section id="buyer">
            <h2>Buyer Responsibilities</h2>
            <p>
              Buyers are advised to independently verify vehicle details before
              proceeding with any transaction. BikeBuyer is not responsible for
              disputes between buyers and sellers.
            </p>
          </section>

          <section id="payments">
            <h2>Payments & Transactions</h2>
            <p>
              BikeBuyer does not process payments between users unless explicitly
              stated. All financial transactions are carried out at the user’s
              own risk.
            </p>
          </section>

          <section id="liability">
            <h2>Limitation of Liability</h2>
            <p>
              BikeBuyer shall not be liable for any direct or indirect damages
              arising from the use of the platform, including disputes or
              financial losses.
            </p>
          </section>

          <section id="law">
            <h2>Governing Law & Jurisdiction</h2>
            <p>
              These Terms & Conditions shall be governed by the laws of India.
              Any disputes shall be subject to the exclusive jurisdiction of
              Indian courts.
            </p>
          </section>
          
        </div>
        
      </div>

    </div>
    
  );
}
