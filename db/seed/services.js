const SERVICE_SEED_DATA = [
  {
    name: "netlify",
    url: "https://www.netlifystatus.com/",
    strategy: "ping",
  },
  {
    name: "auth0",
    url: "https://status.auth0.com/",
    strategy: "ping",
  },
  {
    name: "twilio",
    url: "https://status.twilio.com/",
    strategy: "ping",
  },
  {
    name: "google",
    url: "http://localhost:3000/api/fakeService",
    strategy: "ping",
  },
  {
    name: "sentry",
    url: "https://status.sentry.io/",
    strategy: "ping",
  },
];

export default SERVICE_SEED_DATA;
