"use server";

import { RedirectType, redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { API } from "../utils";

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/?message=Could not authenticate user");
  }

  return redirect("/status");
};

export const signUp = async (formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/?message=Could not authenticate user");
  }

  return redirect("/?message=Check email to continue sign in process");
};

export const createService = async (formData: FormData) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const serviceName = formData.get("name") as string;
  const url = formData.get("url") as string;
  const strategy = formData.get("strategy") as string;

  if (user && serviceName && url && strategy) {
    const response = await db.query("SELECT id, url from services WHERE url = $1", [url]);

    // If the service doesn't already exist, add it and link it to the user
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

      // Update the status for that service
      await fetch(`${API}/update/${newServiceResponse.rows[0].id}`, {
        headers: {
          Authorization: "Bearer gCuZI6la0oPpzMTazvQplLtCXFwSw0Ck",
        },
      });

      // otherwise check if the user is linked
    } else {
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
        // otherwise display a message informing the user that they are linked already
      } else {
        redirect("/status/create?message=Already linked");
      }
    }

    return redirect("/status?message=Service added successfully");
  }
  return redirect("/status/create?message=Please input the correct data");
};

export const deleteService = async (formData: FormData) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const serviceId = Number.parseInt(formData.get("serviceId") as string, 10);

  if (user && serviceId) {
    try {
      await db.query("DELETE FROM status_owners WHERE service_id = $1 AND user_id = $2", [
        serviceId,
        user.id,
      ]);
      const statusOwnersResponse = await db.query(
        "SELECT service_id FROM status_owners WHERE service_id = $1",
        [serviceId]
      );

      if (statusOwnersResponse.rows.length === 0) {
        await db.query("DELETE FROM status_history WHERE service_id = $1", [serviceId]);
        await db.query("DELETE FROM services WHERE id = $1", [serviceId]);
      }
    } catch (err) {
      console.error(err);
      redirect(`/status/${serviceId}?message=Fatal error`);
    }

    redirect("/status?message=Deleted");
  }
  return redirect(`/status/${serviceId}?message=Please input the correct data`);
};

export const editService = async (formData: FormData) => {
  // Todo
};
