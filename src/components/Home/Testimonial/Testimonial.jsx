import Image from "next/image";
import React from "react";

const testimonials = [
  {
    id: 1,
    rating: 5,
    date: "12 Jan 2025",
    content:
      "Super clean and easy to use. These Tailwind + React components saved me hours of dev time and countless lines of extra code!",
    author: {
      name: "Md Litan Molla",
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQGbw7__AF2bxg/profile-displayphoto-scale_200_200/B4EZeTjwsWHIAY-/0/1750527315663?e=2147483647&v=beta&t=ex36l0w9-toTp__08JIt0O75_LvjvZZoP0Ata-qf08E",
    },
  },
  {
    id: 2,
    rating: 5,
    date: "15 Mar 2025",
    content:
      "The design quality is top-notch. Perfect balance between simplicity and style. Highly recommend for any creative developer!",
    author: {
      name: "Md Amdad Islam",
      image: "https://amdadislam.netlify.app/profile.jpg",
    },
  },
  {
    id: 3,
    rating: 5,
    date: "20 Feb 2025",
    content:
      "Absolutely love the reusability of these components. My workflow feels 10x faster now with cleaner and more consistent layouts.",
    author: {
      name: "Md Riyaz Akondo",
      image:
        "https://ik.imagekit.io/2o23yla4n/Gemini_Generated_Image_8e089v8e089v8e08-removebg-preview.png?updatedAt=1763071776242",
    },
  },
];

// This is a server component
const Testimonial = async () => {
  return (
    <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="bg-white shadow-lg rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center"
        >
          <Image
            src={testimonial.author.image}
            alt={testimonial.author.name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full mr-4"
          />

          <div>
            <p className="text-gray-800 mb-2">{`"${testimonial.content}"`}</p>

            <div className="flex items-center mb-1">
              <span className="font-semibold mr-2">
                {testimonial.author.name}
              </span>
              <span className="text-yellow-500">
                {"⭐".repeat(testimonial.rating)}
              </span>
            </div>

            <p className="text-gray-500 text-sm">{testimonial.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonial;
