import { StatusList } from "@/components/ServiceStatus";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <StatusList />
    </>
  );
}
