import { body } from 'express-validator';

export const registerUserValidators = [ 
    body('emailAddress').exists(),
    body('password').exists()
]

export const loginValidators = [
    body('emailAddress').exists(),
    body('password').exists()
]