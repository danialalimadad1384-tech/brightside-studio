

// Shared interactions for all three pages.

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation' : 'Open navigation'
    );
  });
}

// Automatic year in the footer.
document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Contact form: open a Gmail compose window.
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const status = document.querySelector('#form-status');
    const emailField = contactForm.querySelector('[name="email"]');

    if (
      name.length < 2 ||
      !emailField ||
      !emailField.checkValidity() ||
      message.length < 10
    ) {
      status.textContent =
        'Please complete each field with valid information.';
      status.classList.add('error');
      return;
    }

    const body = `Name: ${name}
Email: ${email}
Topic: ${subject}

${message}`;

    const gmailUrl =
      'https://mail.google.com/mail/?view=cm&fs=1&to=' +
      encodeURIComponent('hello@brightside.example') +
      '&su=' +
      encodeURIComponent('Website enquiry: ' + subject) +
      '&body=' +
      encodeURIComponent(body);

    status.textContent =
      'Your email app should open with the message ready to send.';

    status.classList.remove('error');

    window.open(gmailUrl, '_blank');
  });
}

