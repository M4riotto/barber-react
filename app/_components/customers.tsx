
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import GetClient from "../_actions/get-client";
import { Avatar, AvatarImage } from "./ui/avatar";

const Client = async () => {
    const clients = await GetClient()


    return (
        <>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Clientes</CardTitle>
                    <CardDescription>Recent orders from your store.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table >
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead className="hidden sm:table-cell">Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map(client => (

                                <TableRow className="bg-accent" key={client.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                            {client.image && <AvatarImage alt={client.image} src={client.image} />}
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{client.name}</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">{client.email}</div>
                                            </div>

                                        </div>

                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{client.email}</TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card></>
    );
}

export default Client;