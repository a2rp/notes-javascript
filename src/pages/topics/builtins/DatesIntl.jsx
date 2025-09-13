import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

export default function DatesIntl() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />

            <Styled.Heading>Dates & Intl overview</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>Date</code> stores a single timestamp: milliseconds since the Unix
                    epoch (1970-01-01T00:00:00Z). It can <i>format</i> in local time or UTC. The <code>Intl.*</code> APIs
                    provide locale-aware formatting (dates, numbers, lists, relative time).
                </p>

                <h2>Create dates (safe patterns)</h2>
                <Styled.Pre>{`new Date();                           // now (local/UTC views possible)
new Date(0);                          // epoch (1970-01-01T00:00:00.000Z)
new Date("2025-09-13T12:00:00Z");     // ISO string with 'Z' (UTC)
new Date(Date.UTC(2025, 8, 13, 12));  // year, month(0-11!), day, hour... in UTC
// ⚠️ Months are 0-based: Jan=0, Sep=8`}</Styled.Pre>

                <h2>Parsing (avoid ambiguity)</h2>
                <ul>
                    <li>Prefer full ISO 8601 with timezone: <code>YYYY-MM-DDTHH:mm:ss.sssZ</code> or <code>±HH:MM</code> offset.</li>
                    <li>
                        Bare dates like <code>"2025-09-13"</code> are interpreted as UTC midnight; displaying in a different
                        timezone may show previous/next day.
                    </li>
                </ul>

                <h2>Reading parts (local vs UTC)</h2>
                <Styled.Pre>{`const d = new Date("2025-09-13T12:34:56Z");
d.getFullYear();   // local tz
d.getMonth();      // 0..11 (local)
d.getDate();       // day of month (local)
d.getDay();        // 0..6 (Sun..Sat, local)
d.getHours();      // local hours

d.getUTCFullYear(); // UTC versions
d.toISOString();    // "2025-09-13T12:34:56.000Z"`}</Styled.Pre>

                <h2>Math & durations</h2>
                <Styled.Pre>{`const a = new Date("2025-09-10T00:00:00Z");
const b = new Date("2025-09-13T12:00:00Z");
const ms = b - a;                 // 302,400,000
const days = ms / (1000*60*60*24);// 3.5

// add days (UTC-safe to avoid DST jumps)
const addDaysUTC = (d, n) => new Date(Date.UTC(
  d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + n,
  d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()
));`}</Styled.Pre>

                <h2>Formatting (Intl.DateTimeFormat)</h2>
                <ul>
                    <li>Locale-aware; pass <code>timeZone</code> to format in a specific zone.</li>
                    <li>Reuse formatter instances for performance.</li>
                </ul>
                <Styled.Pre>{`const fmt = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata"
});
fmt.format(new Date("2025-09-13T06:00:00Z"));   // e.g., "13 Sept 2025, 11:30 am"`}</Styled.Pre>

                <h2>Common presets</h2>
                <Styled.Pre>{`// Only date
new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date());

// Only time in a TZ
new Intl.DateTimeFormat("en-US", { timeStyle: "short", timeZone: "UTC" }).format(new Date());

// Custom parts (build your own string)
const parts = new Intl.DateTimeFormat("en-US", {
  weekday: "short", month: "short", day: "2-digit"
}).formatToParts(new Date());
// → parts array with { type, value }`}</Styled.Pre>

                <h2>Relative time (Intl.RelativeTimeFormat)</h2>
                <Styled.Pre>{`const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
rtf.format(-3, "day");   // "3 days ago"
rtf.format(1, "hour");   // "in 1 hour"`}</Styled.Pre>

                <h2>Numbers & currency quick wins (Intl.NumberFormat)</h2>
                <Styled.Pre>{`new Intl.NumberFormat("en-IN").format(1234567.89); // "12,34,567.89"
new Intl.NumberFormat("en", { style:"currency", currency:"USD" }).format(45.5); // "$45.50"
new Intl.NumberFormat("en", { notation:"compact" }).format(12340); // "12K"`}</Styled.Pre>

                <h2>Lists & plurals</h2>
                <Styled.Pre>{`new Intl.ListFormat("en", { style:"short", type:"conjunction" })
  .format(["JS","HTML","CSS"]); // "JS, HTML, and CSS"

const pr = new Intl.PluralRules("en");
pr.select(1);   // "one"
pr.select(2);   // "other"`}</Styled.Pre>

                <h2>Time zone notes & DST</h2>
                <ul>
                    <li><b>Date stores an absolute instant</b>; formatting decides local vs UTC vs specific zone.</li>
                    <li>Daylight Saving Time can make a “day” not equal 24h. For adding days, prefer the UTC helper above.</li>
                    <li>Keep timestamps in UTC for storage; convert to display time zones at the edge.</li>
                </ul>

                <h2>Small utilities</h2>
                <Styled.Pre>{`// start-of-day (UTC)
const startOfDayUTC = d => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

// ISO without milliseconds
const toIsoNoMs = d => d.toISOString().replace(/\\.\\d{3}Z$/, "Z");`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><b>Month is 0-based</b>; use UTC variants to avoid DST surprises in arithmetic.</li>
                    <li>Parse/emit <b>ISO strings with timezone</b> to be unambiguous.</li>
                    <li><code>toISOString()</code> always returns UTC; <code>toLocale*</code> respects locale/timeZone.</li>
                    <li>Reuse <code>Intl.*</code> formatters; they're heavier than simple string ops.</li>
                    <li>Store timestamps as UTC; format per user locale/time zone on output.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
