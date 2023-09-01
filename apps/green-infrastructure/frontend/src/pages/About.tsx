export default function About() {

  return (
    <div
      style={{
        padding: "40px 40px 20px",
        background: "var(--gray-5, #E0E0E0)",
        color: "var(--gray-1, #333)",
        fontSize: "25px",
        fontFamily: "Montserrat"
      }}
    >
      <p style={{ marginBottom: '15px', fontWeight: 700 }}><u>ABOUT: ADOPT-A-GREEN INFRASTRUCTURE AND FEATURE VIEWER</u></p>
      <p style={{ fontWeight: 400 }}>Welcome to the City of Boston’s first Green Infrastructure Volunteer Program! We are thrilled to have you taking care of this valuable infrastructure that not only provides safe stormwater maintenance, cleans the air, and reduces erosion, but also can create moments of delight for your neighborhood.</p>
      <p><i>Instructions on how to use this Interactive Map:</i></p>
      <p style={{ fontSize: "20px" }}>Use the filter pane that appears to the side of the map to filter by site types and site status. Simply click on the checkboxes of the filters you want to apply and the map will only show the sites that fit those categories and status.</p>
    </div>
  );

};
