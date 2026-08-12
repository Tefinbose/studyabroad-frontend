import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-[#111538] text-white">

      {/* HERO */}

      <section className="px-6 pb-16 pt-20 text-center">

        <div className="mx-auto max-w-4xl">

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">

            Study{" "}

            <span className="rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-1">
              Abroad
            </span>

          </h1>


          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Shape Your Future With Us
          </h2>


          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-300">
            Get expert guidance for studying abroad.
            Explore universities, courses and opportunities
            across the world.
          </p>


          <Link to="/enquiry">

            <button
              className="mt-10 rounded-xl bg-gradient-to-r
              from-pink-500 to-orange-400 px-10 py-4
              text-lg font-bold text-white shadow-lg
              transition hover:scale-105"
            >
              Start Your Enquiry
            </button>

          </Link>


          {/* FEATURES */}

          <div className="mt-10 flex flex-col justify-center gap-4 text-gray-300 md:flex-row md:gap-10">

            <span>
              <span className="text-orange-400">✓</span>{" "}
              Free Consultation
            </span>

            <span>
              <span className="text-orange-400">✓</span>{" "}
              Expert Guidance
            </span>

            <span>
              <span className="text-orange-400">✓</span>{" "}
              Multiple Countries
            </span>

            <span>
              <span className="text-orange-400">✓</span>{" "}
              Student Support
            </span>

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4">

        <Stat
          number="2500+"
          title="Students Guided"
        />

        <Stat
          number="25+"
          title="Years Experience"
        />

        <Stat
          number="10+"
          title="Countries"
        />

        <Stat
          number="100+"
          title="Universities"
        />

      </section>


      {/* CTA */}

      <section className="px-6 py-24 text-center">

        <h2 className="text-3xl font-bold md:text-4xl">
          Ready to Start Your Journey?
        </h2>

        <p className="mt-4 text-gray-400">
          Submit your details and our team will contact you.
        </p>

        <Link to="/enquiry">

          <button
            className="mt-8 rounded-lg bg-gradient-to-r
            from-pink-500 to-orange-400 px-8 py-3
            font-semibold transition hover:opacity-90"
          >
            Apply Now
          </button>

        </Link>

      </section>

    </div>
  );
}


function Stat({ number, title }) {

  return (
    <div
      className="rounded-xl border border-orange-900/60
      bg-[#20264f] p-7 text-center
      transition hover:-translate-y-1"
    >

      <h3 className="text-3xl font-bold text-orange-400">
        {number}
      </h3>

      <p className="mt-3 text-gray-400">
        {title}
      </p>

    </div>
  );
}

export default Home;