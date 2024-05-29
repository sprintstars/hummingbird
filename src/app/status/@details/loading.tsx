import Link from "next/link";
import { FunctionComponent } from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

interface StatusLoadingProps {}

const StatusLoading: FunctionComponent<StatusLoadingProps> = () => {
  return (
    <>
      <Link href="/status" className="h-10 p-0 mb-4 text-slate-200 flex items-center">
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>
      <div className="flex-1 flex flex-col h-full rounded-md p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 200 200">
          <path fill="none" d="M0 0h200v200H0z"></path>
          <path
            fill="none"
            stroke-linecap="round"
            stroke="#ddd"
            stroke-width="15"
            d="M70 95.5V112m0-84v16.5m0 0a25.5 25.5 0 1 0 0 51 25.5 25.5 0 0 0 0-51Zm36.4 4.5L92 57.3M33.6 91 48 82.7m0-25.5L33.6 49m58.5 33.8 14.3 8.2"
            transform-origin="center"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="0;-120"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </path>
          <path
            fill="none"
            stroke-linecap="round"
            stroke="#ddd"
            stroke-width="15"
            transform-origin="center"
            d="M130 155.5V172m0-84v16.5m0 0a25.5 25.5 0 1 0 0 51 25.5 25.5 0 0 0 0-51Zm36.4 4.5-14.3 8.3M93.6 151l14.3-8.3m0-25.4L93.6 109m58.5 33.8 14.3 8.2"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="0;120"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </path>
        </svg>
      </div>
    </>
  );
};

export default StatusLoading;
