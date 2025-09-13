import{j as e}from"./index-Cud8-B-g.js";import{S as t,B as s}from"./index-CIvUdc-C.js";import{B as n}from"./Breadcrumbs-BUXMDEQY.js";function o(){return e.jsxs(t.Wrapper,{children:[e.jsx(n,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:s}),e.jsx(t.Heading,{children:"Dates & Intl overview"}),e.jsxs(t.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"Date"})," stores a single timestamp: milliseconds since the Unix epoch (1970-01-01T00:00:00Z). It can ",e.jsx("i",{children:"format"})," in local time or UTC. The ",e.jsx("code",{children:"Intl.*"})," APIs provide locale-aware formatting (dates, numbers, lists, relative time)."]}),e.jsx("h2",{children:"Create dates (safe patterns)"}),e.jsx(t.Pre,{children:`new Date();                           // now (local/UTC views possible)
new Date(0);                          // epoch (1970-01-01T00:00:00.000Z)
new Date("2025-09-13T12:00:00Z");     // ISO string with 'Z' (UTC)
new Date(Date.UTC(2025, 8, 13, 12));  // year, month(0-11!), day, hour... in UTC
// ⚠️ Months are 0-based: Jan=0, Sep=8`}),e.jsx("h2",{children:"Parsing (avoid ambiguity)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Prefer full ISO 8601 with timezone: ",e.jsx("code",{children:"YYYY-MM-DDTHH:mm:ss.sssZ"})," or ",e.jsx("code",{children:"±HH:MM"})," offset."]}),e.jsxs("li",{children:["Bare dates like ",e.jsx("code",{children:'"2025-09-13"'})," are interpreted as UTC midnight; displaying in a different timezone may show previous/next day."]})]}),e.jsx("h2",{children:"Reading parts (local vs UTC)"}),e.jsx(t.Pre,{children:`const d = new Date("2025-09-13T12:34:56Z");
d.getFullYear();   // local tz
d.getMonth();      // 0..11 (local)
d.getDate();       // day of month (local)
d.getDay();        // 0..6 (Sun..Sat, local)
d.getHours();      // local hours

d.getUTCFullYear(); // UTC versions
d.toISOString();    // "2025-09-13T12:34:56.000Z"`}),e.jsx("h2",{children:"Math & durations"}),e.jsx(t.Pre,{children:`const a = new Date("2025-09-10T00:00:00Z");
const b = new Date("2025-09-13T12:00:00Z");
const ms = b - a;                 // 302,400,000
const days = ms / (1000*60*60*24);// 3.5

// add days (UTC-safe to avoid DST jumps)
const addDaysUTC = (d, n) => new Date(Date.UTC(
  d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + n,
  d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()
));`}),e.jsx("h2",{children:"Formatting (Intl.DateTimeFormat)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Locale-aware; pass ",e.jsx("code",{children:"timeZone"})," to format in a specific zone."]}),e.jsx("li",{children:"Reuse formatter instances for performance."})]}),e.jsx(t.Pre,{children:`const fmt = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata"
});
fmt.format(new Date("2025-09-13T06:00:00Z"));   // e.g., "13 Sept 2025, 11:30 am"`}),e.jsx("h2",{children:"Common presets"}),e.jsx(t.Pre,{children:`// Only date
new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date());

// Only time in a TZ
new Intl.DateTimeFormat("en-US", { timeStyle: "short", timeZone: "UTC" }).format(new Date());

// Custom parts (build your own string)
const parts = new Intl.DateTimeFormat("en-US", {
  weekday: "short", month: "short", day: "2-digit"
}).formatToParts(new Date());
// → parts array with { type, value }`}),e.jsx("h2",{children:"Relative time (Intl.RelativeTimeFormat)"}),e.jsx(t.Pre,{children:`const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
rtf.format(-3, "day");   // "3 days ago"
rtf.format(1, "hour");   // "in 1 hour"`}),e.jsx("h2",{children:"Numbers & currency quick wins (Intl.NumberFormat)"}),e.jsx(t.Pre,{children:`new Intl.NumberFormat("en-IN").format(1234567.89); // "12,34,567.89"
new Intl.NumberFormat("en", { style:"currency", currency:"USD" }).format(45.5); // "$45.50"
new Intl.NumberFormat("en", { notation:"compact" }).format(12340); // "12K"`}),e.jsx("h2",{children:"Lists & plurals"}),e.jsx(t.Pre,{children:`new Intl.ListFormat("en", { style:"short", type:"conjunction" })
  .format(["JS","HTML","CSS"]); // "JS, HTML, and CSS"

const pr = new Intl.PluralRules("en");
pr.select(1);   // "one"
pr.select(2);   // "other"`}),e.jsx("h2",{children:"Time zone notes & DST"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Date stores an absolute instant"}),"; formatting decides local vs UTC vs specific zone."]}),e.jsx("li",{children:"Daylight Saving Time can make a “day” not equal 24h. For adding days, prefer the UTC helper above."}),e.jsx("li",{children:"Keep timestamps in UTC for storage; convert to display time zones at the edge."})]}),e.jsx("h2",{children:"Small utilities"}),e.jsx(t.Pre,{children:`// start-of-day (UTC)
const startOfDayUTC = d => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

// ISO without milliseconds
const toIsoNoMs = d => d.toISOString().replace(/\\.\\d{3}Z$/, "Z");`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Month is 0-based"}),"; use UTC variants to avoid DST surprises in arithmetic."]}),e.jsxs("li",{children:["Parse/emit ",e.jsx("b",{children:"ISO strings with timezone"})," to be unambiguous."]}),e.jsxs("li",{children:[e.jsx("code",{children:"toISOString()"})," always returns UTC; ",e.jsx("code",{children:"toLocale*"})," respects locale/timeZone."]}),e.jsxs("li",{children:["Reuse ",e.jsx("code",{children:"Intl.*"})," formatters; they're heavier than simple string ops."]}),e.jsx("li",{children:"Store timestamps as UTC; format per user locale/time zone on output."})]})]})]})}export{o as default};
