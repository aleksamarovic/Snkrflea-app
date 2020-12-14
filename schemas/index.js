import { object, string, number, bool } from 'yup';

export const loginSchema = object({
    email: string().required().email(),
    password: string().required().min(4, 'Must be exactly 4 digits'),
});

export const registerSchema = object({
    email: string().required().email(),
    password: string().required().min(4, 'Must be exactly 4 digits'),
    privacy: bool().oneOf([true]).required()
});

export const contactSchema = object({
    name: string().required(),
    email: string().required().email(),
    reason: string().required()
});

export const reportSchema = object({
    reason: string().required(),
    report: string().required()
});

export const storeSchema = object({
    name: string().required(),
    contactEmail: string().required().email(),
    address: string(),
    twitter: string(),
    tiktok: string(),
    instagram: string(),
});

export const productSchema = object({
    title: string().required(),
    description: string().required(),
    price: number().required(),
    brandId: number().required(),
    categoryId: number().required(),
    subCategoryId: number(),
    sizeId: number(),
    images: object()

});

export const checkoutSchema = object({
    name: string().required(),
    email: string().required().email(),
    address: string().required(),
    city: string().required(),
    state: string().required(),
    zip: number().required(),
    checkbox: bool().required()
});
