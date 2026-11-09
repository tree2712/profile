
# Ru's little corner

The profile stays a static GitHub Pages site. Little Notes loads the six newest published notes from the existing Zi-Ru API using a credential-free GET; no access code, session token, or API secret belongs in this repository.

Ru manages notes in **Zi-Ru Home → Me → Little notes**. Drafts never enter the public feed. The profile displays plain text using `textContent`, preserves line breaks, and expands longer notes with “Read note”. Empty and unavailable feeds have their own messages; failed requests can be retried. Returning to the tab reloads the feed so unpublished notes are removed from the current view.

Deploy the API's Little Notes module before merging this profile integration. Its feed URL is configured on `#little-notes-grid` in `index.html`. The API permits credential-free reads from the origin `https://tree2712.github.io`; a future profile domain change also needs the API's public-feed CORS origin updated.
