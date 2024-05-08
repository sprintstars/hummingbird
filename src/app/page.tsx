import React from "react";
import SvgLogo from "@/components/ui/footerLogo";
import GridContainer from "@/components/GridContainer";

export default function Home() {
  return (
    <>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-center text-white">
          hello hummingbird
        </h1>
        <GridContainer />

        <SvgLogo />
      </div>
    </>
  );
}
