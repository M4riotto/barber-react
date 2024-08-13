import { format } from "date-fns";
import getAllBookings from "../_actions/get-all-booking";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ptBR } from "date-fns/locale";

const Orders = async () => {
    const bookings = await getAllBookings()

    const now = new Date(); // Data e hora atuais
    const filteredBookings = bookings.filter(s => new Date(s.date) >= now);


    return (
        <>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Recent orders from your store.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table >
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">Serviço</TableHead>
                                <TableHead className="md:table-cell">Data</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBookings.map(booking => (

                                <TableRow className="">
                                    <TableCell>
                                        <div className="font-medium">{booking.user.name}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">{booking.user.email}</div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{booking.service.name}</TableCell>
                                    <TableCell className=" sm:table-cell">
                                        <Badge className="text-xs" variant="secondary">
                                            {<p className="capitalize">{format(booking.date, "EEEE, dd 'de' MMMM", { locale: ptBR })}</p>}
                                        </Badge>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card></>
    );
}

export default Orders;