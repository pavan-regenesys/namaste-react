import "../App.css";

const About = () => {
  return (
    <div className="about-page">
      <h2>About</h2>
      <p>
        Hi, I’m <strong>Thoti Pavan</strong>. I have around <strong>4 years</strong> of
        experience as a <strong>Frontend Developer</strong>, mainly working with{" "}
        <strong>React.js</strong>, <strong>Next.js</strong>, and <strong>TypeScript</strong>,
        along with UI frameworks like <strong>Tailwind CSS</strong> and{" "}
        <strong>Material UI</strong>.
      </p>

      <h3>Recent Experience</h3>
      <ul>
        <li>
          <strong>Regenesys Institute of Management</strong>: Built LMS User &amp; Admin
          portals, worked on student onboarding and course dashboards, implemented
          role-based access using JWT authentication and Protected Routes.
        </li>
        <li>
          Managed application state using <strong>Redux Toolkit</strong>, and improved
          performance with <strong>lazy loading</strong> and <strong>code splitting</strong>.
        </li>
      </ul>

      <h3>Previous Work</h3>
      <ul>
        <li>
          Learning platform for <strong>20,000+ users</strong>: Built CMS dashboards and
          integrated payment flows like <strong>Razorpay</strong>.
        </li>
        <li>
          Enterprise e-commerce application: Contributed to product listing, cart,
          checkout, and performance optimization for high-traffic usage.
        </li>
      </ul>

      <p>
        Overall, I focus on building scalable React applications with clean UX,
        strong performance, and maintainable architecture.
      </p>
    </div>
  );
};

export default About;
