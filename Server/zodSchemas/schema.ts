import { z } from "zod";

const zone = z.enum(["NORTH", "SOUTH", "EAST", "WEST"])

export const addressSchema = z.object({
    type: z.enum(["CURRENT", "PERMANENT"]),
    city: z.string({ required_error: "City is required" }),
    state: z.string({ required_error: "state is required" }),
    country: z.string({ required_error: "country is required" }),
    street: z.string({ required_error: "street is required" }),
    houseNumber: z.string({ required_error: "houseNumber is required" }),
    pinCode: z.string({ required_error: "pinCode is required" }),
    landmark: z.string().optional(),
    zone: zone.default("NORTH")
})

export const documentSchema = z.object({
    voterIdNumber:          z.string({ required_error: "voterIdNumber is required" }),
    voterIdPhoto:           z.string({ required_error: "voterIdPhoto is required" }),
    aadharCardNumber:       z.string({ required_error: "aadharCardNumber is required" }),
    aadharCardPhoto:        z.string({ required_error: "aadharCardPhoto is required" }),
    panCardNumber:          z.string({ required_error: "panCardNumber is required" }),
    panCardPhoto:           z.string({ required_error: "panCardPhoto is required" }),
    passportNumber:         z.string().optional(),
    passportPhoto:          z.string().optional(),
    drivingLicenceNumber:   z.string().optional(),
    drivingLicencePhoto:    z.string().optional(),
})
// sfbgbrssr
export const userSchema = z.object({
    type: z.enum(["STAFF", "ADMIN"]).default("STAFF"),
    firstName: z.string({required_error: "First name is required"}).max(50),
    lastName: z.string({required_error: "Last name is required"}).max(50),
    email: z.string().email("Email is required"),
    phoneNumber: z.string({required_error: "Phone number is required"}).regex(/^(\+91|91|0)?[789]\d{9}$/, "Invalid phone number"),
    password: z.string({required_error: "Password is required"}).min(4, "Password should contain atleast 4 letters"),
    address: z.array(addressSchema),
    documents: documentSchema
})

export const adminPostSchema = z.object({
    
})

// Comment added