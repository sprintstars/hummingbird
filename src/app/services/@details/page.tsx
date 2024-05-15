const ServiceDetails = () => {
  return (
    <div className="font-museoModerno grid grid-cols-[3fr_1fr] text-right mx-auto md:grid-cols-2 col-start-1 col-span-6 md:col-start-4 md:col-span-3 gap-[5vh] row-start-3 row-span-2 md:row-start-3 md:row-span-3 px-10 content-around text-3xl text-slate-200">
      <span
        className={disruptions > 0 ? "text-red-400 font-bold underline" : ""}
      >
        Disruptions
      </span>
      <span
        className={`flex items-center ${
          disruptions > 0 ? "text-red-400 font-bold" : ""
        }`}
      >
        {disruptions}
      </span>
      <span>Recently Resolved</span>
      <span className="flex items-center">0</span>
      <span>Fully Operational</span>
      <span className="flex items-center">{operational}</span>
    </div>
  );
};

export default ServiceDetails;
