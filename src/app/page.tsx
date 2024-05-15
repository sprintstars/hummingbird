import { ServiceList } from "@/components/ServiceHealth";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <ServiceList list={services} />
    </>
  );
}
