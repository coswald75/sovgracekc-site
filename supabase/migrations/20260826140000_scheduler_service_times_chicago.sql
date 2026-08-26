-- Sunday services are 10:00–11:30 America/Chicago. The seed stored 10:00+00.
-- Convert the wall clock on service_date into a real timestamptz.

update scheduler.services
set
  starts_at = (service_date + time '10:00') at time zone 'America/Chicago',
  ends_at   = (service_date + time '11:30') at time zone 'America/Chicago';
