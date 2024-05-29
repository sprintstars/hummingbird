import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

type AuthButtonProps = {
  className: string;
};

export default async function AuthButton({ className }: AuthButtonProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return user ? (
    <>
      <div className="flex items-center">
        <Link className="" href="/status/create">
          Add a new service
        </Link>
      </div>
      <div className={`${className} flex justify-end items-center gap-4`}>
        Hey, {user.email}!
        <form action={signOut}>
          <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Logout
          </button>
        </form>
      </div>
    </>
  ) : (
    <div className={`${className} flex justify-end items-center gap-4`}>
      <Link
        href="/"
        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        Login
      </Link>
    </div>
  );
}
