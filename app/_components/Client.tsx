import { UsersIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import GetClient from "../_actions/get-client";

const Client = async () => {

    const client = await GetClient()
    const count = client.length;

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Users</CardTitle>
                    <UsersIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{count}</div>
                    <p className="text-xs text-muted-foreground">XD</p>
                </CardContent>
            </Card>
        </>
    );
}

export default Client;