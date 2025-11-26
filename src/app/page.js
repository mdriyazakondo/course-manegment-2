import Banner from "@/components/Home/Banner/Banner";
import CallAction from "@/components/Home/CTASection/CTASection";
import FeatureSection from "@/components/Home/Feature/Feature";
import LatestCourse from "@/components/Home/LatestCourse/LatestCourse";
import MeetOurTeam from "@/components/Home/MeetOurTeam/MeetOurTeam";
// import Testimonial from "@/components/Home/Testimonial/Testimonial";
import React from "react";

export default function page() {
  return (
    <div>
      <Banner />
      <LatestCourse />
      <FeatureSection />
      <MeetOurTeam />
      {/* <Testimonial /> */}
      <CallAction />
    </div>
  );
}
