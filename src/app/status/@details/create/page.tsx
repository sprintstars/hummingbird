import { Input } from "@/components/Primitives/Input";
import { createClient } from "@/lib/supabase/server";
import db from "@/lib/db";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Primitives/Select";
import { SubmitButton } from "@/components/Auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/Primitives/Dialog";

export default function AddService({ searchParams }: { searchParams: { message: string } }) {
  // Function to handle form submission

  const createService = async (formData: FormData) => {
    "use server";

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const serviceName = formData.get("name") as string;
    const url = formData.get("url") as string;
    const strategy = formData.get("strategy") as string;

    if (serviceName && url && strategy && user) {
      const response = await db.query("SELECT id, url from services WHERE url = $1", [url]);

      // if response.rows is empty then add the service
      if (response.rowCount === 0) {
        const newServiceResponse = await db.query(
          "INSERT INTO services (name, url, strategy) VALUES ($1, $2, $3) RETURNING *",
          [serviceName, url, strategy]
        );

        // get the id of the newly added service and add it to the user

        await db.query("INSERT INTO status_owners (service_id, user_id) VALUES ($1, $2)", [
          newServiceResponse.rows[0].id,
          user.id,
        ]);
      } else {
        // status_owners 2 cols - service_id user_id
        const statusOwnersResponse = await db.query(
          "SELECT service_id, user_id FROM status_owners WHERE service_id = $1 AND user_id = $2",
          [response.rows[0].id, user.id]
        );

        // if they aren't linked, link them

        if (statusOwnersResponse.rowCount === 0) {
          //link them
          await db.query("INSERT INTO status_owners (service_id, user_id) VALUES ($1, $2)", [
            response.rows[0].id,
            user.id,
          ]);
        } else {
          redirect("/status/create?message=Already linked");
          // if they are linked - service already linked and available to the user
        }
      }

      return redirect("/status/create?message=Service added successfully");
    }
  };
  return (
    <>
      <Link href="/status" className="h-10 p-0 mb-4 text-slate-200 flex items-center">
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>
      <div className="bg-cover col-start-1 col-span-6 row-start-3 row-span-3 mx-auto flex flex-col w-full px-8 colbp:max-w-md justify-center gap-6">
        <h1 className="text-white text-2xl font-bold mb-4">Add a new service</h1>
        <form className="flex flex-col gap-4">
          <div className="text-white flex flex-col gap-1">
            <label className="text-white text-md font-medium" htmlFor="name">
              Name (e.g. Twillio, AWS ...)
            </label>
            <Input type="text" name="name" id="name" placeholder="Service Name" required />
          </div>

          <div className="text-white flex flex-col gap-1">
            <label className="text-white text-md font-medium" htmlFor="url">
              URL
            </label>
            <Input type="text" name="url" id="url" placeholder="https://example.com" required />
          </div>

          <div className="text-white flex flex-col gap-1">
            <label className="text-white text-md font-medium" htmlFor="strategy" aria-required>
              Strategy
            </label>

            <Select name="strategy">
              <SelectTrigger>
                <SelectValue placeholder="Strategy" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem
                  className="cursor-pointer hover:bg-foreground hover:text-background"
                  value="ping"
                >
                  Ping
                </SelectItem>
                <SelectItem
                  className="cursor-pointer hover:bg-foreground hover:text-background"
                  value="rss"
                >
                  RSS
                </SelectItem>
                <SelectItem
                  className="cursor-pointer hover:bg-foreground hover:text-background"
                  value="json"
                >
                  JSON
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SubmitButton
            formAction={createService}
            className="bg-green-700 text-white rounded-md px-4 py-2 mt-4 hover:bg-green-800"
            pendingText="Adding Service..."
          >
            Add service
          </SubmitButton>
          {searchParams.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
