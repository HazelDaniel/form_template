import { clearSignature, saveSignature } from "./signature.js";
document.addEventListener("DOMContentLoaded", () => {
  class CustomFormData {
    constructor(parent) {
      this.parentEl = parent;
      this.TextFieldEls = Array.from(
        this.parentEl.querySelectorAll("input[type='text']")
      );
      this.EmailFieldEls = Array.from(
        this.parentEl.querySelectorAll("input[type='email']")
      );
      this.RadioFieldEls = Array.from(
        this.parentEl.querySelectorAll("input[type='radio']")
      );
      this.PhoneFieldEls = Array.from(
        this.parentEl.querySelectorAll("input[type='tel']")
      );
      this.PasswordFieldEls = Array.from(
        this.parentEl.querySelectorAll("input[type='password']")
      );
      this.CheckFieldEls = Array.from(
        this.parentEl.querySelectorAll("input[type='checkbox']")
      );
      this.NumberFieldEls = Array.from(
        this.parentEl.querySelectorAll("input[type='number']")
      );
      this.DateFieldEls = Array.from(
        this.parentEl.querySelectorAll("input[type='date']")
      );
      this.TimeFieldEls = Array.from(
        this.parentEl.querySelectorAll("input[type='time']")
      );
      this.LinkFieldEls = Array.from(
        this.parentEl.querySelectorAll("input[type='url']")
      );
      this.ColorFieldEls = Array.from(
        this.parentEl.querySelectorAll("input[type='color']")
      );
      this.TextAreaFields = Array.from(
        this.parentEl.querySelectorAll("textarea")
      );
      this.SelectFields = Array.from(this.parentEl.querySelectorAll("select"));
      const textFIelds = this.TextFieldEls.filter((el) => el.value);
      const textAreaFields = this.TextAreaFields.filter((el) => el.value);
      const emailFields = this.EmailFieldEls.filter((el) => el.value);
      const radioFields = this.RadioFieldEls.filter((el) => el.checked);
      const phoneFields = this.PhoneFieldEls.filter((el) => el.value);
      const passwordFields = this.PasswordFieldEls.filter((el) => el.value);
      const checkFields = this.CheckFieldEls.filter((el) => el.checked);
      const numberFields = this.NumberFieldEls.filter((el) => +el.value);
      const dateFields = this.DateFieldEls.filter((el) => el.value);
      const timeFields = this.TimeFieldEls.filter((el) => el.value);
      const linkFields = this.LinkFieldEls.filter((el) => el.value);
      const colorFields = this.ColorFieldEls.filter((el) => el.value);
      const selectFields = this.SelectFields.filter((el) => el.value);

      let textLikeFieldObjs = [
        ...textFIelds,
        ...emailFields,
        ...phoneFields,
        ...passwordFields,
        ...numberFields,
        ...dateFields,
        ...timeFields,
        ...linkFields,
        ...colorFields,
        ...textAreaFields,
        ...selectFields,
      ];
      textLikeFieldObjs = textLikeFieldObjs.reduce((acc, curr) => {
        if (curr.value) {
          acc[curr.name] = curr.value;
        }
        return acc;
      }, {});
      let checkLikeFieldObjs = [...checkFields];
      checkLikeFieldObjs = checkLikeFieldObjs.reduce((acc, curr) => {
        if (curr.checked) {
          acc[curr.name] = true;
        }
        return acc;
      }, {});
      let radioFieldObjs = radioFields.reduce((acc, curr) => {
        if (curr.checked) {
          acc[curr.name] = curr.value;
        }
        return acc;
      }, {});

      const formFieldObjs = {
        ...textLikeFieldObjs,
        ...checkLikeFieldObjs,
        ...radioFieldObjs,
      };
      this.fields = formFieldObjs;
    }
  }

  class FieldSetRecord {
    constructor(parentClassName) {
      this.ctaClassName = "record-add-cta";
      this.parentClassName = parentClassName;
      this.childrenCount = 1;
      this.parentEl = document.querySelector(`.${this.parentClassName}`);
      this.ctaEl = this.parentEl.querySelector(`.${this.ctaClassName}`);
    }

    get makeChildEl() {
      const parser = new DOMParser();
      const childEl = parser.parseFromString(this.generateMarkup, "text/html");
      return childEl.body.innerHTML;
    }

    get generateMarkup() {
      return "<p>no item</p>";
    }

    handleFieldAddition() {
      const newChild = this.makeChildEl;
      this.addToFields(newChild);
    }

    addToFields() {
      this.ctaEl.addEventListener("click", () => {
        if (this.childrenCount >= 4) {
          alert(`you can only add ${this.childrenCount - 1} extra records`);
        }
        this.childrenCount++;
        this.parentEl.insertAdjacentHTML("afterbegin", this.generateMarkup);
        this.parentEl.querySelector("label").scrollIntoView({
          behavior: "smooth",
        });
      });
    }
  }

  class SchoolHistoryField extends FieldSetRecord {
    constructor(parentClassName) {
      super(parentClassName);
    }

    get generateMarkup() {
      return `
      <label for="school${this.childrenCount}">School:</label>
      <input type="text" id="school${this.childrenCount}" name="school${this.childrenCount}"  />
      <label for="location${this.childrenCount}">Location:</label>
      <input type="text" id="location${this.childrenCount}" name="location${this.childrenCount}"  />
      <label for="graduated_date${this.childrenCount}">Date Graduated</label>
      <input
        type="date"
        id="graduated_date${this.childrenCount}"
        name="graduated_date${this.childrenCount}"
        
      />
      <label for="attainment${this.childrenCount}">Attainment:</label>
      <input
        type="text"
        id="attainment${this.childrenCount}"
        name="attainment${this.childrenCount}"
        class="attainment"
      />
      `;
    }
  }

  class WorkExpField extends FieldSetRecord {
    constructor(parentClassName) {
      super(parentClassName);
    }

    get generateMarkup() {
      const workExpString = `
        <label for="company_name${this.childrenCount}">Company Name:</label>
        <input type="text" id="company_name${this.childrenCount}" name="company_name${this.childrenCount}"  />
        <label for="from_year${this.childrenCount}">Year From:</label>
        <input
          type="number"
          id="from_year${this.childrenCount}"
          name="from_year${this.childrenCount}"
          min="2000"
          max="2024"
          
        />
        <label for="to_year${this.childrenCount}">Year To:</label>
        <input
          type="number"
          id="to_year${this.childrenCount}"
          name="to_year${this.childrenCount}"
          min="2000"
          max="2024"
          
        />
        <label for="position${this.childrenCount}">Position:</label>
        <input type="text" id="position${this.childrenCount}" name="position${this.childrenCount}"  />
        <label for="leave_reason${this.childrenCount}">Reason For Leaving:</label>
        <textarea
          id="leave_reason${this.childrenCount}"
          name="leave_reason${this.childrenCount}"
          cols="3"
          rows="2"
          
        ></textarea>
        <label for="contact_employer${this.childrenCount}"
          >May we contact your current employer?</label
        >
        <label for="contact_employer${this.childrenCount}_check" class="inline-label"> Yes</label>
        <input
          type="checkbox"
          id="contact_employer${this.childrenCount}_check"
          name="contact_employer${this.childrenCount}_check"
        />
        <label for="contact_employer${this.childrenCount}_explain">If No, Why?:</label>
        <textarea
          id="contact_employer${this.childrenCount}_explain"
          name="contact_employer${this.childrenCount}_explain"
          rows="3"
        ></textarea>
        <label for="supervisor_name${this.childrenCount}">If yes, name of supervisor:</label>
        <textarea
          id="supervisor_name${this.childrenCount}"
          name="supervisor_name${this.childrenCount}"
          rows="3"
        ></textarea>
        <label for="supervisor_phone${this.childrenCount}">Contact Number:</label>
        <input
          type="tel"
          name="supervisor_phone${this.childrenCount}"
          id="supervisor_phone${this.childrenCount}"
          class="supervisor-phone"
        />
      `;
      return workExpString;
    }
  }

  function handleFieldsAddition() {
    const workExpRecord = new WorkExpField("work-exp");
    workExpRecord.handleFieldAddition();

    const schoolHistRecord = new SchoolHistoryField("education-history");
    schoolHistRecord.handleFieldAddition();
  }

  function handleSignatureClear() {
    const clearSignatureButton = document.getElementById("clear-signature");
    clearSignatureButton.addEventListener("click", clearSignature);
  }

  function handleFormSubmit() {
    const applicationForm = document.querySelector(".application-form");
    applicationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new CustomFormData(e.target);
      const signatureImage = saveSignature();
      if (!signatureImage) alert("signature fields empty");
      formData.fields["signature_image"] = signatureImage;

      fetch("https://jafar-backend.onrender.com/api/services/form/", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(formData.fields),
      })
        .then((res) => res.json())
        .then((_) => {
					window.location.replace("http://robertjafarcontracting.com/services/form/submitted.html");
				}
				)
				.catch(error => {
					alert(`an error occurred! ${error.message}\ntry again`);
			})
    });
  }

  function main() {
    handleFieldsAddition();
    handleSignatureClear();
    handleFormSubmit();
  }

  main();
});
