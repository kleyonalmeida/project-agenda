import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if(!this.form) return;
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.document.querySelector('input[name="email"]');
    const passwordInput = el.document.querySelector('input[name="password"]');
    let error = false;

    if(!validator.isEmail(emailInput.value)) {
      alert('Seu e-mail é inválido');
      error = true;
    }

    if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      alert('Ssua senha é inválido');
      error = true;
    }

    if(!error) el.submit();
  }
}