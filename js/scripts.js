class PasswordGenerator {
    constructor() {
      this.inputEl = document.querySelector("#password");
      this.upperCaseCheckEl = document.querySelector("#uppercase-check");
      this.numbersCheckEl = document.querySelector("#number-check");
      this.symbolCheckEl = document.querySelector("#symbol-check");
      this.securityBar = document.querySelector("#security-indicator-bar");
      this.passwordLengthEl = document.querySelector("#password-length");
      this.passwordLength = 16;
  
      this.addEventListeners();
      this.generatePassword();
    }
  
    addEventListeners() {
      this.passwordLengthEl.addEventListener("input", () => {
        this.passwordLength = parseInt(this.passwordLengthEl.value, 10) || 16;
        document.querySelector("#password-length-text").innerText = this.passwordLength;
        this.generatePassword();
      });
  
      this.upperCaseCheckEl.addEventListener("click", () => this.generatePassword());
      this.numbersCheckEl.addEventListener("click", () => this.generatePassword());
      this.symbolCheckEl.addEventListener("click", () => this.generatePassword());
      document.querySelector("#copy-1").addEventListener("click", () => this.copy());
      document.querySelector("#copy-2").addEventListener("click", () => this.copy());
      document.querySelector("#renew").addEventListener("click", () => this.generatePassword());
    }
  
    generatePassword() {
      let chars = "abcdefghjkmnpqrstuvwxyz";
      let password = "";
  
      const upperCaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
      const numbers = '123456789';
      const symbols = '?!@&*()[]';
  
      if (this.upperCaseCheckEl.checked) {
        chars += upperCaseChars;
      }
      if (this.numbersCheckEl.checked) {
        chars += numbers;
      }
      if (this.symbolCheckEl.checked) {
        chars += symbols;
      }
  
      for (let i = 0; i < this.passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
      }
  
      this.inputEl.value = password;
      this.calculateQuality();
      this.calculateLength();
    }
  
    calculateQuality() {
      const percent = Math.round((this.passwordLength / 64) * 100 * 0.25 + (this.upperCaseCheckEl.checked ? 15 : 0) + (this.numbersCheckEl.checked ? 25 : 0) + (this.symbolCheckEl.checked ? 35 : 0));
  
      this.securityBar.style.width = `${percent}%`;
  
      if (percent > 69) {
        this.securityBar.classList.add("safe");
        this.securityBar.classList.remove("warning");
        this.securityBar.classList.remove("critical");
      } else if (percent > 50 && percent <= 69) {
        this.securityBar.classList.remove("safe");
        this.securityBar.classList.add("warning");
        this.securityBar.classList.remove("critical");
      } else {
        this.securityBar.classList.remove("safe");
        this.securityBar.classList.remove("warning");
        this.securityBar.classList.add("critical");
      }
  
      if (percent >= 100) {
        this.securityBar.classList.add("completed");
      } else {
        this.securityBar.classList.remove("completed");
      }
    }
  
    calculateLength() {
      if (this.passwordLength > 45) {
        this.inputEl.classList.remove("font-sm", "font-xs", "font-xss");
        this.inputEl.classList.add("font-xxss");
      } else if (this.passwordLength > 32 && this.passwordLength <= 45) {
        this.inputEl.classList.remove("font-sm", "font-xs", "font-xxss");
        this.inputEl.classList.add("font-xss");
      } else if (this.passwordLength > 22) {
        this.inputEl.classList.remove("font-xs", "font-xss", "font-xxss");
        this.inputEl.classList.add("font-sm");
      } else {
        this.inputEl.classList.remove("font-sm", "font-xs", "font-xss", "font-xxss");
      }
    }
  
    copy() {
      navigator.clipboard.writeText(this.inputEl.value);
    }
  }
  
  
  new PasswordGenerator();
  