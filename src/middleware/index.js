import { validationResult } from 'express-validator';

export const ValidateRequestBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({
            code: 400,
            error: errors.array()
        });
    }
    else {
        next();
    }
};

