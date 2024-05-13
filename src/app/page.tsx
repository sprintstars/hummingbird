import { ServicesContainer } from "@/components/ServiceHealth";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <ServicesContainer />
    </>
  );
}
