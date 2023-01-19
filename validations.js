import {body} from 'express-validator'

export const registerValidator = [
    body('email','Incorrect format email').isEmail(),
    body('password','Minimum password 5 symbols').isLength({min:5}),
    body('fullName','Your name minimem 3 symbols').isLength({min:3}),
    body('avatarUrl').optional().isURL(),
]
export const loginValidation = [
    body('email','Incorrect format email').isEmail(),
    body('password','Minimum password 5 symbols').isLength({min:5}),
]
export const postCreateValidation = [
    body('title','Type title for your article').isLength({min:3}).isString(),
    body('text','Type text for article').isLength({min:10}).isString(),
    body('tags','Incorrect format tags').optional().isArray(),
    body('imageUrl','Incorrect link for image').optional().isString(),
]