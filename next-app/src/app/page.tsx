import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Car Image Graphic Banner */}
      <div 
        className="design-graphic" 
        style={{ 
          background: "url('/img/hero_car.png') center/cover no-repeat", 
          alignItems: "center", 
          justifyContent: "center", 
          flexDirection: "column", 
          textAlign: "center", 
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)",
          display: "flex",
          height: "180px",
          borderRadius: "8px",
          marginBottom: "2rem",
          marginTop: "0"
        }}
      >
        <h1 style={{ color: "#FFF", fontSize: "38px", fontWeight: 800, textShadow: "0 4px 12px rgba(0,0,0,0.8)", margin: 0, letterSpacing: "-0.5px" }}>
          Welcome
        </h1>
        <p style={{ color: "#8EB9FF", fontSize: "16px", marginTop: "8px", marginBottom: "0px", fontWeight: 500, textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
          Smart rental contracts for cars and motorcycles — synced with the main Welrent site.
        </p>
      </div>

      {/* Rental Agreements Pills - 1:1 Match to Image */}
      <div className="rental-cards-container">
        <Link href="/pages/car-rental-agreement" className="rental-card-pill">
          Car rental contract
        </Link>
        <Link href="/pages/motorcycle-rental-agreement" className="rental-card-pill">
          Motorcycle rental contract
        </Link>
        <Link href="/pages/boat-rental-agreement" className="rental-card-pill">
          Boat rental contract
        </Link>
        <Link href="/pages/equipment-rental-agreement" className="rental-card-pill">
          Equipment rental contract
        </Link>
      </div>

      {/* Legal Pages Content */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
        <Link href="/pages/terms" className="design-message interactive" style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
          <strong style={{ color: "#8C8C91", fontSize: "17px", marginBottom: "6px" }}>Terms of Service</strong>
          <span style={{ fontSize: "14px", color: "#BDBDBD" }}>Review the rules and guidelines for using the platform.</span>
        </Link>
        <Link href="/pages/accessibility" className="design-message interactive" style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
          <strong style={{ color: "#8C8C91", fontSize: "17px", marginBottom: "6px" }}>Accessibility Statement</strong>
          <span style={{ fontSize: "14px", color: "#BDBDBD" }}>Our ongoing commitment to digital accessibility for all users.</span>
        </Link>
        <Link href="/pages/privacy" className="design-message interactive" style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
          <strong style={{ color: "#8C8C91", fontSize: "17px", marginBottom: "6px" }}>Privacy Statement</strong>
          <span style={{ fontSize: "14px", color: "#BDBDBD" }}>Information on how we collect, use, and protect your data.</span>
        </Link>
        <Link href="/pages/cookie" className="design-message interactive" style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
          <strong style={{ color: "#8C8C91", fontSize: "17px", marginBottom: "6px" }}>Cookie Statement</strong>
          <span style={{ fontSize: "14px", color: "#BDBDBD" }}>Details regarding our use of cookies and tracking tech.</span>
        </Link>
      </div>
    </div>
  );
}
