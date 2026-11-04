# JuriLingo website changes in this working copy

## Implemented in this first pass

1. Blog editor
   - Added hyperlink insertion for selected text.
   - Added image insertion using a publicly accessible image URL.
   - Re-enabled heading, bullet list, numbered list and blockquote controls.
   - Added styling for links, images, lists and blockquotes in the editor.
   - Added local Tiptap core as a direct dependency for the small custom link and image extensions.

2. Events naming
   - Changed user-facing navigation, homepage CTA, listing headings, admin navigation and footer labels from Competitions to Events.
   - Kept existing `/competitions` routes and `/api/competition` endpoints to avoid breaking existing bookmarks, registrations and stored data.

3. Event date fields
   - Changed the four admin date/time inputs to date-only inputs. Existing date fields and backend properties remain intact.

4. Team page
   - Removed the public profile cards for TVS Srineetha and Ananya R S. Priyan did not appear in the supplied public team component.

5. Homepage
   - Added a Latest Content section that fetches the latest three blogs, podcasts and active events from the existing public APIs.

6. Footer
   - Added conditional Spotify social icon support. Configure `NEXT_PUBLIC_SPOTIFY_URL` in Vercel after the founder supplies the official Spotify URL. The icon remains hidden until a URL is configured.

## Not implemented yet — requires decisions, credentials or a separate backend change

- Direct image/file uploads: requires a persistent storage provider (e.g. Vercel Blob or Cloudinary) and its project credentials. Blog images in this pass are inserted by URL, not uploaded from the computer.
- Blog likes, comments and moderation: requires a comment/like data model, authenticated write endpoints, ownership rules and moderation UI.
- Rich-text event descriptions and external registration/Google Meet links: requires updating the event schema, editor, API and event detail page together.
- Announcement attachments: requires persistent file storage and attachment metadata.
- Podcast playlists, Spotify episode embeds and original YouTube publication dates: requires schema, admin form and public display updates. YouTube API automation additionally requires a YouTube Data API key; manual date entry can be implemented without it.
- Team profile editing from admin: requires a Team model and protected CRUD endpoints. The existing team data is hardcoded in the component.
- Account verification and spam prevention: requires email verification workflow, rate limiting, CAPTCHA/Turnstile configuration and admin account-status controls.
- Payments: do not enable until the founder confirms whether events are paid, the legal entity/merchant account, refund policy and payment gateway. Payment verification must be server-side.

## Before deployment

- Review changes on the staging branch and test with a staging database.
- Configure `NEXT_PUBLIC_SPOTIFY_URL` only after receiving the official handle.
- Configure a persistent upload provider before enabling direct uploads.
- Run `npm ci`, `npm run lint` and `npm run build` in the project environment.
- Do not merge to `main` until the founder approves the staging deployment.
