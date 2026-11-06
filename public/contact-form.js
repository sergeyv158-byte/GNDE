(() => {
  const form = document.getElementById('contact-enquiry');
  if (!form) return;

  const preview = document.getElementById('contact-preview');
  const enquiryText = document.getElementById('contact-enquiry-text');
  const status = document.getElementById('contact-status');
  const copyButton = document.getElementById('contact-copy');
  const recipient = form.dataset.recipient;
  const fields = [
    ['company', 'Company'],
    ['contactName', 'Contact name'],
    ['email', 'Email'],
    ['phone', 'Phone'],
    ['requestType', 'Enquiry type'],
    ['application', 'Component or application'],
    ['geometry', 'Material and dimensions'],
    ['temperature', 'Operating temperature'],
    ['access', 'Access restrictions'],
    ['details', 'Application details and inspection goals'],
  ];

  form.hidden = false;

  form.addEventListener('input', (event) => {
    event.target.setCustomValidity('');
    preview.hidden = true;
    status.textContent = '';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    for (const field of form.querySelectorAll('[required]')) {
      field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
    }
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const subject = `GNDE ${data.get('requestType')} — ${data.get('company').trim()}`
      .replace(/[\r\n]/g, ' ');
    const body = fields.map(([name, label]) => {
      const value = data.get(name).trim();
      return `${label}: ${value || 'Not specified'}`;
    }).join('\r\n\r\n');

    enquiryText.value = `To: ${recipient}\nSubject: ${subject}\n\n${body}`;
    preview.hidden = false;
    status.textContent = 'Review the draft in your email application and select Send. If the draft does not open, copy the enquiry below and email it to ' + recipient + '.';
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(enquiryText.value);
      status.textContent = 'Enquiry copied. Paste it into an email to ' + recipient + ' and select Send.';
    } catch {
      enquiryText.focus();
      enquiryText.select();
      status.textContent = 'Select and copy the enquiry text below, then paste it into an email to ' + recipient + '.';
    }
  });
})();
