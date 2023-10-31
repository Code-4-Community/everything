export default function Header() {
  return (
    <div
      style={{
        padding: '20px 0px 20px',
        textAlign: 'center',
        background: 'var(--Foreground, #F2F2F2)',
      }}
    >
      <p
        style={{
          fontSize: '40px',
          fontWeight: 700,
          margin: 15,
          fontFamily: 'Montserrat',
          lineHeight: '49px',
          color: '#F2F2F2',
        }}
      >
        Welcome back, Volunteer!
      </p>
    </div>
  );
}
