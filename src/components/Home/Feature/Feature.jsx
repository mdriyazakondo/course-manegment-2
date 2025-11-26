import {
  FaChalkboardTeacher,
  FaLaptopCode,
  FaCertificate,
  FaUsers,
} from "react-icons/fa";

export default function FeatureSection() {
  const features = [
    {
      icon: <FaChalkboardTeacher />,
      title: "Expert Instructors",
      description: "Learn from industry experts with years of experience.",
    },
    {
      icon: <FaLaptopCode />,
      title: "Practical Courses",
      description: "Hands-on projects to build real-world skills.",
    },
    {
      icon: <FaCertificate />,
      title: "Certifications",
      description: "Earn recognized certificates upon course completion.",
    },
    {
      icon: <FaUsers />,
      title: "Community Support",
      description: "Join a supportive learning community.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1500px] mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-12">
          Our Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-purple-600 text-4xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
