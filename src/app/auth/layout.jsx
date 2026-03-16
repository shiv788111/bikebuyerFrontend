export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="auth-page">{children}</div>
      </body>
    </html>
  );
}
