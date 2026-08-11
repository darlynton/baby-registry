/*
  Little Star Wish — Memorial Messages backend (Google Apps Script)
  ------------------------------------------------------------------
  This turns a Google Sheet into a free, serverless API for condolence
  messages. No server of your own is required — Google hosts this.

  SETUP
  1. Create a new Google Sheet. Add these column headers in row 1:
       firstName | lastName | message | approved | submittedAt
  2. In the Sheet, go to Extensions → Apps Script.
  3. Delete any placeholder code and paste this entire file in.
  4. Click Deploy → New deployment.
       - Type: Web app
       - Execute as: Me
       - Who has access: Anyone
  5. Copy the deployment URL (ends in /exec).
  6. Paste that URL into data/memorial.json as "messagesApi".

  MODERATION
  New submissions are appended with approved = FALSE.
  To publish a message on the memorial page, open the Sheet and change
  that row's "approved" cell to TRUE. That's the entire moderation step —
  no exports, no merging, no commits.

  The memorial page will:
    - GET  ?action=list   → returns all rows where approved = TRUE
    - POST { action: 'submit', firstName, lastName, message }
                          → appends a new row with approved = FALSE
*/

const SHEET_NAME = 'Sheet1'; // change if your sheet tab has a different name

function doGet(e) {
  const action = e.parameter.action;
  if (action === 'list') {
    return respondJSON(getApprovedMessages());
  }
  return respondJSON({ error: 'Unknown action' });
}

function doPost(e) {
  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    return respondJSON({ error: 'Invalid request body' });
  }

  if (payload.action === 'submit') {
    const firstName = String(payload.firstName || '').trim().slice(0, 40);
    const lastName = String(payload.lastName || '').trim().slice(0, 40);
    const message = String(payload.message || '').trim().slice(0, 500);

    if (!firstName || !lastName || !message) {
      return respondJSON({ error: 'Missing required fields' });
    }

    appendMessage(firstName, lastName, message);
    return respondJSON({ status: 'pending' });
  }

  return respondJSON({ error: 'Unknown action' });
}

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function getApprovedMessages() {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const [header, ...data] = rows;
  const firstNameCol = header.indexOf('firstName');
  const lastNameCol = header.indexOf('lastName');
  const messageCol = header.indexOf('message');
  const approvedCol = header.indexOf('approved');

  return data
    .filter(row => row[approvedCol] === true || String(row[approvedCol]).toUpperCase() === 'TRUE')
    .map(row => ({
      firstName: row[firstNameCol],
      lastName: row[lastNameCol],
      message: row[messageCol]
    }));
}

function appendMessage(firstName, lastName, message) {
  const sheet = getSheet();
  const timestamp = Utilities.formatDate(new Date(), 'Europe/London', "yyyy-MM-dd'T'HH:mm:ss");
  sheet.appendRow([firstName, lastName, message, false, timestamp]);
}

function respondJSON(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
