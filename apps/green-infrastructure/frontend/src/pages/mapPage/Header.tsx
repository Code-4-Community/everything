export default function Header() {
  
  

  return (
    <div
      style={{
        padding: '20px 0px 20px',
        textAlign: "center",
        background: "rgba(45, 106, 79, 0.88)"
      }}
    >
      <p
        style={{
          fontSize: '30px',
          margin: 15,
          fontFamily: "Lora",
          color: "rgba(255, 253, 253, 1)",
          fontStyle: "italic",
          fontWeight: 400
        }}>
        Welcome to
      </p>
      <p style={{
        fontSize: '40px',
        fontWeight: 'bold',
        margin: 15,
        fontFamily: 'Montserrat',
        lineHeight: '49px',
        color: "rgba(255, 253, 253, 1)"
      }}>
        ADOPT-A-GREEN-INFRASTRUCTURE
      </p>
      <p
        style={{
          fontWeight: 400,
          marginTop: 40,
          fontFamily: "Lora",
          color: "rgba(255, 253, 253, 1)",
          fontSize: '15px'
        }}
      >
        A Partnership Between City of Boston and Code4Community
      </p>
    </div>

  );

}