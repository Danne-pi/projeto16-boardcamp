import joi from "joi";

export const postsSchema = joi.object({
    type: joi.string().required(),
    desc: joi.string().required(),
    value: joi.number().required(),
  });