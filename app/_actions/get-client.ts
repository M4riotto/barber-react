"use server"

import { db } from "../_lib/prisma";


const GetClient = async () => {
        return await db.user.findMany({ })
}
 
export default GetClient;

