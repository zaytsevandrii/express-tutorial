import {body} from 'express-validator'

export const registerValidator = [
    body('email','Incorrect format email').isEmail(),
    body('password','Minimum password 5 symbols').isLength({min:5}),
    body('fullName','Your name minimem 3 symbols').isLength({min:3}),
    body('avatarUrl').optional().isURL(),
]