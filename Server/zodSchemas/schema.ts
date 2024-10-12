import { z } from 'zod'

export const zone = z.enum(['NORTH', 'SOUTH', 'EAST', 'WEST'])

export const commodities = z.enum(
    [
        'RICE',
        'WHEAT',
        'ATTA',
        'GRAM_DAL',
        'ARHAR_DAL',
        'URAD_DAL',
        'MOONG_DAL',
        'MASOOR_DAL',
        'SUGAR',
        'MILK',
        'GROUNDNUT_OIL',
        'MUSTARD_OIL',
        'VANASPATI',
        'SOYA_OIL',
        'SUNFLOWER_OIL',
        'PALM_OIL',
        'GUR',
        'TEA_LOOSE',
        'SALT',
        'POTATO',
        'ONION',
        'TOMATO',
    ],
    { required_error: 'Commodity is required!' }
)

export const addressSchema = z.object({
    type: z.enum(['CURRENT', 'PERMANENT']).default("CURRENT"),
    city: z.string({ required_error: 'City is required' }),
    state: z.string({ required_error: 'state is required' }),
    country: z.string({ required_error: 'country is required' }),
    street: z.string({ required_error: 'street is required' }),
    houseNumber: z.string({ required_error: 'houseNumber is required' }),
    pinCode: z.string({ required_error: 'pinCode is required' }),
    landmark: z.string().optional(),
    zone: zone.default('NORTH'),
})

export const documentSchema = z.object({
    voterIdNumber: z
        .string({ required_error: 'voterIdNumber is required' })
        .regex(/^([A-Z]{3})\d{7}$/, 'Invalid Voter ID Number'),
    voterIdPhoto: z.string({ required_error: 'voterIdPhoto is required' }),
    aadharCardNumber: z
        .string({
            required_error: 'aadharCardNumber is required',
        })
        .regex(/^\d{4}\s\d{4}\s\d{4}$/, 'Invalid Aadhar Card Number'),
    aadharCardPhoto: z.string({
        required_error: 'aadharCardPhoto is required',
    }),
    panCardNumber: z
        .string({ required_error: 'panCardNumber is required' })
        .regex(/^[A-Z]{5}\d{4}[A-Z]{1}$/, 'Invalid Pan Card Number'),
    panCardPhoto: z.string({ required_error: 'panCardPhoto is required' }),
    passportNumber: z
        .string()
        .regex(/^[A-Z]{1}\d{7}$/, 'Invalid Passport Number')
        .optional(),
    passportPhoto: z.string().optional(),
    drivingLicenceNumber: z
        .string()
        .regex(/^[A-Z]{2}\d{13}$/, 'Invalid Driving License Number')
        .optional(),
    drivingLicencePhoto: z.string().optional(),
})

export const userSchema = z.object({
    type: z.enum(['STAFF', 'ADMIN']).default('STAFF'),
    firstName: z.string({ required_error: 'First name is required' }).max(50),
    lastName: z.string({ required_error: 'Last name is required' }).max(50),
    email: z.string().email('Email is required'),
    phoneNumber: z
        .string({ required_error: 'Phone number is required' })
        .regex(/^(\+91|91|0)?[789]\d{9}$/, 'Invalid phone number'),
    password: z
        .string({ required_error: 'Password is required' })
        .min(4, 'Password should contain atleast 4 letters'),
})

export const adminPostDataSchema = z.object({
    user: userSchema,
    address: z.array(addressSchema),
    documents: documentSchema,
})

export const priceReportingCentreSchema = z.object({
    name: z.string({ required_error: "Name of the centre is required" }),
    headName: z.string({ required_error: "Head name is required" }),
    headDocuments: documentSchema,
    address: addressSchema,
})

export const priceDataSchema = z.object({
    type: z.enum(['RETAIL', 'WHOLESALE']).default('RETAIL'),
    price: z
        .number({ required_error: 'Price is required!' })
        .gt(0, 'Invalid Price'),
    date: z.date().optional(),
    commodity: commodities,
    priceReportingCentreId: z.number({
        required_error: 'Centre id is required',
    }),
})
