import { Prisma } from "@prisma/client";

export type FullUser = Prisma.UserGetPayload<
    {
        include: { address: true, documents: true }
    }
>