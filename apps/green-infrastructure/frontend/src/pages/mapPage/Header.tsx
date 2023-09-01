export default function Header() {

  return (
    <div
      style={{
        padding: '20px 0px 20px',
        textAlign: "center",
        fontFamily: "Helvetica",
        background: "var(--gray-5, #D9D9D9)"
      }}
    >
      <p
        style={{
          fontSize: '35px',
          margin: 15
        }}>
        Welcome to
      </p>
      <p style={{
        fontSize: '40px',
        fontWeight: '700',
        margin: 15
      }}>
        Adopt-A-Green-Infrastructure
      </p>
      <p
        style={{
          fontWeight: "normal",
          marginTop: 40
        }}
      >
        A Partnership Between City of Boston and Code4Community
      </p>
    </div>

  );

};