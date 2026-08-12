function Dashboard() {

  const enquiries = [
    {
      id: 1,
      name: "John Mathew",
      email: "john@gmail.com",
      phone: "9876543210",
      qualification: "BCA",
      country: "Austria",
      course: "MSc Computer Science",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      phone: "9876543211",
      qualification: "B.Tech",
      country: "Germany",
      course: "MSc Data Science",
    },
  ];


  return (
    <div className="min-h-screen bg-[#111538]
    px-6 py-12 text-white">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col
        justify-between gap-5 md:flex-row md:items-center">

          <div>

            <h1 className="text-3xl font-bold">
              Student Enquiries
            </h1>

            <p className="mt-2 text-gray-400">
              Manage and view student enquiries
            </p>

          </div>


          <div className="rounded-xl border
          border-orange-900/60 bg-[#20264f]
          px-7 py-4 text-center">

            <p className="text-sm text-gray-400">
              Total Enquiries
            </p>

            <p className="mt-1 text-3xl font-bold
            text-orange-400">
              {enquiries.length}
            </p>

          </div>

        </div>


        {/* TABLE */}

        <div className="overflow-x-auto rounded-xl
        border border-orange-900/60 bg-[#20264f]">

          <table className="w-full min-w-[900px]">

            <thead>

              <tr className="border-b border-gray-700">

                <th className="px-6 py-4 text-left
                text-orange-400">
                  Name
                </th>

                <th className="px-6 py-4 text-left
                text-orange-400">
                  Email
                </th>

                <th className="px-6 py-4 text-left
                text-orange-400">
                  Phone
                </th>

                <th className="px-6 py-4 text-left
                text-orange-400">
                  Qualification
                </th>

                <th className="px-6 py-4 text-left
                text-orange-400">
                  Country
                </th>

                <th className="px-6 py-4 text-left
                text-orange-400">
                  Course
                </th>

              </tr>

            </thead>


            <tbody>

              {enquiries.map((student) => (

                <tr
                  key={student.id}
                  className="border-b border-gray-800
                  transition hover:bg-[#292f5b]"
                >

                  <td className="px-6 py-4">
                    {student.name}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {student.email}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {student.phone}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {student.qualification}
                  </td>

                  <td className="px-6 py-4">
                    {student.country}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {student.course}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;