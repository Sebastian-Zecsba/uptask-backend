import { Router } from "express"
import { body, param } from "express-validator"
import { AuthCrontoller } from "../controllers/AuthController"
import { handleInputErrors } from "../middleware/validation"
import { authenticate } from "../middleware/auth"

const router = Router()

router.post('/create-account', 
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({min: 8}).withMessage('El password es muy corto'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Los password no son iguales')
        }
        return true
    }),
    body('email')
        .isEmail().withMessage('Email no valido'),
    handleInputErrors,
    AuthCrontoller.createAccount
)

router.post('/confirm-account', 
    body('token')
        .notEmpty().withMessage('El token no puede ir vacio'),
    handleInputErrors,
    AuthCrontoller.confirmAccount
)

router.post('/login',
    body('email')
        .isEmail().withMessage('Email no valido'),
    body('password')
        .notEmpty().withMessage('El password no puede ir vacio'),
    handleInputErrors,
    AuthCrontoller.login
)

router.post('/request-code',
    body('email')
        .isEmail().withMessage('Email no valido'),
    handleInputErrors,
    AuthCrontoller.requestConfirmationCode
)

router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('Email no valido'),
    handleInputErrors,
    AuthCrontoller.forgotPassword
)

router.post('/validate-token', 
    body('token')
        .notEmpty().withMessage('El token no puede ir vacio'),
    handleInputErrors,
    AuthCrontoller.validateToken
)

router.post('/update-password/:token', 
    param('token')
        .isNumeric().withMessage('Token no valido'),
    body('password')
        .isLength({min: 8}).withMessage('El password es muy corto'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Los password no son iguales')
        }
        return true
    }),
    handleInputErrors,
    AuthCrontoller.updatePasswordWithToken
)

router.get('/user',
    authenticate,
    AuthCrontoller.user
)

// Profile

router.put('/profile', 
    authenticate,
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('email')
        .isEmail().withMessage('Email no valido'),
    handleInputErrors,
    AuthCrontoller.updateProfile
)

router.post('/update-password',
    authenticate,
    body('current_password')
        .notEmpty().withMessage('El password no puede ir vacio'),
    body('password')
        .isLength({min: 8}).withMessage('El password es muy corto'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Los password no son iguales')
        }
        return true
    }),
    handleInputErrors,
    AuthCrontoller.updatedCurrentUserPassword
)

router.post('/check-password',
    authenticate,
    body('password')
        .notEmpty().withMessage('El password no puede ir vacio'),
    handleInputErrors,
    AuthCrontoller.checkPassword
)

export default router