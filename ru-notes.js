(() => {
  const grid = document.querySelector('#ru-notes-grid');
  const status = document.querySelector('#notes-status');
  const retry = document.querySelector('#notes-retry');
  if (!grid || !status || !retry) return;

  let pending;
  const dateFormat = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta'
  });

  function noteCard(note) {
    const card = document.createElement('article');
    const date = document.createElement('time');
    date.className = 'note-date';
    date.dateTime = note.date;
    date.textContent = dateFormat.format(new Date(`${note.date}T00:00:00+07:00`));
    const title = document.createElement('h3');
    title.textContent = note.title;
    card.append(date, title);
    if (note.body.length > 180) {
      const excerpt = document.createElement('p');
      excerpt.textContent = `${Array.from(note.body).slice(0, 160).join('')}…`;
      excerpt.className = 'note-excerpt';
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = 'Read note ↗';
      const body = document.createElement('p');
      body.textContent = note.body;
      details.append(summary, body);
      details.addEventListener('toggle', () => { excerpt.hidden = details.open; });
      card.append(excerpt, details);
    } else {
      const body = document.createElement('p');
      body.textContent = note.body;
      card.append(body);
    }
    return card;
  }

  async function loadNotes() {
    pending?.abort();
    const controller = new AbortController();
    pending = controller;
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    retry.hidden = true;
    status.hidden = false;
    status.textContent = 'Loading ru-notes…';
    grid.hidden = true;
    // Clear old entries immediately, including any notes that were unpublished.
    grid.replaceChildren();
    try {
      const response = await fetch(grid.dataset.notesUrl, {
        credentials: 'omit', cache: 'no-store', signal: controller.signal
      });
      if (!response.ok) throw new Error('Notes unavailable');
      const payload = await response.json();
      if (!Array.isArray(payload.notes) || payload.notes.some((note) =>
        !note || typeof note.id !== 'string' || typeof note.title !== 'string' ||
        typeof note.body !== 'string' || typeof note.date !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(note.date) ||
        !Number.isFinite(Date.parse(`${note.date}T00:00:00+07:00`)))) {
        throw new Error('Invalid notes');
      }
      if (pending !== controller) return;
      const notes = payload.notes.slice(0, 6);
      grid.replaceChildren(...notes.map(noteCard));
      grid.hidden = notes.length === 0;
      status.hidden = notes.length > 0;
      status.textContent = 'No notes yet. A little thought will land here soon.';
    } catch {
      if (pending !== controller) return;
      status.textContent = 'My notes couldn’t load right now. Come back in a little while.';
      retry.hidden = false;
    } finally { window.clearTimeout(timeout); }
  }

  retry.addEventListener('click', loadNotes);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void loadNotes();
  });
  void loadNotes();
})();
