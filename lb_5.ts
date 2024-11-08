interface BaseContent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    status: 'draft' | 'published' | 'archived';
}

interface Article extends BaseContent {
    title: string,
    body: string,
    author: string;
    tags: string[]
}

interface Product extends BaseContent {
    name: string,
    description: string,
    price: number;
    currency: string,
    stock: number;
    tags?: string[]
}

type ContentOperations<T extends BaseContent> = {
    create: (content: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => T;
    update: (id: string, updates: Partial<Omit<T, 'id' | 'createdAt'>>) => T;
    delete: (id: string) => void;
    fetch: (id: string) => T | undefined;
    list: (status?: T['status']) => T[]
};

type Role = 'admin' | 'editor' | 'viewer';

type Permission = {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
};

type RolePermissions = {
    admin: Permission;
    editor: Permission;
    viewer: Permission;
};

const rolePermissions: RolePermissions = {
    admin: { create: true, read: true, update: true, delete: true},
    editor: { create: true, read: true, update: true, delete: false },
    viewer: { create: false, read: true, update: false, delete: false}
}

type AccessControl<T extends BaseContent> = {
    role: Role;
    permissions: Permission;
    checkPermission: (role: Role, action: keyof Permission) => boolean;
}

type Validator<T> = {
    validate: (data: T) => ValidationResult;
};

type ValidationResult = {
    isValid: boolean;
    errors?: string[]
}

const ArticleValidator: Validator<Article> = {
    validate: (data) => {
        const errors: string[] = [];

        if (!data.title) {
            errors.push("Title is required.")
        }
        if (!data.body) {
            errors.push("Body is required.")
        }
        if (!data.author) {
            errors.push("Author is required.")
        }

        return {
            isValid: errors.length === 0,
            errors: errors.length ? errors : undefined
        };
    },
};

const ProductValidator: Validator<Product> = {
    validate: (data) => {
        const errors: string[] = []

        if (!data.name) {
            errors.push("Name is required.")
        }
        if (data.price <= 0) {
            errors.push("Price must be greater than zero.")
        }
        if (!data.currency) {
            errors.push("Currency is required.")
        }
        if (data.stock < 0) {
            errors.push("Stock cannot be negative.")
        }

        return {
            isValid: length === 0,
            errors: errors.length ? errors : undefined
        }
    }
}

const CompositeValidator = <T>(validators: Validator<T>[]): Validator<T> => {
    return {
        validate: (data) => {
            const allErrors: string[] = []
            let isValid = true

            validators.forEach(validator => {
                const result = validator.validate(data);
                if (!result.isValid) {
                    isValid = false;
                    if (result.errors) {
                        allErrors.push(...result.errors)
                    }
                }
            });

            return {
                isValid,
                errors: allErrors.length ? allErrors : undefined,
            }
        }
    }
}

type Versioned<T extends BaseContent> = T & {
    version: number;
    previousVersions?: T[];
    updatedBy?: string;
    changelog?: string;

    createNewVersion: (updatedData: Partial<T>, updatedBy: string, changelog: string) => Versioned<T>;
}