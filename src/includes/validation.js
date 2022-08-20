import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as exclude,
} from "@vee-validate/rules";
// comfirmed,

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("tos", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);
    defineRule("min_value", minValue);
    defineRule("max_value", maxValue);
    defineRule("confirmed", confirmed);
    defineRule("exclude", exclude);
    defineRule("country_excluded", exclude);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The Field ${ctx.field} is required.`,
          min: `The Field ${ctx.field} is too short.`,
          max: `The Field ${ctx.field} is too long.`,
          alpha_spaces: `The Field ${ctx.field} may only contain alphabetical characters and spaces.`,
          email: `The Filed ${ctx.field} must contain a valid email.`,
          min_value: `The Field ${ctx.field} is too low.`,
          max_value: `The Field ${ctx.field} is too high.`,
          exclude: `You aren't allowed to use this value in the field ${ctx.field}.`,
          country_excluded: `Due to restrictions, we don't accept users from this location.`,
          tos: `You must accept our policies.`,
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The Field ${ctx.field} is invalid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnInput: false,
    });
  },
};
