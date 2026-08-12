function UserDashboard() {
  const user = JSON.parse(
    sessionStorage.getItem("user")
  );

  return (
    <div className="min-h-screen bg-[#111538] px-6 py-10">

      <div className="mx-auto max-w-5xl">

        <div className="rounded-2xl bg-[#20264f] p-8 shadow-xl">

          <h1 className="text-3xl font-bold text-white">
            Welcome, {user?.name}
          </h1>

          <p className="mt-2 text-gray-400">
            Welcome to your study abroad dashboard.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">

            <div className="rounded-xl bg-[#111538] p-6">
              <h2 className="text-xl font-semibold text-white">
                Study Abroad Enquiry
              </h2>

              <p className="mt-2 text-gray-400">
                Submit your study abroad enquiry.
              </p>

              <a
                href="/enquiry"
                className="mt-5 inline-block rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 px-5 py-3 font-semibold text-white"
              >
                Submit Enquiry
              </a>
            </div>

            <div className="rounded-xl bg-[#111538] p-6">
              <h2 className="text-xl font-semibold text-white">
                My Profile
              </h2>

              <p className="mt-2 text-gray-400">
                Email: {user?.email}
              </p>

              <p className="mt-1 text-gray-400">
                Role: {user?.role}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;