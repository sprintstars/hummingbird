import {
  assignOk,
  assignErr,
  isServiceDailyAverageArray,
  isServiceHistory,
  isServiceHistoryArray,
} from "../utils";
import db from "./client";

// types
import type { ServiceHistory, Result, ServiceDailyAverage } from "../utils";

type DatabaseError = {
  message: string;
  code: number;
};

/** Gets the selected columns from the specified table */
export const select = async (table: string, columns: string[]) => {
  try {
    const response = await db.query("select $1 from $2", [columns.join(", "), table]);
    return response.rows.length > 0 ? response.rows : null;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
};

/** Fetches the average downtime for each day; the number of days to return can be specified*/
export const getOneDailyAverageDowntime = async (
  serviceId: number,
  days: number
): Promise<Result<ServiceDailyAverage[], DatabaseError>> => {
  // TODO: think about adding userId
  try {
    const response = await db.query(
      `
    with counts as (
      select
        to_char(status_history.time, 'MM-DD') "date",
        count(CASE WHEN NOT healthy THEN 1 END) AS false_count,
        count(*) AS total_count
      from
        status_history
      where
        status_history.time > current_timestamp - interval '${days} days' AND service_id = $1
      group by
        1
      order by
        1
    )
    select
      date,
      round(100.0 * false_count / total_count, 2)::float AS downtime_percentage
    from counts
    `,
      [serviceId]
    );

    if (response.rows.length === 0) {
      return {
        tag: "Result.Err",
        message: `There is no service matching id ${serviceId} in the database`,
        code: 404,
      };
    }

    if (!isServiceDailyAverageArray(response.rows)) {
      return {
        tag: "Result.Err",
        message: "There was a problem validating the data from the database",
        code: 500,
      };
    }

    return assignOk(response.rows);
  } catch (error) {
    let message = "[getOneDailyAverageDowntime] There was a fatal error in the backend...\n\n";
    if (error instanceof Error) {
      console.error(error.message);
      message = `${message}${error.message}`;
    }
    return {
      tag: "Result.Err",
      message,
      code: 500,
    };
  }
};

/** Get all services and a specified amount of status history */
export const getAllServices = async (
  userId: string,
  historyCount: number
): Promise<Result<ServiceHistory[], DatabaseError>> => {
  try {
    const response = await db.query(
      `
    SELECT
    s.id,
    so.name,
    s.url,
    (
    SELECT ARRAY (
      SELECT sh.time
      FROM
        status_history sh
        WHERE
      sh.service_id = s.id
      ORDER BY sh.time DESC
      LIMIT $2
    ) as time
  ) AS history_times,
  (
    SELECT ARRAY (
      SELECT sh.healthy
      FROM
      status_history sh
      WHERE
      sh.service_id = s.id
      ORDER BY sh.time DESC
      LIMIT $2
    ) as time
  ) AS history_health
  FROM
  services s
  JOIN service_owners so ON s.id = so.service_id
  WHERE
  so.user_id = $1
  `,
      [userId, historyCount]
    );

    return response.rows.length > 0 && isServiceHistoryArray(response.rows)
      ? assignOk(response.rows)
      : assignErr<DatabaseError>({
          message: "There was a problem validating the data from the database",
          code: 500,
        });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return {
      tag: "Result.Err",
      message: "[getAllServices] There was a fatal error in the backend...",
      code: 500,
    };
  }
};

/** Get one service by its service id and a specified amount of status history */
export const getOneService = async (
  userId: string,
  serviceId: number,
  historyCount: number
): Promise<Result<ServiceHistory, DatabaseError>> => {
  try {
    const response = await db.query(
      `
    SELECT
    s.id,
    so.name,
    (
    SELECT ARRAY (
      SELECT sh.time
      FROM
        status_history sh
        WHERE
      sh.service_id = s.id
      ORDER BY sh.time DESC
      LIMIT $1
    ) as time
  ) AS history_times,
  (
    SELECT ARRAY (
      SELECT sh.healthy
      FROM
      status_history sh
      WHERE
      sh.service_id = s.id
      ORDER BY sh.time DESC
      LIMIT $1
    ) as time
  ) AS history_health
  FROM
  services s
  JOIN service_owners so ON s.id = so.service_id
  WHERE
  so.user_id = $2
  and s.id = $3
  `,
      [historyCount, userId, serviceId]
    );

    if (response.rows.length === 0) {
      return {
        tag: "Result.Err",
        message: `There is no service matching id ${serviceId} in the database`,
        code: 404,
      };
    }

    const service = response.rows[0];

    return response.rows.length === 1 && isServiceHistory(service)
      ? assignOk(service)
      : assignErr<DatabaseError>({
          message: "There was a problem validating the data from the database",
          code: 500,
        });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return {
      tag: "Result.Err",
      message: "[getOneService] There was a fatal error in the backend...",
      code: 500,
    };
  }
};
