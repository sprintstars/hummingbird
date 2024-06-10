import { Input } from "@/components/Primitives/Input";
import { createService } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Primitives/Select";
import SubmitButton from "@/components/Primitives/SubmitButton";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function AddService({ searchParams }: { searchParams: { message: string } }) {
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

            <Select name="strategy" aria-label="strategy options dropdown box">
              <SelectTrigger aria-label="dropdown button to select strategy">
                <SelectValue placeholder="Strategy" />
              </SelectTrigger>
              <SelectContent
                className="bg-background"
                aria-label="dropdown button to select strategy"
              >
                <SelectItem
                  className="cursor-pointer hover:bg-foreground hover:text-background"
                  value="ping"
                  aria-label="ping strategy"
                >
                  Ping
                </SelectItem>
                <SelectItem
                  className="cursor-pointer hover:bg-foreground hover:text-background"
                  value="rss"
                  aria-label="rss strategy"
                >
                  RSS
                </SelectItem>
                <SelectItem
                  className="cursor-pointer hover:bg-foreground hover:text-background"
                  value="json"
                  aria-label="json strategy"
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
