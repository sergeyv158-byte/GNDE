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
    ['details', 'Application details'],
  ];

  form.hidden = false;
  const requiredFields = ['company', 'contactName', 'email'];
  requiredFields.forEach(name => {
    const field = form.elements.namedItem(name);
    field.addEventListener('input', () => field.setCustomValidity(''));
  });

  form.addEventListener('input', () => {
    preview.hidden = true;
    status.textContent = '';
  });

  form.addEventListener('reset', () => {
    preview.hidden = true;
    enquiryText.value = '';
    status.textContent = 'Form cleared.';
    requiredFields.forEach(name => form.elements.namedItem(name).setCustomValidity(''));
    form.elements.namedItem('company').focus();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    requiredFields.forEach(name => {
      const field = form.elements.namedItem(name);
      field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
    });
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const subject = ['GNDE enquiry', data.get('company').trim()].filter(Boolean).join(' — ')
      .replace(/[\r\n]/g, ' ');
    const body = fields.map(([name, label]) => {
      const value = data.get(name).trim();
      return value ? `${label}: ${value}` : '';
    }).filter(Boolean).join('\r\n\r\n');

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

