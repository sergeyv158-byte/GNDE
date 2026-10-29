(() => {
  let dialog;
  let returnFocus;

  function getDialog() {
    if (dialog) return dialog;
    dialog = document.createElement('dialog');
    dialog.className = 'case-study-preview';
    dialog.setAttribute('aria-labelledby', 'case-study-preview-title');

    const eyebrow = document.createElement('p');
    eyebrow.className = 'case-study-eyebrow';
    eyebrow.textContent = 'Case Study';
    const title = document.createElement('h2');
    title.id = 'case-study-preview-title';
    const message = document.createElement('p');
    message.textContent = 'Case-study content will be added here.';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'case-study-button case-study-close';
    close.textContent = 'Close';
    close.addEventListener('click', () => dialog.close());

    dialog.append(eyebrow, title, message, close);
    document.body.append(dialog);
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (returnFocus?.isConnected) returnFocus.focus();
    });
    return dialog;
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('button.case-study-button[data-case-study-id]');
    if (!trigger) return;
    const currentDialog = getDialog();
    currentDialog.querySelector('h2').textContent = trigger.dataset.caseStudyTitle || 'Case Study';
    returnFocus = trigger;
    currentDialog.showModal();
  });
})();
